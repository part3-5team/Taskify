'use client'

import { useState } from 'react'
import CloseIcon from '@/assets/icons/ic_X.svg'
import Input from '@/components/common/input'
import Button from '@/components/common/button'

interface InviteMemberModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (email: string) => Promise<boolean>
}

export default function InviteMemberModal({
  open,
  onClose,
  onSubmit,
}: InviteMemberModalProps) {
  const [email, setEmail] = useState('')

  if (!open) return null

  const handleClose = () => {
    setEmail('')
    onClose()
  }

  const handleSubmit = async () => {
    if (!email.trim()) return

    const isSuccess = await onSubmit(email.trim())

    if (isSuccess) {
      setEmail('')
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-99 flex items-center justify-center bg-black/40 px-5 md:px-0">
      <div className="border-stroke bg-modal z-999 w-full max-w-lg rounded-2xl border p-[30px] shadow-2xl">
        <div className="mb-7 flex items-center justify-between">
          <h2 className="text-2xl-24-semibold text-gray-300">초대하기</h2>
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-300 hover:text-white md:h-6 md:w-6"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="space-y-3">
          <label className="text-lg-16-semibold block text-gray-300">
            이메일
          </label>
          <Input
            type="email"
            value={email}
            placeholder="이메일을 입력해주세요"
            onChange={(e) => setEmail(e.target.value)}
            className="h-[54px]"
          />
        </div>

        <div className="text-2lg-18-semibold mt-4 flex items-center justify-center gap-5 md:mt-7">
          <Button
            variant="cancel"
            onClick={handleClose}
            size="sm"
            className="h-[50px] w-[141px] md:h-[60px] md:w-full"
          >
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            size="sm"
            className="h-[50px] w-[141px] md:h-[60px] md:w-full"
          >
            공유
          </Button>
        </div>
      </div>
    </div>
  )
}
