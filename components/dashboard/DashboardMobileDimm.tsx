'use client'

export default function DashboardMobileDimm() {
  const handleClose = () => {
    document
      .querySelectorAll('.sidebar')
      .forEach((el) => el.classList.add('hidden'))
  }

  return (
    <div
      onClick={handleClose}
      className="sidebar fixed inset-0 z-40 hidden bg-black/70 md:hidden"
    />
  )
}
