'use server'

import { cookies } from 'next/headers'
import { ApiResult } from '@/libs/types/Api'
import { GetColumnsResponse } from '@/libs/types/Dashboard'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const getColumns = async (
  dashboardId: number,
): Promise<ApiResult<GetColumnsResponse>> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value

    const response = await fetch(
      `${BASE_URL}/columns?dashboardId=${dashboardId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        data: null,
        error: result.message || '컬럼 목록을 불러오지 못했습니다.',
      }
    }

    return {
      success: true,
      data: result,
      error: null,
    }
  } catch (error) {
    console.error('Get Columns Error:', error)
    return {
      success: false,
      data: null,
      error: '네트워크 오류가 발생했습니다.',
    }
  }
}
