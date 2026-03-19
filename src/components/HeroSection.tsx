import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";
import ThreeDBackground from "./ThreeDBackground";
import CSS3DBackground from "./CSS3DBackground";

const roles = ["FullStack Developer", "Problem Solver"];

const HeroSection = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000); // Change role every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grain-overlay">
      <ThreeDBackground />
      <CSS3DBackground />
      {/* Floating grid lines */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute top-1/4 left-0 right-0 h-px bg-foreground" />
        <div className="absolute top-2/4 left-0 right-0 h-px bg-foreground" />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-foreground" />
        <div className="absolute top-0 bottom-0 left-1/4 w-px bg-foreground" />
        <div className="absolute top-0 bottom-0 left-2/4 w-px bg-foreground" />
        <div className="absolute top-0 bottom-0 left-3/4 w-px bg-foreground" />
      </div>

      {/* Glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="container relative z-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="section-number mb-8"
        >
          000 — PORTFOLIO
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6"
        >
          The{" "}
          <span className="relative inline-block h-[1.15em] overflow-hidden align-bottom">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentRoleIndex}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.4, 0, 0.2, 1] 
                }}
                className="absolute inset-0 flex items-center justify-center text-gradient"
              >
                {roles[currentRoleIndex]}
              </motion.span>
            </AnimatePresence>
            {/* Invisible spacer to maintain height */}
            <span className="text-gradient opacity-0">
              {roles[0]}
            </span>
          </span>
          <br />
          <span className="font-display italic font-normal">Growing with Every Project</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-xl mx-auto text-muted-foreground text-lg leading-relaxed mb-10"
        >
          Hello there, I'm a passionate developer who specializes in creating and developing
          amazing digital experiences. Currently focused on building user-friendly,
          human-centered products.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo("#projects")}
            className="btn-magnetic inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity cursor-pointer"
          >
            View My Work
          </button>
          <a
            href="#contact"
            className="btn-magnetic inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border text-foreground font-medium hover:bg-secondary hover:border-primary/40 transition-all"
          >
            <Download className="w-4 h-4 icon-hover" />
            Resume
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => scrollTo("#about")}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
