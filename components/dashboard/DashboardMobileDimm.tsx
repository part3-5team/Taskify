'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useSidebar } from '@/libs/contexts/SideBarContext'

export default function DashboardMobileDimm() {
  const { isOpen, close } = useSidebar()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}
    </AnimatePresence>
  )
}
