'use server'

import { cookies } from 'next/headers'
import { ApiResult } from '@/libs/types/Api'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const deleteColumn = async (
  columnId: number,
): Promise<ApiResult<void>> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value

    const response = await fetch(`${BASE_URL}/columns/${columnId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const result = await response.json()
      return {
        success: false,
        data: null,
        error: result.message || '컬럼 삭제에 실패했습니다.',
      }
    }

    return {
      success: true,
      data: null,
      error: null,
    }
  } catch (error) {
    console.error('Delete Column Error:', error)
    return {
      success: false,
      data: null,
      error: '네트워크 오류가 발생했습니다.',
    }
  }
}
