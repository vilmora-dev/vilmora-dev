import { type FormEvent, useEffect, useRef, useState } from "react";
import { useTypewriter } from "../utils/typewriter";

const Contact: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("https://my-backend.morales-tech.net/send-email-git", {
        method: "POST", 
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("sent");
        
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        // Reset status after 5 seconds
        setTimeout(() => {
          setStatus("idle");
        }, 5000);
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred");
      
      // Reset error status after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 5000);
    }
  };

  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { displayText, isComplete } = useTypewriter(
    isVisible ? `Have a project in mind or want to talk about an opportunity?` : "",
    50,
    { delay: 100, loop: false }
  );
  const { displayText: text2 } = useTypewriter(
    isComplete ? " Send a message and I'll get back to you." : "",
    50,
    { delay: 600, loop: false }
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
      id="contact"
      className="mx-auto mt-16 max-w-5xl px-4 py-12 text-slate-50"
    >
      <h2 className="mb-2 text-2xl font-semibold tracking-tight">
        Contact
      </h2>
      
      
      <div className="inline-block text-wrap rounded hover:text-slate-300 px-3 py-2
      hover:bg-slate-900/70 cursor-default transtition-all ease-in-out duration-500 font-orbit">
        <p className={`text-md`}
          ref={textRef}>
          {displayText}
        </p>
        <p className={`${isComplete ? 'block' : 'hidden'} text-md`}>
          {text2}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4 mx-auto max-w-4xl rounded-lg border border-slate-800 bg-slate-900/70 p-6 shadow-lg"
      >

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              value={formData.name}
              required
              onChange={handleChange}
              disabled={status === "submitting"}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email" 
              value={formData.email}
              required
              onChange={handleChange}
              disabled={status === "submitting"}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-300">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            autoComplete="off" 
            value={formData.subject}
            onChange={handleChange}
            disabled={status === "submitting"}
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-300">
            Message
          </label>
          <textarea
            name="message"
            autoComplete="off" 
            value={formData.message}
            required
            rows={5}
            onChange={handleChange}
            disabled={status === "submitting"}
            className="w-full resize-none rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex w-fit items-center rounded-md bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 shadow-md transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "submitting" ? "Sending..." : "Send message"}
          </button>

          {/* Success Notification */}
          {status === "sent" && (
            <div className="rounded-md border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm">
              <span className="block font-medium text-emerald-800">Success!</span>
              <span className="block text-emerald-700">
                Your message has been sent successfully. I&apos;ll get back to you soon.
              </span>
            </div>
          )}

          {/* Error Notification */}
          {status === "error" && (
            <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm">
              <span className="block font-medium text-red-800">Error!</span>
              <span className="block text-red-700">
                {errorMessage || "Failed to send message. Please try again."}
              </span>
            </div>
          )}
        </div>
      </form>
    </section>
  );
};

export default Contact;