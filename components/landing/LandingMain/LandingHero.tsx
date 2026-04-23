import Link from 'next/link'
import Image from 'next/image'
import ImgHeroMd from '@/assets/imgs/img_hero_md.png'
import ImgHeroLg from '@/assets/imgs/img_hero_lg.png'

const BASE_LINK_BUTTON_STYLE =
  'inline-block text-gray-100 text-lg-16-semibold w-full text-center py-5 rounded-[100px]'

const BUTTON_CONFIG = [
  {
    href: '/signup',
    text: '회원가입하기',
    className: `bg-gray-900`,
  },
  {
    href: '/login',
    text: '로그인하기',
    className: `bg-brand-500`,
  },
]

export default function LandingHero({ className }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center gap-10 lg:flex-row ${className}`}
    >
      <div className="flex w-full flex-1 flex-col items-center space-y-10 lg:w-auto lg:flex-none lg:items-start lg:space-y-15 lg:pl-20">
        <div className="flex flex-col gap-2 text-center lg:gap-5 lg:text-left">
          <h2 className="text-2xl-24-bold tracking-tight whitespace-nowrap text-gray-100 lg:text-[40px] lg:leading-[1.1] xl:text-[60px]">
            더 새로워진 일정관리
          </h2>
          <h1 className="text-3xl-32-bold text-brand-400 tracking-tighter lg:text-[64px] lg:leading-[1.1] xl:text-[84px]">
            TASKIFY
          </h1>
        </div>

        <div className="flex w-full max-w-[315px] flex-row gap-3 md:flex-col lg:max-w-none lg:flex-row">
          {BUTTON_CONFIG.map(({ href, text, className }) => (
            <Link
              key={href}
              href={href}
              className={`${className} ${BASE_LINK_BUTTON_STYLE} lg:flex-1`}
            >
              {text}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 shrink items-end justify-center">
        <div className="hidden md:block lg:hidden">
          <Image src={ImgHeroMd} alt="hero-img" priority />
        </div>
        <div className="hidden lg:block">
          <Image src={ImgHeroLg} alt="hero-img" priority />
        </div>
      </div>
    </div>
  )
}
