'use client'

import { useState } from 'react'
import Input from '@/components/common/input'
import IconClose from '@/assets/icons/ic_X.svg'
import Button from '@/components/common/button'
import ColorOption, {
  ColorType,
  colorHex,
} from '@/components/mydashboard/ColorOption'
import { useRouter } from 'next/navigation'
import { createDashboard } from '@/libs/api/dashboard/createdDashboard'

type CreateModalProps = {
  onClose: () => void
}

export default function CreateModal({ onClose }: CreateModalProps) {
  const router = useRouter()

  const handleCreate = async (formData: FormData) => {
    const result = await createDashboard(formData)

    if (!result.success) {
      alert(result.error)
      return
    }

    onClose()
    router.refresh()
  }
  const [dashboardSubject, setDashboardSubject] = useState('')
  const colors: ColorType[] = ['rose', 'orange', 'yellow', 'green', 'blue']

  const [selectedColor, setSelectedColor] = useState<ColorType>('rose')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <form
        action={handleCreate}
        className="bg-modal relative flex w-150 flex-col gap-5 rounded-3xl border-gray-600 p-7.5 text-gray-300"
      >
        <p className="text-2xl-24-semibold mb-2.5">새 대시보드 생성</p>
        <div className="text-lg-16-semibold flex flex-col gap-3">
          <p>대시보드 이름</p>
          <Input
            type="text"
            name="title"
            value={dashboardSubject}
            onChange={(e) => setDashboardSubject(e.target.value)}
            placeholder="새로운 대시보드"
            className="h-13"
          />
        </div>
        <div className="text-lg-16-semibold mb-5 flex flex-col gap-3">
          <p>색상</p>
          <div className="flex justify-between gap-4">
            {colors.map((color) => (
              <ColorOption
                key={color}
                color={color}
                selected={selectedColor === color}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>
        <input type="hidden" name="color" value={colorHex[selectedColor]} />
        <div className="flex justify-center gap-5">
          <Button type="button" onClick={onClose} variant="cancel">
            취소
          </Button>
          <Button type="submit" variant="primary">
            생성
          </Button>
        </div>
        <IconClose
          onClick={onClose}
          className="absolute top-6 right-6 h-6 w-6 cursor-pointer text-gray-400"
        />
      </form>
    </div>
  )
}
