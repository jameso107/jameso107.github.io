import { useEffect, useRef } from 'react'
import { HERO_GRID, HERO_GRID_OPACITY, gridDotCenters, heroGridGap, isCoarsePointer } from './heroGrid'

// Deep space → the three bodies orbit fast → they snap into a syzygy with a
// flash → the aligned logo flies into the header while the starfield settles
// onto the hero's dot grid. About 2.1s; a click skips ahead to the alignment so
// the logo still lands in the corner.
//
// Drawn imperatively (a canvas plus three positioned divs) on one rAF loop.
// While it plays, HomePage hides the header logo and text, the hero copy and
// the hero grid (the intro rules in index.css), and the callbacks hand over:
//   onStart     the first frame is on screen, so the pre-hydration cover can go
//   onReveal    the hero copy should start rising in
//   onComplete  the bodies sit exactly on the header logo and the stars on the
//               grid dots; swap in the real ones and unmount this. The last
//               frame stays up until then, so the handoff never shows a gap.
const T = {
  fadeIn: 0.25,
  alignStart: 0.75,
  alignEnd: 1.2,
  flyStart: 1.3,
  flyEnd: 2.1,
  starsStart: 1.15, // stars glide into the grid alongside the flight
  starsEnd: 2.1,
  reveal: 1.8,
}

// Orbit shapes from the original intro, periods sped up 3x. `key` matches the
// Logo orb each body lands on. Later bodies draw on top.
const SPEED = 3
const BODIES = [
  {
    key: 'sky', size: 56, r: 130, phase: 240, period: 4.0 / SPEED, alignX: 62, trail: '56,189,248',
    className: 'bg-gradient-to-br from-sky-400 to-sky-600 shadow-[0_0_30px_rgba(14,165,233,0.9)]',
  },
  {
    key: 'white', size: 80, r: 120, phase: 0, period: 3.0 / SPEED, alignX: -62, trail: '255,255,255',
    className: 'bg-white shadow-[0_0_40px_rgba(255,255,255,0.9)]',
  },
  {
    key: 'violet', size: 112, r: 140, phase: 120, period: 3.5 / SPEED, alignX: 0, trail: '167,139,250',
    className: 'bg-gradient-to-br from-violet-500 to-purple-600 shadow-[0_0_50px_rgba(167,139,250,1)]',
  },
]

const GRID_RGB = [1, 3, 5].map((i) => parseInt(HERO_GRID.baseColor.slice(i, i + 2), 16))
const GRID_R = HERO_GRID.dotSize / 2

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const prog = (t, a, b) => clamp((t - a) / (b - a))
const easeInOut = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2)
const easeOut = (p) => 1 - Math.pow(1 - p, 3)
const lerp = (a, b, p) => a + (b - a) * p

// Mostly white stars, with the odd violet or sky one.
const starColor = () =>
  Math.random() < 0.12 ? (Math.random() < 0.5 ? [196, 181, 253] : [125, 211, 252]) : [255, 255, 255]

const pinToTop = () => {
  if (!window.scrollY) return
  // Jump, rather than the page's smooth scroll-behavior.
  const html = document.documentElement
  const prev = html.style.scrollBehavior
  html.style.scrollBehavior = 'auto'
  window.scrollTo(0, 0)
  html.style.scrollBehavior = prev
}

