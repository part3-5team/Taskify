'use client'

import { useState } from 'react'
import ModalLayout from '@/components/common/modal/ModalLayout'
import Input from '@/components/common/input'
import TextArea from '@/components/common/textArea'
import Dropdown from '@/components/common/dropdown/Dropdown'
import Button from '@/components/common/button'
import IconX from '@/assets/icons/ic_X.svg'
import IconImage from '@/assets/icons/ic_image.svg'
import { createCard } from '@/libs/api/cards/createCard'
import type { CardDetail } from '@/libs/types/Card'

interface TaskCreateModalProps {
  dashboardId: number
  columnId: number
  onClose: () => void
  onCreate?: (card: CardDetail) => void
}

export default function TaskCreateModal({
  dashboardId,
  columnId,
  onClose,
  onCreate,
}: TaskCreateModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [imageUrl, setImageUrl] = useState('')
  const [assigneeUserId, setAssigneeUserId] = useState<number | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isValid = title.trim() !== '' && description.trim() !== ''

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return

    e.preventDefault()

    const nextTag = tagInput.trim()

    if (!nextTag) return
    if (tags.includes(nextTag)) return

    setTags((prev) => [...prev, nextTag])
    setTagInput('')
  }

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((item) => item !== tag))
  }

  const handleSubmit = async () => {
    if (!isValid || isSubmitting) return

    try {
      setIsSubmitting(true)

      const newCard = await createCard({
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
      className="bg-modal w-full max-w-[500px] overflow-hidden rounded-2xl p-7 text-left"
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
          <div className="flex-1">
            <label className="mb-2 block text-sm font-semibold text-gray-100">
              마감일
            </label>

            <Input
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="YYYY-MM-DD"
            />
          </div>

          <div className="flex-1">
            <label className="mb-2 block text-sm font-semibold text-gray-100">
              담당자
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
          <Button variant="cancel" className="flex-1" onClick={onClose}>
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
