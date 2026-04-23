import Link from 'next/link'

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
    <div className={className}>
      <div className="flex flex-col items-center gap-5 text-center">
        <h2 className="text-2xl-24-bold text-gray-100">더 새로워진 일정관리</h2>
        <h1 className="text-3xl-32-bold text-brand-400">TASKIFY</h1>
      </div>

      <div className="mx-auto flex max-w-[315px] gap-3">
        {BUTTON_CONFIG.map(({ href, text, className }) => (
          <Link
            key={href}
            href={href}
            className={`${className} ${BASE_LINK_BUTTON_STYLE}`}
          >
            {text}
          </Link>
        ))}
      </div>
    </div>
  )
}
