import { useEffect, useRef } from 'react'

/**
 *  useSectionScroll uses top and bottom sentinels with IntersectionObserver to activate 
 *  a section when its leading edge enters 50% of the viewport and deactivate it when its 
 *  trailing edge leaves, handling both scroll directions and tall sections.
 */
export function useSectionScroll({
  topSentinelRef,
  bottomSentinelRef,
  index,
  onActivate,
  onDeactivate,
}) {
  const onActivateRef   = useRef(onActivate)
  const onDeactivateRef = useRef(onDeactivate)
  onActivateRef.current   = onActivate
  onDeactivateRef.current = onDeactivate

  useEffect(() => {
    const top    = topSentinelRef.current
    const bottom = bottomSentinelRef.current
    if (!top || !bottom) return

    //    Top sentinel
    // ONLY activates — fires when scrolling DOWN into this section.
    // We never deactivate from the top sentinel: the top exiting upward
    // is already handled by the previous section's bottom sentinel activating.
    const topObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onActivateRef.current?.(index)
        }
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -50% 0px',
      }
    )

    //    Bottom sentinel
    // Activates when scrolling UP into this section (bottom re-enters from below).
    // Deactivates when scrolling DOWN past this section (bottom exits downward).
    const bottomObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onActivateRef.current?.(index)
        } else {
          onDeactivateRef.current?.(index)
        }
      },
      {
        threshold: 0,
        rootMargin: '-50% 0px 0px 0px',
      }
    )

    topObserver.observe(top)
    bottomObserver.observe(bottom)

    return () => {
      topObserver.unobserve(top)
      bottomObserver.unobserve(bottom)
    }
  }, [topSentinelRef, bottomSentinelRef, index])
}
