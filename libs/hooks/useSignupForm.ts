import { useState } from 'react'
import {
  validateAgreement,
  validateEmail,
  validateNickname,
  validatePassword,
  validatePasswordCheck,
} from '@/libs/utils/validate'

export default function useSignupForm() {
  const [formValues, setFormValues] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordCheck: '',
  })

  const [touched, setTouched] = useState({
    email: false,
    nickname: false,
    password: false,
    passwordCheck: false,
  })

  const [uiState, setUiState] = useState({
    isPasswordVisible: false,
    isPasswordCheckVisible: false,
    isAgreement: false,
  })

  const { email, nickname, password, passwordCheck } = formValues
  const { isAgreement } = uiState

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const errors = {
    email:
      touched.email && !validateEmail(email)
        ? '올바른 이메일 형식이 아닙니다.'
        : '',
    nickname:
      touched.nickname && !validateNickname(nickname)
        ? '닉네임은 1자 이상이어야 합니다.'
        : '',
    password:
      touched.password && !validatePassword(password)
        ? '비밀번호는 8자 이상이어야 합니다.'
        : '',
    passwordCheck:
      touched.passwordCheck && !validatePasswordCheck(password, passwordCheck)
        ? '비밀번호가 일치하지 않습니다.'
        : '',
  }

  const setEmail = (value: string) =>
    setFormValues((prev) => ({ ...prev, email: value }))
  const setNickname = (value: string) =>
    setFormValues((prev) => ({ ...prev, nickname: value }))
  const setPassword = (value: string) =>
    setFormValues((prev) => ({ ...prev, password: value }))
  const setPasswordCheck = (value: string) =>
    setFormValues((prev) => ({ ...prev, passwordCheck: value }))

  const togglePasswordVisibility = () =>
    setUiState((prev) => ({
      ...prev,
      isPasswordVisible: !prev.isPasswordVisible,
    }))
  const togglePasswordCheckVisibility = () =>
    setUiState((prev) => ({
      ...prev,
      isPasswordCheckVisible: !prev.isPasswordCheckVisible,
    }))
  const toggleAgreement = () =>
    setUiState((prev) => ({ ...prev, isAgreement: !prev.isAgreement }))

  const isFormValid =
    validateEmail(email) &&
    validateNickname(nickname) &&
    validatePassword(password) &&
    validatePasswordCheck(password, passwordCheck) &&
    validateAgreement(isAgreement)

  return {
    ...formValues,
    ...uiState,
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
  }
}
