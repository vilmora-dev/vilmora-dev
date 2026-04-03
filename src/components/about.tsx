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
                B.S. in Software Engineering with over 3 years building web applications and 1 year developing predictive models, 
                plus hands-on experience in full-stack web development, geospatial data processing, and ML. 
                Skilled in building end-to-end solutions—from data validation and feature engineering to backend integration and responsive frontend development.
                Fluent in English and Spanish, with a collaborative communication style focused on measurable impact, reproducibility, 
                and scalable, user-focused software solutions.
            </p>
            <p className="mb-4 text-md text-slate-300 bg-slate-900/70 rounded px-3 py-2">
                My experience spans a diverse range of digital solutions, including responsive 
                web design, secure authentication systems, and third-party API integrations. 
                I&apos;ve worked on real-time data dashboards, content management systems, and single 
                page applications.
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
