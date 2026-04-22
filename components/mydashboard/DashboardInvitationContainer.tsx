'use client'
import Input from '@/components/common/input'
import EmptyInvitation from '@/components/mydashboard/EmptyInvitation'
import IconSearch from '@/assets/icons/ic_search.svg'
import DashboardInvitationList from '@/components/mydashboard/DashboardInvitationList'
import { useState } from 'react'

export default function DashboardInvitationContainer() {
  const [keyword, setKeyword] = useState('')
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
      {/* <EmptyInvitation /> */}
      <DashboardInvitationList />
    </div>
  )
}
