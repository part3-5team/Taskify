'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { LoginState } from '../types/Auth'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const login = async (
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> => {
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))

  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  })

  const data = await response.json()

  if (!response.ok) {
    return {
      success: false,
      message: '이메일 또는 비밀번호가 일치하지 않습니다.',
    }
  }

  const cookieStore = await cookies()
  cookieStore.set('accessToken', data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  redirect('/mydashboard')
}
