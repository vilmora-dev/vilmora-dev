import { Suspense } from 'react'
import sections from './config/sections'
import SectionShell from './components/SectionShell/SectionShell'
import NavDots from './components/NavDots/NavDots'
import MobileNav from './components/MobileNav/MobileNav'
import ParticleBackground from './components/ParticleBackground/ParticleBackground'
import { usePortfolioNav } from './hooks/usePortfolioNav'
import './App.css'

function App() {
  const {
    activeIndex,
    locked,
    scrollDirection,
    goTo,
    onActivate,
    onDeactivate,
  } = usePortfolioNav(sections.length)

  return (
    <>
      {/* Particle background — fixed, z-index 0, pointer-events none */}
      <ParticleBackground />

      {/* Mobile top bar + overlay menu — hidden on desktop via CSS */}
      <MobileNav
        sections={sections}
        activeIndex={activeIndex}
        locked={locked}
        goTo={goTo}
      />

      <Suspense fallback={
        <div className='min-h-screen bg-[var(--color-bg)]' />
      }>
        {sections.map((section, index) => {
          const SectionComponent = section.component
          return (
            <SectionShell
              key={section.id}
              id={section.id}
              index={index}
              activeIndex={activeIndex}
              isActive={index === activeIndex}
              scrollDirection={scrollDirection}
              onActivate={onActivate}
              onDeactivate={onDeactivate}
            >
              <SectionComponent />
            </SectionShell>
          )
        })}
      </Suspense>

      {/* Desktop right-edge nav — hidden on mobile via CSS */}
      <NavDots
        sections={sections}
        activeIndex={activeIndex}
        locked={locked}
        goTo={goTo}
      />
    </>
  )
}

export default App
