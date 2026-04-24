'use client';

import LeftIcon from '@/assets/icons/ic_chevron_left.svg';
import RightIcon from '@/assets/icons/ic_chevorn_right.svg';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: PaginationProps) {
  return (
    <div className="flex items-center gap-3 lg:text-lg-16-semibold sm:text-lg-14px-semibold text-gray-300">
      <span>
        {currentPage} of {totalPages}
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentPage === 1}
          className="flex h-6 w-6 items-center justify-center border-gray-200 disabled:opacity-40"
        >
          <LeftIcon />
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="flex h-6 w-6 items-center justify-center border-gray-200 text-white disabled:opacity-40"
        >
          <RightIcon />
        </button>
      </div>
    </div>
  )
}