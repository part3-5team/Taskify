'use client'

import { useState } from 'react'
import { useState, useRef, useTransition, useMemo } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/locale'
import ModalLayout from '@/components/common/modal/ModalLayout'
import Input from '@/components/common/input'
import TextArea from '@/components/common/textArea'
import Dropdown, { DropdownUser } from '@/components/common/dropdown/Dropdown'
import Button from '@/components/common/button'
import IconX from '@/assets/icons/ic_X.svg'
import IconImage from '@/assets/icons/ic_image.svg'
import { createCard } from '@/libs/api/cards/createCard'
import type { CardDetail } from '@/libs/types/Card'

interface TaskCreateModalProps {
  dashboardId: number
  columnId: number
  onClose: () => void
  dashboardId: number
  columnId: number
  members: Member[]
  onCardCreated?: (card: Card, columnId: number) => void
}

export default function TaskCreateModal({
  onClose,
  dashboardId,
  columnId,
  members,
  onCardCreated,
}: TaskCreateModalProps) {
  const [isPending, startTransition] = useTransition()

  // 폼 상태
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState<Date | null>(null)
  const [assigneeUserId, setAssigneeUserId] = useState<number | undefined>()
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // 담당자 드롭다운용 유저 목록 (초대된 멤버만)
  const dropdownUsers: DropdownUser[] = useMemo(
    () =>
      members.map((m) => ({
        id: m.userId,
        nickname: m.nickname,
        profileImageUrl: m.profileImageUrl,
      })),
    [members],
  )

  // 필수 입력 완료 여부 → 생성 버튼 활성화
  const isFormValid =
    title.trim().length > 0 &&
    description.trim().length > 0 &&
    dueDate !== null &&
    assigneeUserId !== undefined

  // 태그 입력 처리 (Enter)
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const trimmed = tagInput.trim()
      if (trimmed && !tags.includes(trimmed)) {
        setTags((prev) => [...prev, trimmed])
      }
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag))
  }

  // 이미지 선택 처리 (최대 1개)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    // 기존 미리보기 URL 해제
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    // input value 초기화 (같은 파일 재선택 가능하도록)
    e.target.value = ''
  }

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setImageFile(null)
    setImagePreview(null)
  }

  // 날짜 → API 형식 변환 ("YYYY-MM-DD HH:mm")
  const formatDueDate = (date: Date): string => {
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
  }

  // 생성 제출
  const handleSubmit = () => {
    if (!isFormValid) return
    setError(null)

    startTransition(async () => {
      let imageUrl: string | undefined

      // 이미지 있으면
      if (imageFile) {
        const uploadResult = await uploadCardImage(columnId, imageFile)
        if (!uploadResult.success) {
          setError(uploadResult.error ?? '이미지 업로드에 실패했습니다.')
          return
        }
        imageUrl = uploadResult.data?.imageUrl
      }

      // 할일 카드 생성
      const result = await createCard({
        dashboardId,
        columnId,
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate || undefined,
        tags,
        imageUrl: imageUrl || undefined,
        assigneeUserId,
      })

      onCreate?.(newCard)
      onClose()
    } catch (error) {
      console.error(error)
      alert('카드 생성에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ModalLayout
      onClose={onClose}
      className="bg-modal w-full max-w-[500px] overflow-y-auto rounded-2xl p-7 text-left"
    >
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl-24-bold text-gray-100">할 일 생성</h2>

        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-100"
        >
          <IconX className="h-6 w-6" />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-100">
            제목<span className="text-brand-500 ml-0.5">*</span>
          </label>

          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-100">
            설명<span className="text-brand-500 ml-0.5">*</span>
          </label>

          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="설명을 입력해주세요"
            className="h-[120px]"
          />
        </div>

        <div className="flex gap-4">
          {/* 마감일 - react-datepicker */}
          <div className="flex-1">
            <label className="mb-2 block text-sm font-semibold text-gray-100">
              마감일<span className="text-brand-500 ml-0.5">*</span>
            </label>

            <Input
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="YYYY-MM-DD"
            />
          </div>

          <div className="flex-1">
            <label className="mb-2 block text-sm font-semibold text-gray-100">
              담당자<span className="text-brand-500 ml-0.5">*</span>
            </label>

            <Dropdown />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-100">
            태그
          </label>

          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="입력 후 Enter"
          />

          {tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="bg-brand-500 rounded px-2 py-1 text-xs text-white"
                >
                  {tag} ×
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-100">
            이미지 URL
          </label>

          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="이미지 URL을 입력해주세요"
          />

          <div className="relative mt-3 flex h-[140px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-gray-700 bg-gray-900">
            <IconImage className="mb-2 h-8 w-8 text-gray-500" />
            <span className="text-sm text-gray-500">
              {imageUrl ? '이미지 URL 입력됨' : '+ image upload'}
            </span>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <Button
            variant="cancel"
            className="flex-1"
            onClick={onClose}
            disabled={isPending}
          >
            취소
          </Button>

          <Button
            variant="primary"
            className="flex-1"
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
          >
            생성
          </Button>
        </div>
      </div>
    </ModalLayout>
  )
}
