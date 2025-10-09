import { useEffect, useRef, useState } from 'react'

export default function useCountUp(target = 0, { duration = 1000, startOnMount = true } = {}) {
  const [value, setValue] = useState(0)
  const raf = useRef(null)
  const start = useRef(null)

  useEffect(() => {
    if (!startOnMount) return
    const animate = (t) => {
      if (!start.current) start.current = t
      const p = Math.min(1, (t - start.current) / duration)
      setValue(Math.floor(p * target))
      if (p < 1) raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)
    return () => raf.current && cancelAnimationFrame(raf.current)
  }, [target, duration, startOnMount])

  return value
}
