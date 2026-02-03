import { X } from 'lucide-react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import taxSnap from '../assets/projects-listing/tax-snapshot.png';
import weatherSnap from '../assets/projects-listing/weather-snapshot.png';
import defacerSnap from '../assets/projects-listing/defacer-snapshot.png';
import todoSnap from '../assets/projects-listing/todo-snapshot.png';

type PersonalProject = {
  id: string;
  thumbnail?: string;
  title: string;
  url: string;
  description?: string;
  tags?: string[];
};

type PersonalProjectsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ImageCard: React.FC<{ project: PersonalProject }> = ({ project }) => {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-lg border border-slate-700 bg-slate-800 hover:border-cyan-500 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="aspect-video overflow-hidden bg-slate-950 relative">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end pointer-events-none">
        <div className="p-4 w-full">
          <p className="text-cyan-400 text-sm font-medium flex items-center gap-2">
            View Project
            <span className="text-lg">→</span>
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-50 mb-1">
          {project.title}
        </h3>
        {project.description && (
          <p className="text-sm text-slate-400 mb-2">{project.description}</p>
        )}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
};


const PersonalProjectsModal: React.FC<PersonalProjectsModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Your personal projects data
  const personalProjects: PersonalProject[] = [
    {
      id: "1",
      thumbnail: `${todoSnap}`,
      title: "To-do App",
      url: "https://github.com/vilmora-dev/to-do-app",
      description: "Responsive todo application with drag-and-drop task reordering, local persistence, and clean UI.",
      tags: ["React", "Typescript", "Tailwind CSS"]
    },
    {
      id: "2",
      thumbnail: `${defacerSnap}`,
      title: "Video Defacer App",
      url: "https://github.com/vilmora-dev/video_defacer_app",
      description: "App that provides an easy way to automatically blur or mask faces using the open-source deface library.",
      tags: ["Python"]
    },
    {
      id: "3",
      thumbnail: `${weatherSnap}`,
      title: "Weather Dashboard",
      url: "https://github.com/vilmora-dev/weather_app",
      description: "A weather application providing real-time and forecasted weather information, including radar maps.",
      tags: ["React", "TypeScript", "CSS-in-JS"]

    },
    {
      id: "4",
      thumbnail: `${taxSnap}`,
      title: "2024 U.S. Federal Tax Estimator",
      url: "https://github.com/vilmora-dev/Federal-Tax-Estimator-2024",
      description: "A frontend-focused application that simulates U.S. federal income tax calculations for the 2024 tax year.",
      tags: ["React", "JavaScript", "TypeScript", "Tailwind CSS"]
    },
    
  ];

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div 
        className="relative w-full max-w-7xl max-h-[90vh] overflow-y-auto bg-slate-900 rounded-lg shadow-2xl mx-4"
        onClick={(e) => e.stopPropagation()}
        style={{ zIndex: 101 }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-slate-900 border-b border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-slate-50">Personal Projects</h2>
            <p className="text-sm text-slate-400 mt-1">Side projects and experiments</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalProjects.map((project) => (
              <ImageCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 p-4 bg-slate-900 border-t border-slate-700 text-center">
          <p className="text-sm text-slate-400">
            Click on any project to explore it live
          </p>
        </div>
      </div>
    </div>
  );

  // Render modal at the root level using portal
  return createPortal(modalContent, document.body);
};

export default PersonalProjectsModal;