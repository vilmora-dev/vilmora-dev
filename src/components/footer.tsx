const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  // const scrollToWithOffset = (id: string, offset = 80) => {
  //   const el = document.getElementById(id);
  //   if (!el) return;

  //   const y = el.getBoundingClientRect().top + window.scrollY - offset;

  //   window.scrollTo({
  //       top: y,
  //       behavior: "smooth",
  //   });
  // };

  return (
    <footer className="z-50 mt-12 border-t border-slate-800 bg-slate-900/90 px-4 py-6 text-slate-300">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm md:flex-row">
        {/* Left: name + tagline */}
        <div className="text-center md:text-left">
          <p className="font-semibold text-slate-100">Jesus Morales</p>
          <p className="text-xs text-slate-400">
            Full‑Stack Developer
          </p>
        </div>

        {/* Middle: quick links */}
        {/* <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollToWithOffset('about',85)}
            className="transition-colors hover:text-cyan-400"
          >
            About
          </button>
          <button
            onClick={() => scrollToWithOffset('skills',85)}
            className="transition-colors hover:text-cyan-400"
          >
            Skills
          </button>
          <button
            onClick={() => scrollToWithOffset('projects',45)}
            className="transition-colors hover:text-cyan-400"
          >
            Projects
          </button>
        </div> */}

        {/* Right: socials + copyright */}
        <div className="flex flex-col items-center gap-2 md:items-end">
          <div className="flex gap-3">
            <a
              href="https://github.com/vilmora-dev"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-cyan-400"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/jesus-morales-villar-0777a3242/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-cyan-400"
            >
              LinkedIn
            </a>
          </div>
          <p className="text-xs text-slate-500">
            © {year} Jesus Morales. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
