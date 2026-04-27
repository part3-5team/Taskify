'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { AuthState } from '../types/Auth'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const login = async (
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> => {
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

export const signup = async (
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> => {
  const email = String(formData.get('email'))
  const nickname = String(formData.get('nickname'))
  const password = String(formData.get('password'))

  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    body: JSON.stringify({ email, nickname, password }),
    headers: { 'Content-Type': 'application/json' },
  })

  const data = await response.json()

  if (!response.ok) {
    return {
      success: false,
      message: data.message,
    }
  }

  return {
    success: true,
    message: '회원가입이 완료되었습니다.',
  }
}

export const changePassword = async ({
  password,
  newPassword,
}: {
  password: string;
  newPassword: string;
}) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    throw new Error('로그인이 필요합니다');
  }

  const res = await fetch(`${BASE_URL}/auth/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      password,
      newPassword,
    }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || '비밀번호 변경에 실패했습니다');
  }
};