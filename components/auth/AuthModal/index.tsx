import { AuthState } from '@/libs/types/Auth'
import Button from '@/components/common/button'
import ModalLayout from '@/components/common/modal/ModalLayout'

interface AuthModalProps {
  state: AuthState
  onClick: () => void
}

export default function AuthModal({ state, onClick }: AuthModalProps) {
  return (
    <ModalLayout
      className="space-y-8 px-7.5 py-7.5 md:w-114.5 md:px-12.5 md:pt-12.5 md:pb-7.5"
      onClose={onClick}
    >
      <p className="text-lg-16-semibold">{state.message}</p>
      <Button onClick={onClick} className="w-full">
        확인
      </Button>
    </ModalLayout>
  )
}
