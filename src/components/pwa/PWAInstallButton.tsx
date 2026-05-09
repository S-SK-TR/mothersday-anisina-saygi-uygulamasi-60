import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Heart } from 'lucide-react'

export function PWAInstallButton() {
  const [installPrompt, setInstallPrompt] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handler = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later.
      setInstallPrompt(e)
      // Show the install button
      setIsVisible(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsVisible(false)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!installPrompt) return

    // Show the install prompt
    installPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await installPrompt.userChoice
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
      setIsVisible(false)
    } else {
      console.log('User dismissed the install prompt')
    }

    setInstallPrompt(null)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]"
        >
          <button
            onClick={handleInstallClick}
            className="group relative flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl hover:bg-white/20 transition-all duration-500 overflow-hidden"
          >
            {/* Background Gradient Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
              <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
            </div>
            
            <div className="relative text-left">
              <p className="text-xs font-medium text-primary/80 uppercase tracking-widest leading-none mb-1">
                Uygulamayı
              </p>
              <p className="text-sm font-semibold text-white leading-none">
                Ekrana Ekle
              </p>
            </div>

            <div className="relative ml-2 opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all duration-500">
              <Heart size={16} fill="currentColor" />
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
