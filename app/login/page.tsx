import Link from 'next/link'
import AuthLayout from '@/components/auth/AuthLayout'
import LoginForm from '@/components/auth/LoginForm'
import LoginLink from '@/components/auth/LoginForm/LoginLink'

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="mx-auto max-w-130 pt-50">
        <div className="mb-7.5 text-center text-white">
          <Link href="/">로고</Link>
        </div>
        <LoginForm />
        <LoginLink />
      </div>
    </AuthLayout>
  )
}
