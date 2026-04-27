'use server'

import { ApiResult } from '@/libs/types/Api'
import { GetDashboardsResponse } from '@/libs/types/Dashboard'
import { cookies } from 'next/headers'

interface GetDashboardsParams {
  page?: number
  size?: number
  cursorId?: number | null
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const getDashboards = async ({
  page = 1,
  size = 9,
  cursorId,
}: GetDashboardsParams): Promise<ApiResult<GetDashboardsResponse>> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value
    const params = new URLSearchParams({
      navigationMethod: 'infiniteScroll',
      page: page.toString(),
      size: size.toString(),
    })

    if (cursorId) params.append('cursorId', cursorId.toString())

    const response = await fetch(
      `${BASE_URL}/dashboards?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (!response.ok) {
      const errorData = await response.json()
      return {
        success: false,
        data: null,
        error: errorData.message || '데이터를 불러오지 못했습니다.',
      }
    }

    const data = await response.json()
    return {
      success: true,
      data,
      error: null,
    }
  } catch (error) {
    console.log(error)

    return {
      success: false,
      data: null,
      error: '네트워크 연결 상태를 확인해주세요.',
    }
  }
}
