import { ReactNode, useEffect } from 'react'

const BASE_STYLE = 'bg-modal border-stroke rounded-3xl border text-center'

interface ModalLayoutProps {
  children: ReactNode
  className?: string
  onClose?: () => void
}

export default function ModalLayout({
  children,
  className,
  onClose,
}: ModalLayoutProps) {
  useEffect(() => {
    if (!onClose) return

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscapeKey)

    return () => {
      window.removeEventListener('keydown', handleEscapeKey)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-70 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className={`${BASE_STYLE} ${className ?? ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
