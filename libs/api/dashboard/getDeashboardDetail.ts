'use server'

import { cookies } from 'next/headers'
import { ApiResult } from '@/libs/types/Api'
import { Dashboard } from '@/libs/types/Dashboard'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const getDashboardDetail = async (
  dashboardId: number,
): Promise<ApiResult<Dashboard>> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value

    const response = await fetch(`${BASE_URL}/dashboards/${dashboardId}`, {
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
        error: result.message || '대시보드 정보를 가져오지 못했습니다.',
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
      error: '네트워크 연결 상태를 확인해주세요.',
    }
  }
}
