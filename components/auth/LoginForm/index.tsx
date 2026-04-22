import Input from '@/components/common/input'
import Button from '@/components/common/button'

export default function LoginForm() {
  return (
    <form action="" className="text-white">
      <div className="mb-7.5 flex w-full flex-col gap-3">
        <label htmlFor="email">아이디</label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          className="py-2.5"
        />
      </div>
      <div className="mb-7.5 flex w-full flex-col gap-3">
        <label htmlFor="password">비밀번호</label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          className="py-2.5"
        />
      </div>

      <div>
        <Button className="w-full">로그인</Button>
      </div>
    </form>
  )
}
