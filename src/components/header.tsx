import { navItems, scrollToWithOffset } from "./navbar";


const Header: React.FC = () => {
  
  const handleNavClick = (id: string) => {
    const sectionData =  navItems.find((item) => item.id === id);
    const el = document.getElementById(id);
    if (el) {
      scrollToWithOffset(`${sectionData?.id}`, sectionData?.space, false);
    }
  }

  return (
    <section
      id="top"
      className="mx-auto flex max-w-5xl min-h-150 flex-col items-center gap-8 px-4 pt-20 pb-16 text-slate-50 md:flex-row md:pt-24"
    >
      {/* Left: text */}
      <div className="md:basis-[65%] md:flex-none">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Web developer · Software Engineer 
        </p>
        <h1 className="mb-4 text-3xl font-semibold leading-tight sm:text-4xl">
          Hi, I&apos;m <span className="text-cyan-400">Jesus Morales</span>.
          <br />
          I build useful web apps and tools.
        </h1>
        <p className="mb-6 text-md text-slate-300">
          Full‑stack developer with experience in React, TypeScript, Python, and
          WordPress.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() =>
              handleNavClick("projects")
            }
            className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 shadow-md transition hover:bg-cyan-400"
          >
            View projects
          </button>
          <button
            onClick={() =>
              handleNavClick("contact")
            }
            className="text-sm font-medium text-cyan-400 hover:text-cyan-300"
          >
            Contact me
          </button>
        </div>
      </div>

    </section>
  );
};

export default Header;
