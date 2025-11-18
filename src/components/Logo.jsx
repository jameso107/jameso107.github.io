export default function Logo({ size = 'md' }) {
  // Size variants: 'sm' (footer), 'md' (header), 'lg' (larger)
  const sizes = {
    sm: {
      container: 'w-10 h-6',
      // Center: 16px (w-4), radius 8px. 60% overlap = 4.8px ≈ 5px. Left: 12px (w-3), radius 6px. Right: 10px (w-2.5), radius 5px
      // Left center: -8 + 5 - 6 = -9px, Right center: 8 - 3.2 + 5 = 9.8px ≈ 10px (40% overlap)
      left: 'w-3 h-3 -translate-x-[9px]',
      center: 'w-4 h-4',
      right: 'w-2.5 h-2.5 translate-x-[10px]',
      leftShadow: 'shadow-[0_0_10px_rgba(255,255,255,0.9)]',
      centerShadow: 'shadow-[0_0_15px_rgba(167,139,250,1)]',
      rightShadow: 'shadow-[0_0_8px_rgba(14,165,233,0.9)]'
    },
    md: {
      container: 'w-12 h-8',
      // Center: 20px (w-5), radius 10px. 60% overlap = 6px. Left: 16px (w-4), radius 8px. Right: 12px (w-3), radius 6px
      // Left center: -10 + 6 - 8 = -12px, Right center: 10 - 4 + 6 = 12px (40% overlap)
      left: 'w-4 h-4 -translate-x-[12px]',
      center: 'w-5 h-5',
      right: 'w-3 h-3 translate-x-[12px]',
      leftShadow: 'shadow-[0_0_15px_rgba(255,255,255,0.9)]',
      centerShadow: 'shadow-[0_0_20px_rgba(167,139,250,1)]',
      rightShadow: 'shadow-[0_0_12px_rgba(14,165,233,0.9)]'
    },
    lg: {
      container: 'w-16 h-12',
      // Center: 32px (w-8), radius 16px. 60% overlap = 9.6px ≈ 10px. Left: 24px (w-6), radius 12px. Right: 16px (w-4), radius 8px
      // Left center: -16 + 10 - 12 = -18px, Right center: 16 - 6.4 + 8 = 17.6px ≈ 18px (40% overlap)
      left: 'w-6 h-6 -translate-x-[18px]',
      center: 'w-8 h-8',
      right: 'w-4 h-4 translate-x-[18px]',
      leftShadow: 'shadow-[0_0_25px_rgba(255,255,255,0.9)]',
      centerShadow: 'shadow-[0_0_35px_rgba(167,139,250,1)]',
      rightShadow: 'shadow-[0_0_20px_rgba(14,165,233,0.9)]'
    }
  }

  const s = sizes[size] || sizes.md

  return (
    <div className={`relative ${s.container} flex items-center justify-center overflow-visible`}>
      {/* Orb 1 - Left (White) */}
      <div className={`absolute ${s.left} rounded-full bg-white ${s.leftShadow}`} />
      
      {/* Orb 2 - Center (Violet/Purple) */}
      <div className={`absolute ${s.center} rounded-full bg-gradient-to-br from-violet-500 to-purple-600 ${s.centerShadow}`} />
      
      {/* Orb 3 - Right (Sky Blue) */}
      <div className={`absolute ${s.right} rounded-full bg-gradient-to-br from-sky-400 to-sky-600 ${s.rightShadow}`} />
    </div>
  )
}

