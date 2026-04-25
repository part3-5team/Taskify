'use client';

import SettingIcon from '@/assets/icons/ic_setting.svg'
import { useState } from 'react'
import ProfileEditModal from '../auth/AuthModal/MyPage/profileEditModal';

export default function SidebarFooter() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-3 border-t border-gray-900 px-5 py-4">
      {/* 임시 프로필 이미지 */}
      <div className="h-8 w-8 shrink-0 rounded-full bg-gray-700" />
      <span className="text-md-14-medium flex-1 text-gray-100">
        프로필 이름
      </span>
      {/* 설정 아이콘 */}
      <button
        type="button"
        aria-label="설정"
        onClick={() => setOpen(true)}
        className="flex shrink-0 cursor-pointer items-center justify-center border-none bg-transparent text-gray-400 hover:text-gray-100"
      >
        <SettingIcon className="h-5 w-5" />
      </button>

      <ProfileEditModal
        isOpen={open}
        onClose={() => setOpen(false)}
        user={{
          email: 'test@naver.com',
          nickname: '테스트',
          imageUrl: '',
        }}
      />
    </div>
  )
}
