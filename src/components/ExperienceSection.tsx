import { motion, useInView, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const experiences = [
  {
    company: "Besys Technologies",
    role: "Network Technician intern",
    period: "July 2025 — Oct 2025",
    location: "Addis Ababa, Ethiopia",
    description:
      " Partcipated on government-scale IT infrastructure renovation project for the Addis Ababa City Government Education Bureau"
  },
  {
    company: "Freelancer",
    role: "FullStack Developer",
    period: "2025 — Present",
    location: "Addis Ababa, Ethiopia",
    description:
      "Developed web applications and dashboards for freelance clients, focusing on responsive UI, API integration, and performance optimization.",
  },
  
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const pendingIndexRef = useRef<number | null>(null);
  const switchTimerRef = useRef<number | null>(null);

  const itemRefs = useMemo(
    () => experiences.map(() => ({ current: null as HTMLDivElement | null })),
    []
  );

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const scheduleSwitch = (nextIndex: number) => {
      if (nextIndex === activeIndexRef.current) return;
      if (pendingIndexRef.current === nextIndex) return;

      pendingIndexRef.current = nextIndex;
      if (switchTimerRef.current) window.clearTimeout(switchTimerRef.current);

      // Small delay to prevent flicker when two cards overlap the active zone.
      switchTimerRef.current = window.setTimeout(() => {
        const idx = pendingIndexRef.current;
        pendingIndexRef.current = null;
        switchTimerRef.current = null;
        if (typeof idx === "number" && idx !== activeIndexRef.current) {
          setActiveIndex(idx);
        }
      }, 90);
    };

    const ratios = new Array(experiences.length).fill(0) as number[];

    const pickBestIndex = () => {
      let bestIndex = activeIndexRef.current;
      let bestRatio = -1;
      for (let i = 0; i < ratios.length; i++) {
        if (ratios[i] > bestRatio) {
          bestRatio = ratios[i];
          bestIndex = i;
        }
      }
      if (bestRatio > 0 && bestIndex !== activeIndexRef.current) {
        scheduleSwitch(bestIndex);
      }
    };

    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = itemRefs.findIndex((r) => r.current === entry.target);
          if (index < 0) continue;
          ratios[index] = entry.isIntersecting ? entry.intersectionRatio : 0;
        }

        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(pickBestIndex);
      },
      {
        // Use the viewport as the root so behavior matches the reference site
        // as you scroll the whole page.
        root: null,
        threshold: [0.05, 0.15, 0.3, 0.45, 0.6, 0.75],
        // Treat a band around the center of the viewport as the "active" zone.
        rootMargin: "-35% 0px -45% 0px",
      }
    );

    const observeAll = () => {
      for (const r of itemRefs) {
        if (r.current) observer.observe(r.current);
      }
    };

    // Observe after layout settles so refs are definitely attached.
    const initTimeout = window.setTimeout(() => {
      observeAll();
      pickBestIndex();
    }, 0);

    // Fallback: if IO doesn't fire (some browsers/edge cases), compute based on center.
    const onScrollFallback = () => {
      const viewportCenter = window.innerHeight / 2;

      let closestIndex = activeIndexRef.current;
      let closestDistance = Infinity;
      for (let i = 0; i < itemRefs.length; i++) {
        const el = itemRefs[i].current;
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }

      if (closestIndex !== activeIndexRef.current) scheduleSwitch(closestIndex);
    };

    // Lenis (smooth scroll) may not reliably emit window scroll events.
    // Use an rAF loop so the active item stays in sync during smooth scrolling.
    let scrollRaf = 0;
    const tick = () => {
      onScrollFallback();
      scrollRaf = requestAnimationFrame(tick);
    };
    scrollRaf = requestAnimationFrame(tick);

    return () => {
      window.clearTimeout(initTimeout);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      if (switchTimerRef.current) window.clearTimeout(switchTimerRef.current);
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [itemRefs]);

  const listVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="experience" className="py-28 md:py-36 lg:py-40 relative" ref={ref}>
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="section-number mb-4">010 — EXPERIENCE</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Places I've{" "}
            <span className="font-display italic text-gradient">Worked At</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="relative pr-4 sm:pr-6 space-y-4">
              <motion.div
                variants={listVariants}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="space-y-4"
              >
                {experiences.map((exp, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    ref={(el) => {
                      itemRefs[i].current = el;
                    }}
                    className={`rounded-xl bg-card/50 p-4 sm:p-5 card-lift transition-colors duration-300 ${
                      i === activeIndex ? "bg-primary/10" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <p className="text-primary font-medium mb-1 text-sm sm:text-base">{exp.role}</p>
                        <p className="text-xs text-muted-foreground mb-3">{exp.location}</p>
                      </div>
                      <span className="shrink-0 font-mono text-xs text-muted-foreground">{exp.period}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed whitespace-normal break-words text-sm">
                      {exp.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:sticky lg:top-28"
          >
            <div className="rounded-2xl bg-card/40 p-6 overflow-hidden">
              <motion.div
                key={activeIndex}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { type: "spring", stiffness: 260, damping: 26, mass: 0.7 }
                }
                className="relative"
              >
                <p className="text-xs font-mono text-muted-foreground mb-2">CURRENT FOCUS</p>
                <h3 className="text-2xl font-bold tracking-tight">
                  {experiences[activeIndex]?.company}
                </h3>
                <p className="text-primary font-medium mt-2">{experiences[activeIndex]?.role}</p>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <span className="text-xs text-muted-foreground">{experiences[activeIndex]?.location}</span>
                  <span className="font-mono text-xs text-muted-foreground">{experiences[activeIndex]?.period}</span>
                </div>
                <div className="mt-4 pt-4 border-t border-border/20">
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-normal break-words">
                    {experiences[activeIndex]?.description}
                  </p>
                </div>
              </motion.div>

              <div className="mt-6 flex flex-wrap gap-2">
                {experiences.map((exp, i) => (
                  <button
                    key={exp.company}
                    type="button"
                    onClick={() => {
                      itemRefs[i].current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={`rounded-full border border-transparent px-3 py-1 text-xs font-mono transition-colors duration-300 ${
                      i === activeIndex
                        ? "bg-primary/10 text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    }`}
                  >
                    {exp.company}
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
