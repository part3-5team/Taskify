type AvatarBadgeSize = 'sm' | 'md' | 'lg'
type AvatarBadgeColor =
  | 'green'
  | 'violet'
  | 'cyan'
  | 'rose'
  | 'blue'
  | 'yellow'
  | 'orange'

type AvatarBadgeProps = {
  name: string
  size?: AvatarBadgeSize
  color?: AvatarBadgeColor
}

const sizeClass = {
  sm: 'h-5 w-5 text-[8px]',
  md: 'h-6 w-6 text-[10px]',
  lg: 'h-9 w-9 text-xs-12-semibold',
}

const colorClass = {
  green: 'bg-profile-green',
  violet: 'bg-profile-violet',
  cyan: 'bg-profile-cyan',
  rose: 'bg-profile-rose',
  blue: 'bg-profile-blue',
  yellow: 'bg-profile-yellow',
  orange: 'bg-profile-orange',
}

export default function AvatarBadge({
  size = 'lg',
  color = 'green',
}: AvatarBadgeProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-full text-gray-100 ${sizeClass[size]} ${colorClass[color]}`}
    >
      이름
    </div>
  )
}
