import { useState, useEffect } from 'react'
import { SiReact, SiJavascript, SiTypescript, SiVite, SiTailwindcss,
         SiLaravel, SiPhp, SiPython, SiNodedotjs,
         SiGooglecloud, SiMysql, SiPostgresql, SiMongodb,
         SiGithub, SiGithubactions } from 'react-icons/si'
import { TbLayout2, TbServer, TbCloud, TbGitBranch } from 'react-icons/tb'

const skillGroups = [
  {
    title: 'Frontend',
    icon: 'layout',
    items: [
      { label: 'React',        Icon: SiReact,       color: '#61DAFB' },
      { label: 'TypeScript',   Icon: SiTypescript,  color: '#3178C6' },
      { label: 'JavaScript',   Icon: SiJavascript,  color: '#F7DF1E' },
      { label: 'Vite',         Icon: SiVite,        color: '#646CFF' },
      { label: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
    ],
  },
  {
    title: 'Backend & APIs',
    icon: 'server',
    items: [
      { label: 'Laravel',   Icon: SiLaravel,   color: '#FF2D20' },
      { label: 'PHP',       Icon: SiPhp,       color: '#777BB4' },
      { label: 'Python',    Icon: SiPython,    color: '#3776AB' },
      { label: 'Node.js',   Icon: SiNodedotjs, color: '#5FA04E' },
      { label: 'REST APIs', Icon: null,        color: '#94a3b8' },
      { label: 'SQL',       Icon: null,        color: '#94a3b8' },
    ],
  },
  {
    title: 'Infrastructure & Deploy',
    icon: 'cloud',
    items: [
      { label: 'GCP',            Icon: SiGooglecloud, color: '#4285F4' },
      { label: 'AWS',            Icon: null,          color: '#FF9900' },
      { label: 'MySQL',          Icon: SiMysql,       color: '#4479A1' },
      { label: 'PostgreSQL',     Icon: SiPostgresql,  color: '#4169E1' },
      { label: 'MongoDB',        Icon: SiMongodb,     color: '#47A248' },
      { label: 'Shared Hosting', Icon: null,          color: '#94a3b8' },
      { label: 'Linux CLI',      Icon: null,          color: '#94a3b8' },
    ],
  },
  {
    title: 'Tools & Workflow',
    icon: 'git-branch',
    items: [
      { label: 'Git & GitHub',    Icon: SiGithub,        color: '#f0f6fc' },
      { label: 'GitHub Actions',  Icon: SiGithubactions, color: '#2088FF' },
      { label: 'ClickUp & Jira',  Icon: null,            color: '#94a3b8' },
      { label: 'Bilingual EN/ES', Icon: null,            color: '#94a3b8' },
    ],
  },
]

const headerIcons = {
  'layout':     TbLayout2,
  'server':     TbServer,
  'cloud':      TbCloud,
  'git-branch': TbGitBranch,
}

/* ── Pill with brand-color hover — same JS pattern as Hero icons ── */
const SkillPill = ({ label, Icon, color }) => {
  const handleEnter = (e) => {
    e.currentTarget.style.color = color
    e.currentTarget.style.borderColor = color
    e.currentTarget.style.background = `${color}18`
    e.currentTarget.style.transform = 'scale(1.08)'
  }
  const handleLeave = (e) => {
    e.currentTarget.style.color = ''
    e.currentTarget.style.borderColor = ''
    e.currentTarget.style.background = ''
    e.currentTarget.style.transform = ''
  }

  return (
    <span
      className="inline-flex cursor-default items-center gap-1.5 rounded border border-border bg-card px-2 py-1 text-[11px] text-secondary"
      style={{ transition: 'color 150ms ease, border-color 150ms ease, background 150ms ease, transform 150ms ease' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {Icon && <Icon size={11} aria-hidden="true" />}
      {label}
    </span>
  )
}

const SkillCard = ({ group }) => {
  const HeaderIcon = headerIcons[group.icon]
  return (
    <div
      className="rounded-lg border border-border bg-surface p-5"
      style={{ borderLeft: '3px solid var(--color-accent)' }}
    >
      {/* Card header */}
      <div className="mb-4 flex items-center gap-2.5">
        <div
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-accent"
          style={{ background: 'rgba(34,211,238,0.1)' }}
        >
          <HeaderIcon size={16} aria-hidden="true" />
        </div>
        <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-primary">
          {group.title}
        </h3>
      </div>

      {/* Skill pills */}
      <div className="flex flex-wrap gap-1.5">
        {group.items.map(({ label, Icon, color }) => (
          <SkillPill key={label} label={label} Icon={Icon} color={color} />
        ))}
      </div>
    </div>
  )
}

/* ── Quotes ── */
const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
  },
  {
    text: "You don't have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar",
  },
]

/* ── Rotating quote card ── */
const QuoteCard = () => {
  const [index, setIndex]     = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setVisible(false)
      setTimeout(() => {
        setIndex(prev => (prev + 1) % quotes.length)
        // Fade back in
        setVisible(true)
      }, 600) // half-second fade out before swapping text
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const { text, author } = quotes[index]

  return (
    <div
      className="rounded-lg border border-border bg-surface p-6"
      style={{ borderLeft: '3px solid var(--color-accent)' }}
    >
      <div
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 600ms ease',
        }}
      >
        <p className="mb-3 text-base leading-relaxed text-primary" style={{ fontStyle: 'italic' }}>
          "{text}"
        </p>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          — {author}
        </p>
      </div>
    </div>
  )
}

