'use server'

import { cookies } from 'next/headers'
import { ApiResult } from '@/libs/types/Api'
import { Column } from '@/libs/types/Dashboard'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export interface CreateColumnRequest {
  title: string
  dashboardId: number
}

export const createColumn = async (
  body: CreateColumnRequest,
): Promise<ApiResult<Column>> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value

    const response = await fetch(`${BASE_URL}/columns`, {
      method: 'POST',
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
        error: result.message || '컬럼 생성에 실패했습니다.',
      }
    }

    return {
      success: true,
      data: result,
      error: null,
    }
  } catch (error) {
    console.error('Create Column Error:', error)
    return {
      success: false,
      data: null,
      error: '네트워크 오류가 발생했습니다.',
    }
  }
}
