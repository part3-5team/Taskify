import type { Metadata } from 'next'
import localFont from 'next/font/local'

import '@/libs/styles/globals.css'

const pretendard = localFont({
  src: './_fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

export const metadata: Metadata = {
  title: 'taskify',
  description: '나만의 일정 관리',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
