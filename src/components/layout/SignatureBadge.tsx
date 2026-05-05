import { motion } from 'framer-motion'

export function SignatureBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 1 }}
      className="fixed bottom-8 right-8 z-50 flex flex-col items-center"
    >
      <div className="relative group">
        {/* Laurel Wreath SVG */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          className="text-accent/40 group-hover:text-accent/60 transition-colors duration-500 animate-[spin_20s_linear_infinite]"
        >
          <path
            id="laurel"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            d="M 50,90 C 20,90 10,60 10,35 M 50,90 C 80,90 90,60 90,35"
          />
          {/* Leaves */}
          {[...Array(8)].map((_, i) => (
            <g key={i} transform={`rotate(${i * 20 - 70} 50 90)`}>
              <path
                d="M 50,30 Q 55,20 50,10 Q 45,20 50,30"
                fill="currentColor"
                transform="translate(0 -60)"
              />
            </g>
          ))}
          {[...Array(8)].map((_, i) => (
            <g key={i} transform={`rotate(${-i * 20 + 70} 50 90)`}>
              <path
                d="M 50,30 Q 55,20 50,10 Q 45,20 50,30"
                fill="currentColor"
                transform="translate(0 -60)"
              />
            </g>
          ))}
        </svg>

        {/* Signature Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <motion.span
            className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium mb-1"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Kızın
          </motion.span>
          <span className="font-display italic text-lg text-secondary-foreground">
            Defne
          </span>
        </div>
      </div>

      <div className="mt-2 h-px w-12 bg-accent/20" />
    </motion.div>
  )
}
