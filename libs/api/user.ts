'use server';

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface UserResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface UpdateUserParams {
  nickname: string;
  profileImageUrl?: string | null;
}

interface UploadProfileImageResponse {
  profileImageUrl: string;
}

const getAccessToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    throw new Error('로그인이 필요합니다');
  }

  return token;
};

export const getMyInfo = async (): Promise<UserResponse> => {
  const accessToken = await getAccessToken();

  const res = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || '내 정보 조회에 실패했습니다.');
  }

  return data;
};

export const updateMyInfo = async ({
  nickname,
  profileImageUrl,
}: UpdateUserParams): Promise<UserResponse> => {
  const accessToken = await getAccessToken();

  const response = await fetch(`${BASE_URL}/users/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      nickname,
      profileImageUrl,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || '프로필 수정에 실패했습니다.');
  }
  
  return data;
};

export const uploadProfileImage = async (
  formData: FormData,
): Promise<UploadProfileImageResponse> => {
  const accessToken = await getAccessToken();

  const res = await fetch(`${BASE_URL}/users/me/image`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || '프로필 이미지 업로드에 실패했습니다.');
  }

  return data;
};