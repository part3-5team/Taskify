'use server'
import { ApiResult } from '@/libs/types/Api'
import { Invitation } from '@/libs/types/Dashboard'
import { cookies } from 'next/headers'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const getAccessToken = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value
  return token
}

export const inviteDashboard = async (
  dashboardId: number,
  email: string,
): Promise<ApiResult<Invitation>> => {
  try {
    const token = await getAccessToken()

    if (!token) {
      return {
        success: false,
        data: null,
        error: '인증 토큰이 없습니다. 다시 로그인해주세요.',
      }
    }

    const response = await fetch(
      `${BASE_URL}/dashboards/${dashboardId}/invitations`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      },
    )

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        data: null,
        error: result.message || '초대 보내기에 실패했습니다.',
      }
    }

    return { success: true, data: result, error: null }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      data: null,
      error: '네트워크 오류가 발생했습니다.',
    }
  }
}
