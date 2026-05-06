'use server'

import { cookies } from 'next/headers'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const getAccessToken = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  if (!token) {
    throw new Error('로그인이 필요합니다.')
  }

  return token
}

export const deleteCard = async (cardId: number) => {
  const accessToken = await getAccessToken()

  const res = await fetch(`${BASE_URL}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.message || '카드 삭제에 실패했습니다.')
  }
}
