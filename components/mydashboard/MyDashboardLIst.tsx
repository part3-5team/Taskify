import IconPlusSquare from '@/assets/icons/ic_plus_square.svg'
import IconLeftArrow from '@/assets/icons/ic_chevron_left.svg'
import IconRightArrow from '@/assets/icons/ic_chevorn_right.svg'
import Link from 'next/link'

export default function MyDashboardList() {
  return (
    <div>
      <div className="w-fullw-full mb-5 flex gap-5">
        <Link
          href=""
          className="bg-black-400 text-2lg-18-bold hover:bg-black-300 flex h-20 flex-1 items-center justify-center gap-2.5 rounded-[20px] border-2 border-dashed border-gray-700 px-5"
        >
          새로운 대시보드
          <IconPlusSquare className="text-gray-700" />
        </Link>
        <Link
          href=""
          className="bg-black-300 text-2lg-18-bold hover:bg-black-200 flex h-20 flex-1 items-center justify-between gap-2.5 rounded-[20px] border-1 border-gray-700 px-5"
        >
          포트폴리오1
          <IconRightArrow className="h-6 w-6 text-gray-400" />
        </Link>
        <Link
          href=""
          className="bg-black-300 text-2lg-18-bold hover:bg-black-200 flex h-20 flex-1 items-center justify-between gap-2.5 rounded-[20px] border-1 border-gray-700 px-5"
        >
          포트폴리오2
          <IconRightArrow className="h-6 w-6 text-gray-400" />
        </Link>
        <Link
          href=""
          className="bg-black-300 text-2lg-18-bold hover:bg-black-200 flex h-20 flex-1 items-center justify-between gap-2.5 rounded-[20px] border-1 border-gray-700 px-5"
        >
          포트폴리오3
          <IconRightArrow className="h-6 w-6 text-gray-400" />
        </Link>
      </div>
      <div className="text-lg-16-semibold flex items-center justify-end gap-5 px-5">
        1 of 3
        <button className="hover:bg-black-300 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md">
          <IconLeftArrow className="h-6 w-6 text-gray-500" />
        </button>
        <button className="hover:bg-black-300 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md">
          <IconRightArrow className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}
