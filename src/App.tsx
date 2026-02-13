import './App.css'
import { useEffect, useRef, useState } from "react";
import Navbar from './components/navbar';
import Footer from './components/footer';
import About from './components/about';
import Contact from './components/contact';
import Skills from './components/skills';
import Projects from './components/projects';
import Header from './components/header';
import Globe from './components/globe';

type GlobeEffect = "sphere" | "sphere-expand";

function App() {
  const [currentEffect, setCurrentEffect] = useState<GlobeEffect>("sphere");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const headerRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current || !aboutRef.current) return;

      const currentScrollY = window.scrollY * 1.5;
      setScrollY(currentScrollY);

      const headerBottom = headerRef.current.getBoundingClientRect().bottom;
      const viewportHeight = window.innerHeight;

      const headerHeight = headerRef.current.offsetHeight;
      const scrolled = headerHeight - headerBottom;
      const progress = Math.max(0, Math.min(1, scrolled / (headerHeight * 0.8)));

      setScrollProgress(progress);

      const headerVisible = headerBottom > viewportHeight * 0.3;

      if (headerVisible) {
        setCurrentEffect(progress > 0.1 ? "sphere-expand" : "sphere");
      } else {
        setCurrentEffect("sphere-expand");
      }
    };

    const checkInitialState = () => {
      if (!headerRef.current) return;
      
      const scrollTop = window.scrollY || window.pageYOffset;
      
      // If page loaded with any scroll position, force sphere-expand
      if (scrollTop > 100) {
        setScrollProgress(1);
        setCurrentEffect("sphere-expand");
      }
      
      handleScroll();
    };

    setTimeout(checkInitialState, 50);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const scrollTop = window.scrollY || window.pageYOffset;
    
    // If we're scrolled down but progress is 0, force completion
    if (scrollTop > 100 && scrollProgress < 0.5) {
      setScrollProgress(1);
    }
  }, [scrollProgress]);

  // DevTools Message 🤗
  useEffect(() => {
    const checkConsoleOpen = () => {
      const threshold = 160;
      const isOpen = window.outerHeight - window.innerHeight > threshold || 
                    window.outerWidth - window.innerWidth > threshold;
      
      if (isOpen) {
        console.clear();
        console.log(
          '%c👋 Hey there!',
          'color: #06b6d4; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);'
        );
        console.log(
          '%cWelcome to my portfolio',
          'color: #0ea5e9; font-size: 16px; font-weight: bold;'
        );
        console.log(
          '%cBuilt with React + Three.js + TypeScript',
          'color: #64748b; font-size: 12px; font-style: italic;'
        );
        console.log(
          '%c🔍 Feel free to poke around - the code is on GitHub!',
          'color: #f59e0b; font-size: 12px;'
        );
        
        // ASCII art
        console.log(`
    ╔═══════════════════════════════════╗
    ║   Thanks for checking this out!   ║
    ║   Made with ❤️ and lots of ☕    ║
    ╚═══════════════════════════════════╝
        `);
      }
    };

    // Debounce to avoid spam
    let timeoutId: number;
    const debouncedCheck = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkConsoleOpen, 500);
    };

    window.addEventListener('resize', debouncedCheck);
    
    // Initial check
    checkConsoleOpen();

    return () => {
      window.removeEventListener('resize', debouncedCheck);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="select-none relative flex min-h-screen flex-col bg-slate-950 text-slate-50">
      <Navbar />

      <div className="fixed left-0 top-0 h-screen w-full bg-black opacity-80 z-0">
        <Globe effect={currentEffect} scrollProgress={scrollProgress} scrollY={scrollY} />
      </div>

      <main className="relative z-10 flex-1 min-h-screen">
        <div>
          <section ref={headerRef}>
            <Header />
          </section>
          <section ref={aboutRef}>
            <About />
          </section>

          <section ref={skillsRef}>
            <Skills />
          </section>

          <section ref={projectsRef}>
            <Projects />
          </section>

          <section ref={contactRef}>
            <Contact />
          </section>
        </div>
      </main>
      <section ref={footerRef} className='z-50'>
        <Footer />
      </section>
    </div>
  );
}

export default App;