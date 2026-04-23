import { useState } from 'react'
import { validateEmail, validatePassword } from '@/libs/utils/validate'

export default function useLoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const isEmailValid = validateEmail(email)
  const isPasswordValid = validatePassword(password)

  const emailError = emailTouched && !isEmailValid
  const passwordError = passwordTouched && !isPasswordValid

  const isFormValid = isEmailValid && isPasswordValid

  return {
    email,
    password,
    isPasswordVisible,
    setEmail,
    setPassword,
    togglePasswordVisibility: () => setIsPasswordVisible((prev) => !prev),
    handleEmailBlur: () => setEmailTouched(true),
    handlePasswordBlur: () => setPasswordTouched(true),
    emailError: emailError ? '올바른 이메일 형식이 아닙니다.' : '',
    passwordError: passwordError ? '비밀번호는 8자 이상이어야 합니다.' : '',
    isFormValid,
  }
}
