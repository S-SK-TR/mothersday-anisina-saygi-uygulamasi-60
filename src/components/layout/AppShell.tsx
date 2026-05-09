import { ParticleBackground } from '../motion/ParticleBackground'
import { HeroSection } from './HeroSection'
import { SignatureBadge } from './SignatureBadge'
import { motion, AnimatePresence } from 'framer-motion'
import { PWAInstallButton } from '../pwa/PWAInstallButton'

export function AppShell() {
  return (
    <div className="relative min-h-screen selection:bg-primary/20 selection:text-primary-700">
      <ParticleBackground />

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative z-10"
        >
          <HeroSection />

          {/* Content Sections can be added here if needed */}
          <div className="max-w-4xl mx-auto px-6 pb-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="glass p-12 rounded-3xl text-center relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />

              <blockquote className="text-2xl font-display italic text-gray-700 mb-6">
                "Seni Çok Seviyorum Anne"
              </blockquote>
              <div className="w-12 h-12 mx-auto mb-6 text-primary/20">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <p className="text-gray-500 font-light tracking-wide uppercase text-sm">
                Sonsuz sevgi, saygı ve minnetle...
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <SignatureBadge />

      {/* Decorative borders */}
      <div className="fixed inset-0 border-[16px] border-white/10 pointer-events-none z-50" />
      <div className="fixed inset-0 border-[1px] border-primary/5 pointer-events-none z-50 m-4" />
    </div>
  )
}