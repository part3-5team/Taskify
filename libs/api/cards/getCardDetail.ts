'use server'

import { cookies } from 'next/headers'
import type { CardDetail } from '@/libs/types/Card'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const getCardDetail = async (cardId: number): Promise<CardDetail> => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  const res = await fetch(`${BASE_URL}/cards/${cardId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || '카드 상세 조회에 실패했습니다.')
  }

  return {
    ...data,
    tags: Array.isArray(data.tags) ? data.tags : [],
  }
}
