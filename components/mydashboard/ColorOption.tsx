'use client'

export type ColorType = 'rose' | 'orange' | 'yellow' | 'green' | 'blue'

interface ColorOptionProps {
  color: ColorType
  selected?: boolean
  onClick?: () => void
}

const colorStyle: Record<ColorType, string> = {
  rose: 'bg-profile-rose',
  orange: 'bg-profile-orange',
  yellow: 'bg-profile-yellow',
  green: 'bg-profile-green',
  blue: 'bg-profile-blue',
}

export default function ColorOption({
  color,
  selected = false,
  onClick,
}: ColorOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`h-12 w-full cursor-pointer rounded-xl ${colorStyle[color]} ${selected ? 'ring-offset-black-400 ring-3 ring-blue-200 ring-offset-2' : ''} `}
    />
  )
}
