'use server'

import { cookies } from 'next/headers'
import { ApiResult } from '@/libs/types/Api'
import { Dashboard } from '@/libs/types/Dashboard'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const COLOR_MAP: Record<string, string> = {
  red: '#AE2E24',
  orange: '#9F4B00',
  yellow: '#9E7600',
  green: '#206E4E',
  blue: '#1458BC',
}

export const updateDashboard = async (
  dashboardId: number,
  formData: FormData,
): Promise<ApiResult<Dashboard>> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value

    const title = formData.get('title') as string
    const rawColor = formData.get('color') as string
    const color = COLOR_MAP[rawColor.toLowerCase()] || rawColor

    if (!title || !color) {
      return {
        success: false,
        data: null,
        error: '제목과 색상을 모두 입력해주세요.',
      }
    }

    const response = await fetch(`${BASE_URL}/dashboards/${dashboardId}`, {
      method: 'PUT',
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
        error: result.message || '대시보드 수정에 실패했습니다.',
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
