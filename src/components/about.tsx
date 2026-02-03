import profileImg from "../assets/images/profile.png";
const About: React.FC = () => {

  const isLargeScreen = typeof window !== 'undefined' && window.innerWidth >= 768;

  return (
    <section
      id="about"
      className="z-100 mx-auto max-w-5xl px-4 text-slate-50"
    >
      <h2 className="text-2xl font-semibold tracking-tight">
        About
      </h2>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 text-slate-50 md:flex-row pt-2">
        {!isLargeScreen && (
          <div className="flex-1">
            <div className="mx-auto h-70 w-fit overflow-hidden rounded-full">
                <img
                    src={profileImg}
                    alt="Profile"
                    className="h-full w-full rounded-full object-contain"
                />
            </div>
          </div>
        )}
        <div className="flex-1">
            <p className="mb-4 text-md text-slate-300 bg-slate-900/70 rounded px-3 py-2">
                I&apos;m a Full-Stack Developer with a love for creating elegant and responsive 
                web solutions to complex problems. Specializing in the MERN stack and TypeScript, 
                I focus on building scalable architecture and intuitive user experiences 
                that bridge the gap between back-end logic and front-end delight.
            </p>
            <p className="mb-4 text-md text-slate-300 bg-slate-900/70 rounded px-3 py-2">
                My experience spans a diverse range of digital solutions, including responsive 
                web design, secure authentication systems, and third-party API integrations. 
                I&apos;ve worked on real-time data dashboards, content management systems, single 
                page applications and consumer apps, always ensuring a balance between robust 
                backend logic and fluid+engaging frontend design.
            </p>
        </div>
        {isLargeScreen && (
          <div className="flex-1">
            <div className="mx-auto h-85 w-fit overflow-hidden lg:h-100">
                <img
                    src={profileImg}
                    alt="Profile"
                    className="h-full w-full object-contain"
                />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
