const BASE_URL = 'https://sp-taskify-api.vercel.app/v1'

export const invitationsApi = {
  // 내가 받은 초대 목록 조회
  getList: async (
    teamId: string,
    size?: number,
    cursorId?: number,
    title?: string,
  ) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    let url = `${BASE_URL}/${teamId}/invitations?`
    if (size) url += `&size=${size}`
    if (cursorId) url += `&cursorId=${cursorId}`
    if (title) url += `&title=${encodeURIComponent(title)}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.json()
  },

  // 초대 응답 (수락/거절)
  respond: async (
    teamId: string,
    invitationId: number,
    inviteAccepted: boolean,
  ) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const response = await fetch(
      `${BASE_URL}/${teamId}/invitations/${invitationId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ inviteAccepted }),
      },
    )
    return response.json()
  },
}
