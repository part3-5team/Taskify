'use client'

import Input from '@/components/common/input'
import Button from '@/components/common/button'
import useLoginForm from '@/hooks/useLoginForm'

export default function LoginForm() {
  const {
    email,
    password,
    setEmail,
    setPassword,
    handleEmailBlur,
    handlePasswordBlur,
    emailError,
    passwordError,
    isFormValid,
  } = useLoginForm()

  return (
    <form action="" className="text-white" onSubmit={(e) => e.preventDefault()}>
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
          className="py-2.5"
        />
      </div>

      <div className="mb-7.5 flex w-full flex-col gap-3">
        <label htmlFor="password">비밀번호</label>
        <Input
          type="password"
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
          className="py-2.5"
        />
      </div>

      <div>
        <Button className="w-full" disabled={!isFormValid}>
          로그인
        </Button>
      </div>
    </form>
  )
}
