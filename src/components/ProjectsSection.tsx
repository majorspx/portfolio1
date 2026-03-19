import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

const filters = ["All"];

const projects = [
  {
    title: "Leqet Fit App",
    description: "Culturally-adapted fitness platform with personalized diet and workout tracking, trainer–member interaction, and a full role-based dashboard system..",
    tags: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma", "JWT"],
    category: "FullStack",
    link: "https://leqet-gym.vercel.app",
    image: "/images/leqet-fit-app.png",
    github: "#",
    color: "from-primary/20 to-primary/5",
  },
  {
    title: "Sentiment Analysis",
    description: "Sentiment analysis platform for university feedback with NLP-driven classification, data visualization, and role-based admin insights.",
    tags: ["React", "Flask", "PyTorch", "Python","MYSQL"],
    category: "FullStack",
    link: "#",
    github: "#",
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    title: "Fleet Financial Tracker",
    description: "Logistics financial tracking platform for construction delivery trucks with real-time expense logging, and profit/loss reporting dashboard.",
    tags: ["React", "Node.js", "Express", "MYSQL"],
    category: "FullStack",
    link: "#",
    github: "#",
    color: "from-amber-500/20 to-amber-500/5",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All" ? projects : projects.filter(p => p.category === activeFilter);
  const marqueeItems = filtered.length > 0 ? [...filtered, ...filtered] : [];

  return (
    <section id="projects" className="py-28 md:py-36 lg:py-40 relative" ref={ref}>
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="section-number mb-4">011 — WORK</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Projects  
          </h2>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeFilter === f
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(160_84%_39%/0.3)]"
                    : "border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-secondary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="projects-marquee"
          >
            <div className="projects-marquee-track gap-8 py-4">
              {marqueeItems.map((project, i) => (
                <div
                  key={`${project.title}-${i}`}
                  className="card-lift group relative w-[320px] sm:w-[360px] rounded-xl border border-border/60 overflow-hidden bg-card/80 hover:border-primary/40 hover:bg-card shrink-0"
                >
                  {/* Gradient top */}
                  <div
                    className={`h-40 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-5xl font-bold text-foreground/10 group-hover:text-foreground/25 group-hover:scale-110 transition-all duration-500">
                        {project.title[0]}
                      </span>
                    )}
                    {/* Hover overlay with links */}
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center icon-hover"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:rotate-12 transition-all duration-300" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono px-2 py-1 rounded bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;
