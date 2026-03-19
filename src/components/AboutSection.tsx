import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { FaJava } from "react-icons/fa";
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiNextdotjs,
  SiGo,
  SiFirebase,
  SiPython,
  SiGnubash,
  SiDocker,
  SiExpress,
  SiLaravel,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiRedux,
  SiRedis,
} from "react-icons/si";

const skills = [
  { name: "React", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Next.js", level: 85 },
  { name: "Node.js", level: 88 },
  { name: "Python", level: 75 },
  { name: "Go", level: 60 },
  { name: "PostgreSQL", level: 85 },
  { name: "MongoDB", level: 80 },
  { name: "Redis", level: 70 },
  { name: "Docker", level: 75 },
  { name: "AWS", level: 70 },
  { name: "Figma", level: 80 },
  { name: "TailwindCSS", level: 95 },
  { name: "GraphQL", level: 78 },
  { name: "REST APIs", level: 92 },
  { name: "Git", level: 90 },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const orbitSkills = [
    { name: "React", Icon: SiReact, className: "text-cyan-400" },
    { name: "JavaScript", Icon: SiJavascript, className: "text-yellow-400" },
    { name: "Java", Icon: FaJava, className: "text-orange-400" },
    { name: "TypeScript", Icon: SiTypescript, className: "text-blue-400" },
    { name: "Node.js", Icon: SiNodedotjs, className: "text-green-400" },
    { name: "Python", Icon: SiPython, className: "text-yellow-300" },
    { name: "MySQL", Icon: SiMysql, className: "text-sky-200" },
    { name: "PostgreSQL", Icon: SiPostgresql, className: "text-indigo-300" },
    { name: "MongoDB", Icon: SiMongodb, className: "text-green-500" },
  ];

  return (
    <section id="about" className="py-28 md:py-36 lg:py-40 relative" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="section-number mb-4">001 — ABOUT</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="font-display italic text-gradient">Me</span>
            </h2>
            <div className="glow-line mb-6" />
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              I'm a full-stack developer with a deep passion for crafting beautiful, performant
              web applications. I work in both frontend and backend technologies, bringing
              ideas to life through clean code and thoughtful design.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              
            </p>
          </motion.div>
        </div>

        {/* Skillset (static grid) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative mx-auto mt-14 w-full max-w-5xl"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-10 bg-border/70" />
            <p className="text-xs font-mono text-muted-foreground tracking-widest">
              MY SKILLSET
            </p>
            <div className="h-px w-10 bg-border/70" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {orbitSkills.map((skill) => {
              const Icon = skill.Icon;
              return (
                <div
                  key={skill.name}
                  className="group rounded-2xl border border-border/60 bg-card/40 px-3 py-4 backdrop-blur transition-all duration-300 hover:border-primary/30 hover:bg-card/60 hover:shadow-[0_12px_30px_hsl(220_20%_4%/0.35),0_0_18px_hsl(160_84%_39%/0.06)]"
                >
                  <div className="flex flex-col items-center justify-center text-center gap-2">
                    <Icon className={`h-7 w-7 ${skill.className}`} aria-hidden="true" />
                    <p className="text-[11px] font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                      {skill.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
