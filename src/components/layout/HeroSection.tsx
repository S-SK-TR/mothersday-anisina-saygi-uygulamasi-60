import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="inline-block text-primary font-medium tracking-widest uppercase mb-4 text-sm"
        >
          Sonsuz Bir Sevgiyle
        </motion.span>

        <h1 className="text-5xl md:text-8xl font-display font-bold text-secondary-foreground mb-8 text-glow leading-tight">
          Anneler Günün<br />
          <span className="italic text-primary">Kutlu Olsun</span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-12">
            Hayatımıza anlam katan, her anımızda yanımızda olan,
            şefkatiyle dünyamızı güzelleştiren melek anneme...
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative center element */}
      <motion.div
        initial={{ opacity: 0, rotate: -45 }}
        animate={{ opacity: 0.1, rotate: 0 }}
        transition={{ duration: 2, delay: 0.8 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
      >
        <svg viewBox="0 0 200 200" fill="currentColor" className="text-primary">
          <path d="M100 20 C100 20 140 60 140 100 C140 140 100 180 100 180 C100 180 60 140 60 100 C60 60 100 20 100 20Z" />
        </svg>
      </motion.div>
    </section>
  )
}
