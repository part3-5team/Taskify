'use client'

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
import { createCard } from '@/libs/api/card/createCard'
import { uploadCardImage } from '@/libs/api/card/uploadCardImage'
import { Member, Card } from '@/libs/types/Dashboard'

// 태그에 랜덤으로 적용할 색상 팔레트
const TAG_COLORS = [
  {
    bg: 'bg-profile-rose/20',
    text: 'text-profile-rose',
    border: 'border-profile-rose/30',
  },
  {
    bg: 'bg-profile-orange/20',
    text: 'text-profile-orange',
    border: 'border-profile-orange/30',
  },
  {
    bg: 'bg-profile-yellow/20',
    text: 'text-profile-yellow',
    border: 'border-profile-yellow/30',
  },
  {
    bg: 'bg-profile-green/20',
    text: 'text-profile-green',
    border: 'border-profile-green/30',
  },
  {
    bg: 'bg-profile-blue/20',
    text: 'text-profile-blue',
    border: 'border-profile-blue/30',
  },
  {
    bg: 'bg-brand-500/20',
    text: 'text-brand-400',
    border: 'border-brand-500/30',
  },
  {
    bg: 'bg-profile-violet/20',
    text: 'text-profile-violet',
    border: 'border-profile-violet/30',
  },
]

function getRandomTagColor() {
  return TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)]
}

interface TaskCreateModalProps {
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
  // 태그별 고정 색상 (태그 추가 시 랜덤 배정)
  const [tagColors, setTagColors] = useState<
    Record<string, (typeof TAG_COLORS)[0]>
  >({})
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
        setTagColors((prev) => ({ ...prev, [trimmed]: getRandomTagColor() }))
      }
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag))
    setTagColors((prev) => {
      const next = { ...prev }
      delete next[tag]
      return next
    })
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
        dueDate: dueDate ? formatDueDate(dueDate) : undefined,
        assigneeUserId,
        tags: tags.length > 0 ? tags : undefined,
        imageUrl,
      })
      if (!result.success) {
        setError(result.error ?? '할 일 생성에 실패했습니다.')
        return
      }
      if (result.data) {
        onCardCreated?.(result.data, columnId)
      }
      onClose()
    })
  }

  return (
    <ModalLayout
      onClose={onClose}
      className="bg-modal w-full max-w-[500px] overflow-y-auto rounded-2xl p-7 text-left"
    >
      {/* 헤더 */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl-24-bold text-gray-100">할 일 생성</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-100">
          <IconX className="h-6 w-6" />
        </button>
      </div>

      <div className="space-y-6">
        {/* 제목 */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-100">
            제목<span className="text-brand-500 ml-0.5">*</span>
          </label>
          <Input
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* 설명 */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-100">
            설명<span className="text-brand-500 ml-0.5">*</span>
          </label>
          <TextArea
            placeholder="설명을 입력해주세요"
            className="h-[120px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* 마감일 & 담당자 */}
        <div className="flex gap-4">
          {/* 마감일 - react-datepicker */}
          <div className="flex-1">
            <label className="mb-2 block text-sm font-semibold text-gray-100">
              마감일<span className="text-brand-500 ml-0.5">*</span>
            </label>
            <DatePicker
              selected={dueDate}
              onChange={(date: Date | null) => setDueDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="yyyy-MM-dd HH:mm"
              placeholderText="날짜를 선택해 주세요"
              locale={ko}
              minDate={new Date()}
              popperPlacement="bottom-start"
              wrapperClassName="w-full"
              className="bg-black-400 w-full rounded-[14px] border border-gray-700 px-5 py-3 text-white placeholder-gray-600 outline-none focus:border-blue-200"
            />
          </div>

          {/* 담당자 - 초대받은 멤버만 */}
          <div className="flex-1">
            <label className="mb-2 block text-sm font-semibold text-gray-100">
              담당자<span className="text-brand-500 ml-0.5">*</span>
            </label>
            <Dropdown
              users={dropdownUsers}
              onSelect={(user) => setAssigneeUserId(user.id)}
              placeholder="담당자 선택"
            />
          </div>
        </div>

        {/* 태그 */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-100">
            태그
          </label>
          {/* 입력된 태그 목록 */}
          {tags.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {tags.map((tag) => {
                const color = tagColors[tag] ?? TAG_COLORS[0]
                return (
                  <span
                    key={tag}
                    className={`flex items-center gap-1 rounded-full border px-3 py-0.5 text-xs font-medium ${color.bg} ${color.text} ${color.border}`}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-0.5 opacity-60 hover:opacity-100"
                    >
                      ×
                    </button>
                  </span>
                )
              })}
            </div>
          )}
          <Input
            placeholder="입력 후 Enter"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
          />
        </div>

        {/* 이미지 (최대 1개) */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-100">
            이미지
          </label>
          <div
            className="relative flex h-[140px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-gray-700 bg-gray-900 transition-colors hover:bg-gray-800"
            onClick={() => !imageFile && fileInputRef.current?.click()}
          >
            {imagePreview ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="미리보기"
                  className="h-full w-full object-cover"
                />
                {/* 이미지 삭제 버튼 */}
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                >
                  ×
                </button>
              </>
            ) : (
              <>
                <IconImage className="mb-2 h-8 w-8 text-gray-500" />
                <span className="text-sm text-gray-500">+ image upload</span>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* 푸터 버튼 */}
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
            disabled={!isFormValid || isPending}
          >
            생성
          </Button>
        </div>
      </div>
    </ModalLayout>
  )
}
