'use client'
import { useState } from 'react'
import DropdownButton from './DropdownButton'
import DropdownList from './DropdownList'

export type DropdownUser = {
  id: number
  nickname: string
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
  users = [],
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
    onSelect?.(user)
  }

  return (
    <div className="relative w-full">
      <DropdownButton
        size={size}
        visualState={visualState}
        selectedLabel={selectedUser ? selectedUser.nickname : placeholder}
        onClick={handleToggleDropdown}
      />

      {isDropdownOpen && (
        <DropdownList users={users} onSelect={handleSelectUser} />
      )}
    </div>
  )
}
