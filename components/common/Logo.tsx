import Link from 'next/link'
import LogoSvg from '@/assets/imgs/img_Logo.svg'

export default function Logo() {
  return (
    <div className="px-1 pb-1 border-gray-900">
      <Link href="/mydashboard">
        <LogoSvg className="w-40 h-15" />
      </Link>
    </div>
  )
}
