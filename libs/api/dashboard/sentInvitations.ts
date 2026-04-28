'use server'

import { ApiResult } from '@/libs/types/Api'
import { GetInvitationsResponse } from '@/libs/types/Dashboard'
import { cookies } from 'next/headers'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

interface GetInvitationsParams {
  dashboardId: number
  page?: number
  size?: number
}

export const getInvitations = async ({
  dashboardId,
  page = 1,
  size = 5,
}: GetInvitationsParams): Promise<ApiResult<GetInvitationsResponse>> => {
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

    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    })

    const res = await fetch(
      `${BASE_URL}/dashboards/${dashboardId}/invitations?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const result = await res.json()

    if (!res.ok) {
      return {
        success: false,
        data: null,
        error: result.message || '초대한 목록을 불러오지 못했습니다',
      }
    }

    return {
      success: true,
      data: result,
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
