'use client'

import React, { useState } from 'react'
import IconPlus from '@/assets/icons/ic_plus.svg'
import ColumnAddModal from './ColumnAddModal'

interface AddColumnButtonProps {
  onAddColumn: (title: string) => void
  canAddMore: boolean
}

export default function AddColumnButton({
  onAddColumn,
  canAddMore,
}: AddColumnButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    if (!canAddMore) {
      alert('추가로 생성될 수 있는 최대 모달은 20개입니다.')
      return
    }
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="flex w-[300px] flex-shrink-0 flex-col pt-[20px]">
        <button
          onClick={handleOpenModal}
          className="bg-black-300 flex flex-row items-center justify-center gap-3 rounded-[17px] border border-none py-[24px] transition-colors hover:bg-gray-900"
        >
          <div className="flex h-[20px] w-[20px] items-center justify-center rounded-3xl bg-[#2b2b2b]">
            <IconPlus className="h-[12px] w-[12px] text-gray-100" />
          </div>
          <span className="text-lg-18-bold text-gray-100">
            새로운 컬럼 추가
          </span>
        </button>
      </div>

      {isModalOpen && (
        <ColumnAddModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={(title) => {
            onAddColumn(title)
          }}
        />
      )}
    </>
  )
}
