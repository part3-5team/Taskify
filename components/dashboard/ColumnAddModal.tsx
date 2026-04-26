'use client'

import React, { useState } from 'react'
import ModalLayout from '@/components/common/modal/ModalLayout'
import Input from '@/components/common/input'
import Button from '@/components/common/button'

interface ColumnAddModalProps {
  onClose: () => void
  onConfirm: (title: string) => void
}

export default function ColumnAddModal({
  onClose,
  onConfirm,
}: ColumnAddModalProps) {
  const [title, setTitle] = useState('')

  const handleConfirm = () => {
    if (title.trim()) {
      onConfirm(title.trim())
    }
  }

  return (
    <ModalLayout onClose={onClose} className="w-[500px] px-7 py-8 text-left">
      <h2 className="mb-6 text-2xl-24-bold text-gray-100">새 컬럼 생성</h2>

      <div className="mb-8">
        <label className="mb-2 block text-2lg-18-medium text-gray-100">
          이름
        </label>
        <Input
          type="text"
          placeholder="새로운 프로젝트"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          state="default"
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button
          variant="cancel"
          size="sm"
          onClick={onClose}
          className="w-[120px]"
        >
          취소
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleConfirm}
          disabled={!title.trim()}
          className="w-[120px]"
        >
          생성
        </Button>
      </div>
    </ModalLayout>
  )
}
