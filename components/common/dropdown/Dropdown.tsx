'use client'
import { useState } from 'react'
import DropdownButton from './DropdownButton'
import DropdownList from './DropdownList'

const mockUsers = [
  { id: 1, name: '박민영' },
  { id: 2, name: '김정은' },
  { id: 3, name: '이연정' },
  { id: 4, name: '심우연' },
  { id: 5, name: '강수지' },
  { id: 6, name: '박민영' },
  { id: 7, name: '김정은' },
  { id: 8, name: '이연정' },
  { id: 9, name: '심우연' },
  { id: 10, name: '강수지' },
]

export type DropdownUser = {
  id: number
  name?: string
  nickname?: string
  profileImageUrl?: string | null
}

type DropdownSize = 'sm' | 'md'
type DropdownState = 'normal' | 'active' | 'complete'

type DropdownMenuProps = {
  size?: DropdownSize
  users?: DropdownUser[]
  onSelect?: (user: DropdownUser) => void
  placeholder?: string
}

export default function DropdownMenu({
  size = 'md',
  users = mockUsers,
  onSelect,
  placeholder = '담당자 선택',
}: DropdownMenuProps) {
  const [selectedUser, setSelectedUser] = useState<DropdownUser | null>(null)
  const [isDropdownOpen, setIsDropDownOpen] = useState(false)

  const visualState: DropdownState = isDropdownOpen
    ? 'active'
    : selectedUser
      ? 'complete'
      : 'normal'

  const handleToggleDropdown = () => {
    setIsDropDownOpen((prev) => !prev)
  }

  const handleSelectUser = (user: DropdownUser) => {
    setSelectedUser(user)
    setIsDropDownOpen(false)
    if (onSelect) {
      onSelect(user)
    }
  }

  // 화면에 표시할 이름 (nickname 또는 name)
  const displayLabel = selectedUser
    ? selectedUser.nickname || selectedUser.name
    : placeholder

  return (
    <div className="relative w-full">
      <DropdownButton
        size={size}
        visualState={visualState}
        selectedLabel={displayLabel || placeholder}
        onClick={handleToggleDropdown}
      />

      {isDropdownOpen && (
        <DropdownList users={users} onSelect={handleSelectUser} />
      )}
    </div>
  )
}
