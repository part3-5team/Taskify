'use server'

import { cookies } from 'next/headers'
import {
  Dashboard,
  GetDashboardsResponse,
  GetInvitationsResponse,
} from '../types/Dashboard'
import { ApiResult } from '../types/Api'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

interface GetDashboardsParams {
  page?: number
  size?: number
  cursorId?: number | null
}

interface GetInvitationsParams {
  dashboardId: number
  page?: number
  size?: number
}

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

export const createDashboard = async (
  formData: FormData,
): Promise<ApiResult<Dashboard>> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value
    const title = formData.get('title') as string
    const color = formData.get('color') as string

    const response = await fetch(`${BASE_URL}/dashboards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, color }),
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        data: null,
        error: result.message || '대시보드 생성에 실패했습니다.',
      }
    }

    return {
      success: true,
      data: result,
      error: null,
    }
  } catch (error) {
    console.error('Create Dashboard Error:', error)

    return {
      success: false,
      data: null,
      error: '네트워크 오류가 발생했습니다.',
    }
  }
}

export const getInvitations = async ({
  dashboardId,
  page = 1,
  size = 10,
}: GetInvitationsParams): Promise<ApiResult<GetInvitationsResponse>> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value

    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    })

    const response = await fetch(
      `${BASE_URL}/dashboards/${dashboardId}/invitations?${params.toString()}`,
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
        error: result.message || '초대 목록을 불러오지 못했습니다.',
      }
    }

    return {
      success: true,
      data: result,
      error: null,
    }
  } catch (error) {
    console.log(error)

    return {
      success: false,
      data: null,
      error: '네트워크 오류가 발생했습니다.',
    }
  }
}
