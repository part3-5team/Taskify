const BASE_URL = 'https://sp-taskify-api.vercel.app/v1'

export const membersApi = {
  // 대시보드 멤버 목록 조회
  getList: async (
    teamId: string,
    dashboardId: number,
    page?: number,
    size?: number,
  ) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    let url = `${BASE_URL}/${teamId}/members?dashboardId=${dashboardId}`
    if (page) url += `&page=${page}`
    if (size) url += `&size=${size}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.json()
  },

  // 멤버 삭제
  delete: async (teamId: string, memberId: number) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const response = await fetch(`${BASE_URL}/${teamId}/members/${memberId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) throw new Error('멤버 삭제 실패')
    return true
  },
}
