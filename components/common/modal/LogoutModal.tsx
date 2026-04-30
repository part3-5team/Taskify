import ModalLayout from './ModalLayout'

interface LogoutModalProps {
  onClose: () => void
  onLogout: () => void
}

const BUTTON_STYLE =
  'text-2lg-18-semibold w-full rounded-2xl py-2 cursor-pointer'

const Title = () => (
  <h2 className="text-2xl-24-semibold text-gray-200">로그아웃 하시겠습니까?</h2>
)

const Buttons = ({ onClose, onLogout }: LogoutModalProps) => (
  <div className="text-lg-16-semibold flex gap-3 text-gray-100">
    <button
      onClick={onClose}
      className={`bg-gray-900 hover:bg-gray-600 ${BUTTON_STYLE}`}
    >
      취소
    </button>
    <button
      onClick={onLogout}
      className={`bg-red-500 hover:bg-red-600 ${BUTTON_STYLE}`}
    >
      로그아웃
    </button>
  </div>
)

export default function LogoutModal({ onClose, onLogout }: LogoutModalProps) {
  return (
    <ModalLayout
      onClose={onClose}
      className="bg-modal md:px-7.6 min-w-8.75 space-y-7.5 px-5 pt-10 pb-6 md:min-w-150 md:py-10 md:pb-7.5"
    >
      <Title />
      <Buttons onClose={onClose} onLogout={onLogout} />
    </ModalLayout>
  )
}
