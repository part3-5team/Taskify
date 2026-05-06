'use client'

import { useSidebar } from '@/libs/contexts/SideBarContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export default function MobileSidebarWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { isOpen, close } = useSidebar()
  const { id } = useParams()

  useEffect(() => {
    close()
  }, [id])

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-50 w-60 md:hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden md:block">{children}</div>
    </>
  )
}
