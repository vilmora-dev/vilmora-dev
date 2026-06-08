import profileImg from '../../assets/images/profile.png'
import {
  SiReact,
  SiTypescript,
  SiLaravel,
  SiPhp,
  SiPython,
  SiNodedotjs,
  SiMysql,
  SiPostgresql,
  SiGooglecloud,
} from 'react-icons/si'
import { TbStack2, TbCloud, TbSettingsAutomation } from 'react-icons/tb'

// AWS was removed from Simple Icons v5 due to brand restrictions.
const stack = [
  { label: 'React',       Icon: SiReact,        color: '#61DAFB' },
  { label: 'TypeScript',  Icon: SiTypescript,   color: '#3178C6' },
  { label: 'Laravel',     Icon: SiLaravel,      color: '#FF2D20' },
  { label: 'PHP',         Icon: SiPhp,          color: '#777BB4' },
  { label: 'Python',      Icon: SiPython,       color: '#3776AB' },
  { label: 'Node.js',     Icon: SiNodedotjs,    color: '#5FA04E' },
  { label: 'MySQL',       Icon: SiMysql,        color: '#4479A1' },
  { label: 'PostgreSQL',  Icon: SiPostgresql,   color: '#4169E1' },
  { label: 'GCP',         Icon: SiGooglecloud,  color: '#4285F4' },
]

const services = [
  {
    Icon: TbStack2,
    title: 'Full-Stack Engineering',
    desc: 'End-to-end apps with React, REST APIs, and scalable backend integrations. Fast prototyping, clean UIs, and robust architecture.',
  },
  {
    Icon: TbCloud,
    title: 'Cloud & Backend Development',
    desc: 'Secure, scalable APIs and cloud-native systems on AWS and GCP. Built for reliability and maintainability.',
  },
  {
    Icon: TbSettingsAutomation,
    title: 'DevOps & Automation',
    desc: 'CI/CD pipelines, automated deployments, and infrastructure provisioning using Docker, GitHub Actions, and AWS services.',
  },
]

/* ── Custom tooltip wrapper ── */
const IconTooltip = ({ label, Icon, color }) => (
  <div className="group relative flex items-center justify-center">
    <div
      aria-label={label}
      role="img"
      className="cursor-default transition-transform duration-200 group-hover:scale-110 text-[var(--color-muted)] leading-none"
      onMouseEnter={e => e.currentTarget.style.color = color}
      onMouseLeave={e => e.currentTarget.style.color = 'var(--color-muted)'}
    >
      <Icon size={26} />
    </div>
    <span className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-10 -translate-x-1/2 rounded border border-border bg-card px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.06em] whitespace-nowrap text-primary opacity-0 transition-opacity duration-150 group-hover:opacity-100">
      {label}
      <span
        className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
        style={{
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent',
          borderTop: '4px solid var(--color-border)',
        }}
      />
    </span>
  </div>
)

const Hero = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' })
  }

  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-15 pt-[72px] md:pt-15">
      <div className="relative z-10 flex w-full max-w-4xl flex-col gap-16">

        {/* ── Top row: credentials + photo ── */}
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-center md:gap-16">

          {/* Left: credentials + CTAs */}
          <div className="flex-1 text-center md:text-left">

            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-accent">
              B.S. Software Engineering&nbsp;&nbsp;·&nbsp;&nbsp;3+ Years Experience
            </p>

            <h1 className="mb-4 text-5xl font-bold leading-tight text-primary sm:text-6xl">
              Jesus{' '}
              <span className="text-accent">Morales</span>
            </h1>

            <p className="mb-10 text-lg font-medium text-secondary">
              Full‑Stack Software Engineer
            </p>

            {/* Stack icons */}
            <div className="mb-10 flex flex-wrap justify-center gap-5 md:justify-start">
              {stack.map(({ label, Icon, color }) => (
                <IconTooltip key={label} label={label} Icon={Icon} color={color} />
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <button
                onClick={() => scrollTo('resume')}
                className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-bg shadow-md opacity-100 transition-opacity hover:opacity-85"
              >
                View Resume
              </button>
              <button
                onClick={() => scrollTo('portfolio')}
                className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-secondary transition-colors hover:border-secondary hover:text-primary"
              >
                See Projects
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="text-sm font-medium text-accent opacity-100 transition-opacity hover:opacity-75"
              >
                Contact me →
              </button>
            </div>
          </div>

          {/* Right: profile photo — overflows its frame at the top */}
          <div className="flex flex-shrink-0 justify-center md:justify-end">
            <div className="relative mt-8">
              {/* Glow behind the card */}
              <div
                className="pointer-events-none absolute inset-0 scale-[1.2] rounded-2xl blur-[40px] bg-[var(--color-accent-glow)]"
              />
              {/* Clipped frame — shows top third of photo */}
              <div className="relative overflow-hidden rounded-2xl shadow-[0_0_0_2px_var(--color-border)]">
                <img
                  src={profileImg}
                  alt="Jesus Morales — profile photo"
                  className="block w-52 sm:w-60 md:w-64"
                  style={{
                    height: 'auto',
                    maxHeight: '450px',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                  }}
                  width="1024"
                  height="1536"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom row: service cards ── */}
        <div className="grid gap-3 sm:grid-cols-3">
          {services.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-lg border border-border bg-surface p-5"
              style={{ borderTop: '2px solid var(--color-accent-dim)' }}
            >
              <div className='flex flex-row gap-3'>
                <div
                  className="mb-3 flex h-8 w-8 items-center justify-center rounded-md text-accent"
                  style={{ background: 'rgba(34,211,238,0.1)' }}
                >
                  <Icon size={18} aria-hidden="true" />
                </div>
                <div className='my-auto'>
                  <h3 className="mb-1.5 text-sm font-semibold text-primary">
                    {title}
                  </h3>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-secondary">
                {desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Hero
