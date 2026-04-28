'use client'
import PlusCircle from '@/assets/icons/ic_plus_circle.svg'
import IconEmptyDashboard from '@/assets/imgs/img_empty_dashboard.svg'
import { useState } from 'react'
import CreateModal from './CreateModal'

export default function EmptyMyDashboard() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className="bg-black-400 text-2lg-18-bold flex flex-col items-center justify-center gap-2.5 rounded-[30px] border border-gray-700 py-10">
        <IconEmptyDashboard className="h-25 w-25" />
        <p className="pb-2.5 text-gray-400">대시보드가 없습니다.</p>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="text-lg-16-semibold hover:bg-black-200 flex h-9 cursor-pointer items-center gap-1 rounded-full bg-gray-900 px-4 py-1.5 text-gray-100"
        >
          생성하기
          <PlusCircle />
        </button>
        {isOpen && <CreateModal onClose={() => setIsOpen(false)} />}
      </div>
    </>
  )
}
