import PlusIcon from '@/assets/icons/ic_plus.svg'

export default function DashboardSelector() {
  return (
    <div className="flex items-center justify-between px-6 pb-1">
      <span className="text-sm-13-semibold text-gray-400">
        대시보드 추가
      </span>
      <button
        type="button"
        aria-label="대시보드 추가"
        className="flex items-center justify-center text-gray-400 hover:text-gray-100 bg-transparent border-none cursor-pointer"
      >
        <PlusIcon className="w-5 h-5 text-gray-400" />
      </button>
    </div>
  )
}