/*
── FAQ (commented out) ──

const faqs = [
  {
    q: 'What types of roles are you looking for?',
    a: "I'm looking for full-stack roles where I can work on real products end-to-end. I'm also drawn to integration work, connecting APIs, automating pipelines, making disparate systems talk to each other.",
  },
  {
    q: "How do you approach a project you've never built before?",
    a: "I start by understanding the problem before touching code: what's the input, what's the output, what are the constraints. Then I break it into layers, find the smallest thing I can build and actually run, and iterate from there. I'm comfortable reading docs, digging through source code, and learning whatever the stack requires. Most of my projects involved tools I hadn't used before.",
  },
  {
    q: "What's the most technically complex thing you've shipped?",
    a: "The Forest Carbon Modeling Platform at Delta Rising Foundation, LiDAR point clouds, NAIP satellite imagery, and soil/climate datasets combined to estimate carbon sequestration at plot and per-tree level. Trained LightGBM, XGBoost, and Random Forest models across 10+ spectral indices, a YOLOv8 canopy detection model at 72% mAP, and PDAL/GeoPandas pipelines built for full reproducibility across new forest sites.",
  },
  {
    q: 'What does your workflow look like?',
    a: "Git with feature branches and descriptive commits, PRs even on solo projects, CI via GitHub Actions where it makes sense. I lean on Vite, Laravel, and Docker locally. I document as I go, not novels, but enough that I can hand something off or pick it back up after three months without guessing.",
  },
]

const FaqItem = ({ q, a, isOpen, onToggle }) => (
  <div className="border-b border-border last:border-b-0">
    <button
      className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium text-primary transition-colors hover:text-accent"
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span>{q}</span>
      <span
        className="flex-shrink-0 text-muted transition-transform duration-300"
        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        aria-hidden="true"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="2,4 7,10 12,4" />
        </svg>
      </span>
    </button>
    <div
      className="overflow-hidden transition-all duration-300"
      style={{ maxHeight: isOpen ? '400px' : '0px' }}
    >
      <p className="pb-4 text-sm leading-relaxed text-secondary">{a}</p>
    </div>
  </div>
)

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null)
  const toggle = (i) => setOpenIndex(prev => prev === i ? null : i)
  return (
    <div className="mt-16">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">FAQ</p>
      <h3 className="mb-6 text-xl font-bold text-primary">Common questions</h3>
      <div className="rounded-lg border border-border bg-surface px-5">
        {faqs.map((item, i) => (
          <FaqItem key={i} q={item.q} a={item.a} isOpen={openIndex === i} onToggle={() => toggle(i)} />
        ))}
      </div>
    </div>
  )
}
*/

const Skills = () => {
  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="relative z-10 w-full max-w-4xl">

        {/* Section label */}
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
          Skills
        </p>

        <h2 className="mb-3 text-3xl font-bold text-primary">
          What I work with
        </h2>

        <p className="mb-10 text-base text-secondary">
          A snapshot of the technologies and areas I work with most often.
        </p>

        {/* 2×2 grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <SkillCard key={group.title} group={group} />
          ))}
        </div>

        {/* Quote card */}
        <div className="mt-6">
          <QuoteCard />
        </div>

      </div>
    </section>
  )
}

export default Skills
