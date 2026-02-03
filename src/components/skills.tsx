import { useEffect, useRef, useState } from "react";
import { useTypewriter } from "../utils/typewriter";

const Skills: React.FC = () => {
  const skillGroups = [
    {
      title: "Frontend",
      items: ["React", "TypeScript", "JavaScript", "Vite", "Tailwind CSS"],
    },
    {
      title: "Backend & APIs",
      items: ["Python", "Node.js", "PHP", "REST APIs", "SQL"],
    },
    {
      title: "Tools & Workflow",
      items: ["Git & GitHub", "AWS & GCP", "ClickUp & Jira", "Linux CLI"],
    },
    {
      title: "Support & Other",
      // items: ["Help Desk", "Ticketing Systems", "Bilingual EN/ES"],
      items: ["Ticketing Systems", "Bilingual EN/ES"],
    },
  ];

  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const { displayText } = useTypewriter(
    isVisible ? " A snapshot of the technologies and areas I work with most often." : "",
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

  return (
    <section
      id="skills"
      className="mx-auto mt-16 max-w-5xl px-4 text-slate-50"
    >
      <h2 className="mb-3 text-2xl font-semibold tracking-tight">
        Skills
      </h2>
      <p className={`mb-6 text-md px-3 py-2 inline-block transtition-all ease-in-out duration-500
        rounded hover:text-slate-300 hover:bg-slate-900/70 cursor-default font-orbit`}
        ref={textRef}>
        {displayText}
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="rounded-lg border border-slate-800 bg-slate-900/70 p-4"
          >
            <h3 className="mb-2 text-sm font-semibold text-slate-100">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
