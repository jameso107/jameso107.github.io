import { useState, useEffect } from 'react'

export default function OpeningAnimation({ onComplete }) {
  const [phase, setPhase] = useState('orbiting') // 'orbiting' -> 'aligning' -> 'complete'
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // After 3.5 seconds, start alignment
    const alignmentTimer = setTimeout(() => {
      setPhase('aligning')
    }, 3500)

    // After alignment completes (1.5 seconds), reveal content
    const revealTimer = setTimeout(() => {
      setPhase('complete')
      setShowContent(true)
      setTimeout(() => {
        onComplete()
      }, 500)
    }, 5000)

    return () => {
      clearTimeout(alignmentTimer)
      clearTimeout(revealTimer)
    }
  }, [onComplete])

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0b1020] transition-opacity duration-1000 ${showContent ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="relative w-full h-full flex items-center justify-center">
        {/* SYZYGY Text - centered */}
        <div className={`absolute text-6xl md:text-8xl font-extrabold text-white transition-all duration-700 z-10 ${phase === 'complete' ? 'opacity-0 scale-90' : 'opacity-100'}`}>
          <span className="inline-block tracking-tight">SYZYGY</span>
        </div>

        {/* Three Orbs Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Orb 1 - Left (White) - matches logo */}
          <div
            className={`absolute w-14 h-14 md:w-20 md:h-20 rounded-full bg-white shadow-[0_0_40px_rgba(255,255,255,0.9)] ${
              phase === 'orbiting'
                ? 'animate-orbit-1'
                : phase === 'aligning'
                ? 'animate-align-left'
                : 'translate-x-[-70px] md:translate-x-[-90px] translate-y-0'
            }`}
          />

          {/* Orb 2 - Center (Violet/Purple) - matches logo */}
          <div
            className={`absolute w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-[0_0_50px_rgba(167,139,250,1)] ${
              phase === 'orbiting'
                ? 'animate-orbit-2'
                : phase === 'aligning'
                ? 'animate-align-center'
                : 'translate-x-0 translate-y-0 scale-100'
            }`}
          />

          {/* Orb 3 - Right (Sky Blue) - matches logo */}
          <div
            className={`absolute w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 shadow-[0_0_30px_rgba(14,165,233,0.9)] ${
              phase === 'orbiting'
                ? 'animate-orbit-3'
                : phase === 'aligning'
                ? 'animate-align-right'
                : 'translate-x-[50px] md:translate-x-[70px] translate-y-0'
            }`}
          />
        </div>

        {/* Final Logo Formation (shown after alignment) */}
        {phase === 'complete' && (
          <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              {/* Large center circle (violet) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-[0_0_50px_rgba(167,139,250,1)]" />
              {/* Left circle (white) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-[70px] md:-translate-x-[90px] -translate-y-1/2 w-14 h-14 md:w-20 md:h-20 rounded-full bg-white shadow-[0_0_40px_rgba(255,255,255,0.9)]" />
              {/* Right circle (sky blue) */}
              <div className="absolute top-1/2 left-1/2 translate-x-[50px] md:translate-x-[70px] -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 shadow-[0_0_30px_rgba(14,165,233,0.9)]" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

