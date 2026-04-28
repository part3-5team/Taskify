'use server'

import { cookies } from 'next/headers'
import { ApiResult } from '@/libs/types/Api'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

interface DeleteMemberParams {
  memberId: number
}

export const deleteMember = async ({
  memberId,
}: DeleteMemberParams): Promise<ApiResult<null>> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value

    if (!token) {
      return {
        success: false,
        data: null,
        error: '인증 토큰이 없습니다. 다시 로그인해주세요.',
      }
    }

    const res = await fetch(`${BASE_URL}/members/${memberId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      const result = await res.json()

      return {
        success: false,
        data: null,
        error: result.message || '구성원 삭제에 실패했습니다.',
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
