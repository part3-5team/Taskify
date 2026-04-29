import IconHash from '@/assets/icons/ic_hash.svg'
import IconCrown from '@/assets/icons/ic_crown.svg'
import IconRightArrow from '@/assets/icons/ic_chevorn_right.svg'
import Link from 'next/link'
import { Dashboard } from '@/libs/types/Dashboard'

export default function DashboardCard({ dashboard }: { dashboard: Dashboard }) {
  return (
    <Link
      key={dashboard.id}
      href={`/dashboard/${dashboard.id}`}
      className="bg-black-300 text-2lg-18-bold hover:bg-black-200 box-border flex h-20 items-center justify-between gap-2.5 overflow-hidden rounded-[20px] border border-gray-700 px-5"
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <IconHash
          style={{ color: dashboard.color }}
          className="h-5 w-5 shrink-0"
        />
        <span className="wrap-break-words line-clamp-2 min-w-0 flex-1 leading-tight">
          {dashboard.title}
        </span>
        {dashboard.createdByMe && (
          <IconCrown className="text-brand-600 shrink-0" />
        )}
      </div>

      <IconRightArrow className="h-6 w-6 shrink-0 text-gray-400" />
    </Link>
  )
}
