import Link from 'next/link'
import LogoImg from '@/assets/imgs/img_Logo.svg'

export default function AuthLogo() {
  return (
    <div className="mb-7.5 text-center text-white">
      <Link href="/" className="inline-block w-fit">
        <LogoImg className="mx-auto h-19.25 w-75 md:h-21.75 md:w-85" />
      </Link>
    </div>
  )
}
