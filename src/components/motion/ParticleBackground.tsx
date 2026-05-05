import { motion, useScroll, useTransform } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  duration: number
  delay: number
  type: 'heart' | 'rose'
}

export function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([])
  const { scrollY } = useScroll()
  const yRange = useTransform(scrollY, [0, 1000], [0, -200])

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (40 - 10) + 10,
      rotation: Math.random() * 360,
      duration: Math.random() * (20 - 10) + 10,
      delay: Math.random() * 10,
      type: Math.random() > 0.6 ? 'rose' : 'heart'
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-mesh">
      <motion.div style={{ y: yRange }} className="relative w-full h-full">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ 
              opacity: 0,
              x: `${particle.x}vw`,
              y: '110vh',
              rotate: particle.rotation 
            }}
            animate={{ 
              opacity: [0, 0.4, 0.4, 0],
              y: '-10vh',
              x: [`${particle.x}vw`, `${particle.x + (Math.random() * 10 - 5)}vw`],
              rotate: particle.rotation + 360
            }}
            transition={{ 
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear"
            }}
            className="absolute"
          >
            {particle.type === 'heart' ? (
              <Heart 
                size={particle.size} 
                className="text-primary/10 fill-primary/5" 
              />
            ) : (
              <svg 
                width={particle.size} 
                height={particle.size} 
                viewBox="0 0 24 24" 
                fill="none" 
                className="text-primary/10 fill-primary/5"
              >
                <path d="M12 22C12 22 20 18 20 12C20 8 18 4 12 2C6 4 4 8 4 12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="1" />
                <path d="M12 8C12 8 14 7 15 8C16 9 15 11 12 13C9 11 8 9 9 8C10 7 12 8 12 8Z" fill="currentColor" />
              </svg>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
