import SettingIcon from '@/assets/icons/ic_setting.svg'

export default function ProfileImageSection() {
  return (
    <div className="border-t border-gray-900 px-5 py-4 flex items-center gap-3">
      {/* 임시 프로필 이미지 */}
      <div className="w-8 h-8 rounded-full bg-gray-700 shrink-0" />
      <span className="flex-1 text-md-14-medium text-gray-100">
        프로필 이름
      </span>
      {/* 설정 아이콘 */}
      <button
        type="button"
        aria-label="설정"
        className="flex items-center justify-center text-gray-400 hover:text-gray-100 bg-transparent border-none cursor-pointer shrink-0"
      >
        <SettingIcon className="w-5 h-5" />
      </button>
    </div>
  )
}
