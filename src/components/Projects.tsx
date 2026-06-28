import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import type { Project } from '../data/projects';
import { PROJECTS } from '../data/projects';

// ─── Single Project Slide ──────────────────────────────────
// Initially the image is centered with margins + rounded corners.
// As the user scrolls, margins shrink to 0 and the image fills full viewport.
function ProjectSlide({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Desktop Transforms
  const marginDesktop = useTransform(scrollYProgress, [0.15, 0.45], [80, 0]);
  const borderRadiusDesktop = useTransform(scrollYProgress, [0.15, 0.45], [40, 0]);
  const imgScaleDesktop = useTransform(scrollYProgress, [0.15, 0.5], [1.25, 1.2]);

  // Image Parallax (Disabled to prevent baked-in letterbox from sliding into text)
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);
  // Content fades in
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.75, 0.9], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0.2, 0.4, 0.75, 0.9], [30, 0, 0, -20]);

  return (
    <section ref={ref} className="h-[150vh] w-full relative" style={{ zIndex: 20 }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Image/Video container — margin + border-radius animate */}
        <motion.div
          className="absolute inset-0 overflow-hidden bg-black"
          style={{
            margin: marginDesktop,
            borderRadius: borderRadiusDesktop,
          }}
        >
          <a href={`/projects/${project.slug}`} className="absolute inset-0 z-10 cursor-pointer block" aria-label={`View ${project.title} details`}></a>
          {project.mediaType === 'video' ? (
            <motion.video
              src={project.image}
              className="w-full h-full w-[120%] h-[120%] -ml-[10%] -mt-[10%] object-cover origin-center"
              style={{ scale: imgScaleDesktop, y: imgY }}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full w-[120%] h-[120%] -ml-[10%] -mt-[10%] object-cover origin-center"
              style={{ scale: imgScaleDesktop, y: imgY }}
              loading={index < 1 ? 'eager' : 'lazy'}
              decoding="async"
            />
          )}

          {/* Bottom gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

          {/* Bottom Right Logo Overlay (Positioned to cover video watermark) */}
          <div className="absolute bottom-6 lg:bottom-24 right-16 z-20 w-16 h-16 sm:w-24 sm:h-24 sm:right-20 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/40 backdrop-blur-md pointer-events-none">
            <img src={project.logo} alt={`${project.title} logo`} loading="lazy" width="96" height="96" className="w-full h-full object-cover" />
          </div>

          {/* Minimal overlay text at the bottom (Nested inside container to lock position) */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-30 px-8 sm:px-16 lg:px-24 pb-10 sm:pb-14 lg:pb-32"
            style={{ opacity: contentOpacity, y: contentY }}
          >
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              {/* Project name + one-liner */}
              <a href={`/projects/${project.slug}`} className="block group cursor-pointer z-20">
                <span className="text-[10px] font-mono text-white/40 tracking-[0.3em] uppercase transition-colors group-hover:text-orange-500/80">
                  {String(index + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
                </span>
                <h3 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-[1.05] mt-1 group-hover:text-orange-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-white/50 tracking-wider mt-2 uppercase transition-colors group-hover:text-white/80">
                  {project.subtitle}
                </p>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Mobile Project Card ───────────────────────────────────
// A clean, vertical list card for mobile users instead of the slider
function MobileProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <a 
      href={`/projects/${project.slug}`} 
      className="flex items-center p-4 rounded-[16px] bg-white/5 light:bg-black/5 border border-white/10 light:border-black/10 active:scale-95 transition-transform"
    >
      <div className="flex flex-col justify-center w-full">
        <span className="text-[9px] font-mono text-white/40 light:text-black/40 tracking-[0.2em] uppercase mb-1">
          {String(index + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
        </span>
        <h3 className="text-xl font-bold font-display text-cream-soft light:text-midnight-black leading-tight line-clamp-1">
          {project.title}
        </h3>
        <p className="text-[11px] font-mono text-white/50 light:text-black/50 mt-1 line-clamp-1 uppercase tracking-wide">
          {project.subtitle}
        </p>
      </div>
    </a>
  );
}

// ─── Main Projects Component ───────────────────────────────
export default function Projects() {
  return (
    <div id="projects" className="relative bg-midnight-black light:bg-cream-ivory">
      {/* Section Header */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-8 sm:px-16 lg:px-24 flex items-center gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-medium font-display text-cream-soft light:text-midnight-black whitespace-nowrap"
          >
            What I built so far?
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex-1 h-[1px] bg-white/15 light:bg-black/15 origin-left"
          />
        </div>
      </div>

      {/* Mobile Project List (Hidden on Desktop) */}
      <div className="md:hidden px-6 pb-24 flex flex-col gap-4 relative z-20">
        {PROJECTS.map((project, index) => (
          <MobileProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>

      {/* Desktop Project slides (Hidden on Mobile) */}
      <div className="hidden md:block relative z-10">
        {PROJECTS.map((project, index) => (
          <ProjectSlide key={project.title} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
