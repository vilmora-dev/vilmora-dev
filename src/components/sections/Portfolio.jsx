import { useState } from 'react'
import taxSnap      from '../../assets/projects/tax-snapshot.png'
import weatherSnap  from '../../assets/projects/weather-snapshot.png'
import defacerSnap  from '../../assets/projects/defacer-snapshot.png'
import todoSnap     from '../../assets/projects/todo-snapshot.png'
import newsSnap     from '../../assets/projects/news-rss-scraper.png'
import biomassSnap  from '../../assets/projects/biomass.png'
import grantsSnap  from '../../assets/projects/grants.png'

const projects = [
  {
    title: 'Grants Scraper App',
    role: 'Software Engineer — Delta Rising Foundation',
    description:
      'Automated grant discovery pipeline combining a Python scraper running on GitHub Actions with a Laravel web app for browsing and managing results.',
    bullets: [
      'Python scraper scheduled via GitHub Actions — no server required.',
      'Laravel + MySQL backend on shared hosting with REST API.',
      'Clean frontend UI for filtering and reviewing scraped grant listings.',
    ],
    tech: ['Python', 'Laravel', 'MySQL', 'GitHub Actions', 'PHP', 'Shared Hosting'],
    link: 'https://github.com/vilmora-dev',
    linkLabel: 'View on GitHub →',
    type: 'client',
    thumbnail: grantsSnap,
  },
  {
    title: 'Forest Carbon Modeling Platform',
    role: 'Software Engineer — Delta Rising Foundation',
    description:
      'AI-powered platform combining LiDAR, soil/climate data, and machine learning to deliver per-tree and per-plot carbon sequestration estimates for donor proposals and scalable forestry projects.',
    bullets: [
      'LightGBM / XGBoost / Random Forest models for carbon quantification.',
      'PDAL + GeoPandas pipelines for reproducible training across new forest sites.',
      'React frontend with H3.js hexagonal map overlays.',
    ],
    tech: ['React', 'Tailwind CSS', 'H3.js', 'FastAPI', 'GEE', 'Python', 'Git'],
    link: 'https://www.deltarisingfoundation.org/de-risk-carbon-mrv-ai-baseline-prediction-reporting/',
    linkLabel: 'View organization page →',
    type: 'client',
    thumbnail: biomassSnap,
  },
  {
    title: 'Project Management Software',
    role: 'Full-Stack Developer — COBACH',
    description:
      'Web application to digitize school project workflows across COBACH educational programs — interdepartmental task tracking, deadlines, and status updates centralized in one platform.',
    bullets: [
      'Admin dashboard with visual diagrams of project progress across departments.',
      'Kanban board with drag-and-drop task management.',
      'Document management and ticketing system for admin-only actions.',
    ],
    tech: ['React', 'Tailwind CSS', 'PHP', 'SQL'],
    type: 'client',
  },
  {
    title: 'News Crawler + Scraper',
    role: 'Software Engineer — Personal',
    description:
      'Crawls real RSS feeds from major outlets, applies semantic keyword classification for article categorization, and scrapes OG images when RSS lacks them.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Express'],
    link: 'https://github.com/vilmora-dev/news-rss-scraper',
    linkLabel: 'View on GitHub →',
    type: 'personal',
    thumbnail: newsSnap,
  },
  {
    title: 'To-do App',
    role: 'Software Engineer — Personal',
    description:
      'Responsive task management app with drag-and-drop reordering, local persistence, and a clean minimal UI.',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    link: 'https://github.com/vilmora-dev/to-do-app',
    linkLabel: 'View on GitHub →',
    type: 'personal',
    thumbnail: todoSnap,
  },
  {
    title: '2024 U.S. Federal Tax Estimator',
    role: 'Software Engineer — Personal',
    description:
      'Frontend application that simulates U.S. federal income tax calculations for the 2024 tax year using the official bracket tables.',
    tech: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS'],
    link: 'https://github.com/vilmora-dev/Federal-Tax-Estimator-2024',
    linkLabel: 'View on GitHub →',
    type: 'personal',
    thumbnail: taxSnap,
  },
  {
    title: 'Weather Dashboard',
    role: 'Software Engineer — Personal',
    description:
      'Weather application providing real-time and forecasted weather information with radar maps and location search.',
    tech: ['React', 'TypeScript', 'CSS-in-JS'],
    link: 'https://github.com/vilmora-dev/weather_app',
    linkLabel: 'View on GitHub →',
    type: 'personal',
    thumbnail: weatherSnap,
  },
  {
    title: 'Video Defacer App',
    role: 'Software Engineer — Personal',
    description:
      'App that automatically blurs or masks faces in video files using the open-source deface library with a simple drag-and-drop interface.',
    tech: ['Python'],
    link: 'https://github.com/vilmora-dev/video_defacer_app',
    linkLabel: 'View on GitHub →',
    type: 'personal',
    thumbnail: defacerSnap,
  },
]

