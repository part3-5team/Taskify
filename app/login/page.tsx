import AuthLayout from '@/components/auth/AuthLayout'
import LoginForm from '@/components/auth/LoginForm'
import LoginLink from '@/components/auth/LoginForm/LoginLink'
import AuthLogo from '@/components/auth/AuthLayout/AuthLogo'

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="mx-auto max-w-130 pt-50">
        <AuthLogo />
        <LoginForm />
        <LoginLink />
      </div>
    </AuthLayout>
  )
}
