import MsgIcon from '@/assets/icons/ic_email.svg'
import FacebookIcon from '@/assets/icons/ic_facebook.svg'
import InstaIcon from '@/assets/icons/ic_instagram.svg'
import LogoImg from '@/assets/imgs/img_Logo.svg'

export default function LandingFooter({ className }: { className?: string }) {
  return (
    <footer className={className}>
      <div className="py-1">
        {/* @TODO 로고로 바꾸기 */}
        <LogoImg className="h-[34px] w-[130px] lg:h-[48px] lg:w-[186px]" />
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:gap-20">
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
    </footer>
  )
}
