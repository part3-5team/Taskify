import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="bg-bg min-h-screen px-6">{children}</div>
}
