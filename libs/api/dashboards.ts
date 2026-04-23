const BASE_URL = 'https://sp-taskify-api.vercel.app/v1'

export const dashboardsApi = {
  // 대시보드 생성
  create: async (teamId: string, title: string, color: string) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const response = await fetch(`${BASE_URL}/${teamId}/dashboards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, color }),
    })
    return response.json()
  },

  // 대시보드 목록 조회
  getList: async (
    teamId: string,
    navigationMethod: 'infiniteScroll' | 'pagination',
    page?: number,
    size?: number,
    cursorId?: number,
  ) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    let url = `${BASE_URL}/${teamId}/dashboards?navigationMethod=${navigationMethod}`
    if (page) url += `&page=${page}`
    if (size) url += `&size=${size}`
    if (cursorId) url += `&cursorId=${cursorId}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.json()
  },

  // 대시보드 상세 조회
  getDetail: async (teamId: string, dashboardId: number) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const response = await fetch(
      `${BASE_URL}/${teamId}/dashboards/${dashboardId}`,
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

  // 대시보드 수정
  update: async (
    teamId: string,
    dashboardId: number,
    title: string,
    color: string,
  ) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const response = await fetch(
      `${BASE_URL}/${teamId}/dashboards/${dashboardId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, color }),
      },
    )
    return response.json()
  },

  // 대시보드 삭제
  delete: async (teamId: string, dashboardId: number) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const response = await fetch(
      `${BASE_URL}/${teamId}/dashboards/${dashboardId}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    if (!response.ok) throw new Error('대시보드 삭제 실패')
    return true
  },

  // 대시보드 초대하기
  invite: async (teamId: string, dashboardId: number, email: string) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const response = await fetch(
      `${BASE_URL}/${teamId}/dashboards/${dashboardId}/invitations`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      },
    )
    return response.json()
  },

  // 대시보드 초대 목록 조회
  getInvitations: async (
    teamId: string,
    dashboardId: number,
    page?: number,
    size?: number,
    cursorId?: number,
  ) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    let url = `${BASE_URL}/${teamId}/dashboards/${dashboardId}/invitations?`
    if (page) url += `&page=${page}`
    if (size) url += `&size=${size}`
    if (cursorId) url += `&cursorId=${cursorId}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.json()
  },

  // 초대 취소
  cancelInvitation: async (
    teamId: string,
    dashboardId: number,
    invitationId: number,
  ) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const response = await fetch(
      `${BASE_URL}/${teamId}/dashboards/${dashboardId}/invitations/${invitationId}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    if (!response.ok) throw new Error('초대 취소 실패')
    return true
  },
}
