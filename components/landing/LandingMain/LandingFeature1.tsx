import Image from 'next/image'
import Feature2 from '@/assets/imgs/img_Feature1.png'
import Feature2Md from '@/assets/imgs/img_Feature1_md.png'
import Feature2lg from '@/assets/imgs/img_Feature1_lg.png'

import LandingDesc from './LandingDesc'

export default function LandingFeature1({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex min-w-0 shrink items-center justify-center lg:justify-end">
        <Image src={Feature2} alt="" priority className="md:hidden" />
        <Image
          src={Feature2Md}
          alt=""
          priority
          className="mx-auto hidden md:block lg:mx-0 lg:hidden"
        />
        <Image src={Feature2lg} alt="" priority className="hidden lg:block" />
      </div>
      <LandingDesc
        number={1}
        title={
          <>
            내가 등록한 사진으로 <br />더 기억에 남는 할 일 리스트
          </>
        }
        description={
          <>
            카드 내 추가한 이미지를 <br className="md:hidden" />
            상단 썸네일로 노출하여 <br className="hidden md:block" /> 작업에
            대한 내용을 <br className="md:hidden" />더 직관적으로 떠올릴 수
            있어요
          </>
        }
      />
    </div>
  )
}
