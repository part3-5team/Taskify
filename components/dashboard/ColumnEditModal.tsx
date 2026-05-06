'use client'

import React, { useState } from 'react'
import ModalLayout from '@/components/common/modal/ModalLayout'
import Input from '@/components/common/input'
import Button from '@/components/common/button'

interface ColumnEditModalProps {
  initialTitle: string
  onClose: () => void
  onConfirm: (title: string) => void | Promise<void>
}

export default function ColumnEditModal({
  initialTitle,
  onClose,
  onConfirm,
}: ColumnEditModalProps) {
  const [title, setTitle] = useState(initialTitle)

  const handleConfirm = async () => {
    const trimmedTitle = title.trim()

    if (trimmedTitle) {
      await onConfirm(trimmedTitle)
      onClose()
    }
  }

  return (
    <ModalLayout onClose={onClose} className="w-[500px] px-7 py-8 text-left">
      <h2 className="text-2xl-24-bold mb-6 text-gray-100">컬럼 관리</h2>

      <div className="mb-8">
        <label className="text-2lg-18-medium mb-2 block text-gray-100">
          이름
        </label>
        <Input
          type="text"
          placeholder="컬럼 이름"
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
          disabled={!title.trim() || title === initialTitle}
          className="w-[120px]"
        >
          변경
        </Button>
      </div>
    </ModalLayout>
  )
}
