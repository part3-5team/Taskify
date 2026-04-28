'use server'

import { cookies } from 'next/headers'
import { ApiResult } from '@/libs/types/Api'
import { GetMembersResponse } from '@/libs/types/Dashboard'

interface GetMembersParams {
  dashboardId: number
  page?: number
  size?: number
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const getDashboardMembers = async ({
  dashboardId,
  page = 1,
  size = 20,
}: GetMembersParams): Promise<ApiResult<GetMembersResponse>> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value

    const params = new URLSearchParams({
      dashboardId: dashboardId.toString(),
      page: page.toString(),
      size: size.toString(),
    })

    const response = await fetch(`${BASE_URL}/members?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        data: null,
        error: result.message || '멤버 목록을 불러오지 못했습니다.',
      }
    }

    return {
      success: true,
      data: result,
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
