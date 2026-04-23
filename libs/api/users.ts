const BASE_URL = 'https://sp-taskify-api.vercel.app/v1'

export const usersApi = {
  // 1. 회원가입 (POST)
  signUp: async (
    teamId: string,
    email: string,
    nickname: string,
    password: string,
  ) => {
    const response = await fetch(`${BASE_URL}/${teamId}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, nickname, password }),
    })
    return response.json()
  },

  // 2. 내 정보 조회 (GET)
  getMyInfo: async (teamId: string) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const response = await fetch(`${BASE_URL}/${teamId}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.json()
  },

  // 3. 내 정보 수정 (PUT)
  updateMyInfo: async (
    teamId: string,
    nickname: string,
    profileImageUrl?: string,
  ) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const response = await fetch(`${BASE_URL}/${teamId}/users/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nickname, profileImageUrl }),
    })
    return response.json()
  },

  // 4. 프로필 이미지 업로드 (POST)
  uploadProfileImage: async (teamId: string, imageFile: File) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const formData = new FormData()
    formData.append('image', imageFile)

    const response = await fetch(`${BASE_URL}/${teamId}/users/me/image`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
    return response.json()
  },
}
