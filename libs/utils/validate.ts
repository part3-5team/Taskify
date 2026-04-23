export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const validateNickname = (nickname: string) => nickname.length > 0

export const validatePassword = (password: string) => password.length >= 8

export const validatePasswordCheck = (
  password: string,
  passwordCheck: string,
) => password === passwordCheck

export const validateAgreement = (agreement: boolean) => agreement
