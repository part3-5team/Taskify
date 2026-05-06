import Image from 'next/image'
import type { DropdownUser } from './Dropdown'
import DefaultProfileImg from '@/assets/imgs/img_default_profile.svg'

type DropdownListProps = {
  users: DropdownUser[]
  onSelect: (user: DropdownUser) => void
  showProfileImage?: boolean
}

export default function DropdownList({
  users,
  onSelect,
  showProfileImage = false,
}: DropdownListProps) {
  return (
    <div className="bg-modal absolute top-full left-0 z-50 mt-2 max-h-[200px] w-full overflow-y-auto rounded-xl border border-gray-700 py-2 shadow-lg">
      {users.map((user) => {
        const label = user.nickname || user.name || ''

        return (
          <button
            key={user.id}
            type="button"
            onClick={() => onSelect(user)}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-100 hover:bg-gray-700"
          >
            {showProfileImage &&
              (user.profileImageUrl ? (
                <Image
                  src={user.profileImageUrl}
                  alt={`${label} 프로필`}
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded-full object-cover"
                />
              ) : (
                <DefaultProfileImg className="h-6 w-6 rounded-full bg-white object-cover" />
              ))}
            <span>{label}</span>
          </button>
        )
      })}
    </div>
  )
}
