import Logo from '@/components/common/Logo'
import PlusIcon from '@/assets/icons/ic_plus.svg'

export default function SidebarHeader() {
  return (
    <>
      <Logo />
      <div className="flex items-center justify-between px-6 pb-1">
        <span className="text-sm-13-semibold text-gray-400">대시보드 추가</span>
        <button
          type="button"
          aria-label="대시보드 추가"
          className="flex cursor-pointer items-center justify-center border-none bg-transparent text-gray-400 hover:text-gray-100"
        >
          <PlusIcon className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </>
  )
}
