import Image, { StaticImageData } from 'next/image'
import LandingDesc from './LandingDesc'
import LandingFeature3_1 from '@/assets/imgs/img_Feature3_1.png'
import LandingFeature3_2 from '@/assets/imgs/img_Feature3_2.png'
import LandingFeature3_3 from '@/assets/imgs/img_Feature3_3.png'
import LandingFeature3_1_MD from '@/assets/imgs/img_Feature3_1_md.png'
import LandingFeature3_2_MD from '@/assets/imgs/img_Feature3_2_md.png'
import LandingFeature3_3_MD from '@/assets/imgs/img_Feature3_3_md.png'
import LandingFeature3_1_LG from '@/assets/imgs/img_Feature3_1_lg.png'
import LandingFeature3_2_LG from '@/assets/imgs/img_Feature3_2_lg.png'
import LandingFeature3_3_LG from '@/assets/imgs/img_Feature3_3_lg.png'

const IMG_CONFIG = [
  {
    img: LandingFeature3_1,
    label: '대시보드 설정',
    desc: '대시보드 사진과 이름을 변경할 수 있습니다.',
  },
  {
    img: LandingFeature3_2,
    label: '초대',
    desc: '새로운 팀원을 초대할 수 있습니다.',
  },
  {
    img: LandingFeature3_3,
    label: '구성원',
    desc: '구성원을 초대하고 내보낼 수 있습니다.',
  },
]

const IMG_CONFIG_MD = [
  {
    img: LandingFeature3_1_MD,
    label: '대시보드 설정',
    desc: '대시보드 사진과 이름을 변경할 수 있습니다.',
  },
  {
    img: LandingFeature3_2_MD,
    label: '초대',
    desc: '새로운 팀원을 초대할 수 있습니다.',
  },
  {
    img: LandingFeature3_3_MD,
    label: '구성원',
    desc: '구성원을 초대하고 내보낼 수 있습니다.',
  },
]

const IMG_CONFIG_LG = [
  {
    img: LandingFeature3_1_LG,
    label: '대시보드 설정',
    desc: '대시보드 사진과 이름을 변경할 수 있습니다.',
  },
  {
    img: LandingFeature3_2_LG,
    label: '초대',
    desc: '새로운 팀원을 초대할 수 있습니다.',
  },
  {
    img: LandingFeature3_3_LG,
    label: '구성원',
    desc: '구성원을 초대하고 내보낼 수 있습니다.',
  },
]

const Feature3Img = ({
  img,
  label,
  desc,
  className,
}: {
  img: StaticImageData
  label: string
  desc: string
  className?: string
}) => {
  return (
    <div className={className}>
      <Image src={img} alt="" priority className="mx-auto" />
      <div className="space-y-3">
        <h2 className="text-lg-16-bold text-gray-100">{label}</h2>
        <p className="text-md-14-medium text-gray-400">{desc}</p>
      </div>
    </div>
  )
}

export default function LandingFeature3({ className }: { className?: string }) {
  return (
    <div className={className}>
      <LandingDesc
        number={3}
        title={
          <>
            나에게 맞게, 더 효율적으로
            <br />
            생산성을 높이는 다양한 설정
          </>
        }
        description={
          <>
            작업 방식에 맞게 색상, 팀원, 구성원 등을
            <br />
            쉽게 관리할 수 있어요. <br />
            환경을 조율하면 일은 더 가볍고 빠르게 흘러갑니다.
          </>
        }
      />

      <div className="flex-row space-y-7.5 lg:flex">
        {IMG_CONFIG.map(({ img, label, desc }) => (
          <Feature3Img
            key={label}
            img={img}
            label={label}
            desc={desc}
            className="space-y-5 md:hidden"
          />
        ))}

        {IMG_CONFIG_MD.map(({ img, label, desc }) => (
          <Feature3Img
            key={label}
            img={img}
            label={label}
            desc={desc}
            className="hidden space-y-5 md:block lg:hidden"
          />
        ))}

        {IMG_CONFIG_LG.map(({ img, label, desc }) => (
          <Feature3Img
            key={label}
            img={img}
            label={label}
            desc={desc}
            className="hidden space-y-5 lg:block"
          />
        ))}
      </div>
    </div>
  )
}
