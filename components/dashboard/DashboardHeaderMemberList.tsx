'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getDashboardMembers } from '@/libs/api/dashboard/getDashboardMembers'
import DefaultProfileImg from '@/assets/imgs/img_default_profile.svg'
import type { Member } from '@/libs/types/Dashboard'

interface DashboardHeaderMemberListProps {
  dashboardId: number
}

export default function DashboardHeaderMemberList({
  dashboardId,
}: DashboardHeaderMemberListProps) {
  const [members, setMembers] = useState<Member[]>([])

  useEffect(() => {
    let isCancelled = false

    const fetch = async () => {
      const res = await getDashboardMembers({ dashboardId, size: 6 })
      if (isCancelled) return

      if (res.success && res.data) {
        setMembers(res.data.members)
      }
    }

    fetch()
    return () => {
      isCancelled = true
    }
  }, [dashboardId])

  return (
    <div className="flex items-center text-white">
      {members.map((member) => (
        <div
          key={member.id}
          className="relative -ml-4 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white"
        >
          {member.profileImageUrl ? (
            <Image
              src={member.profileImageUrl}
              alt={`${member.nickname ?? 'member'} profile`}
              fill
              sizes="32px"
              className="object-cover"
              unoptimized
            />
          ) : (
            <DefaultProfileImg className="absolute inset-0 h-full w-full text-black" />
          )}
        </div>
      ))}
    </div>
  )
}
