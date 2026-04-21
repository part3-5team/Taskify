import MsgIcon from '@/assets/icons/ic_email.svg'
import FacebookIcon from '@/assets/icons/ic_facebook.svg'
import InstaIcon from '@/assets/icons/ic_instagram.svg'

export default function LandingFooter() {
  return (
    <div className="bg-bg space-y-5 px-7.5 py-3.5">
      <div className="py-1">
        {/* @TODO 로고로 바꾸기 */}
        <span className="text-white">로고</span>
      </div>

      <div className="space-x-8 text-gray-400">
        <span>Privacy</span>
        <span>FAQ</span>
      </div>

      <div className="flex gap-3.5 text-gray-400">
        <MsgIcon className="size-5" />
        <FacebookIcon className="size-5" />
        <InstaIcon className="size-5" />
      </div>
    </div>
  )
}
