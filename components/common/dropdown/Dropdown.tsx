'use client'
import { useState } from 'react'
import DropdownButton from './DropdownButton'
import DropdownList from './DropdownList'

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
  users: DropdownUser[]
  defaultUser?: DropdownUser | null
  onSelect?: (user: DropdownUser) => void
  placeholder?: string
  showProfileImage?: boolean
}

export default function DropdownMenu({
  size = 'md',
  users,
  defaultUser = null,
  onSelect,
  placeholder = '선택',
  showProfileImage = false,
}: DropdownMenuProps) {
  const [selectedUser, setSelectedUser] = useState<DropdownUser | null>(
    defaultUser,
  )
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
        selectedUser={selectedUser}
        showProfileImage={showProfileImage}
        onClick={handleToggleDropdown}
      />

      {isDropdownOpen && (
        <DropdownList
          users={users}
          onSelect={handleSelectUser}
          showProfileImage={showProfileImage}
        />
      )}
    </div>
  )
}
