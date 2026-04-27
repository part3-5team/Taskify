'use client';

import Button from "../common/button";

type DeleteVariant = 'column' | 'dashboard';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  variant: DeleteVariant;
  onCancel: () => void;
  onDelete: () => void;
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
};

export default function DeleteConfirmModal({
  isOpen,
  variant,
  onCancel,
  onDelete,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  const { title, description } = DELETE_CONTENT[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6">
      <div
        className="
          w-full md:min-w-[600px] rounded-[24px] border border-stroke
          bg-modal md:px-[30px] md:pb-[30px] md:pt-10 text-center shadow-xl
          md:max-w-[340px]
          max-w-[335px] px-5 pt-[30px] pb-6
        "
      >
        <h2
          className="
            md:text-2xl-24-semibold text-gray-300
            text-2lg-18-semibold
          "
        >
          {title}
        </h2>

        <p
          className="
            mt-2 md:mt-3 md:text-xl-20-semibold text-gray-300
            text-lg-16-medium
          "
        >
          {description}
        </p>

        <div className="flex items-center justify-between mt-5 gap-3
          md:mt-[30px] md:gap-[20px] md:text-2lg-18-semibold text-lg-16-semibold"
        >
          <Button
            onClick={onCancel}
            variant="cancel"
            size="sm"
            className="w-[141px] h-[50px] md:w-full md:h-[60px]"
          >
            취소
          </Button>
          <Button
            onClick={onDelete}
            variant="delete"
            size="sm"
            className="w-[141px] h-[50px] md:w-full md:h-[60px]"
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  )
}