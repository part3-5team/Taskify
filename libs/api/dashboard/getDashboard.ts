'use server'

import { cookies } from 'next/headers'
import axios from 'axios'
import { ApiResult } from '@/libs/types/Api'
import { Dashboard, GetDashboardsResponse } from '@/libs/types/Dashboard'

interface GetDashboardsParams {
  navigationMethod?: 'pagination' | 'infiniteScroll'
  page?: number
  size?: number
  cursorId?: number | null
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

// 대시보드 목록 조회
export const getDashboards = async ({
  navigationMethod = 'pagination',
  page = 1,
  size = 9,
  cursorId,
}: GetDashboardsParams): Promise<ApiResult<GetDashboardsResponse>> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value
    const params = new URLSearchParams({
      navigationMethod,
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

// 대시보드 단일 조회
export const getDashboardById = async (
  dashboardId: number,
): Promise<ApiResult<Dashboard>> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value

    const { data } = await axios.get<Dashboard>(
      `${BASE_URL}/dashboards/${dashboardId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return {
      success: true,
      data,
      error: null,
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        data: null,
        error:
          error.response?.data?.message || '대시보드를 불러오지 못했습니다.',
      }
    }

    return {
      success: false,
      data: null,
      error: '네트워크 연결 상태를 확인해주세요.',
    }
  }
}
