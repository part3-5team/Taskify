import Link from 'next/link'
import LogoSvg from '@/assets/imgs/img_Logo.svg'

export default function Logo() {
  return (
    <div className="border-gray-900 px-1 pb-1">
      <Link href="/mydashboard">
        <LogoSvg className="h-15 w-40" />
      </Link>
    </div>
  )
}
