'use client'

import { useActionState, useState } from 'react'
import { login } from '@/libs/api/auth'
import OpenEyeIcon from '@/assets/icons/ic_visibility_on.svg'
import CloseEyeIcon from '@/assets/icons/ic_visibility_off.svg'
import { AuthState } from '@/libs/types/Auth'
import useLoginForm from '@/libs/hooks/useLoginForm'
import Input from '@/components/common/input'
import Button from '@/components/common/button'
import AuthModal from '../AuthModal'

const initialState: AuthState = {
  success: true,
  message: '',
}

export default function LoginForm() {
  const {
    email,
    password,
    isPasswordVisible,
    setEmail,
    setPassword,
    togglePasswordVisibility,
    handleEmailBlur,
    handlePasswordBlur,
    emailError,
    passwordError,
    isFormValid,
  } = useLoginForm()

  const PasswordIcon = isPasswordVisible ? OpenEyeIcon : CloseEyeIcon

  const [state, formAction, isPending] = useActionState(login, initialState)
  const [dismissedState, setDismissedState] = useState<AuthState | null>(null)
  const shouldShowErrorModal =
    !!state?.message && !state.success && state !== dismissedState

  const handleModalClose = () => {
    setDismissedState(state)
  }

  return (
    <form action={formAction} className="text-white">
      <div className="mb-7.5 flex w-full flex-col gap-3">
        <label htmlFor="email">이메일</label>
        <Input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailBlur}
          placeholder="이메일을 입력해주세요"
          state={
            emailError ? 'error' : email.length > 0 ? 'completed' : 'default'
          }
          errorMessage={emailError}
          className="py-3.5"
        />
      </div>

      <div className="mb-7.5 flex w-full flex-col gap-3">
        <label htmlFor="password">비밀번호</label>
        <Input
          type={isPasswordVisible ? 'text' : 'password'}
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handlePasswordBlur}
          placeholder="비밀번호를 입력해주세요"
          state={
            passwordError
              ? 'error'
              : password.length > 0
                ? 'completed'
                : 'default'
          }
          errorMessage={passwordError}
          className="py-3.5"
        >
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="flex items-center"
          >
            <PasswordIcon className="size-6" />
          </button>
        </Input>
      </div>

      <div>
        <Button className="w-full" disabled={!isFormValid || isPending}>
          로그인
        </Button>
      </div>

      {shouldShowErrorModal && (
        <AuthModal state={state} onClick={handleModalClose} />
      )}
    </form>
  )
}
