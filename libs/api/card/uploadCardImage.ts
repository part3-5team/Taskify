'use server'

import { cookies } from 'next/headers'
import { ApiResult } from '@/libs/types/Api'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

interface UploadCardImageResponse {
  imageUrl: string
}

export const uploadCardImage = async (
  columnId: number,
  file: File,
): Promise<ApiResult<UploadCardImageResponse>> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value

    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch(
      `${BASE_URL}/columns/${columnId}/card-image`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          // Content-Type은 FormData 사용 시 자동 설정됨 (boundary 포함)
        },
        body: formData,
      },
    )

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
    console.error('Upload Card Image Error:', error)
    return {
      success: false,
      data: null,
      error: '이미지 업로드 중 오류가 발생했습니다.',
    }
  }
}
