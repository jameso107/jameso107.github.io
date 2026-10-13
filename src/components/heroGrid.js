// The hero's dot grid, shared by Hero (which draws it with DotGrid) and the
// opening animation (whose starfield settles onto exactly these dots before the
// live grid takes over). Kept free of DotGrid's imports so the intro doesn't
// pull gsap into the main bundle.

export const HERO_GRID = {
  dotSize: 5,
  baseColor: '#2b3366',
  activeColor: '#a78bfa',
  proximity: 140,
  shockRadius: 260,
  shockStrength: 5,
  resistance: 750,
  returnDuration: 1.5,
}

// Opacity of the grid layer once it has faded in (`hero-bg-in` in index.css).
export const HERO_GRID_OPACITY = 0.7

// Touch devices have no cursor, so the grid is pure texture there — a wider
// gap means fewer dots to redraw each frame, and easier on battery.
export const isCoarsePointer = () =>
  (typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches) ||
  (navigator.maxTouchPoints || 0) > 0

export const heroGridGap = (coarse) => (coarse ? 34 : 24)

// Dot centres for a width x height grid, laid out exactly as DotGrid's buildGrid().
export function gridDotCenters(width, height, dotSize, gap) {
  const cell = dotSize + gap
  const cols = Math.floor((width + gap) / cell)
  const rows = Math.floor((height + gap) / cell)
  const x0 = (width - (cell * cols - gap)) / 2 + dotSize / 2
  const y0 = (height - (cell * rows - gap)) / 2 + dotSize / 2
  const dots = []
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) dots.push({ x: x0 + i * cell, y: y0 + j * cell })
  }
  return dots
}
