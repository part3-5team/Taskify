import Link from 'next/link'

export default function LoginLink() {
  return (
    <p className="text-lg-16-medium mt-5 text-center">
      <span className="text-gray-400">회원이 아니신가요? </span>
      <Link href="/signup" className="text-gray-300">
        회원가입하기
      </Link>
    </p>
  )
}
