import { useRef } from 'react'
import { SiReact, SiJavascript, SiTypescript, SiVite, SiTailwindcss,
         SiLaravel, SiPhp, SiPython, SiNodedotjs,
         SiGooglecloud, SiMysql, SiPostgresql, SiMongodb,
         SiGithub, SiGithubactions } from 'react-icons/si'
import { TbLayout2, TbServer, TbCloud, TbGitBranch } from 'react-icons/tb'

const experience = [
  {
    role: 'Application Developer',
    company: 'Delta Rising Foundation',
    period: 'Aug 2025 — May 2026',
    projects: [
      {
        name: 'Grant Discovery Platform',
        period: 'Mar 2025 — May 2026',
        bullets: [
          'Laravel 13 + React 18 dashboard backed by a Python scraper across 6 sources (Grants.gov, FEMA HMA, CA Grants Portal, Simpler.Grants.gov, Terra Viva, DuckDuckGo).',
          'Applied all-MiniLM-L6-v2 semantic scoring for mission-relevance filtering.',
          'Built role-based access, an immutable audit log, and a priority-tiered keyword budget with round-robin initiative rotation — daily GitHub Actions runs under 60 minutes.',
        ],
      },
      {
        name: 'Forest Carbon Modeling Platform',
        period: 'Aug 2025 — Mar 2026',
        bullets: [
          'ML pipeline combining LiDAR, NAIP imagery, and soil/climate data to estimate per-tree carbon sequestration.',
          'Trained LightGBM/XGBoost/Random Forest models with 10+ spectral indices (NDVI, EVI, VARI, NDWI, NBR).',
          'Trained YOLOv8 for automated canopy detection (72% mAP) and built PDAL/GeoPandas pipelines for reproducible model training across new forest sites.',
        ],
      },
    ],
  },
  {
    role: 'Full-Stack Developer',
    company: 'COBACH',
    period: 'Apr 2024 — Oct 2024',
    bullets: [
      'Built a centralized project management system streamlining task tracking, deadlines, status updates, and support ticketing across COBACH educational programs.',
      'Admin dashboard with diagrams visualizing project progress across departments and teams.',
      'Kanban board with drag-and-drop functionality displaying all project activities.',
      'Document management system for attaching files and tracking reports per activity.',
      'Ticketing system for troubleshooting and admin-only actions.',
    ],
  },
]

const education = [
  {
    degree: 'B.S. Software Development Engineering',
    school: 'Universidad Abierta y a Distancia de México (UnADM)',
    period: 'Jul 2020 — Dec 2024',
  },
  {
    degree: 'Google IT Support Professional Certificate',
    school: 'Google / Coursera',
    period: 'Jul 2023 — Dec 2023',
  },
]

/* ── Skill cards ── */
const skillGroups = [
  {
    title: 'Frontend',
    Icon: TbLayout2,
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
    Icon: TbServer,
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
    Icon: TbCloud,
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
    Icon: TbGitBranch,
    items: [
      { label: 'Git & GitHub',    Icon: SiGithub,        color: '#f0f6fc' },
      { label: 'GitHub Actions',  Icon: SiGithubactions, color: '#2088FF' },
      { label: 'ClickUp & Jira',  Icon: null,            color: '#94a3b8' },
      { label: 'Bilingual EN/ES', Icon: null,            color: '#94a3b8' },
    ],
  },
]

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

const SkillCard = ({ group }) => (
  <div
    className="rounded-lg border border-border bg-surface p-5"
    style={{ borderLeft: '3px solid var(--color-accent)' }}
  >
    <div className="mb-4 flex items-center gap-2.5">
      <div
        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-accent"
        style={{ background: 'rgba(34,211,238,0.1)' }}
      >
        <group.Icon size={16} aria-hidden="true" />
      </div>
      <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-primary">
        {group.title}
      </h3>
    </div>
    <div className="flex flex-wrap gap-1.5">
      {group.items.map(({ label, Icon, color }) => (
        <SkillPill key={label} label={label} Icon={Icon} color={color} />
      ))}
    </div>
  </div>
)

const Resume = () => {
  const iframeRef = useRef(null)

  const handlePrint = () => {
    // Load a hidden iframe with the PDF and immediately trigger print
    const iframe = iframeRef.current
    iframe.src = `${import.meta.env.BASE_URL}resume.pdf`
    iframe.onload = () => {
      iframe.contentWindow.focus()
      iframe.contentWindow.print()
    }
  }

  return (
    <>
      {/* Hidden iframe used solely to trigger print dialog */}
      <iframe ref={iframeRef} aria-hidden="true" style={{ display: 'none' }} title="resume-print" />

    <section className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="relative z-10 w-full max-w-4xl">

        {/* Section label */}
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
          Resume
        </p>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-bold text-primary">
            Background &amp; Experience
          </h2>
          <button
            onClick={handlePrint}
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-bg shadow-md opacity-100 transition-opacity hover:opacity-85"
          >
            Download CV ↓
          </button>
        </div>

        {/* Professional summary */}
        <div className="mb-12 max-w-2xl">
          <p className="text-base leading-relaxed text-secondary">
            Full-stack software engineer with a B.S. in Software Engineering and 3+ years
            building web applications end-to-end — database schema and backend APIs to
            responsive frontends ready for production. I work across the stack with React,
            TypeScript, Laravel, PHP, Python, and Node.js, deploying on shared hosting,
            private servers, GCP, and AWS. Fluent in English and Spanish.
          </p>
        </div>

        {/* Experience */}
        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-accent">
          Experience
        </p>

        <div className="mb-14 space-y-6">
          {experience.map((job, i) => (
            <div key={i} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-accent" />
                {i < experience.length - 1 && (
                  <div className="mt-2 w-px flex-1 bg-border" />
                )}
              </div>
              <div className="pb-6">
                <div className="mb-2 flex flex-wrap items-baseline gap-2">
                  <span className="text-base font-semibold text-primary">{job.role}</span>
                  <span className="text-sm text-accent">@ {job.company}</span>
                  <span className="text-xs text-muted">{job.period}</span>
                </div>
                {job.projects ? (
                  <div className="space-y-4">
                    {job.projects.map((proj, pi) => (
                      <div key={pi}>
                        <div className="mb-1 flex flex-wrap items-baseline gap-2">
                          <span className="text-sm font-medium text-primary">{proj.name}</span>
                          <span className="text-xs text-muted">{proj.period}</span>
                        </div>
                        <ul className="space-y-1">
                          {proj.bullets.map((b, bi) => (
                            <li key={bi} className="flex items-start gap-2 text-sm text-secondary">
                              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-muted" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-1">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-secondary">
                        <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-muted" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-accent">
          Education
        </p>

        <div className="mb-14 space-y-4">
          {education.map((edu, i) => (
            <div key={i} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-accent" />
                {i < education.length - 1 && (
                  <div className="mt-2 w-px flex-1 bg-border" />
                )}
              </div>
              <div className="pb-4">
                <span className="text-base font-semibold text-primary">{edu.degree}</span>
                <div className="mt-0.5 flex flex-wrap items-baseline gap-2">
                  <span className="text-sm text-accent">{edu.school}</span>
                  <span className="text-xs text-muted">{edu.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-accent">
          Skills
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <SkillCard key={group.title} group={group} />
          ))}
        </div>

      </div>
    </section>
    </>
  )
}

export default Resume
