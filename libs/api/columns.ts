const BASE_URL = 'https://sp-taskify-api.vercel.app/v1'

export const columnsApi = {
  // 컬럼 생성
  create: async (teamId: string, title: string, dashboardId: number) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const response = await fetch(`${BASE_URL}/${teamId}/columns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, dashboardId }),
    })
    return response.json()
  },

  // 컬럼 목록 조회
  getList: async (teamId: string, dashboardId: number) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const response = await fetch(
      `${BASE_URL}/${teamId}/columns?dashboardId=${dashboardId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.json()
  },

  // 컬럼 수정
  update: async (teamId: string, columnId: number, title: string) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const response = await fetch(`${BASE_URL}/${teamId}/columns/${columnId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    })
    return response.json()
  },

  // 컬럼 삭제
  delete: async (teamId: string, columnId: number) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const response = await fetch(`${BASE_URL}/${teamId}/columns/${columnId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) throw new Error('컬럼 삭제 실패')
    return true
  },

  // 카드 이미지 업로드
  uploadCardImage: async (
    teamId: string,
    columnId: number,
    imageFile: File,
  ) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const formData = new FormData()
    formData.append('image', imageFile)

    const response = await fetch(
      `${BASE_URL}/${teamId}/columns/${columnId}/card-image`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      },
    )
    return response.json()
  },
}
