const BASE_URL = 'https://sp-taskify-api.vercel.app/v1'

export const commentsApi = {
  // 댓글 생성
  create: async (
    teamId: string,
    content: string,
    cardId: number,
    columnId: number,
    dashboardId: number,
  ) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const response = await fetch(`${BASE_URL}/${teamId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content, cardId, columnId, dashboardId }),
    })
    return response.json()
  },

  // 댓글 목록 조회
  getList: async (
    teamId: string,
    cardId: number,
    size?: number,
    cursorId?: number,
  ) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    let url = `${BASE_URL}/${teamId}/comments?cardId=${cardId}`
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

  // 댓글 수정
  update: async (teamId: string, commentId: number, content: string) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const response = await fetch(
      `${BASE_URL}/${teamId}/comments/${commentId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      },
    )
    return response.json()
  },

  // 댓글 삭제
  delete: async (teamId: string, commentId: number) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const response = await fetch(
      `${BASE_URL}/${teamId}/comments/${commentId}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    if (!response.ok) throw new Error('댓글 삭제 실패')
    return true
  },
}
