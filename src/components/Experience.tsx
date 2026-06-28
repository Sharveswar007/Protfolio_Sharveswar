import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EXPERIENCES } from '../data/experience';

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="experience" className="relative bg-midnight-black light:bg-cream-ivory pt-24 pb-32 overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 sm:px-16 lg:px-24">
        
        {/* Section Header */}
        <motion.div 
          style={{ y: headerY }}
          className="mb-16 md:mb-24"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 light:text-black/40">02.5 // Journey</span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-cream-soft light:text-midnight-black mt-2">
            Experience
          </h2>
        </motion.div>

        {/* Experience Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          
          {/* Left: Decorative Sticky Timeline (Desktop) */}
          <div className="hidden md:block col-span-3 lg:col-span-4 relative">
            <div className="sticky top-40 w-full h-[60vh] flex justify-end pr-8">
              <div className="w-[1px] h-full bg-white/10 light:bg-black/10 relative">
                <motion.div 
                  className="absolute top-0 left-0 w-full bg-cream-soft light:bg-midnight-black origin-top"
                  style={{ 
                    scaleY: scrollYProgress,
                    height: '100%'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right: Experience Cards */}
          <div className="col-span-1 md:col-span-9 lg:col-span-8 flex flex-col gap-12 sm:gap-20">
            {EXPERIENCES.map((exp, index) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Mobile Timeline Dot */}
                <div className="md:hidden absolute -left-6 sm:-left-10 top-2 w-2 h-2 rounded-full bg-cream-soft/50 light:bg-midnight-black/50 group-hover:bg-cream-soft light:group-hover:bg-midnight-black transition-colors" />
                
                {/* Mobile Timeline Line */}
                <div className="md:hidden absolute -left-[21px] sm:-left-[37px] top-6 bottom-[-48px] sm:bottom-[-80px] w-[1px] bg-white/10 light:bg-black/10 last:hidden" />

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-cream-soft light:text-midnight-black group-hover:text-white light:group-hover:text-black transition-colors">
                    {exp.role}
                  </h3>
                  <span className="text-xs sm:text-sm font-mono text-white/50 light:text-black/50 mt-1 sm:mt-0 tracking-wider uppercase">
                    {exp.duration}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-sm font-mono text-white/80 light:text-black/80 font-bold uppercase tracking-wide">
                    {exp.company}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/20 light:bg-black/20" />
                  <span className="text-xs font-mono text-white/40 light:text-black/40 uppercase tracking-widest">
                    {exp.location}
                  </span>
                </div>

                <ul className="flex flex-col gap-3 mb-6">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-sm sm:text-base text-white/60 light:text-black/60 leading-relaxed flex items-start">
                      <span className="mr-3 mt-2 w-1.5 h-1.5 rounded-full bg-white/20 light:bg-black/20 shrink-0" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 text-[10px] sm:text-xs font-mono tracking-wider uppercase text-white/50 light:text-black/50 border border-white/10 light:border-black/10 rounded-full bg-white/5 light:bg-black/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
