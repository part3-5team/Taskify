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

type User = {
  id: number
  name: string
}

type DropdownSize = 'sm' | 'md'
type DropdownState = 'normal' | 'active' | 'complete'

type DropdownMenuProps = {
  size?: DropdownSize
}

export default function DropdownMenu({ size = 'md' }: DropdownMenuProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDropdownOpen, setIsDropDownOpen] = useState(false)

  const visualState: DropdownState = isDropdownOpen
    ? 'active'
    : selectedUser
      ? 'complete'
      : 'normal'

  const handleToggleDropdown = () => {
    setIsDropDownOpen((prev) => !prev)
  }

  const handleSelectUser = (user: User) => {
    setSelectedUser(user)
    setIsDropDownOpen(false)
  }

  return (
    <div className="relative w-full">
      <DropdownButton
        size={size}
        visualState={visualState}
        selectedLabel={selectedUser ? selectedUser.name : '담당자 선택'}
        onClick={handleToggleDropdown}
      />

      {isDropdownOpen && (
        <DropdownList users={mockUsers} onSelect={handleSelectUser} />
      )}
    </div>
  )
}
