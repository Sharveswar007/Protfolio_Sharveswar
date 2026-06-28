import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCES } from '../data/experience';

export default function Experience() {
  return (
    <section id="experience" className="relative bg-midnight-black light:bg-cream-ivory py-24 sm:py-32 overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] light:bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 light:text-black/40">02.5 // Journey</span>
          <h2 className="text-5xl sm:text-7xl font-black font-display text-cream-soft light:text-midnight-black uppercase tracking-tighter mt-2 leading-none">
            Experience
          </h2>
        </motion.div>

        <div className="flex flex-col gap-12 sm:gap-24">
          {EXPERIENCES.map((exp, index) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, filter: 'blur(20px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col lg:flex-row gap-8 lg:gap-16 border-l-4 border-white/20 light:border-black/20 pl-6 sm:pl-12 py-4 hover:border-white light:hover:border-black transition-colors duration-500"
            >
              
              {/* Aggressive Data Node */}
              <div className="absolute -left-[14px] top-0 w-6 h-6 bg-midnight-black light:bg-cream-ivory border-4 border-white light:border-black" />

              <div className="flex-1 flex flex-col justify-start pt-2">
                <span className="text-xs sm:text-sm font-mono tracking-[0.2em] text-white/50 light:text-black/50 uppercase mb-2">
                  {exp.duration} // {exp.location}
                </span>
                <h3 className="text-3xl sm:text-5xl font-black font-display text-cream-soft light:text-midnight-black leading-none mb-4 uppercase tracking-tight">
                  {exp.role}
                </h3>
                <h4 className="text-xl sm:text-2xl font-bold font-mono text-white/70 light:text-black/70 uppercase">
                  @ {exp.company}
                </h4>
              </div>

              <div className="flex-1 flex flex-col justify-start">
                <ul className="flex flex-col gap-4 mb-8 font-mono text-sm sm:text-base text-white/60 light:text-black/60">
                  {exp.description.map((desc: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-4 text-white light:text-black">{'>'}</span>
                      <span className="leading-relaxed">{desc}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  {exp.skills.map((skill: string, i: number) => (
                    <span 
                      key={i} 
                      className="px-4 py-2 text-xs font-mono tracking-widest uppercase bg-white/10 light:bg-black/10 text-white light:text-black backdrop-blur-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
