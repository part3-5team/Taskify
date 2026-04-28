'use client';

import { useRef, useState } from 'react';
import CloseIcon from '@/assets/icons/ic_X.svg';
import Button from '@/components/common/button';
import Input from '@/components/common/input';
import PasswordChangeModal from './passwordChangeModal';
import { updateMyInfo, uploadProfileImage } from '@/libs/api/user';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateUser?: (user: {
    email: string;
    nickname: string;
    profileImageUrl?: string;
  }) => void;
  user: {
    email: string;
    nickname: string;
    imageUrl?: string;
  };
}

export default function ProfileEditModal({
  isOpen,
  onClose,
  onUpdateUser,
  user,
}: ProfileEditModalProps) {
  const [nickname, setNickname] = useState(user.nickname);
  const [image, setImage] = useState<string | undefined>(user.imageUrl);
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const profileText = nickname.trim().slice(0, 1) || user.nickname.slice(0, 1);
  const displayImage = isImageDeleted ? undefined : previewImage || image;

  const handleClickImageChange = () => {
    fileInputRef.current?.click();
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setPreviewImage(previewUrl);
    setSelectedFile(file);
    setIsImageDeleted(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // API 연결 시 file을 FormData로 보내기
    console.log(file);
  }

  const handleDeleteImage = () => {
    setPreviewImage(undefined);
    setSelectedFile(null);
    setIsImageDeleted(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // API 연결 시 imageUrl null 또는 빈 값으로 보내기
    console.log('delete file');
  }

  const handleCancel = () => {
    setPreviewImage(undefined);
    setSelectedFile(null);
    setIsImageDeleted(false);
    setNickname(user.nickname);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    onClose();
  }

  const handleSubmit = async () => {
    try {
      let profileImageUrl = image;

      // 이미지 업로드
      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);

        const imageData = await uploadProfileImage(formData);
        profileImageUrl = imageData.profileImageUrl;
      }

      // 프로필 수정
      const updatedUser = await updateMyInfo({
        nickname,
        profileImageUrl: isImageDeleted ? null : profileImageUrl,
      });

      setNickname(updatedUser.nickname);
      setImage(updatedUser.profileImageUrl || undefined);
      setPreviewImage(undefined);
      setSelectedFile(null);
      setIsImageDeleted(false);

      onUpdateUser?.({
        ...updatedUser,
        profileImageUrl: updatedUser.profileImageUrl || undefined,
      });

      onClose();

      console.log('프로필 변경 완료', updatedUser);
    } catch (error) {
      console.error('프로필 수정 실패', error);
    }
  };

  const handleOpenPasswordModal = () => {
    setIsPasswordModalOpen(true);
  }

  return (
    <>
      {!isPasswordModalOpen && (
        <div
          className="
          fixed inset-0 z-50 flex bg-black/70
          justify-end
          md:items-center md:justify-center md:px-0
          "
          onClick={handleCancel}
        >
          <section
            className="
              relative h-full min-w-[300px]
              border-1 border-gray-700
              bg-modal
              px-4 py-5

              md:h-auto w-full md:max-w-[600px]
              md:rounded-[16px] md:border md:border-gray-700
              md:px-[30px] md:py-[30px]
            "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-5 top-5 md:right-[30px] md:top-[30px] cursor-pointer"
              onClick={handleCancel}
            >
              <CloseIcon className="size-6 text-gray-400" />
            </button>

            <h2 className="mb-[30px] text-xl-20-bold text-gray-300 md:text-2xl-24-semibold">
              프로필 변경
            </h2>

            <div className="mb-6 flex items-center gap-4 md:mb-[30px] md:gap-5">
              {displayImage ? (
                <img
                  src={displayImage}
                  alt="profile"
                  className="size-[110px] shrink-0 rounded-full object-cover md:size-[120px]"
                />
              ) : (
                <div className='flex size-[110px] shrink-0 items-center justify-center rounded-full text-2xl-24-semibold bg-brand-300 md:size-[120px]'>
                  {profileText}
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  size="sm"
                  variant="cancel"
                  type="button"
                  onClick={handleClickImageChange}
                >
                  사진 변경
                </Button>

                <button
                  type="button"
                  className="cursor-pointer rounded-[180px] px-4 py-[8.5px] text-lg-16-semibold border text-lg-16-semibold border-red-500 bg-transparent text-red-500 hover:bg-black/20"
                  onClick={handleDeleteImage}
                >
                  사진 삭제
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept='image/*'
                  className='hidden'
                  onChange={handleChangeImage}
                />
              </div>
            </div>

            <div className="mb-6 md:mb-[30px]">
              <p className="mb-[10px] text-lg-14-semibold md:text-lg-16-semibold text-gray-300 md:mb-3">
                이메일
              </p>
              <Input value={user.email} disabled className="h-12 text-gray-400" />
            </div>

            <div className="mb-6">
              <p className="mb-[10px] text-lg-14-semibold md:text-lg-16-semibold text-gray-300 md:mb-3">
                닉네임
              </p>
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="mb-[30px]">
              <p className="mb-[10px] text-lg-14-semibold md:text-lg-16-semibold text-gray-300 md:mb-3">
                비밀번호
              </p>
              <Button
                size="sm"
                variant="cancel"
                type="button"
                onClick={handleOpenPasswordModal}
              >
                비밀번호 변경
              </Button>
            </div>

            <div className="absolute bottom-5 left-4 right-4 flex gap-3 md:static md:gap-4 h-[50px] leading-2 md:h-15">
              <Button
                type="button"
                size="md"
                variant="cancel"
                className="flex-1 px-0"
                onClick={handleCancel}
              >
                취소
              </Button>

              <Button
                type="button"
                size="md"
                className="flex-1 px-0"
                onClick={handleSubmit}
              >
                변경
              </Button>
            </div>
          </section>
        </div>
      )}

      <PasswordChangeModal
        isOpen={isPasswordModalOpen}
        onClose={() => {
          setIsPasswordModalOpen(false)
          onClose();
        }}
        onBack={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
}