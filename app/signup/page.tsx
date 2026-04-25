import AuthLayout from '@/components/auth/AuthLayout'
import SignupForm from '@/components/auth/SignupForm'
import SignupLink from '@/components/auth/SignupForm/SignupLink'
import AuthLogo from '@/components/auth/AuthLayout/AuthLogo'

export default function SignupPage() {
  return (
    <AuthLayout>
      <div className="mx-auto max-w-130 pt-20">
        <AuthLogo />
        <SignupForm />
        <SignupLink />
      </div>
    </AuthLayout>
  )
}
