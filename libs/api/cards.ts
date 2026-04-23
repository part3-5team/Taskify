const BASE_URL = 'https://sp-taskify-api.vercel.app/v1'

export const cardsApi = {
  // 카드 생성
  create: async (
    teamId: string,
    dashboardId: number,
    columnId: number,
    title: string,
    description: string,
    assigneeUserId?: number,
    dueDate?: string,
    tags?: string[],
    imageUrl?: string,
  ) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const response = await fetch(`${BASE_URL}/${teamId}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        dashboardId,
        columnId,
        title,
        description,
        assigneeUserId,
        dueDate,
        tags,
        imageUrl,
      }),
    })
    return response.json()
  },

  // 카드 목록 조회
  getList: async (
    teamId: string,
    columnId: number,
    size?: number,
    cursorId?: number,
  ) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    let url = `${BASE_URL}/${teamId}/cards?columnId=${columnId}`
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

  // 카드 상세 조회
  getDetail: async (teamId: string, cardId: number) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const response = await fetch(`${BASE_URL}/${teamId}/cards/${cardId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.json()
  },

  // 카드 수정
  update: async (
    teamId: string,
    cardId: number,
    columnId: number,
    title: string,
    description: string,
    assigneeUserId?: number,
    dueDate?: string,
    tags?: string[],
    imageUrl?: string,
  ) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const response = await fetch(`${BASE_URL}/${teamId}/cards/${cardId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        columnId,
        title,
        description,
        assigneeUserId,
        dueDate,
        tags,
        imageUrl,
      }),
    })
    return response.json()
  },

  // 카드 삭제
  delete: async (teamId: string, cardId: number) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const response = await fetch(`${BASE_URL}/${teamId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) throw new Error('카드 삭제 실패')
    return true
  },
}