const TypeBadge = ({ type }) => (
  <span
    className={[
      'inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
      type === 'client'
        ? 'border border-accent-dim bg-accent/10 text-accent'
        : 'border border-border bg-card text-muted',
    ].join(' ')}
  >
    {type === 'client' ? 'Client' : 'Personal'}
  </span>
)

const ProjectCard = ({ project }) => {
  const [expanded, setExpanded] = useState(false)
  const hasBullets = project.bullets?.length > 0

  return (
    <article className="flex flex-col rounded-lg border border-border bg-surface p-5">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold leading-snug text-primary">
            {project.title}
          </h3>
          <p className="mt-0.5 text-xs italic text-muted">
            {project.role}
          </p>
        </div>
        <TypeBadge type={project.type} />
      </div>

      {/* Thumbnail */}
      {project.thumbnail && (
        <div className="mb-3 overflow-hidden rounded-md border border-border">
          <img
            src={project.thumbnail}
            alt={`${project.title} screenshot`}
            className="h-32 w-full object-cover"
            loading="lazy"
            width="1280"
            height="800"
            decoding="async"
          />
        </div>
      )}

      {/* Description */}
      <p className="mb-2 text-xs leading-relaxed text-secondary">
        {project.description}
      </p>

      {/* Expandable bullets */}
      {hasBullets && expanded && (
        <ul className="mb-2 space-y-1">
          {project.bullets.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-secondary">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      )}

      {hasBullets && (
        <button
          onClick={() => setExpanded(p => !p)}
          className="mb-3 self-start text-xs font-medium text-accent opacity-100 transition-opacity hover:opacity-70"
        >
          {expanded ? 'Show less' : 'Show details →'}
        </button>
      )}

      {/* Tech tags */}
      <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
        {project.tech.map((tag) => (
          <span key={tag} className="rounded-full bg-card px-2.5 py-0.5 text-[10px] text-secondary">
            {tag}
          </span>
        ))}
      </div>

      {/* Link */}
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex text-xs font-medium text-accent opacity-100 transition-opacity hover:opacity-70"
        >
          {project.linkLabel ?? 'View →'}
        </a>
      )}
    </article>
  )
}

const INITIAL_COUNT = 6

const Projects = () => {
  const [showAll, setShowAll] = useState(false)

  const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT)
  const hidden  = projects.length - INITIAL_COUNT

  return (
    <section className="flex min-h-screen items-start justify-center px-6 py-20">
      <div className="relative z-10 w-full max-w-4xl">

        {/* Section label */}
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
          Portfolio
        </p>

        <h2 className="mb-3 text-3xl font-bold text-primary">
          Selected work
        </h2>

        <p className="mb-10 text-base text-secondary">
          A selection of client work and personal projects.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {/* Show more / Show less */}
        {projects.length > INITIAL_COUNT && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(s => !s)}
              className="flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-secondary transition-colors hover:border-secondary hover:text-primary"
            >
              {showAll ? (
                <>Show less <span aria-hidden="true">↑</span></>
              ) : (
                <>Show {hidden} more {hidden === 1 ? 'project' : 'projects'} <span aria-hidden="true">↓</span></>
              )}
            </button>
          </div>
        )}

      </div>
    </section>
  )
}

export default Projects
