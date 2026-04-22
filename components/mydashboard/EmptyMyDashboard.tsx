import PlusCircle from '@/assets/icons/ic_plus_circle.svg'
import IconEmptyDashboard from '@/assets/imgs/img_empty_dashboard.svg'
import Link from 'next/link'

export default function EmptyMyDashboard() {
  return (
    <div className="bg-black-400 text-2lg-18-bold flex flex-col items-center justify-center gap-2.5 rounded-[30px] border-1 border-gray-700 py-10">
      <IconEmptyDashboard className="h-25 w-25" />
      <p className="pb-2.5 text-gray-400">대시보드가 없습니다.</p>
      <Link
        href=""
        className="text-lg-16-semibold hover:bg-black-200 flex h-9 items-center gap-1 rounded-full bg-gray-900 px-4 py-1.5 text-gray-100"
      >
        생성하기
        <PlusCircle />
      </Link>
    </div>
  )
}
