'use client'

import SettingIcon from '@/assets/icons/ic_setting.svg'
import { useEffect, useState } from 'react'
import ProfileEditModal from '../auth/AuthModal/MyPage/profileEditModal'
import { getMyInfo } from '@/libs/api/user'

interface User {
  email: string
  nickname: string
  profileImageUrl?: string
}

export default function SidebarFooter() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const data = await getMyInfo()
        setUser(data)
      } catch (error) {
        console.error('내 정보 조회 실패', error)
      }
    }

    fetchMyInfo()
  }, [])

  return (
    <div className="flex items-center gap-3 border-t border-gray-900 px-5 py-4">
      <button className="cursor-pointer" onClick={() => setOpen(true)}>
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="profile"
            className="h-8 w-8 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="bg-brand-300 text-md-14-medium flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white">
            {user?.nickname.slice(0, 1) || '?'}
          </div>
        )}
      </button>

      <span className="text-md-14-medium flex-1 text-gray-100">
        {user?.nickname || '프로필 이름'}
      </span>

      <button
        type="button"
        aria-label="설정"
        onClick={() => setOpen(true)}
        className="flex shrink-0 cursor-pointer items-center justify-center border-none bg-transparent text-gray-400 hover:text-gray-100"
      >
        <SettingIcon className="h-5 w-5" />
      </button>

      {user && (
        <ProfileEditModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onUpdateUser={(updatedUser) => setUser(updatedUser)}
          user={{
            email: user.email || '',
            nickname: user.nickname || '',
            imageUrl: user.profileImageUrl || '',
          }}
        />
      )}
    </div>
  )
}
