import IconDown from '@/assets/icons/ic_chevron_down.svg'
import IconUp from '@/assets/icons/ic_chevron_up.svg'

type DropdownSize = 'sm' | 'md'
type DropdownState = 'normal' | 'active' | 'complete'

type DropdownButtonProps = {
  size?: DropdownSize
  visualState: DropdownState
  selectedLabel: string
  onClick: () => void
}

export default function DropdownButton({
  size = 'md',
  visualState,
  selectedLabel,
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
      <span>{selectedLabel}</span>
      {dropDownIcon}
    </div>
  )
}
