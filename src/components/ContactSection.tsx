import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, Linkedin } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-28 md:py-36 lg:py-40 relative" ref={ref}>
      <div className="container px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-number mb-4">101 — CONTACT</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Let's Have{" "}
            <span className="font-display italic text-gradient">A Chat</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10">
            I'm always open to discussing new projects, creative ideas, or opportunities
            to be part of your vision.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="mailto:tamratalemayehu830@gmail.com"
            className="btn-magnetic inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            <Mail className="w-5 h-5" />
            tamratalemayehu830@gmail.com
          </a>
          <a
            href="tel:+251910565526"
            className="btn-magnetic inline-flex items-center gap-3 px-8 py-4 rounded-full border border-border text-foreground font-medium hover:bg-secondary hover:border-primary/40 transition-all"
          >
            <Phone className="w-5 h-5" />
            +251910565526
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-6"
        >
          {[
            {
              icon: Linkedin,
              href: "https://www.linkedin.com/in/tamrat-alemayehu-0b8b2b240/",
              label: "LinkedIn",
            },
          ].map(({ icon: Icon, href, label }, i) => (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:shadow-[0_0_15px_hsl(160_84%_39%/0.3)] transition-all duration-300"
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="container px-6 mt-32">
        <div className="glow-line mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 — All rights reserved</p>
          <p className="font-mono text-xs">Built with passion & precision</p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
