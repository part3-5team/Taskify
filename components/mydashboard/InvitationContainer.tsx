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

  const searchKeyword = keyword.trim().toLowerCase()

  const filteredInvitations = invitations.filter((invitations) => {
    return invitations.dashboard.title.toLowerCase().includes(searchKeyword)
  })

  const hasInvitation = invitations.length > 0
  const hasSearchResult = filteredInvitations.length > 0
  const isSearching = searchKeyword.length > 0

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

      {!hasInvitation && <EmptyInvitation />}

      {hasInvitation && hasSearchResult && (
        <InvitationList invitations={filteredInvitations} />
      )}

      {hasInvitation && !hasSearchResult && isSearching && (
        <div className="flex items-center justify-center py-10 text-gray-400">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  )
}
