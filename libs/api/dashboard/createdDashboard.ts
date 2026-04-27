'use server'

import { cookies } from 'next/headers'
import { ApiResult } from '@/libs/types/Api'
import { Dashboard } from '@/libs/types/Dashboard'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

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
