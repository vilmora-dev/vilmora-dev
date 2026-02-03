import { useEffect, useRef, useState } from "react";
import { FaCode } from "react-icons/fa6";

type NavItem = {
  id: string;
  label: string;
  space: number;
};

export const navItems: NavItem[] = [
  { id: "about", label: "About", space: 85 },
  { id: "skills", label: "Skills", space: 85 },
  { id: "projects", label: "Projects", space: 45 },
  { id: "contact", label: "Contact", space: 40 },
];

export const scrollToWithOffset = (id: string, offset = 80, mobile:boolean) => {
  const el = document.getElementById(id);
    if (!el) return;

    const y = mobile ? el.getBoundingClientRect().top + window.scrollY - (offset+160) : el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
        top: y,
        behavior: "smooth",
    });
};

const Navbar: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  // Scroll to content 
  const handleNavClick = (id: string, mobile=false) => {
    const sectionData =  navItems.find((item) => item.id === id);
    const el = document.getElementById(id);

    if (el) {
      scrollToWithOffset(`${sectionData?.id}`, sectionData?.space, mobile)
      setIsOpen(false);
    }
  };

  useEffect(() => {
    function handleScroll() {
      const atTop = window.scrollY <= 0;
      setIsAtTop(atTop);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header 
      className={`
        sticky top-0 z-50 text-slate-50
        ${isAtTop ? 'border-b border-slate-800/50' : 'border-none'} 
        transition-all duration-500 ease-in-out backdrop-blur-md
      `}
      style={{
        background: isAtTop 
          ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.90) 50%, rgba(30, 41, 59, 0.90) 100%)'
          : 'linear-gradient(135deg, rgba(15, 23, 42, 0.55) 0%, rgba(15, 23, 42, 0.50) 50%, rgba(30, 41, 59, 0.50) 100%)'
      }}
      ref={headerRef}>
        {/* Subtle blue accent overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, transparent 0%, rgba(6, 182, 212, 0.1) 100%)'
        }}
      />
      
      {/* Bottom glow */}
      {isAtTop && (
        <div 
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.3) 50%, transparent 100%)',
            boxShadow: '0 0 8px rgba(6, 182, 212, 0.2)'
          }}
        />
      )}
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:py-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div 
            className={`flex h-10 w-10 items-center justify-center 
              rounded-full text-lg font-bold shadow-xl
              transition-all duration-500 ease-in-out cursor-pointer
              ${isAtTop ? 'rotate-180 bg-slate-800 text-cyan-500' : 'bg-none text-white'} 
              hover:bg-slate-800 hover:text-cyan-500 hover:rotate-180
            `}
            onClick={()=>{
              window.scrollTo({
                top: 0,
                    behavior: "smooth",
                });
            }}
            >
            <FaCode className='text-3xl'/>
          </div>
          <div className="leading-tight">
            <h1 className="text-base font-semibold sm:text-lg">
              Jesus Morales
            </h1>
            <p className="text-xs text-slate-300 sm:text-sm">
              Full‑Stack Developer
            </p>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className="inline-flex items-center rounded-md p-2 text-slate-200 hover:bg-slate-800 md:hidden"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((prev)=>!prev)}
        >
          <span className="sr-only">Open main menu</span>
          <div className="space-y-1">
            <span className="block h-0.5 w-5 bg-slate-200" />
            <span className="block h-0.5 w-5 bg-slate-200" />
            <span className="block h-0.5 w-5 bg-slate-200" />
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className="transition-colors hover:text-cyan-400"
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Mobile menu */}
          <nav 
            className="fixed left-0 right-0 md:hidden z-50 border-t border-slate-800/50 shadow-2xl backdrop-blur-md animate-slideDown"
            style={{
              top: 'var(--header-height, 64px)',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)',
              maxHeight: 'calc(100vh - var(--header-height, 64px))',
              overflowY: 'auto'
            }}
          >
            <ul className="space-y-1 px-4 py-3 text-sm">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    className="block w-full rounded-md px-2 py-2 text-left hover:bg-slate-800/50 hover:text-cyan-400 transition-colors"
                    onClick={() => handleNavClick(item.id, true)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </header>
  );
};

export default Navbar;
