'use server'

import { cookies } from 'next/headers'
import { ApiResult } from '@/libs/types/Api'
import { Card } from '@/libs/types/Dashboard'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export interface UpdateCardRequest {
  columnId?: number
  assigneeUserId?: number
  title?: string
  description?: string
  dueDate?: string
  tags?: string[]
  imageUrl?: string
}

export const updateCard = async (
  cardId: number,
  body: UpdateCardRequest,
): Promise<ApiResult<Card>> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value

    if (!token)
      return { success: false, data: null, error: '세션이 만료되었습니다.' }

    const response = await fetch(`${BASE_URL}/cards/${cardId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        data: null,
        error: result.message || '카드 수정에 실패했습니다.',
      }
    }

    return {
      success: true,
      data: result,
      error: null,
    }
  } catch (error) {
    console.error('Update Card Error:', error)
    return {
      success: false,
      data: null,
      error: '네트워크 오류가 발생했습니다.',
    }
  }
}
