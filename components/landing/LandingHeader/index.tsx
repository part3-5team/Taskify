'use client'

import Link from 'next/link'
import scrollToTop from '@/libs/utils/scrollToTop'
import LogoImg from '@/assets/imgs/img_Logo.svg'

const LINK_CONFIG = [
  {
    href: '/login',
    text: '로그인',
  },
  {
    href: '/signup',
    text: '회원가입',
  },
]

const AuthLinks = ({ href, text }: { href: string; text: string }) => (
  <>
    <Link href={href} className="inline-block px-3 py-2.5">
      {text}
    </Link>
  </>
)

export default function LandingHeader({ className }: { className?: string }) {
  return (
    <header
      className={`bg-bg border-black-300 sticky top-0 z-50 border-b-2 ${className}`}
    >
      <button onClick={scrollToTop} className="cursor-pointer text-white">
        <LogoImg className="h-9 w-35 md:h-12 md:w-46" />
      </button>
      <div className="text-lg-16-medium space-x-3 text-gray-300">
        {LINK_CONFIG.map(({ href, text }) => (
          <AuthLinks key={href} href={href} text={text} />
        ))}
      </div>
    </header>
  )
}
