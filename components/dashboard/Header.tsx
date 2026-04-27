import Setting from '@/assets/icons/ic_setting.svg'
import UserPlus from '@/assets/icons/ic_user_plus.svg'
import Link from 'next/link'
export default function Header() {
  return (
    <div className="bg-bg border-black-300 flex h-18 w-full items-center justify-end border-b-2 p-7.5">
      <div className="text-lg-16-medium flex gap-4 text-gray-400">
        {/* TODO : Link href 수정 */}
        <Link
          href=""
          className="hover:bg-modal active:bg-black-300 flex items-center gap-2 rounded-xs px-3 py-2.5"
        >
          <Setting aria-label="대시보드 관리 아이콘" />
          관리
        </Link>
        <Link
          href=""
          className="hover:bg-modal active:bg-black-300 flex items-center gap-2 rounded-xs px-3 py-2.5"
        >
          <UserPlus aria-label="사용자 초대 아이콘" />
          초대
        </Link>
      </div>
    </div>
  )
}
