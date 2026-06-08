import { useRef } from 'react'
import { useSectionScroll } from './useSectionScroll'

/**
 * SectionShell wraps each portfolio section with top and bottom sentinel divs, 
 * each observed by useSectionScroll to activate the section when its leading 
 * edge crosses 50% of the viewport and deactivate when its trailing edge crosses out.
 * 
 */
const SectionShell = ({ id, index, activeIndex, isActive, scrollDirection, onActivate, onDeactivate, children }) => {
  const topSentinelRef    = useRef(null)
  const bottomSentinelRef = useRef(null)

  useSectionScroll({ topSentinelRef, bottomSentinelRef, index, onActivate, onDeactivate })

  return (
    <section
      id={id}
      data-section-index={index}
      data-section-active={isActive}
      className='relative px-5 min-h-screen'
    >
      {/* Top sentinel — observed for scroll-down activation / scroll-up deactivation */}
      <div
        ref={topSentinelRef}
        aria-hidden="true"
        className='absolute t-0 x-0 h-[1px] pointer-events-none'
      />

      {/* Section content — fade + directional slide */}
      <div
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive
            ? 'translateY(0px)'
            : index < activeIndex
              ? 'translateY(-50px)'
              : 'translateY(50px)',
          transition: 'opacity 500ms ease, transform 700ms ease',
          willChange: 'opacity, transform',
        }}
      >
        {children}
      </div>

      {/* Bottom sentinel — observed for scroll-up activation / scroll-down deactivation */}
      <div
        ref={bottomSentinelRef}
        aria-hidden="true"
        className='absolute b-0 x-0 h-[1px] pointer-events-none'
      />
    </section>
  )
}

export default SectionShell
