import Link from 'next/link'

export default function SignupLink() {
  return (
    <p className="mt-5 text-center">
      <span className="text-gray-400">이미 회원이신가요? </span>
      <Link href="/login" className="text-gray-300">
        로그인하기
      </Link>
    </p>
  )
}
