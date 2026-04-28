import Link from 'next/link'
import HashIcon from '@/assets/icons/ic_hash.svg'

interface SidebarDashboardItemProps {
  label: string
  href: string
  color?: string
}

export default function SidebarDashboardItem({
  label,
  href,
  color,
}: SidebarDashboardItemProps) {
  return (
    <li className="mb-1">
      <Link
        href={href}
        className="text-md-14-medium hover:bg-black-300 flex items-center gap-2 px-6 py-2.5 text-gray-100 no-underline hover:text-gray-100"
      >
        {/* 대시보드 색상으로 # 아이콘 색상 변경 */}
        <HashIcon
          className="h-5 w-5 shrink-0"
          style={{ color: color ?? 'currentColor' }}
        />
        {label}
      </Link>
    </li>
  )
}
