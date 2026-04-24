import Input from "@/components/common/input";
import { dashboardColors, DashboardColor } from "./mock";
import BackIcon from '@/assets/icons/ic_X.svg';
import Button from "@/components/common/button";

interface DashboardEditSectionProps {
  title: string;
  selectedColor: DashboardColor;
  onChangeTitle: (value: string) => void;
  onChangeColor: (color: DashboardColor) => void;
  onSubmit: () => void;
  onBack: () => void;
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
    <section className="lg:min-w-[1280px] md:min-w-[600px] min-w-[375px] pt-[20px] px-[20px] md:pt-[30px] md:pl-[50px]">
      <div className="md:max-w-[800px] mb-8 flex items-start justify-between">
        <h1 className="font-bold text-white leading-[170%] md:text-3xl-32-bold text-xl-20-bold">대시보드 편집</h1>

        <div className="flex flex-col items-center text-gray-300  text-lg-14-semibold gap-[6px]">
          <button 
            type="button"
            onClick={onBack}
            className="text-xs text-gray-400 hover:text-white md:text-sm"
          >
            <div className="border-2 border-gray-300 rounded-full p-1 w-fit">
              <BackIcon className="md:size-6 size-3.5" />
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

          <div className="flex flex-row items-center w-full gap-3 md:gap-4">
            {dashboardColors.map((color) => {
              const isSelected = selectedColor === color.key;

              return (
                <button
                  key={color.key}
                  type="button"
                  onClick={() => onChangeColor(color.key)}
                  className={`flex-1 w-full h-[57px] md:h-[60px] lg:h-[90px] rounded-lg border-3 transition md:h-14 md:w-16 hover:border-blue-200 ${
                    isSelected ? "border-white" : "border-transparent"
                  } ${color.className}`}
                  aria-label={color.key}
                />
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-end">
          <Button
            onClick={onSubmit}
            size="md"
          >
            변경
          </Button>
        </div>
      </div>
    </section>
  )
}