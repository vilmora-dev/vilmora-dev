import { useEffect, useRef } from 'react'

/* ─── tunables ─────────────────────────────────────────────────────────────
   Adjust these without touching any logic below.
──────────────────────────────────────────────────────────────────────────── */
const CONFIG = {
  count:           600,       // number of particles
  color:           '34,211,238',  // RGB of --color-accent (cyan)

  // particle
  baseSpeed:       0.4,      // base upward speed (px/frame)
  speedVariance:   0.3,      // ± random added to base speed
  dotRadius:       1.5,      // particle dot size (px)
  dotOpacity:      0.20,     // particle head opacity

  // trail
  trailLength:     55,       // number of past positions stored
  trailOpacity:    0.02,     // max trail opacity (tail fades to 0)
  trailWidth:      1,        // trail line width (px)

  // deflections — sharp corners
  deflectIntervalMin: 90,    // min frames between deflections
  deflectIntervalMax: 220,   // max frames between deflections
  deflectAngleRange:  55,    // ± degrees the new angle can deviate from upward

  // mouse repulsion
  mouseRadius:     130,      // px — repulsion field radius
  mouseStrength:   0.06,     // force magnitude (additive per frame)
  mouseFriction:   0.88,     // how quickly the nudge velocity bleeds off

  // wrap margin — particles re-enter from opposite edge
  edgeMargin:      20,
}

/* ─── Particle class ───────────────────────────────────────────────────────
   Fully self-contained. Each particle owns its state and knows how to
   update and draw itself.
──────────────────────────────────────────────────────────────────────────── */
class Particle {
  constructor(w, h) {
    this.w = w
    this.h = h
    this.reset(true)
  }

  reset(randomY = false) {
    const { baseSpeed, speedVariance, deflectIntervalMin, deflectIntervalMax } = CONFIG
    // Start anywhere across width, at bottom (or random Y on init)
    this.x  = Math.random() * this.w
    this.y  = randomY ? Math.random() * this.h : this.h + CONFIG.edgeMargin

    // Primary upward velocity with slight horizontal drift
    const speed = baseSpeed + Math.random() * speedVariance
    const angle = (-90 + (Math.random() - 0.5) * 20) * (Math.PI / 180) // mostly up
    this.vx = Math.cos(angle) * speed
    this.vy = Math.sin(angle) * speed

    // Nudge velocity from mouse repulsion (separate from main velocity)
    this.nx = 0
    this.ny = 0

    // Deflection countdown
    this.deflectIn = this._nextDeflect()
    this._scheduleDeflect()

    // Trail history
    this.trail = []
  }

  _nextDeflect() {
    const { deflectIntervalMin, deflectIntervalMax } = CONFIG
    return deflectIntervalMin + Math.floor(Math.random() * (deflectIntervalMax - deflectIntervalMin))
  }

  _scheduleDeflect() {
    this.deflectIn = this._nextDeflect()
  }

  _deflect() {
    // Snap to a new angle — sharp corner, no easing
    // Bias back toward upward after each deflection
    const { deflectAngleRange, baseSpeed, speedVariance } = CONFIG
    const speed   = baseSpeed + Math.random() * speedVariance
    // New angle: somewhere between -45° and -135° (upward hemisphere)
    // with a chance of dipping briefly downward for the corner effect
    const dip     = Math.random() < 0.35 // 35% chance of downward dip corner
    let angleDeg
    if (dip) {
      // Sharp corner: briefly go sideways-to-down then snap back next deflect
      angleDeg = (Math.random() < 0.5 ? 30 : 150) + (Math.random() - 0.5) * 30
    } else {
      angleDeg = -90 + (Math.random() - 0.5) * deflectAngleRange * 2
    }
    const angle = angleDeg * (Math.PI / 180)
    this.vx = Math.cos(angle) * speed
    this.vy = Math.sin(angle) * speed
  }

  update(mouseX, mouseY) {
    const { mouseRadius, mouseStrength, mouseFriction, edgeMargin } = CONFIG

    // Deflection timer
    this.deflectIn--
    if (this.deflectIn <= 0) {
      this._deflect()
      this._scheduleDeflect()
    }

    // Mouse repulsion
    if (mouseX !== null) {
      const dx   = this.x - mouseX
      const dy   = this.y - mouseY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < mouseRadius && dist > 0) {
        const force = (1 - dist / mouseRadius) * mouseStrength
        this.nx += (dx / dist) * force
        this.ny += (dy / dist) * force
      }
    }
    // Bleed off nudge velocity
    this.nx *= mouseFriction
    this.ny *= mouseFriction

    // Store trail position BEFORE moving
    this.trail.push({ x: this.x, y: this.y })
    if (this.trail.length > CONFIG.trailLength) this.trail.shift()

    // Move
    this.x += this.vx + this.nx
    this.y += this.vy + this.ny

    // Wrap edges
    if (this.x < -edgeMargin)        this.x = this.w + edgeMargin
    if (this.x > this.w + edgeMargin) this.x = -edgeMargin
    if (this.y < -edgeMargin)         this.reset(false)   // exited top → re-enter bottom
    if (this.y > this.h + edgeMargin) this.reset(false)   // exited bottom → re-enter bottom
  }

  draw(ctx) {
    const { color, trailOpacity, trailWidth, dotRadius, dotOpacity } = CONFIG
    const len = this.trail.length
    if (len < 2) return

    // Trail — line segments that fade from head to tail
    for (let i = 1; i < len; i++) {
      const t       = i / len                       // 0 = tail, 1 = head
      const alpha   = t * trailOpacity
      const prev    = this.trail[i - 1]
      const curr    = this.trail[i]

      ctx.beginPath()
      ctx.strokeStyle = `rgba(${color}, ${alpha})`
      ctx.lineWidth   = trailWidth
      ctx.moveTo(prev.x, prev.y)
      ctx.lineTo(curr.x, curr.y)
      ctx.stroke()
    }

    // Particle dot at current position
    ctx.beginPath()
    ctx.arc(this.x, this.y, dotRadius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${color}, ${dotOpacity})`
    ctx.fill()
  }
}

/* ─── Component ────────────────────────────────────────────────────────────
   Fixed full-screen canvas, pointer-events: none so it never captures clicks.
   To remove: delete this file + the import/JSX in App.jsx.
──────────────────────────────────────────────────────────────────────────── */
const ParticleBackground = () => {
  const canvasRef = useRef(null)
  const mouseRef  = useRef({ x: null, y: null })

  useEffect(() => {
    // Respect reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let raf
    let particles = []

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      // Rebuild particles on resize so they're distributed correctly
      particles = Array.from({ length: CONFIG.count }, () =>
        new Particle(canvas.width, canvas.height)
      )
    }

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const onMouseLeave = () => {
      mouseRef.current = { x: null, y: null }
    }

    const tick = () => {
      const { x: mx, y: my } = mouseRef.current
      const w = canvas.width
      const h = canvas.height

      // Clear with a translucent fill — this is what creates trail persistence.
      // A full clearRect would erase trails immediately.
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.update(mx, my)
        p.draw(ctx)
      }

      raf = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize',     resize)
    window.addEventListener('mousemove',  onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize',     resize)
      window.removeEventListener('mousemove',  onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      'fixed',
        inset:         0,
        zIndex:        0,
        pointerEvents: 'none',
        display:       'block',
      }}
    />
  )
}

export default ParticleBackground
