'use client'

import ModalLayout from '@/components/common/modal/ModalLayout'
import Input from '@/components/common/input'
import TextArea from '@/components/common/textArea'
import Dropdown from '@/components/common/dropdown/Dropdown'
import Button from '@/components/common/button'
import IconX from '@/assets/icons/ic_X.svg'

interface TaskEditModalProps {
  onClose: () => void
}

export default function TaskEditModal({ onClose }: TaskEditModalProps) {
  // Mock data for the UI
  const tags = [
    { id: 1, label: '프로젝트', color: 'bg-profile-blue' },
    { id: 2, label: '디자인', color: 'bg-profile-violet' },
    { id: 3, label: '상', color: 'bg-profile-green' },
  ]

  return (
    <ModalLayout
      onClose={onClose}
      className="bg-modal w-full max-w-[500px] overflow-hidden rounded-2xl p-7 text-left"
    >
      {/* 헤더 */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl-24-bold text-gray-100">할 일 수정</h2>
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
          <Input
            defaultValue="와이어프레임 만들기"
            placeholder="제목을 입력해주세요"
          />
        </div>

        {/* 설명 */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-100">
            설명<span className="text-brand-500 ml-0.5">*</span>
          </label>
          <TextArea
            defaultValue="먼저 전체 플로우를 개괄적으로 파악하고, 주요 화면 구성을 나열   초기 와이어프레임은 빠르게 그리고, 이후 단계에서 세부 요소를 보완합니다."
            placeholder="설명을 입력해주세요"
            className="h-[120px]"
          />
        </div>

        {/* 칼럼 & 담당자 (2열) */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="mb-2 block text-sm font-semibold text-gray-100">
              칼럼
            </label>
            <Dropdown />
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
          <div className="focus-within:border-brand-500 focus-within:ring-brand-500 relative flex min-h-[48px] flex-wrap items-center gap-2 rounded-xl border border-gray-700 bg-gray-900 px-4 py-2 focus-within:ring-1">
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className={`text-xs-12-medium rounded px-2 py-0.5 text-white ${tag.color}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
            <input
              type="text"
              className="min-w-[100px] flex-1 bg-transparent text-sm text-gray-100 placeholder-gray-500 outline-none"
              placeholder="입력 후 Enter"
            />
          </div>
        </div>

        {/* 이미지 */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-100">
            이미지
          </label>
          <div className="relative flex h-[140px] w-[200px] flex-col items-center justify-center overflow-hidden rounded-xl border border-gray-700 bg-gray-900">
            {/* The X button */}
            <button className="absolute top-2 right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80">
              <IconX className="h-4 w-4" />
            </button>
            {/* Mocking the user's screenshot image */}
            <div className="relative flex h-full w-full flex-col items-center justify-center bg-[#FFE7D6] p-2">
              <div className="flex h-full w-full flex-col overflow-hidden rounded-[8px] border-[6px] border-[#FF8E4F] bg-white">
                <div className="flex h-3 w-full items-center gap-1 bg-[#FF8E4F] px-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#FF6B6B]"></div>
                  <div className="h-1.5 w-1.5 rounded-full bg-[#FFD93D]"></div>
                  <div className="h-1.5 w-1.5 rounded-full bg-[#6BCB77]"></div>
                </div>
                <div className="flex flex-1 gap-2 p-1.5">
                  <div className="flex h-full w-10 items-center justify-center rounded-sm bg-[#FFE7D6]">
                    <div className="relative h-3 w-6 rounded-sm bg-[#FF8E4F]">
                      <div className="absolute top-0 right-1 h-1.5 w-1.5 rounded-full bg-white"></div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-1 pt-0.5">
                    <div className="h-1.5 w-8 rounded-sm bg-gray-200"></div>
                    <div className="mt-1 h-1 w-full rounded-sm bg-gray-100"></div>
                    <div className="h-1 w-full rounded-sm bg-gray-100"></div>
                    <div className="h-1 w-3/4 rounded-sm bg-gray-100"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 푸터 버튼 */}
        <div className="mt-8 flex gap-3">
          <Button variant="cancel" className="flex-1" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" className="flex-1">
            완료
          </Button>
        </div>
      </div>
    </ModalLayout>
  )
}
