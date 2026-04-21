import Image from 'next/image'
import Feature2 from '@/assets/imgs/img_Feature2.png'
import LandingDesc from './LandingDesc'

export default function LandingFeature2({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Image src={Feature2} alt="" priority />
      <LandingDesc
        number={2}
        title={
          <>
            자세한 정보는 명확하게, <br /> 팀 논의는 빠르게 확인하세요
          </>
        }
        description={
          <>
            작업에 필요한 세부 내용을 손쉽게 정리하고, <br />
            댓글을 통해 팀원들과 빠르게 소통해보세요
          </>
        }
      />
    </div>
  )
}