export default function OpeningAnimation({ onStart, onReveal, onComplete }) {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const flashRef = useRef(null)
  const bodyRefs = useRef({})

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    const flash = flashRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      onStart()
      onComplete()
      return undefined
    }

    const hero = document.querySelector('[data-intro-hero]')
    const orbs = document.querySelectorAll('[data-intro-logo] [data-orb]')

    let W = 0
    let H = 0
    let scale = 1
    let jitter = 0
    // One star per on-screen grid dot, scattered around it so it reads as a
    // random starfield. The strip above the grid (the header) gets extra stars
    // that simply fade out. Random traits are kept by index, so a re-layout
    // moves the stars without reshuffling them.
    let gridDots = []
    let bandTop = 0
    let bandCount = 0
    const gridTraits = []
    const bandTraits = []
    const traitsAt = (list, i) =>
      list[i] ||
      (list[i] = {
        u: Math.random() * 2 - 1,
        v: Math.random() * 2 - 1,
        z: Math.random(),
        tw: Math.random() * Math.PI * 2,
        rgb: starColor(),
      })

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      scale = clamp(Math.min(W, H) / 560, 0.55, 1)

      const gap = heroGridGap(isCoarsePointer())
      const cell = HERO_GRID.dotSize + gap
      jitter = cell * 1.6
      gridDots = []
      let top = H
      if (hero) {
        const r = hero.getBoundingClientRect()
        for (const d of gridDotCenters(r.width, r.height, HERO_GRID.dotSize, gap)) {
          const x = r.left + d.x
          const y = r.top + d.y
          if (y > -GRID_R && y < H + GRID_R) {
            gridDots.push({ x, y })
            top = Math.min(top, y - GRID_R)
          }
        }
      }
      bandTop = clamp(top, 0, H)
      bandCount = Math.round((W * bandTop) / (cell * cell))
    }

    const headerTargets = () => {
      if (orbs.length !== BODIES.length) return null
      const out = {}
      orbs.forEach((orb) => {
        const r = orb.getBoundingClientRect()
        out[orb.dataset.orb] = { x: r.left + r.width / 2, y: r.top + r.height / 2, size: r.width }
      })
      return out
    }

    const dot = (x, y, r, a, rgb) => {
      if (a <= 0.01) return
      ctx.fillStyle = `rgba(${rgb},${a})`
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }

    const nebula = (x, y, r, rgb, a) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0, `rgba(${rgb},${a})`)
      g.addColorStop(1, `rgba(${rgb},0)`)
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)
    }

    const drawSpace = (t, spaceAlpha, fadeIn) => {
      ctx.clearRect(0, 0, W, H)
      if (spaceAlpha > 0) {
        ctx.globalAlpha = spaceAlpha
        ctx.fillStyle = '#05070f'
        ctx.fillRect(0, 0, W, H)
        nebula(W * 0.22 + t * 8, H * 0.3, Math.max(W, H) * 0.55, '139,92,246', 0.22)
        nebula(W * 0.82 - t * 8, H * 0.72, Math.max(W, H) * 0.5, '14,165,233', 0.18)
        nebula(W * 0.5, H * 0.5, Math.min(W, H) * 0.45, '167,139,250', 0.08)
        ctx.globalAlpha = 1
      }

      // Stars → grid dots: position, size, brightness and colour all converge
      // on what the live grid draws.
      const p = easeInOut(prog(t, T.starsStart, T.starsEnd))
      const star = (s) => ({
        drift: t * s.z * 10, // slow parallax
        r: 0.5 + s.z * 1.3,
        a: (0.35 + 0.65 * s.z) * (0.65 + 0.35 * Math.sin(t * (2 + s.z * 4) + s.tw)) * fadeIn,
      })
      gridDots.forEach((d, i) => {
        const s = traitsAt(gridTraits, i)
        const { drift, r, a } = star(s)
        dot(
          lerp(d.x + s.u * jitter - drift, d.x, p),
          lerp(d.y + s.v * jitter, d.y, p),
          lerp(r, GRID_R, p),
          lerp(a, HERO_GRID_OPACITY, p),
          s.rgb.map((c, k) => Math.round(lerp(c, GRID_RGB[k], p))),
        )
      })
      for (let i = 0; i < bandCount; i++) {
        const s = traitsAt(bandTraits, i)
        const { drift, r, a } = star(s)
        dot(((s.u + 1) / 2) * W - drift, ((s.v + 1) / 2) * bandTop, r, a * (1 - p), s.rgb)
      }
    }

    const orbitPos = (b, t) => {
      const ang = ((b.phase + (t / b.period) * 360) * Math.PI) / 180
      return { x: W / 2 + Math.cos(ang) * b.r * scale, y: H / 2 + Math.sin(ang) * b.r * scale }
    }

    const bodyState = (b, t, targets) => {
      const pAlign = easeInOut(prog(t, T.alignStart, T.alignEnd))
      const o = orbitPos(b, t)
      const aligned = { x: W / 2 + b.alignX * scale, y: H / 2 }
      let x = lerp(o.x, aligned.x, pAlign)
      let y = lerp(o.y, aligned.y, pAlign)
      let size = b.size * scale
      const pf = easeInOut(prog(t, T.flyStart, T.flyEnd))
      const tg = targets && targets[b.key]
      if (pf > 0 && tg) {
        // Quadratic bezier up and over into the header.
        const c = { x: lerp(aligned.x, tg.x, 0.35), y: Math.min(aligned.y, tg.y) - H * 0.08 }
        const u = 1 - pf
        x = u * u * aligned.x + 2 * u * pf * c.x + pf * pf * tg.x
        y = u * u * aligned.y + 2 * u * pf * c.y + pf * pf * tg.y
        size = lerp(size, tg.size, pf)
      }
      return { x, y, size }
    }

    const drawTrails = (t, alpha) => {
      if (alpha <= 0) return
      ctx.globalCompositeOperation = 'lighter'
      const steps = 16
      for (const b of BODIES) {
        for (let i = steps; i >= 1; i--) {
          const tt = t - i * 0.01
          if (tt < 0) continue
          const p = bodyState(b, tt, null)
          const k = 1 - i / steps
          ctx.fillStyle = `rgba(${b.trail},${0.16 * k * alpha})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, ((b.size * scale) / 2) * (0.35 + 0.55 * k), 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalCompositeOperation = 'source-over'
    }

    let raf = 0
    let t0 = 0
    let started = false
    let revealed = false
    let skipped = false

    const frame = (now) => {
      if (!t0) t0 = now
      const t = (now - t0) / 1000
      // Keep the page at the top even if the browser restores a scroll position
      // late (a reload from the logo while scrolled down).
      if (window.scrollY) {
        pinToTop()
        layout()
      }
      const targets = headerTargets()
      const fadeIn = easeOut(prog(t, 0, T.fadeIn))

      drawSpace(t, 1 - easeInOut(prog(t, T.flyStart, T.flyEnd)), fadeIn)
      drawTrails(Math.min(t, T.alignEnd), (1 - prog(t, T.alignStart + 0.15, T.alignEnd)) * fadeIn)

      for (const b of BODIES) {
        const s = bodyState(b, t, targets)
        const el = bodyRefs.current[b.key]
        el.style.width = el.style.height = `${s.size}px`
        el.style.transform = `translate(${s.x - s.size / 2}px, ${s.y - s.size / 2}px) scale(${0.3 + 0.7 * fadeIn})`
        el.style.opacity = fadeIn
      }

      const pFlash = prog(t, T.alignEnd - 0.1, T.alignEnd + 0.35)
      flash.style.transform = `translate(${W / 2}px, ${H / 2}px) scale(${0.4 + pFlash * 0.9})`
      flash.style.opacity = pFlash > 0 && pFlash < 1 ? Math.sin(Math.PI * pFlash) * 0.9 : 0

      if (!started) {
        started = true
        onStart()
      }
      if (!revealed && t > T.reveal) {
        revealed = true
        onReveal()
      }
      if (t >= T.flyEnd) {
        onComplete()
        return
      }
      raf = requestAnimationFrame(frame)
    }

    const skip = (e) => {
      e.stopPropagation() // the hero grid listens on window for click shockwaves
      if (skipped) return
      skipped = true
      const now = performance.now()
      if (t0 && (now - t0) / 1000 < T.alignStart) t0 = now - T.alignStart * 1000
    }
    // Keep the hidden grid still until it's on screen: no pointer glow, no thrown dots.
    const swallow = (e) => e.stopPropagation()
    // The intro owns the viewport while it plays.
    const block = (e) => e.preventDefault()

    root.addEventListener('click', skip)
    root.addEventListener('mousemove', swallow)
    root.addEventListener('wheel', block, { passive: false })
    root.addEventListener('touchmove', block, { passive: false })
    const ro = hero && typeof ResizeObserver === 'function' ? new ResizeObserver(() => layout()) : null
    if (ro) ro.observe(hero)
    window.addEventListener('resize', layout)

    pinToTop()
    layout()
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      root.removeEventListener('click', skip)
      root.removeEventListener('mousemove', swallow)
      root.removeEventListener('wheel', block)
      root.removeEventListener('touchmove', block)
      if (ro) ro.disconnect()
      window.removeEventListener('resize', layout)
    }
  }, [onStart, onReveal, onComplete])

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100] cursor-pointer" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      <div
        ref={flashRef}
        className="pointer-events-none absolute left-0 top-0 -ml-[300px] -mt-[300px] size-[600px] rounded-full opacity-0"
        style={{ background: 'radial-gradient(circle, rgba(196,181,253,.55), rgba(56,189,248,.18) 35%, transparent 65%)' }}
      />
      {BODIES.map((b) => (
        <div
          key={b.key}
          ref={(el) => {
            bodyRefs.current[b.key] = el
          }}
          className={`absolute left-0 top-0 rounded-full opacity-0 will-change-transform ${b.className}`}
        />
      ))}
    </div>
  )
}
