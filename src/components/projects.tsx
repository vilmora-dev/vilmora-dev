import { useEffect, useRef, useState } from "react";
import PersonalProjectsModal from './modal-projects';
import { useTypewriter } from "../utils/typewriter";

type Project = {
  title: string;
  role: string;
  description: string;
  list?: string[];
  tech: string[];
  link?: string;
  action?: ()=>void;
};

const incProjects: Project[] = [
  {
    title: "Forest Carbon Modeling Platform",
    role: "Software Engineer - Delta Rising Foundation",
    description:"Developed AI-powered forest carbon modeling platform, combining LiDAR, soil/climate data, and machine learning to deliver precise per-tree and per-plot sequestration estimates for donor proposals and scalable forestry projects.",
    list: ["Built LightGBM/XGBoost/Random Forest models for accurate carbon quantification, integrating ecology research for credibility.",
        "Engineered proprietary dataset from LiDAR + soil/climate data, extracting tree metrics (height, diameter, volume).",
        "Designed PDAL/GeoPandas pipelines for reproducible, scalable model training across new forest sites."],
    tech: ["React", "Tailwind CSS", "H3.js", "FastAPI", "GEE", "Git"],
    link: "#",
  },  
  {
    title: "Project Management Software",
    role: "Full-Stack Developer - COBACH",
    description:
      "Built a web application to digitize school project workflows, enabling interdepartmental teams to track tasks, deadlines, status updates, and custom ticketing across COBACH educational programs—centralizing data access and streamlining collaboration.",
    list: ["Admin dashboard with diagrams visualizing project progress across departments/teams.",
      "Kanban board to display all project activities with drag-and-drop functionality.",
      "Document management system for attaching files and tracking reports per activity.",
      "Ticketing system for troubleshooting and admin-only actions."
    ],
    tech: ["React", "Tailwind CSS", "PHP", "SQL"],
    link: "#",
  },
];

const Projects: React.FC = () => {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [personalModalOpen, setPersonalModalOpen] = useState(false);

  const personalProjects: Project = {
    title: "Live Projects Showcase →",
    role: "Software Engineer",
    description:
      "Portfolio of hands-on projects demonstrating full-stack web development and creative side projects built with modern tools.",
    list: [
      "To-Do App - Task management application",
      "Tax Calculator – Dynamic financial tool", 
      "Weather Dashboard – Real-time forecasts", 
      "Video Defacer – Creative media processor", 
      "Among others..."],
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "APIs", "Python"],
    link: "#",
    action: ()=>{setPersonalModalOpen(true)}
  }

  const projects: Project[] = [...incProjects, personalProjects];

  const toggleExpanded = (title: string) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };

  const getContentLength = (project: Project) => {
    const descLength = project.description.length;
    const listLength = project.list ? project.list.join(' ').length : 0;
    return descLength + listLength;
  };

  const shouldTruncate = (project: Project) => {
    return getContentLength(project) > 100;
  };

  const getTruncatedDescription = (description: string, remainingChars: number) => {
    if (description.length <= remainingChars) {
      return description;
    }
    return description.slice(0, remainingChars) + '...';
  };

  const getTruncatedList = (list: string[], remainingChars: number) => {
    const truncatedList: string[] = [];
    let currentLength = 0;

    for (const item of list) {
      if (currentLength + item.length <= remainingChars) {
        truncatedList.push(item);
        currentLength += item.length;
      } else {
        break;
      }
    }

    return truncatedList;
  };

  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { displayText } = useTypewriter(
    isVisible ? " A selection of recent work and personal projects." : "",
    50,
    { delay: 800, loop: false }
  );

  useEffect(()=>{
    const observer = new IntersectionObserver(
      ([entry]) => {
        if(entry.isIntersecting){
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );
    if(textRef.current) {
      observer.observe(textRef.current);
    }
    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  // Reusable project card component
  const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
    const isExpanded = expandedProjects.has(project.title);
    const needsTruncation = shouldTruncate(project);
    
    let displayDescription = project.description;
    let displayList = project.list || [];

    if (needsTruncation && !isExpanded) {
      const charLimit = 115;
      
      if (project.description.length > charLimit) {
        displayDescription = getTruncatedDescription(project.description, charLimit);
        displayList = [];
      } else {
        const remainingChars = charLimit - project.description.length;
        displayList = getTruncatedList(project.list || [], remainingChars);
      }
    }

    return (
      <article className="flex flex-col rounded-lg border border-slate-800 bg-slate-900/70 p-5 shadow-md">
        <h3 className="mb-2 text-lg font-semibold text-slate-100">
          {project.title}
        </h3>
        <h4 className="mb-2 text-sm italic font-semibold text-slate-100">
          {project.role}
        </h4>
        
        <div className="mb-3">
          <p className="text-sm text-slate-300">
            {displayDescription}
          </p>

          {displayList.length > 0 && (
            <ul className="mt-2 space-y-1 text-sm text-slate-300">
              {displayList.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-cyan-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {needsTruncation && (
            <button
              onClick={() => toggleExpanded(project.title)}
              className="mt-1 ml-auto flex text-xs font-medium text-cyan-400 hover:text-cyan-300 cursor-pointer"
            >
              {isExpanded ? 'Show less' : 'Read more →'}
            </button>
          )}
        </div>

        <div className="mb-3 flex flex-wrap gap-2">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.link && project.link !== "#" && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="mt-auto inline-flex text-xs font-medium text-cyan-400 hover:text-cyan-300 cursor-pointer"
          >
            View project →
          </a>
        )}
        {project.action && (
          <p
            className="mt-auto inline-flex text-xs font-medium text-cyan-400 hover:text-cyan-300 cursor-pointer"
            onClick={project.action}
          >
            View projects →
          </p>
        )}
      </article>
    );
  };

  return (
    <section
      id="projects"
      className="mx-auto mt-16 max-w-5xl px-4 pt-10 text-slate-50"
    >
      <h2 className="mb-3 text-2xl font-semibold tracking-tight">
        Projects
      </h2>
      <p className={`mb-6 text-md px-3 py-2 inline-block transtition-all ease-in-out duration-500
        rounded hover:text-slate-300 hover:bg-slate-900/70 cursor-default font-orbit`}
        ref={textRef}>
        {displayText}
      </p>

      <div className="hidden md:flex flex-col md:flex-row gap-5">
       {/* Left column */}
        <div className="flex flex-col gap-5 flex-1">
          {projects.map((project, index) => 
            index % 2 === 0 ? <ProjectCard key={project.title} project={project} /> : null
          )}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5 flex-1">
          {projects.map((project, index) => 
            index % 2 !== 0 ? <ProjectCard key={project.title} project={project} /> : null
          )}
        </div>
      </div>

      <div className="flex md:hidden flex-col md:flex-row gap-5">
        <div className="flex flex-col gap-5 flex-1">
          {projects.map((project) => 
            <ProjectCard key={project.title} project={project} />
          )}
        </div>
      </div>

      <PersonalProjectsModal
        isOpen={personalModalOpen}
        onClose={() => setPersonalModalOpen(false)}
      />
    </section>
  );
};

export default Projects;

