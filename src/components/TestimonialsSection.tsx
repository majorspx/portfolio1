import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Esubalew Amenu",
    role: "Lead Developer",
    company: "AWURA",
    quote:
      "An incredibly skilled and professional designer who exceeded our expectations by turning ideas into visually stunning and user-friendly interfaces.",
  },
  {
    name: "Nebil Ibrahim",
    role: "CEO",
    company: "Hulu Express",
    quote:
      "Joined our startup and managed to exceed expectations. A quick learner with the ability to multitask with ease.",
  },
  {
    name: "Amanuel Tilahun",
    role: "CTO",
    company: "Micro Sun & Solutions",
    quote:
      "Has taken up so many tasks and delivered on them, becoming one of the backbone of our company. A quick learner and a great team player.",
  },
  {
    name: "Woldeamanuel Getnet",
    role: "Software Engineer",
    company: "Phase 2",
    quote:
      "A very talented individual. As his senior, I enjoyed working with him — his ability to learn and adapt to new technologies is amazing.",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-28 md:py-36 lg:py-40 relative overflow-hidden" ref={ref}>
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="section-number mb-4">100 — TESTIMONIALS</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Kind{" "}
            <span className="font-display italic text-gradient">Words</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15, type: "spring", stiffness: 100 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="relative p-8 md:p-9 rounded-xl border border-border/60 bg-card/70 hover:border-primary/30 hover:bg-card transition-all duration-300 group cursor-default"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4 group-hover:text-primary/50 group-hover:scale-110 transition-all duration-300" />
              <p className="text-foreground/80 leading-relaxed mb-6 italic font-display text-lg">
                "{t.quote}"
              </p>
              <div>
                <p className="font-bold text-foreground group-hover:text-primary transition-colors">{t.name}</p>
                <p className="text-sm text-muted-foreground">
                  {t.role} <span className="text-primary">@{t.company}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
