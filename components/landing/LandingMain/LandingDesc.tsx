import LandingPoint from './LandingPoint'

interface LandingDescProps {
  number: number
  title: React.ReactNode
  description: React.ReactNode
}

export default function LandingDesc({
  number,
  title,
  description,
}: LandingDescProps) {
  return (
    <div className="space-y-3">
      <LandingPoint number={number} />

      <h2 className="text-2xl-24-bold leading-7 break-keep text-gray-100 md:leading-8">
        {title}
      </h2>

      <p className="leading-6 text-gray-400">{description}</p>
    </div>
  )
}
