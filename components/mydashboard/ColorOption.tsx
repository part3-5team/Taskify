'use client'

export type ColorType = 'rose' | 'orange' | 'yellow' | 'green' | 'blue'

interface ColorOptionProps {
  color: ColorType
  selected?: boolean
  onClick?: () => void
}

export const colorHex: Record<ColorType, string> = {
  rose: '#AE2E24',
  orange: '#9F4B00',
  yellow: '#BD8C00',
  green: '#206E4E',
  blue: '#1458BC',
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
      style={{ backgroundColor: colorHex[color] }}
      className={`h-12 w-full cursor-pointer rounded-xl ${selected ? 'ring-offset-black-400 ring-3 ring-blue-200 ring-offset-2' : ''} `}
    />
  )
}
