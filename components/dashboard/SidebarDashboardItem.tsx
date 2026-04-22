import Link from 'next/link'
import HashIcon from '@/assets/icons/ic_hash.svg'

interface SidebarDashboardItemProps {
  label: string
  href: string
}

export default function SidebarDashboardItem({
  label,
  href,
}: SidebarDashboardItemProps) {
  return (
    <li className="mb-1">
      <Link
        href={href}
        className="text-md-14-medium hover:bg-black-300 flex items-center gap-2 px-6 py-2.5 text-gray-100 no-underline hover:text-gray-100"
      >
        <HashIcon className="h-5 w-5 shrink-0" />
        {label}
      </Link>
    </li>
  )
}
