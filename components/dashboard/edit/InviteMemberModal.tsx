'use client';

import { useState } from "react";
import CloseIcon from '@/assets/icons/ic_X.svg';
import Input from "@/components/common/input";
import Button from "@/components/common/button";

interface InviteMemberModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

export default function InviteMemberModal({
  open,
  onClose,
  onSubmit,
}: InviteMemberModalProps) {
  const [email, setEmail] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    if (!email.trim()) return;
    onSubmit(email.trim());
    setEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-99 flex items-center justify-center bg-black/40 ">
      <div className="w-full z-999 max-w-lg rounded-2xl border border-stroke bg-modal p-[30px] shadow-2xl">
        <div className="mb-7 flex items-center justify-between">
          <h2 className="text-2xl-24-semibold text-gray-300">초대하기</h2>
          <button
            type="button"
            onClick={onClose}
            className="md:w-6 md:h-6 text-gray-300 hover:text-white">
            <CloseIcon />
          </button>
        </div>

        <div className="space-y-3">
          <label className="block text-lg-16-semibold text-gray-300">이메일</label>
          <Input
            type="email"
            value={email}
            placeholder="이메일을 입력해주세요"
            onChange={(e) => setEmail(e.target.value)}
            className="h-[54px]"
          />
        </div>

        <div className="mt-4 md:mt-7 flex items-center justify-between gap-5 text-2lg-18-semibold">
          <Button
            variant="cancel"
            onClick={onClose}
            className="w-full"
          >
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            className="w-full"
          >
            공유
          </Button>
        </div>
      </div>
    </div>
  )
}