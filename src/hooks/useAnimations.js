import { useEffect, useRef, useState } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

// Hook for parallax effect based on mouse movement
export function useParallax(strength = 10) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)
  
  const rotateX = useTransform(y, [-0.5, 0.5], [`${strength}deg`, `-${strength}deg`])
  const rotateY = useTransform(x, [-0.5, 0.5], [`-${strength}deg`, `${strength}deg`])
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document.body.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      
      mouseX.set(x)
      mouseY.set(y)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])
  
  return { rotateX, rotateY, x, y }
}

// Hook for floating animation
export function useFloatingAnimation(options = {}) {
  const {
    duration = 6,
    distance = 10,
    rotationRange = 5,
  } = options
  
  return {
    animate: {
      y: [0, -distance, 0],
      rotate: [-rotationRange, rotationRange, -rotationRange],
    },
    transition: {
      y: {
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      },
      rotate: {
        duration: duration * 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }
}

// Hook for typing animation
export function useTypingAnimation(text, speed = 50) {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  
  useEffect(() => {
    setIsTyping(true)
    let index = 0
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prev) => prev + text[index])
        index++
      } else {
        clearInterval(timer)
        setIsTyping(false)
      }
    }, speed)
    
    return () => clearInterval(timer)
  }, [text, speed])
  
  return { displayText, isTyping }
}

// Hook for intersection observer animation
export function useInViewAnimation(threshold = 0.1) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true)
          setHasAnimated(true)
        }
      },
      { threshold }
    )
    
    if (ref.current) {
      observer.observe(ref.current)
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, hasAnimated])
  
  return { ref, isInView, hasAnimated }
}

// Hook for magnetic hover effect
export function useMagneticHover(strength = 0.5) {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const distanceX = (e.clientX - centerX) * strength
      const distanceY = (e.clientY - centerY) * strength
      
      setPosition({ x: distanceX, y: distanceY })
    }
    
    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
    }
    
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])
  
  return { ref, ...position }
}

// Hook for gradient animation
export function useGradientAnimation(colors = [], duration = 10) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    if (colors.length < 2) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % colors.length)
    }, duration * 1000)
    
    return () => clearInterval(interval)
  }, [colors, duration])
  
  const currentColor = colors[currentIndex] || colors[0]
  const nextColor = colors[(currentIndex + 1) % colors.length] || colors[1]
  
  return {
    background: `linear-gradient(135deg, ${currentColor}, ${nextColor})`,
    transition: `background ${duration}s ease`,
  }
}

// Hook for confetti animation
export function useConfetti() {
  const [particles, setParticles] = useState([])
  
  const trigger = (count = 50) => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 50,
      vx: (Math.random() - 0.5) * 10,
      vy: -(Math.random() * 15 + 10),
      angle: Math.random() * 360,
      angularVelocity: (Math.random() - 0.5) * 20,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      size: Math.random() * 10 + 5,
    }))
    
    setParticles(newParticles)
    
    // Clear particles after animation
    setTimeout(() => setParticles([]), 3000)
  }
  
  return { particles, trigger }
}

// Hook for ripple effect
export function useRipple() {
  const [ripples, setRipples] = useState([])
  
  const createRipple = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
    }
    
    setRipples((prev) => [...prev, newRipple])
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 600)
  }
  
  return { ripples, createRipple }
}