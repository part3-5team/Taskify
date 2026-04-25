'use client';

import { useState } from "react";
import BackIcon from '@/assets/icons/ic_back.svg';
import CloseIcon from '@/assets/icons/ic_X.svg';
import Input from "@/components/common/input";
import Button from "@/components/common/button";

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

interface PasswordErrors {
  currentPassword?: string;
  newPassword?: string;
  newPasswordConfirm?: string;
}

export default function PasswordChangeModal({
  isOpen,
  onClose,
  onBack,
}: PasswordChangeModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [errors, setErrors] = useState<PasswordErrors>({});

  if (!isOpen) return null;

  const validatePassword = () => {
    const nextErrors: PasswordErrors = {};

    if (!currentPassword.trim()) {
      nextErrors.currentPassword = '현재 비밀번호를 입력해주세요';
    }

    if (!newPassword.trim()) {
      nextErrors.newPassword = '새 비밀번호를 입력해주세요.';
    }

    if (!newPasswordConfirm.trim()) {
      nextErrors.newPasswordConfirm = '새 비밀번호를 한 번 더 입력해주세요.';
    } else if (newPassword !== newPasswordConfirm) {
      nextErrors.newPasswordConfirm = '비밀번호가 일치하지 않습니다.';
      nextErrors.newPassword = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    const isValid = validatePassword();

    if (!isValid) return;

    console.log('비밀번호 변경 API 연결 전', {
      currentPassword,
      newPassword,
      newPasswordConfirm,
    });
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex bg-black/70
        justify-end
        md:items-center md:justify-center md:px-0
      "
      onClick={onClose}
    >
      <section
        className="
          relative h-full w-full min-w-[300px] 
          bg-modal
          px-5 py-6
          border border-gray-700

          md:h-auto md:max-w-[600px]
          md:rounded-[24px]
          md:px-[30px] md:py-[30px]
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-[30px] flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="cursor-pointer text-gray-400 hover:text-gray-300"
          >
            <BackIcon className="size-6" />
          </button>

          <h2 className="text-xl-20-bold text-gray-300 md:text-2xl-24-semibold">
            비밀번호 변경
          </h2>
        </div>

        <button
          type="button"
          className="absolute right-5 top-5 md:right-[30px] md:top-[30px] text-gray-400 cursor-pointer hover:text-gray-300"
          onClick={onClose}
        >
          <CloseIcon className="size-6" />
        </button>

        <div className="mb-6">
          <p className="mb-[10px] text-lg-14-semibold md:text-lg-16-semibold text-gray-300 md:mb-3">
            현재 비밀번호
          </p>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="현재 비밀번호 입력"
            className={`h-12 ${
              errors.currentPassword ? "border-red-500" : ''
            }`}
          />
          {errors.currentPassword && (
            <p className="mt-2 text-sm text-red-500">
              {errors.currentPassword}
            </p>
          )}
        </div>

        <div className="mb-6">
          <p className="mb-[10px] text-lg-14-semibold md:text-lg-16-semibold text-gray-300 md:mb-3">
            새 비밀번호
          </p>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="새 비밀번호 입력"
            className={`h-12 ${errors.newPassword ? 'border-red-500' : ''}`}
          />
          {errors.newPassword && (
            <p className="mt-2 text-sm text-red-500">{errors.newPassword}</p>
          )}
        </div>

        <div className="mb-[30px]">
          <p className="mb-[10px] text-lg-14-semibold md:text-lg-16-semibold text-gray-300 md:mb-3">
            새 비밀번호 확인
          </p>
          <Input
            type="password"
            value={newPasswordConfirm}
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
            placeholder="새 비밀번호 입력"
            className={`h-12 ${
              errors.newPasswordConfirm ? 'border-red-500' : ''
            }`}
          />
          {errors.newPasswordConfirm && (
            <p className="mt-2 text-sm text-red-500">
              {errors.newPasswordConfirm}
            </p>
          )}
        </div>

        <div className="absolute h-[50px] md:h-15 leading-2 bottom-5 left-4 right-4 flex gap-3 md:static md:gap-4">
          <Button
            type="button"
            size="md"
            variant="cancel"
            className="flex-1 px-0"
            onClick={onClose}
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
  )
}