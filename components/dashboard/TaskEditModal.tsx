'use client'

import ModalLayout from '@/components/common/modal/ModalLayout'
import Input from '@/components/common/input'
import TextArea from '@/components/common/textArea'
import Dropdown from '@/components/common/dropdown/Dropdown'
import Button from '@/components/common/button'
import IconX from '@/assets/icons/ic_X.svg'
import IconImage from '@/assets/icons/ic_image.svg'
import { uploadCardImage } from '@/libs/api/card/uploadCardImage'

import { editCard } from '@/libs/api/cards/editCard'
import type { CardDetail } from '@/libs/types/Card'
import { useState, useRef } from 'react'
import type { Member } from '@/libs/types/Dashboard'

type EditColumn = {
  id: string
  title: string
}

interface TaskEditModalProps {
  card: CardDetail
  dashboardId: number
  columns: EditColumn[]
  members: Member[]
  onClose: () => void
  onEdited: (card: CardDetail) => void
}

export default function TaskEditModal({
  card,
  columns,
  members,
  onClose,
  onEdited,
}: TaskEditModalProps) {
  const [title, setTitle] = useState(card.title)
  const [description, setDescription] = useState(card.description)
  const [dueDate, setDueDate] = useState(card.dueDate ?? '')
  const [tags, setTags] = useState<string[]>(card.tags ?? [])
  const [tagInput, setTagInput] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(card.imageUrl ?? null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [columnId, setColumnId] = useState(card.columnId)
  const [assigneeUserId, setAssigneeUserId] = useState<number | null>(
    card.assignee?.id ?? null,
  )
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const previewSrc = imagePreview ?? imageUrl

  const isDisabled = title.trim() === '' || description.trim() === ''

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
  const handleRemoveTag = (targetTag: string) => {
    setTags((prev) => prev.filter((tag) => tag !== targetTag))
  }

  const handleSubmit = async () => {
    if (isDisabled) return

    try {
      setIsSubmitting(true)

      let nextImageUrl: string | null = imageUrl
      if (imageFile) {
        const uploadResult = await uploadCardImage(columnId, imageFile)
        nextImageUrl = uploadResult.data?.imageUrl ?? null

        if (!uploadResult.success) {
          alert(uploadResult.error ?? '이미지 업로드에 실패했습니다.')
          return
        }
      }

      const updatedCard = await editCard({
        cardId: card.id,
        columnId,
        assigneeUserId,
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate || null,
        tags,
        imageUrl: nextImageUrl,
      })

      onEdited(updatedCard)
      window.location.reload()
    } catch (err) {
      console.error(err)
      alert('카드 수정에 실패했습니다')
    } finally {
      setIsSubmitting(false)
    }
  }

  function getTagColorClasses(label: string) {
    if (label === '프로젝트') return 'bg-profile-blue text-white'
    if (label === '일정') return 'bg-profile-yellow text-white'
    if (label === '공부') return 'bg-profile-cyan text-white'
    if (label === '버그') return 'bg-red-500 text-white'

    const colors = [
      'bg-profile-rose text-white',
      'bg-profile-orange text-white',
      'bg-profile-violet text-white',
      'bg-brand-500 text-white',
      'bg-profile-green text-white',
    ]
    const index = label.length % colors.length
    return colors[index]
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    e.target.value = ''
  }

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (imagePreview) URL.revokeObjectURL(imagePreview)

    setImageFile(null)
    setImagePreview(null)
    setImageUrl(null)
  }

  return (
    <ModalLayout
      onClose={onClose}
      className="bg-modal flex min-h-screen w-full flex-col rounded-none border-none p-7 text-left md:w-[500px] md:rounded-2xl"
    >
      {/* 헤더 */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl-24-bold text-gray-100">할 일 수정</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-100">
          <IconX className="h-6 w-6" />
        </button>
      </div>

      <div className="scrollbar-thin min-h-0 flex-1 space-y-6 overflow-y-auto py-4 pr-2">
        {/* 제목 */}
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

        {/* 칼럼 & 담당자 (2열) */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="mb-2 block text-sm font-semibold text-gray-100">
              칼럼
            </label>

            <Dropdown
              users={columns.map((column) => ({
                id: Number(column.id),
                name: column.title,
              }))}
              defaultUser={{
                id: card.columnId,
                name: columns.find(
                  (column) => Number(column.id) === card.columnId,
                )?.title,
              }}
              placeholder="칼럼 선택"
              onSelect={(column) => setColumnId(column.id)}
            />
          </div>

          <div className="flex-1">
            <label className="mb-2 block text-sm font-semibold text-gray-100">
              담당자
            </label>

            <Dropdown
              users={members.map((member) => ({
                id: member.userId ?? member.id,
                nickname: member.nickname,
                profileImageUrl: member.profileImageUrl,
              }))}
              defaultUser={
                card.assignee
                  ? {
                      id: card.assignee.id,
                      nickname: card.assignee.nickname,
                      profileImageUrl: card.assignee.profileImageUrl,
                    }
                  : null
              }
              placeholder="담당자 선택"
              showProfileImage
              onSelect={(user) => setAssigneeUserId(user.id)}
            />
          </div>
        </div>

        {/* 태그 */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-100">
            태그
          </label>
          {tags.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {tags.map((tag) => {
                const colorClasses = getTagColorClasses(tag)
                return (
                  <span
                    key={tag}
                    className={`text-xs-12-medium flex items-center gap-1 rounded px-2 py-0.5 ${colorClasses}`}
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

        {/* 이미지 */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-100">
            이미지 URL
          </label>
          <div
            className="relative flex h-[140px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-gray-700 bg-gray-900 transition-colors hover:bg-gray-800"
            onClick={() => fileInputRef.current?.click()}
          >
            {previewSrc ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewSrc}
                  alt="미리보기"
                  className="h-full w-full object-cover"
                />
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
      </div>
      {/* 푸터 버튼 */}
      <div className="mt-8 flex shrink-0 gap-3">
        <Button
          variant="cancel"
          className="w-full flex-1 !px-2 !py-2 whitespace-nowrap"
          onClick={onClose}
        >
          취소
        </Button>
        <Button
          variant="primary"
          className="w-full flex-1 !px-2 !py-2 whitespace-nowrap"
          disabled={isDisabled || isSubmitting}
          onClick={handleSubmit}
        >
          완료
        </Button>
      </div>
    </ModalLayout>
  )
}
