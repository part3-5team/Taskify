type User = {
  id: number
  name: string
}

type DropdownListProps = {
  users: User[]
  onSelect: (user: User) => void
}

export default function DropdownList({ users, onSelect }: DropdownListProps) {
  return (
    <div className="bg-black-400 absolute top-[calc(100%+4px)] z-10 max-h-44 w-full overflow-y-auto rounded-xl border border-gray-400 py-1.5 text-gray-200">
      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => onSelect(user)}
          className="flex h-10 cursor-pointer items-center px-4 hover:bg-gray-700"
        >
          {user.name}
        </div>
      ))}
    </div>
  )
}
