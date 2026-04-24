'use client'

import { ComponentPropsWithoutRef } from 'react'
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

// @TODO: 수정/삭제 로직 완성 후 모달 연동 필요
export default function PopdoverMenu() {
  const handleEditClick = () => console.log('수정 클릭')
  const handleDeleteClick = () => console.log('삭제 클릭')

  return (
    <div className="bg-bg bg-black-300 w-32 space-y-2.5 rounded-xl px-2.5 py-3">
      <Button className="text-white" onClick={handleEditClick}>
        <IconEdit className="size-5" />
        <span>수정하기</span>
      </Button>
      <Button className="text-red-500" onClick={handleDeleteClick}>
        <IconDelete className="size-5" />
        <span>삭제하기</span>
      </Button>
    </div>
  )
}
