'use client'

import ModalLayout from '@/components/common/modal/ModalLayout'
import Input from '@/components/common/input'
import TextArea from '@/components/common/textArea'
import Dropdown from '@/components/common/dropdown/Dropdown'
import Button from '@/components/common/button'
import IconX from '@/assets/icons/ic_X.svg'
import { editCard } from '@/libs/api/cards/editCard'
import type { CardDetail } from '@/libs/types/Card'
import { useState } from 'react'
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

  const isDisabled = title.trim() === '' || description.trim() === ''

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return

    e.preventDefault()

    const newTag = tagInput.trim()
    if (!newTag) return
    if (tags.includes(newTag)) return

    setTags((prev) => [...prev, newTag])
    setTagInput('')
  }

  const handleRemoveTag = (targetTag: string) => {
    setTags((prev) => prev.filter((tag) => tag !== targetTag))
  }

  const handleSubmit = async () => {
    if (isDisabled) return

    try {
      setIsSubmitting(true)

      const updatedCard = await editCard({
        cardId: card.id,
        columnId,
        assigneeUserId,
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate || null,
        tags,
        imageUrl,
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

  const getTagColor = (tag: string) => {
    if (tag === '할 일') return 'bg-profile-orange text-white'
    if (tag === '프로젝트') return 'bg-profile-blue text-white'
    if (tag === '디자인') return 'bg-profile-violet text-white'
    if (tag === '버그') return 'bg-profile-rose text-white'

    return 'bg-brand-500 text-white'
  }

  return (
    <ModalLayout
      onClose={onClose}
      className="bg-modal w-full max-w-[500px] overflow-hidden rounded-2xl p-7 text-left"
    >
      {/* 헤더 */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl-24-bold text-gray-100">할 일 수정</h2>
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

          <div className="relative flex min-h-[48px] flex-wrap items-center gap-2 rounded-xl border border-gray-700 bg-gray-900 px-4 py-2 focus-within:border-blue-100">
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className={`text-xs-12-medium rounded px-2 py-0.5 ${getTagColor(tag)}`}
                >
                  {tag} x
                </button>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              className="min-w-[100px] flex-1 bg-transparent text-sm text-gray-100 placeholder-gray-500 outline-none"
              placeholder="입력 후 Enter"
            />
          </div>
        </div>

        {/* 이미지 */}
        {imageUrl && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-100">
              이미지
            </label>

            <div className="relative h-[140px] w-[200px] overflow-hidden rounded-xl border border-gray-700 bg-gray-900">
              {/* The X button */}
              <button
                type="button"
                onClick={() => setImageUrl(null)}
                className="absolute top-2 right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
              >
                <IconX className="h-4 w-4" />
              </button>

              <img
                src={imageUrl}
                alt="카드 이미지"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}

        {/* 푸터 버튼 */}
        <div className="mt-8 flex gap-3">
          <Button variant="cancel" className="flex-1" onClick={onClose}>
            취소
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            disabled={isDisabled || isSubmitting}
            onClick={handleSubmit}
          >
            완료
          </Button>
        </div>
      </div>
    </ModalLayout>
  )
}
