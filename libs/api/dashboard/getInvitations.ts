'use server'

import { cookies } from 'next/headers'
import { ApiResult } from '@/libs/types/Api'
import { GetInvitationsResponse } from '@/libs/types/Dashboard'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

interface GetInvitationsParams {
  page?: number
  size?: number
}

interface UpdateInvitationRequestDto {
  inviteAccepted: boolean
}

interface RespondInvitationParams extends UpdateInvitationRequestDto {
  invitationId: number
}


export const getInvitations = async ({
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
      `${BASE_URL}/invitations?${params.toString()}`,
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


export const respondInvitation = async ({
    invitationId,
    inviteAccepted,
  }:RespondInvitationParams) : Promise<ApiResult<null>> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value

    if(!token){
      return {
        success: false,
        data: null,
        error: '로그인이 필요합니다.',
      }
    }

    const response = await fetch(`${BASE_URL}/invitations/${invitationId}`,
      {
        method: `PUT`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          inviteAccepted,
        })
      },
    )

    const text = await response.text()
    const result = text ? JSON.parse(text) : null

    if(!response.ok){
      return {
        success: false,
        data: null,
        error: result.message || '초대 응답에 실패했습니다.',
      }
    }
    return {
      success: true,
      data: null,
      error: null,
    }

  }catch(error){
      return {
      success: false,
      data: null,
      error: '네트워크 오류가 발생했습니다.',
    }
  }
}