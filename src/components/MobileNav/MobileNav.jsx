import { useState } from 'react'

/**
 * MobileNav
 *
 * Fixed top bar visible only on mobile (< 768px).
 * Shows the site name on the left and a hamburger button on the right.
 * Tapping the button opens a full-screen overlay with section links.
 *
 * CSS notes:
 *   - @utility hamburger-line / hamburger-open live in index.css
 *     because nth-child transforms can't be expressed in Tailwind.
 *   - Everything else is pure Tailwind.
 */
const MobileNav = ({ sections, activeIndex, locked, goTo }) => {
  const [open, setOpen] = useState(false)

  const handleGoTo = (index) => {
    if (locked) return
    setOpen(false)
    goTo(index)
  }

  return (
    <>
      {/* ── Top bar — hidden on md+ ── */}
      <header
        className="fixed top-0 left-0 right-0 z-[110] flex h-[52px] items-center justify-between px-5 md:hidden"
        style={{
          background: 'rgba(2, 6, 23, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--color-border-subtle)',
        }}
        aria-label="Site header"
      >
        {/* Site name */}
        <span className="text-sm font-bold tracking-[0.02em] text-primary">
          Jesus <span className="text-accent">Morales</span>
        </span>

        {/* Hamburger button */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-[200ms] hover:bg-surface"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {/* Three lines — animated to X when open */}
          <span className={`flex w-5 flex-col gap-[5px] ${open ? 'hamburger-open' : ''}`}>
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </span>
        </button>
      </header>

      {/* ── Full-screen overlay ── */}
      <div
        className={[
          'fixed inset-0 z-[105] flex flex-col items-center justify-center md:hidden',
          'transition-opacity duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        style={{
          background: 'rgba(2, 6, 23, 0.97)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
        aria-hidden={!open}
      >
        <nav aria-label="Section navigation">
          <ul className="flex w-full flex-col gap-1 px-10">
            {sections.map((section, index) => {
              const isActive = index === activeIndex
              return (
                <li key={section.id}>
                  <button
                    className={[
                      'flex w-full items-center gap-4 border-b py-4 text-[1.75rem] font-bold tracking-[-0.01em]',
                      'transition-colors duration-[200ms] ease-linear',
                      'last:border-b-0 disabled:cursor-not-allowed',
                      isActive
                        ? 'border-border-subtle text-accent'
                        : 'border-border-subtle text-secondary hover:text-primary',
                    ].join(' ')}
                    onClick={() => handleGoTo(index)}
                    disabled={locked}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {/* Accent pip */}
                    <span
                      className={[
                        'block h-1.5 w-1.5 flex-shrink-0 rounded-full transition-colors duration-[200ms]',
                        isActive ? 'bg-accent' : 'bg-transparent',
                      ].join(' ')}
                      aria-hidden="true"
                    />
                    {section.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default MobileNav
