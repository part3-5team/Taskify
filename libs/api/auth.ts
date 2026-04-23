const BASE_URL = 'https://sp-taskify-api.vercel.app/v1'

// 로그인
export const login = async (
  teamId: string,
  email: string,
  password: string,
) => {
  const response = await fetch(`${BASE_URL}/${teamId}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
  const data = await response.json()
  return data
}

// 비밀번호 변경
export const changePassword = async (
  teamId: string,
  password: string,
  newPassword: string,
) => {
  const token = localStorage.getItem('accessToken') // 로그인중인 사용자만 가능하므로 토큰 필요

  const response = await fetch(`${BASE_URL}/${teamId}/auth/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      password: password,
      newPassword: newPassword,
    }),
  })

  if (response.ok) {
    return true
  } else {
    throw new Error('비밀번호 변경 실패')
  }
}
