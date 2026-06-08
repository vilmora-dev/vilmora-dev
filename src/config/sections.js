// Single source of truth for portfolio structure.
// Adding or removing a section means editing this file only.

import { lazy } from 'react'

export const Hero      = lazy(() => import('../components/sections/Hero'))
export const Resume    = lazy(() => import('../components/sections/Resume'))
export const Portfolio = lazy(() => import('../components/sections/Portfolio'))
export const Contact   = lazy(() => import('../components/sections/Contact'))

/** @type {{ id: string, label: string, component: React.LazyExoticComponent }[]} */
const sections = [
  { id: 'hero',      label: 'Home',     component: Hero      },
  { id: 'resume',    label: 'Resume',   component: Resume    },
  { id: 'portfolio', label: 'Portfolio', component: Portfolio },
  { id: 'contact',   label: 'Contact',  component: Contact   },
]

export default sections
