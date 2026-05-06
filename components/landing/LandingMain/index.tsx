import LandingHero from './LandingHero'
import LandingFeature1 from './LandingFeature1'
import LandingFeature2 from './LandingFeature2'
import LandingFeature3 from './LandingFeature3'
import FadeIn from '@/components/common/FadeIn'

export default function LandingMain() {
  return (
    <main className="bg-bg flex flex-col items-center px-7 md:px-0">
      <LandingHero className="w-full py-15 md:flex md:flex-row md:justify-between lg:pl-0" />
      <FadeIn>
        <LandingFeature1 className="space-y-7.5 py-5 md:w-[535px] lg:flex lg:w-auto lg:justify-between lg:gap-32 lg:px-20" />
      </FadeIn>
      <FadeIn>
        <LandingFeature2 className="flex-row-reverse space-y-7.5 py-10 md:w-[535px] lg:flex lg:w-auto lg:max-w-[1344px] lg:justify-between lg:gap-42 lg:px-20" />
      </FadeIn>
      <FadeIn>
        <LandingFeature3 className="space-y-7.5 py-10 md:w-[535px] lg:w-auto lg:max-w-[1344px] lg:px-20" />
      </FadeIn>
    </main>
  )
}
