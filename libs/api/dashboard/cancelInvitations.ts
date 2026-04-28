'use server'

import { ApiResult } from '@/libs/types/Api'
import { cookies } from 'next/headers'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

interface CancelInvitationParams {
  dashboardId: number
  invitationId: number
}

export const cancelInvitation = async ({
  dashboardId,
  invitationId,
}: CancelInvitationParams): Promise<ApiResult<null>> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value

    if (!token) {
      return {
        success: false,
        data: null,
        error: '다시 로그인해주세요',
      }
    }

    const res = await fetch(
      `${BASE_URL}/dashboards/${dashboardId}/invitations/${invitationId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (!res.ok) {
      const result = await res.json()

      return {
        success: false,
        data: null,
        error: result.message || '초대 취소에 실패했습니다',
      }
    }

    return {
      success: true,
      data: null,
      error: null,
    }
  } catch (err) {
    console.error(err)

    return {
      success: false,
      data: null,
      error: '네트워크 오류가 발생했습니다',
    }
  }
}
