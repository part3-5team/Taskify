'use server'

import { cookies } from 'next/headers'
import { ApiResult } from '@/libs/types/Api'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const deleteMember = async (
  memberId: number,
): Promise<ApiResult<null>> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value

    const response = await fetch(`${BASE_URL}/members/${memberId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status === 204) {
      return {
        success: true,
        data: null,
        error: null,
      }
    }

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        data: null,
        error: result.message || '멤버 삭제에 실패했습니다.',
      }
    }

    return {
      success: true,
      data: null,
      error: null,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      data: null,
      error: '네트워크 오류가 발생했습니다.',
    }
  }
}
