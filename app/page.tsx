import LandingHeader from '@/components/landing/LandingHeader'
import LandingFooter from '@/components/landing/LandingFooter'
import LandingMain from '@/components/landing/LandingMain'

export default function HomePage() {
  return (
    <>
      <LandingHeader className="flex items-center justify-between px-5 py-3.5 lg:px-7.5 lg:py-6" />
      <LandingMain />
      <LandingFooter className="bg-black-400 items-center space-y-5 px-7.5 py-3.5 lg:flex lg:justify-between lg:space-y-0" />
    </>
  )
}
