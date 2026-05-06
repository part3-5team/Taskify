'use client'

import { ReactNode, ButtonHTMLAttributes, useState } from 'react'
import DashboardCreateModal from '@/components/mydashboard/CreateModal'

type CreateModalTriggerProps = {
  children: ReactNode
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function CreateModalTrigger({
  children,
  className,
  ...buttonProps
}: CreateModalTriggerProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => setIsOpen(true)}
        {...buttonProps}
      >
        {children}
      </button>

      {isOpen && <DashboardCreateModal onClose={() => setIsOpen(false)} />}
    </>
  )
}