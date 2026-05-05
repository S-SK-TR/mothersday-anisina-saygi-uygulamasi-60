import { motion } from 'framer-motion'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <motion.div
      className={`bg-white/80 backdrop-blur-glass rounded-2xl border border-white/20 shadow-glass hover:shadow-glass-hover transition-shadow duration-300 ${className}`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {children}
    </motion.div>
  )
}