import IconDown from '@/assets/icons/ic_chevron_down.svg'
import IconUp from '@/assets/icons/ic_chevron_up.svg'
import DefaultProfileImg from '@/assets/imgs/img_default_profile.svg'
import { DropdownUser } from './Dropdown'

type DropdownSize = 'sm' | 'md'
type DropdownState = 'normal' | 'active' | 'complete'

type DropdownButtonProps = {
  size: DropdownSize
  visualState: DropdownState
  selectedLabel: string
  selectedUser?: DropdownUser | null
  showProfileImage?: boolean
  onClick: () => void
}

export default function DropdownButton({
  size = 'md',
  visualState,
  selectedLabel,
  selectedUser,
  showProfileImage = false,
  onClick,
}: DropdownButtonProps) {
  const sizeClass = {
    sm: 'h-11',
    md: 'h-13',
  }

  const stateClass = {
    normal: 'eborder-gray-800 text-gray-400',
    active: 'border-gray-400 text-gray-100',
    complete: 'border-none text-gray-100',
  }

  const dropDownIcon = visualState === 'active' ? <IconUp /> : <IconDown />

  return (
    <div
      className={`bg-black-400 flex items-center justify-between rounded-xl border px-4 ${
        sizeClass[size]
      } ${stateClass[visualState]}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        {showProfileImage &&
          selectedUser &&
          (selectedUser.profileImageUrl ? (
            <img
              src={selectedUser.profileImageUrl}
              alt="프로필"
              className="h-6 w-6 rounded-full object-cover"
            />
          ) : (
            <DefaultProfileImg className="h-6 w-6 rounded-full bg-white object-cover" />
          ))}
        <span>{selectedLabel}</span>
      </div>
      {dropDownIcon}
    </div>
  )
}
