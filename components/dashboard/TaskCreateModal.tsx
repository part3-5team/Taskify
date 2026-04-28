'use client'

import ModalLayout from '@/components/common/modal/ModalLayout'
import Input from '@/components/common/input'
import TextArea from '@/components/common/textArea'
import Dropdown from '@/components/common/dropdown/Dropdown'
import Button from '@/components/common/button'
import IconX from '@/assets/icons/ic_X.svg'
import IconImage from '@/assets/icons/ic_image.svg'

interface TaskCreateModalProps {
  onClose: () => void
}

export default function TaskCreateModal({ onClose }: TaskCreateModalProps) {
  return (
    <ModalLayout
      onClose={onClose}
      className="bg-modal w-full max-w-[500px] overflow-hidden rounded-2xl p-7 text-left"
    >
      {/* 헤더 */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl-24-bold text-gray-100">할 일 생성</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-100">
          <IconX className="h-6 w-6" />
        </button>
      </div>

      <div className="space-y-6">
        {/* 제목 */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-100">
            제목<span className="text-brand-500 ml-0.5">*</span>
          </label>
          <Input placeholder="제목을 입력해주세요" />
        </div>

        {/* 설명 */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-100">
            설명<span className="text-brand-500 ml-0.5">*</span>
          </label>
          <TextArea placeholder="설명을 입력해주세요" className="h-[120px]" />
        </div>

        {/* 마감일 & 담당자 (2열) */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="mb-2 block text-sm font-semibold text-gray-100">
              마감일
            </label>
            <Input placeholder="날짜를 선택해 주세요" />
          </div>
          <div className="flex-1">
            <label className="mb-2 block text-sm font-semibold text-gray-100">
              담당자
            </label>
            <Dropdown />
          </div>
        </div>

        {/* 태그 */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-100">
            태그
          </label>
          <Input placeholder="입력 후 Enter" />
        </div>

        {/* 이미지 */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-100">
            이미지
          </label>
          <div className="relative flex h-[140px] w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-700 bg-gray-900 transition-colors hover:bg-gray-800">
            <IconImage className="mb-2 h-8 w-8 text-gray-500" />
            <span className="text-sm text-gray-500">+ image upload</span>
          </div>
        </div>

        {/* 푸터 버튼 */}
        <div className="mt-8 flex gap-3">
          <Button variant="cancel" className="flex-1" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" className="flex-1">
            생성
          </Button>
        </div>
      </div>
    </ModalLayout>
  )
}
