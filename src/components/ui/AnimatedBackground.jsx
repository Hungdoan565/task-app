import { useEffect, useRef, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Particle System Component
function ParticleField({ count = 50 }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }))
  }, [count])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/20 backdrop-blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// Animated Blob Component
function AnimatedBlob({ className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute rounded-full mix-blend-multiply filter blur-3xl opacity-30 ${className}`}
      animate={{
        x: [0, 100, 0],
        y: [0, 100, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  )
}

// Gradient Orbs Component
function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Primary Orb */}
      <motion.div
        className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-radial from-primary-400/30 via-primary-500/20 to-transparent"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Secondary Orb */}
      <motion.div
        className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-radial from-secondary-400/30 via-secondary-500/20 to-transparent"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Accent Orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-radial from-accent-400/20 via-accent-500/10 to-transparent"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

// Wave Animation Component  
function WavePattern() {
  return (
    <svg
      className="absolute bottom-0 left-0 w-full h-48 text-primary-500/10"
      preserveAspectRatio="none"
      viewBox="0 0 1440 320"
    >
      <motion.path
        fill="currentColor"
        d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,96C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        animate={{
          d: [
            "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,96C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            "M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,106.7C960,107,1056,85,1152,64C1248,43,1344,21,1392,10.7L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,96C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </svg>
  )
}

// Main AnimatedBackground Component
export default function AnimatedBackground({ variant = 'default', children, className = '' }) {
  // Removed mouse parallax effect for smoother, more comfortable experience

  const reduceMotion = useReducedMotion()
  const resolvedVariant = reduceMotion ? 'waves' : variant

  const renderBackground = () => {
    switch (resolvedVariant) {
      case 'particles':
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-primary-100/50 to-secondary-50 dark:from-warm-gray-900 dark:via-primary-950/50 dark:to-warm-gray-900" />
            <ParticleField count={30} />
          </>
        )
      
      case 'blobs':
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-warm-gray-50 to-warm-gray-100 dark:from-warm-gray-900 dark:to-warm-gray-950" />
            <AnimatedBlob className="bg-primary-400 w-96 h-96 -top-20 -left-20" delay={0} />
            <AnimatedBlob className="bg-secondary-400 w-80 h-80 -bottom-20 -right-20" delay={2} />
            <AnimatedBlob className="bg-accent-400 w-72 h-72 top-1/2 left-1/2" delay={4} />
          </>
        )
      
      case 'gradient-orbs':
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-warm-gray-50 via-primary-50/30 to-warm-gray-100 dark:from-warm-gray-950 dark:via-primary-950/30 dark:to-warm-gray-900" />
            <GradientOrbs />
          </>
        )
      
      case 'waves':
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-white dark:from-warm-gray-900 dark:to-warm-gray-950" />
            <WavePattern />
            <ParticleField count={20} />
          </>
        )
      
      case 'mesh':
        return (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(at_50%_50%,_var(--tw-gradient-stops))] from-primary-200 via-transparent to-transparent opacity-40 dark:from-primary-800" />
            <div className="absolute inset-0 bg-[radial-gradient(at_80%_20%,_var(--tw-gradient-stops))] from-secondary-200 via-transparent to-transparent opacity-40 dark:from-secondary-800" />
            <div className="absolute inset-0 bg-[radial-gradient(at_20%_80%,_var(--tw-gradient-stops))] from-accent-200 via-transparent to-transparent opacity-40 dark:from-accent-800" />
            <div className="absolute inset-0 bg-[conic-gradient(at_50%_50%,_var(--tw-gradient-stops))] from-transparent via-primary-100/20 to-transparent dark:via-primary-900/20" />
          </>
        )
      
      default:
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-warm-gray-50 via-warm-gray-100 to-warm-gray-50 dark:from-warm-gray-900 dark:via-warm-gray-800 dark:to-warm-gray-900" />
            <ParticleField count={25} />
            <GradientOrbs />
          </>
        )
    }
  }

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
    >
      {renderBackground()}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

// Export individual components for reuse
export { ParticleField, AnimatedBlob, GradientOrbs, WavePattern }