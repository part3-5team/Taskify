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
  const [tagInput, setTagInput] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const dropdownUsers: DropdownUser[] = useMemo(
    () =>
      members.map((m) => ({
        id: m.userId,
        nickname: m.nickname,
        profileImageUrl: m.profileImageUrl,
      })),
    [members],
  )

  const isFormValid =
    title.trim().length > 0 &&
    description.trim().length > 0 &&
    dueDate !== null &&
    assigneeUserId !== undefined

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
  }

  const formatDueDate = (date: Date): string => {
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
  }

  const handleSubmit = () => {
    if (!isFormValid) return
    setError(null)

    startTransition(async () => {
      let imageUrl: string | undefined

      if (imageFile) {
        const uploadResult = await uploadCardImage(columnId, imageFile)
        if (!uploadResult.success) {
          setError(uploadResult.error ?? '이미지 업로드에 실패했습니다.')
          return
        }
        imageUrl = uploadResult.data?.imageUrl
      }

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
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

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

        <div className="flex gap-4">
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

          <div className="flex-1">
            <label className="mb-2 block text-sm font-semibold text-gray-100">
              담당자<span className="text-brand-500 ml-0.5">*</span>
            </label>
            <Dropdown
              users={dropdownUsers}
              onSelect={(user) => setAssigneeUserId(user.id)}
              placeholder="담당자 선택"
              showProfileImage={true}
            />
          </div>
        </div>

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

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-100">
            이미지 URL
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

        {error && <p className="text-sm text-red-500">{error}</p>}

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
