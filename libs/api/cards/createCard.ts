'use server'

import { cookies } from 'next/headers'
import type { CardDetail } from '@/libs/types/Card'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

interface CreateCardParams {
  assigneeUserId?: number
  dashboardId: number
  columnId: number
  title: string
  description: string
  dueDate?: string
  tags?: string[]
  imageUrl?: string
}

export const createCard = async ({
  assigneeUserId,
  dashboardId,
  columnId,
  title,
  description,
  dueDate,
  tags = [],
  imageUrl,
}: CreateCardParams): Promise<CardDetail> => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  const response = await fetch(`${BASE_URL}/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    body: JSON.stringify({
      assigneeUserId,
      dashboardId,
      columnId,
      title,
      description,
      dueDate,
      tags,
      imageUrl,
    }),
    cache: 'no-store',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || '카드 생성에 실패했습니다.')
  }

  return data
}
