'use client'

import { useState } from 'react'
import Button from '@/components/common/button'
import Input from '@/components/common/input'
import OpenEyeIcon from '@/assets/icons/ic_visibility_on.svg'
import CloseEyeIcon from '@/assets/icons/ic_visibility_off.svg'

export default function SignupForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isPasswordCheckVisible, setIsPasswordCheckVisible] = useState(false)
  const PasswordIcon = isPasswordVisible ? OpenEyeIcon : CloseEyeIcon
  const PasswordCheckIcon = isPasswordCheckVisible ? OpenEyeIcon : CloseEyeIcon

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev)
  }

  const togglePasswordCheckVisibility = () => {
    setIsPasswordCheckVisible((prev) => !prev)
  }

  return (
    <form action="" className="text-white">
      <div className="mb-7.5 flex w-full flex-col gap-3">
        <label htmlFor="email">이메일</label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          className="py-3.5"
        />
      </div>
      <div className="mb-7.5 flex w-full flex-col gap-3">
        <label htmlFor="nickname">닉네임</label>
        <Input
          type="nickname"
          id="nickname"
          name="nickname"
          placeholder="닉네임을 입력해주세요"
          className="py-3.5"
        />
      </div>
      <div className="mb-7.5 flex w-full flex-col gap-3">
        <label htmlFor="password">비밀번호</label>
        <Input
          type={isPasswordVisible ? 'text' : 'password'}
          id="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          className="py-3.5"
        >
          <button
            type="button"
            onClick={togglePasswordVisibility}
            aria-label={isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
            className="flex items-center"
          >
            <PasswordIcon className="size-6" />
          </button>
        </Input>
      </div>

      <div className="mb-7.5 flex w-full flex-col gap-3">
        <label htmlFor="passwordCheck">비밀번호 확인</label>
        <Input
          type={isPasswordCheckVisible ? 'text' : 'password'}
          id="passwordCheck"
          name="passwordCheck"
          placeholder="비밀번호를 한 번 더입력해주세요"
          className="py-3.5"
        >
          <button
            type="button"
            onClick={togglePasswordCheckVisibility}
            aria-label={
              isPasswordCheckVisible ? '비밀번호 숨기기' : '비밀번호 보기'
            }
            className="flex items-center"
          >
            <PasswordCheckIcon className="size-6" />
          </button>
        </Input>
      </div>

      <div>
        <Button className="w-full">회원가입</Button>
      </div>
    </form>
  )
}
