import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useVelocity, useSpring, useMotionValueEvent } from 'framer-motion';
import { EXPERIENCES } from '../data/experience';

function VelocityPanel({ exp, index, scrollYProgress }: { exp: any, index: number, scrollYProgress: any }) {
  // We have 3 experiences. Peak visibility points for each: 0, 0.5, 1.0.
  const peak = index / (EXPERIENCES.length - 1); 

  // Z-axis movement: Deep behind (-3000) -> Center (0) -> Flown past (2000)
  const z = useTransform(
    scrollYProgress, 
    [peak - 0.5, peak, peak + 0.5], 
    [-3000, 0, 2000]
  );

  // Opacity: Invisible when far, fully opaque at center, invisible when flown past
  const opacity = useTransform(
    scrollYProgress,
    [peak - 0.4, peak - 0.1, peak + 0.1, peak + 0.3],
    [0, 1, 1, 0]
  );
  
  // Motion blur effect for high speed depth
  const filter = useTransform(
    scrollYProgress,
    [peak - 0.5, peak - 0.1, peak + 0.1, peak + 0.4],
    ["blur(20px)", "blur(0px)", "blur(0px)", "blur(30px)"]
  );

  // Scale aggressively when flying past the camera to create breaking-bounds effect
  const scale = useTransform(
    scrollYProgress,
    [peak, peak + 0.4],
    [1, 4]
  );

  return (
    <motion.div
      className="absolute w-full max-w-6xl px-4 sm:px-8 lg:px-12 flex flex-col items-center justify-center pointer-events-none"
      style={{
        z,
        opacity,
        filter,
        scale,
      }}
    >
      <div className="w-full bg-white/5 light:bg-black/5 border border-white/10 light:border-black/10 backdrop-blur-2xl p-6 sm:p-12 lg:p-16 rounded-3xl shadow-2xl relative overflow-hidden">
        
        {/* Themed ambient glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 light:bg-black/5 rounded-full blur-3xl -mt-32 -mr-32 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="flex-1 flex flex-col justify-center">
            <h4 className="text-sm sm:text-lg font-mono font-bold tracking-widest uppercase mb-2 text-white/50 light:text-black/50">
              {exp.company}
            </h4>
            <h3 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-display text-cream-soft light:text-midnight-black mb-4 leading-[1.1] tracking-tight">
              {exp.role}
            </h3>
            <div className="text-xs sm:text-sm font-mono tracking-widest text-white/60 light:text-black/60 uppercase border border-white/10 light:border-black/10 px-4 py-2 inline-block self-start rounded-full bg-white/5 light:bg-black/5">
              {exp.duration}
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <ul className="flex flex-col gap-4 mb-8 font-mono text-xs sm:text-sm text-white/70 light:text-black/70">
              {exp.description.map((desc: string, i: number) => (
                <li key={i} className="flex items-start">
                  <span className="mr-4 mt-1 opacity-50">{'>>'}</span>
                  <span className="tracking-wide leading-relaxed">{desc}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {exp.skills.map((skill: string, i: number) => (
                <span 
                  key={i} 
                  className="px-3 py-1.5 text-[10px] sm:text-xs font-mono tracking-widest uppercase border border-white/20 light:border-black/20 rounded-full text-white light:text-black bg-white/5 light:bg-black/5"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shake, setShake] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate velocity for responsive speed lines
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  
  // Transform velocity into stretch and opacity for the speed lines
  const speedLineScale = useTransform(smoothVelocity, [-1, 0, 1], [4, 1, 4]);
  const speedLineOpacity = useTransform(smoothVelocity, [-0.05, 0, 0.05], [0.8, 0, 0.8]);

  // Cinematic screen shake when a panel hits peak focus (Z = 0)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Peaks are exactly at 0.0, 0.5, 1.0
    // Trigger shake slightly before they peak so the impact feels real
    if (Math.abs(latest - 0.02) < 0.01) setShake(Date.now());
    if (Math.abs(latest - 0.49) < 0.01) setShake(Date.now());
    if (Math.abs(latest - 0.98) < 0.01) setShake(Date.now());
  });

  return (
    <section id="experience" className="relative bg-midnight-black light:bg-cream-ivory pt-0" ref={containerRef}>
      {/* 
        Container must be extremely tall (400vh) to allow enough scrolling to progress through the 3 phases smoothly
      */}
      <div className="h-[400vh] w-full relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          {/* Top Section Header */}
          <div className="absolute top-12 left-6 sm:left-12 lg:left-24 z-50 pointer-events-none">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 light:text-black/40">02.5 // Journey</span>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-cream-soft light:text-midnight-black mt-2">
              Experience
            </h2>
          </div>
          <div className="absolute top-12 right-6 sm:right-12 lg:right-24 z-50 pointer-events-none text-right hidden sm:block">
             <div className="text-[10px] font-mono text-white/40 light:text-black/40 tracking-widest uppercase mb-1 animate-pulse">
                SCROLL FORWARD TO ACCELERATE
             </div>
          </div>

          {/* Speed / Warp Lines (Reacting to velocity, properly themed) */}
          <motion.div 
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
            style={{ 
              scaleZ: speedLineScale, 
              opacity: speedLineOpacity,
              perspective: '800px' 
            }}
          >
            {/* Generate random radial speed lines */}
            {[...Array(40)].map((_, i) => (
              <div 
                key={i}
                className="absolute bg-white/20 light:bg-black/20"
                style={{
                  width: Math.random() * 2 + 1 + 'px',
                  height: Math.random() * 300 + 100 + 'px',
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${Math.random() * 360}deg) translateY(${Math.random() * 400 + 100}px)`,
                  transformOrigin: 'top center',
                  filter: 'blur(1px)'
                }}
              />
            ))}
          </motion.div>

          {/* 3D Perspective Tunnel Camera */}
          <motion.div 
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            style={{ perspective: '1200px' }}
            animate={shake ? {
              x: [0, -15, 15, -8, 8, 0],
              y: [0, 8, -8, 4, -4, 0],
            } : {}}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* 3D Space where panels are transformed on the Z axis */}
            <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
              {EXPERIENCES.map((exp, index) => (
                <VelocityPanel key={exp.id} exp={exp} index={index} scrollYProgress={scrollYProgress} />
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
