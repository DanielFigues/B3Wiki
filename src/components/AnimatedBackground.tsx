import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import Particles from './reactbits/Backgrounds/Particles/Particles'

function AnimatedBackground() {
  const reduceMotion = useReducedMotion()
  const [tabVisible, setTabVisible] = useState(() => !document.hidden)

  useEffect(() => {
    const onChange = () => setTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])

  if (reduceMotion || !tabVisible) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 opacity-60">
      <Particles
        particleCount={80}
        particleSpread={20}
        speed={0.06}
        particleColors={['#8b5cf6', '#ff7a5c', '#ffffff']}
        alphaParticles
        pixelRatio={1}
        className="h-full w-full"
      />
    </div>
  )
}

export default AnimatedBackground