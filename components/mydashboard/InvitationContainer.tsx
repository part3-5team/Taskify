'use client'
import Input from '@/components/common/input'
import EmptyInvitation from '@/components/mydashboard/EmptyInvitation'
import IconSearch from '@/assets/icons/ic_search.svg'
import InvitationList from '@/components/mydashboard/InvitationList'
import { useState } from 'react'
import { Invitation } from '@/libs/types/Dashboard'

type InvitationContainerProps = {
  invitations: Invitation[]
}

export default function InvitationContainer({
  invitations,
}: InvitationContainerProps) {
  const [keyword, setKeyword] = useState('')

  const hasInvitation = invitations.length > 0

  return (
    <div className="flex flex-col gap-5 px-12 pb-12">
      <div className="flex justify-between">
        <h2 className="text-xl-20-bold py-2">초대받은 대시보드</h2>
        <Input
          type="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="검색"
          childrenPosition="left"
          className="h-13"
        >
          <IconSearch />
        </Input>
      </div>
      {hasInvitation ? (
        <InvitationList invitations={invitations} />
      ) : (
        <EmptyInvitation />
      )}
    </div>
  )
}
