'use client'

import { ComponentPropsWithoutRef, useRef, useEffect } from 'react'
import IconEdit from '@/assets/icons/ic_edit.svg'
import IconDelete from '@/assets/icons/ic_delete.svg'

type ButtonProps = ComponentPropsWithoutRef<'button'>

const Button = ({ children, className, ...props }: ButtonProps) => (
  <button
    className={`text-lg-16-medium flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-700/50 ${className}`}
    {...props}
  >
    {children}
  </button>
)

interface PopoverMenuProps {
  onClose: () => void
  onEditClick: () => void
  onDeleteClick: () => void
}

export default function PopdoverMenu({
  onClose,
  onEditClick,
  onDeleteClick,
}: PopoverMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [onClose])

  return (
    <div
      ref={menuRef}
      className="bg-black-300 w-32 space-y-2.5 rounded-xl px-2.5 py-3 shadow-lg"
    >
      <Button className="text-white" onClick={onEditClick}>
        <IconEdit className="size-5" />
        <span>수정하기</span>
      </Button>
      <Button className="text-red-500" onClick={onDeleteClick}>
        <IconDelete className="size-5" />
        <span>삭제하기</span>
      </Button>
    </div>
  )
}
