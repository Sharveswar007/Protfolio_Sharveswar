import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SkillCategory {
  title: string;
  skills: string[];
}

const SKILL_DATA: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["Python", "Rust", "JavaScript", "TypeScript", "C", "C++", "Java", "HTML5", "CSS3", "SQL"],
  },
  {
    title: "Frameworks & UI",
    skills: ["Next.js", "React.js", "Node.js", "Express.js", "Tailwind CSS", "Bootstrap", "EJS"],
  },
  {
    title: "AI Tools & Concepts",
    skills: ["Claude AI", "v0.dev", "GitHub Copilot", "YOLOv8 CV", "Computer Vision", "DSA", "OOP", "Salesforce"],
  },
  {
    title: "Databases & DevOps",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Supabase", "AWS Cloud", "Docker", "Git & GitHub", "Vercel", "Linux"],
  },
];

// ─── Single category row with scroll-driven reveal ─────────
function SkillRow({ category, index, scrollYProgress }: {
  category: SkillCategory;
  index: number;
  scrollYProgress: any;
}) {
  const start = 0.05 + index * 0.2;
  const end = start + 0.2;
  
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const x = useTransform(scrollYProgress, [start, end], [-40, 0]);

  return (
    <motion.div
      style={{ opacity, x }}
      className="py-8 border-b border-white/5 light:border-black/5 last:border-b-0 will-change-[opacity,transform]"
    >
      {/* Category title */}
      <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white/30 light:text-black/30 mb-5">
        {category.title}
      </h3>

      {/* Skills as inline list */}
      <div className="flex flex-wrap gap-3">
        {category.skills.map((skill, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.16, 1, 0.3, 1], 
              delay: i * 0.04 
            }}
            className="px-4 py-2.5 text-sm font-medium font-sans rounded-xl border border-white/8 light:border-black/8 bg-white/3 light:bg-black/3 text-cream-soft light:text-midnight-black hover:bg-white/8 light:hover:bg-black/8 hover:border-white/15 light:hover:border-black/15 transition-all duration-300"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Skills Component ─────────────────────────────────
export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative w-full py-28 bg-midnight-black light:bg-cream-ivory overflow-hidden"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 sm:px-8 w-full relative z-10">
        {/* Title — left aligned */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="text-[10px] uppercase tracking-widest text-white/40 light:text-black/40 font-mono">
            02 // Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-cream-soft light:text-midnight-black mt-2">
            Tech Stack
          </h2>
        </motion.div>

        {/* Stacked category rows */}
        <div className="flex flex-col">
          {SKILL_DATA.map((category, index) => (
            <SkillRow
              key={index}
              category={category}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
