/**
 * NavDots
 *
 * Fixed right-edge vertical navigation. One dot per section.
 * The active dot's pip expands and shows its label.
 * Hovering the whole nav reveals all labels.
 * Clicking navigates to that section.
 *
 * Accessibility:
 *   - Each dot is a <button> with aria-label
 *   - aria-current="true" on the active dot
 *   - Keyboard focusable — Tab navigates between dots
 *   - Respects the locked state: disabled during transitions
 *
 * CSS notes:
 *   - .nav-dots-root / .nav-dot / .nav-dot--active are anchor
 *     class names used by the @utility nav-label rule in index.css
 *     (multi-level group-hover can't be expressed in plain Tailwind).
 *   - Everything else is pure Tailwind.
 */
const NavDots = ({ sections, activeIndex, locked, goTo }) => {
  return (
    <nav
      className="nav-dots-root fixed right-6 top-1/2 z-[100] -translate-y-1/2 hidden md:block"
      aria-label="Section navigation"
    >
      <h2 className="sr-only">Page sections</h2>
      <ul className="flex flex-col items-end gap-3.5">
        {sections.map((section, index) => {
          const isActive = index === activeIndex
          return (
            <li key={section.id}>
              <button
                className={[
                  'nav-dot',
                  isActive ? 'nav-dot--active' : '',
                  // layout + base styles
                  'flex items-center gap-2 rounded-full p-1',
                  // opacity: dim by default, full on hover/active
                  isActive ? 'opacity-100' : 'opacity-45 hover:opacity-100',
                  // transitions
                  'transition-opacity duration-[200ms] ease-linear',
                  // disabled
                  'disabled:cursor-default disabled:pointer-events-none',
                  // focus ring
                  'focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-3',
                ].join(' ')}
                onClick={() => goTo(index)}
                disabled={locked}
                aria-label={`Go to ${section.label}`}
                aria-current={isActive ? 'true' : undefined}
              >
                {/* Label — slides in from the left */}
                <span
                  className={[
                    'nav-label',
                    'text-[0.625rem] font-semibold uppercase tracking-[0.1em]',
                    isActive ? 'text-accent' : 'text-secondary',
                  ].join(' ')}
                  aria-hidden="true"
                >
                  {section.label}
                </span>

                {/* Pip — expands vertically when active */}
                <span
                  className={[
                    'block flex-shrink-0 w-1.5 rounded-full',
                    'transition-[height,background-color] duration-[400ms]',
                    'ease-[cubic-bezier(0.16,1,0.3,1)]',
                    isActive
                      ? 'h-6 bg-accent'
                      : 'h-1.5 bg-secondary group-hover:h-3 hover:h-3',
                  ].join(' ')}
                  aria-hidden="true"
                />
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default NavDots
