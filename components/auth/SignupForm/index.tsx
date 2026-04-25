'use client'

import Button from '@/components/common/button'
import Input from '@/components/common/input'
import OpenEyeIcon from '@/assets/icons/ic_visibility_on.svg'
import CloseEyeIcon from '@/assets/icons/ic_visibility_off.svg'
import CheckBoxIcon from '@/assets/icons/ic_check_on.svg'
import UnCheckBoxIcon from '@/assets/icons/ic_check_off.svg'
import useSignupForm from '@/libs/hooks/useSignupForm'

export default function SignupForm() {
  const {
    email,
    nickname,
    password,
    passwordCheck,
    isPasswordVisible,
    isPasswordCheckVisible,
    isAgreement,
    setEmail,
    setNickname,
    setPassword,
    setPasswordCheck,
    togglePasswordVisibility,
    togglePasswordCheckVisibility,
    toggleAgreement,
    handleBlur,
    errors,
    isFormValid,
  } = useSignupForm()

  const PasswordIcon = isPasswordVisible ? OpenEyeIcon : CloseEyeIcon
  const PasswordCheckIcon = isPasswordCheckVisible ? OpenEyeIcon : CloseEyeIcon
  const AgreementCheckIcon = isAgreement ? CheckBoxIcon : UnCheckBoxIcon

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
          onBlur={() => handleBlur('email')}
          state={
            errors.email ? 'error' : email.length > 0 ? 'completed' : 'default'
          }
          errorMessage={errors.email}
          placeholder="이메일을 입력해주세요"
          className="py-3.5"
        />
      </div>

      <div className="mb-7.5 flex w-full flex-col gap-3">
        <label htmlFor="nickname">닉네임</label>
        <Input
          type="text"
          id="nickname"
          name="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onBlur={() => handleBlur('nickname')}
          state={
            errors.nickname
              ? 'error'
              : nickname.length > 0
                ? 'completed'
                : 'default'
          }
          errorMessage={errors.nickname}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => handleBlur('password')}
          state={
            errors.password
              ? 'error'
              : password.length > 0
                ? 'completed'
                : 'default'
          }
          errorMessage={errors.password}
          placeholder="비밀번호를 입력해주세요"
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

      <div className="mb-4 flex w-full flex-col gap-3">
        <label htmlFor="passwordCheck">비밀번호 확인</label>
        <Input
          type={isPasswordCheckVisible ? 'text' : 'password'}
          id="passwordCheck"
          name="passwordCheck"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
          onBlur={() => handleBlur('passwordCheck')}
          state={
            errors.passwordCheck
              ? 'error'
              : passwordCheck.length > 0
                ? 'completed'
                : 'default'
          }
          errorMessage={errors.passwordCheck}
          placeholder="비밀번호를 한 번 더 입력해주세요"
          className="py-3.5"
        >
          <button
            type="button"
            onClick={togglePasswordCheckVisibility}
            className="flex items-center"
          >
            <PasswordCheckIcon className="size-6" />
          </button>
        </Input>
      </div>

      <div
        className="mb-7.5 flex cursor-pointer items-center gap-2"
        onClick={toggleAgreement}
      >
        <AgreementCheckIcon className="size-6" />
        <p className="select-none">이용 약관에 동의합니다.</p>
      </div>

      <div>
        <Button className="w-full" disabled={!isFormValid}>
          회원가입
        </Button>
      </div>
    </form>
  )
}
