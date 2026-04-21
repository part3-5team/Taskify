import LandingHero from './LandingHero'
import LandingFeature1 from './LandingFeature1'
import LandingFeature2 from './LandingFeature2'
import LandingFeature3 from './LandingFeature3'

export default function LandingMain() {
  return (
    <main className="bg-bg flex flex-col items-center px-7">
      <LandingHero className="w-full space-y-15 py-15" />
      <LandingFeature1 className="space-y-7.5 py-5" />
      <LandingFeature2 className="space-y-7.5 py-10" />
      <LandingFeature3 className="space-y-7.5 py-10" />
    </main>
  )
}
