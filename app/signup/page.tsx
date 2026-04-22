import Link from 'next/link'
import AuthLayout from '@/components/auth/AuthLayout'
import SignupForm from '@/components/auth/SignupForm'
import SignupLink from '@/components/auth/SignupForm/SignupLink'

export default function SignupPage() {
  return (
    <AuthLayout>
      <div className="mx-auto max-w-130 pt-50">
        <div className="mb-7.5 text-center text-white">
          <Link href="/">로고</Link>
        </div>
        <SignupForm />
        <SignupLink />
      </div>
    </AuthLayout>
  )
}
