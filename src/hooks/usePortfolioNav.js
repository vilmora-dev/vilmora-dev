import { useState, useCallback, useEffect, useRef } from 'react'
import sections from '../config/sections'

export function usePortfolioNav(sectionCount) {
  const [activeIndex,     setActiveIndex]     = useState(0)
  const [locked,          setLocked]          = useState(false)
  const [scrollDirection, setScrollDirection] = useState('down') // 'up' | 'down'

  const activeRef = useRef(activeIndex)
  const lockedRef = useRef(locked)
  activeRef.current = activeIndex
  lockedRef.current = locked

  // Sentinel callbacks (passive scroll tracking)
  // onActivate: leading sentinel crossed 50% in — make this section active.
  // onDeactivate: trailing sentinel crossed 50% out — if this section is
  //   currently active, clear it so no section appears active mid-scroll.
  //   In practice the next section's onActivate fires almost simultaneously,
  //   so the gap is imperceptible.
  const onActivate = useCallback((index) => {
    if (lockedRef.current) return
    setScrollDirection(index > activeRef.current ? 'down' : 'up')
    setActiveIndex(index)
  }, [])

  // onDeactivate: bottom sentinel of a section scrolled off-screen downward.
  // Rather than setting activeIndex to -1 (which blanks everything), we do
  // nothing — the next section's top sentinel will fire activate imminently.
  // The NavDot for the previous section stays lit until the new one takes over,
  // which is visually correct and prevents any blank gap.
  const onDeactivate = useCallback((index) => {
    // we'll leave this for future event aggregation if needed.
  }, [])

  // Click / keyboard navigation
  const goTo = useCallback((index) => {
    if (lockedRef.current) return

    const clamped = Math.max(0, Math.min(index, sectionCount - 1))
    if (clamped === activeRef.current) return

    const toSection = sections[clamped]

    setLocked(true)
    setActiveIndex(clamped)

    requestAnimationFrame(() => {
      const target = document.getElementById(toSection?.id)
      if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' })
      setTimeout(() => setLocked(false), 800)
    })
  }, [sectionCount])

  const advance = useCallback(() => goTo(activeRef.current + 1), [goTo])
  const retreat = useCallback(() => goTo(activeRef.current - 1), [goTo])

  // Keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      switch (e.key) {
        case 'ArrowDown': case 'ArrowRight': e.preventDefault(); advance(); break
        case 'ArrowUp':   case 'ArrowLeft':  e.preventDefault(); retreat(); break
        default: break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [advance, retreat])

  return {
    activeIndex,
    locked,
    scrollDirection,
    goTo,
    advance,
    retreat,
    onActivate,
    onDeactivate,
  }
}
