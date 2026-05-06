'use server'

import { cookies } from 'next/headers'
import type { CardListResponse } from '@/libs/types/Card'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const getCards = async ({
  columnId,
  size = 10,
  cursorId,
}: {
  columnId: number
  size?: number
  cursorId?: number | null
}): Promise<CardListResponse> => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  const params = new URLSearchParams({
    columnId: String(columnId),
    size: String(size),
  })

  if (cursorId !== undefined && cursorId !== null) {
    params.append('cursorId', String(cursorId))
  }

  const res = await fetch(`${BASE_URL}/cards?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    cache: 'no-store',
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || '카드 목록 조회에 실패했습니다.')
  }

  return data
}
