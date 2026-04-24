import Link from 'next/link'
import LogoImg from '@/assets/imgs/img_Logo.svg'
import AuthLayout from '@/components/auth/AuthLayout'
import LoginForm from '@/components/auth/LoginForm'
import LoginLink from '@/components/auth/LoginForm/LoginLink'

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="mx-auto max-w-130 pt-50">
        <div className="mb-7.5 text-center text-white">
          <Link href="/" className="inline-block w-fit">
            <LogoImg className="mx-auto h-19.25 w-75 md:h-21.75 md:w-85" />
          </Link>
        </div>
        <LoginForm />
        <LoginLink />
      </div>
    </AuthLayout>
  )
}
