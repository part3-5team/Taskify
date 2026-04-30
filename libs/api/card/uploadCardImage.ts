'use server'

import { cookies } from 'next/headers'
import { ApiResult } from '@/libs/types/Api'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export interface UploadImageResponse {
  imageUrl: string
}

export const uploadCardImage = async (
  columnId: number,
  file: File,
): Promise<ApiResult<UploadImageResponse>> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value

    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch(`${BASE_URL}/columns/${columnId}/card-image`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        data: null,
        error: result.message || '이미지 업로드에 실패했습니다.',
      }
    }

    return {
      success: true,
      data: result,
      error: null,
    }
  } catch (error) {
    console.error('Upload Image Error:', error)
    return {
      success: false,
      data: null,
      error: '네트워크 오류가 발생했습니다.',
    }
  }
}
