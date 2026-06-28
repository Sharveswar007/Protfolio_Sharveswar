import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';

// ─── Word-by-word scroll reveal paragraph ──────────────────
function ScrollRevealParagraph({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 40%"], // Word reveal starts when paragraph is 10% from bottom, ends near center
  });
  const words = text.split(' ');

  return (
    <p ref={ref} className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight leading-relaxed flex flex-wrap gap-x-[0.3em] gap-y-1">
      {words.map((word, i) => {
        const wordStart = i / words.length;
        const wordEnd = (i + 1) / words.length;

        return <ScrollWord key={i} word={word} start={wordStart} end={wordEnd} scrollYProgress={scrollYProgress} />;
      })}
    </p>
  );
}

function ScrollWord({ word, start, end, scrollYProgress }: {
  word: string;
  start: number;
  end: number;
  scrollYProgress: any;
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1]);
  const y = useTransform(scrollYProgress, [start, end], [8, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block text-cream-soft light:text-midnight-black transition-colors will-change-[opacity,transform]"
    >
      {word}
    </motion.span>
  );
}

// ─── Main About Component ──────────────────────────────────
export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track native scroll as the top of About enters the bottom of the screen
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start center"], // maps 0 to 1 as it rises into view
  });

  // Staggered Entrance Animations (Waterfall effect natively rising upwards)
  const bgOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.2, 0.6], [50, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);

  const paragraphs = [
    "I'm an AI-integrated full stack developer and computer science student with a strong focus on building modern, scalable, and performance-driven intelligent systems.",
    "Over the years, I've designed and shipped multiple web applications, computer vision pipelines, and deep-tech integrations used for automation, helping organizations deploy faster.",
  ];

  return (
    <div ref={containerRef}>
      <motion.section
        id="about"
        style={{ opacity: bgOpacity }}
        className="relative w-full py-32 sm:py-40 bg-midnight-sub light:bg-cream-offwhite border-t border-white/10 light:border-black/10 z-20 min-h-screen rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.4)] mt-[-50px]"
      >
        {/* Ambient light */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/3 light:bg-black/3 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 w-full flex flex-col justify-center relative z-10">
          {/* Title */}
          <motion.div
            style={{ y: titleY, opacity: titleOpacity }}
            className="mb-16"
          >
            <span className="text-[10px] uppercase tracking-widest text-white/40 light:text-black/40 font-mono">
              01 // Profile
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-cream-soft light:text-midnight-black mt-2">
              About Me
            </h2>
          </motion.div>

          {/* Scroll-reveal paragraphs */}
          <div className="space-y-12">
            {paragraphs.map((p, i) => (
              <ScrollRevealParagraph key={i} text={p} />
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
