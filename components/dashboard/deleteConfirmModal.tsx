'use client'

import Button from '../common/button'

type DeleteVariant = 'column' | 'dashboard'

interface DeleteConfirmModalProps {
  isOpen: boolean
  variant: DeleteVariant
  onCancel: () => void
  onDelete: () => void
}

const DELETE_CONTENT: Record<
  DeleteVariant,
  { title: string; description: string }
> = {
  column: {
    title: '칼럼을 삭제하시겠습니까?',
    description: '칼럼 내 모든 카드도 함께 삭제됩니다.',
  },
  dashboard: {
    title: '대시보드를 삭제하시겠습니까?',
    description: '모든 칼럼과 모든 카드도 함께 삭제됩니다',
  },
}

export default function DeleteConfirmModal({
  isOpen,
  variant,
  onCancel,
  onDelete,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null

  const { title, description } = DELETE_CONTENT[variant]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6">
      <div className="border-stroke bg-modal w-full max-w-[335px] rounded-[24px] border px-5 pt-[30px] pb-6 text-center shadow-xl md:max-w-[340px] md:min-w-[600px] md:px-[30px] md:pt-10 md:pb-[30px]">
        <h2 className="md:text-2xl-24-semibold text-2lg-18-semibold text-gray-300">
          {title}
        </h2>

        <p className="md:text-xl-20-semibold text-lg-16-medium mt-2 text-gray-300 md:mt-3">
          {description}
        </p>

        <div className="md:text-2lg-18-semibold text-lg-16-semibold mt-5 flex items-center justify-between gap-3 md:mt-[30px] md:gap-[20px]">
          <Button
            onClick={onCancel}
            variant="cancel"
            size="sm"
            className="h-[50px] w-[141px] md:h-[60px] md:w-full"
          >
            취소
          </Button>
          <Button
            onClick={onDelete}
            variant="delete"
            size="sm"
            className="h-[50px] w-[141px] md:h-[60px] md:w-full"
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  )
}
