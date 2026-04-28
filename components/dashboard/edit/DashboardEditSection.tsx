import Input from '@/components/common/input'
import BackIcon from '@/assets/icons/ic_X.svg'
import Button from '@/components/common/button'
import { dashboardColors } from '@/libs/types/Dashboard'

interface DashboardEditSectionProps {
  title: string
  selectedColor: string
  onChangeTitle: (value: string) => void
  onChangeColor: (color: string) => void
  onSubmit: () => void
  onBack: () => void
}

export default function DashboardEditSection({
  title,
  selectedColor,
  onChangeTitle,
  onChangeColor,
  onSubmit,
  onBack,
}: DashboardEditSectionProps) {
  return (
    <section className="min-w-[375px] px-[20px] pt-[20px] md:min-w-[600px] md:pt-[30px] md:pl-[50px] lg:min-w-[1280px]">
      <div className="mb-8 flex items-start justify-between md:max-w-[800px]">
        <h1 className="md:text-3xl-32-bold text-xl-20-bold leading-[170%] font-bold text-white">
          대시보드 편집
        </h1>

        <div className="text-lg-14-semibold flex flex-col items-center gap-[6px] text-gray-300">
          <button
            type="button"
            onClick={onBack}
            className="text-xs text-gray-400 hover:text-white md:text-sm"
          >
            <div className="w-fit rounded-full border-2 border-gray-300 p-1">
              <BackIcon className="size-3.5 md:size-6" />
            </div>
          </button>
          <span className="hidden md:block">돌아가기</span>
        </div>
      </div>

      <div className="max-w-[620px]">
        <div className="mb-6">
          <label className="mb-2 block text-sm text-gray-300">이름</label>
          <Input
            value={title}
            onChange={(e) => onChangeTitle(e.target.value)}
            placeholder="대시보드명을 입력하세요"
            className="py-3"
          />
        </div>

        <div className="mb-8">
          <p className="mb-3 text-sm text-gray-300">색상</p>

          <div className="flex w-full flex-row items-center gap-3 md:gap-4">
            {dashboardColors.map((color) => {
              const isSelected = selectedColor === color.key

              return (
                <button
                  key={color.key}
                  type="button"
                  onClick={() => onChangeColor(color.key)}
                  className={`h-[57px] w-full flex-1 rounded-lg border-3 transition hover:border-blue-200 md:h-14 md:h-[60px] md:w-16 lg:h-[90px] ${
                    isSelected ? 'border-white' : 'border-transparent'
                  } ${color.className}`}
                  aria-label={color.key}
                />
              )
            })}
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-end">
          <Button onClick={onSubmit} size="md">
            변경
          </Button>
        </div>
      </div>
    </section>
  )
}
