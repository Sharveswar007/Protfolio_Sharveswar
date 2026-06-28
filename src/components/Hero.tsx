import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Use native scroll progress on the Hero section itself
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"] // 0 when at top, 1 when scrolled fully out
  });

  // Staggered Parallax Exit Animations (Waterfall effect dropping downwards natively)
  const title1Y = useTransform(scrollYProgress, [0, 0.4], [0, 100]);
  const title1Opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const title2Y = useTransform(scrollYProgress, [0.1, 0.5], [0, 100]);
  const title2Opacity = useTransform(scrollYProgress, [0.1, 0.5], [1, 0]);

  const descY = useTransform(scrollYProgress, [0.2, 0.6], [0, 100]);
  const descOpacity = useTransform(scrollYProgress, [0.2, 0.6], [1, 0]);

  const statsY = useTransform(scrollYProgress, [0.3, 0.7], [0, 100]);
  const statsOpacity = useTransform(scrollYProgress, [0.3, 0.7], [1, 0]);

  const cardY = useTransform(scrollYProgress, [0.4, 0.9], [0, 100]);
  const cardOpacity = useTransform(scrollYProgress, [0.4, 0.9], [1, 0]);

  return (
    <div ref={containerRef} id="home" className="min-h-screen w-full relative z-0 flex items-center justify-center bg-midnight-black light:bg-cream-ivory pt-20 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/5 light:bg-black/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/5 light:bg-black/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Hero Grid */}
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col-reverse lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-20 py-12 lg:py-20">

        {/* LEFT COLUMN: ID Card */}
        <motion.div style={{ y: cardY, opacity: cardOpacity }} className="lg:col-span-5 flex justify-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="w-full flex justify-center relative"
          >
            <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full border-2 border-dashed border-orange-500/40 pointer-events-none hidden sm:block" />
            <div className="absolute -bottom-8 -left-8 w-44 h-44 rounded-full border-2 border-dashed border-orange-500/40 pointer-events-none hidden sm:block" />

            <div className="w-full max-w-[260px] sm:max-w-[300px] bg-white light:bg-midnight-onyx rounded-[28px] p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] light:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.4)] border border-black/5 light:border-white/10 flex flex-col relative z-10 select-none transition-colors backdrop-blur-none">
              <div className="w-full aspect-[3/4] rounded-[20px] overflow-hidden bg-neutral-100 border border-black/5 relative shadow-inner mb-4">
                <img
                  src="/images/my_image.jpg"
                  alt="Sharveswar Madasamy"
                  className="w-full h-full object-cover"
                  width="400"
                  height="533"
                  loading="eager"
                />
              </div>

              <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight text-midnight-black light:text-cream-soft leading-tight transition-colors">
                Sharveswar Madasamy
              </h3>

              <div className="my-3 flex items-center">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 23a7.5 7.5 0 0 1-5.13-12.93C7.39 9.57 9 7.7 9 5c0-.85.3-1.63.8-2.25.18.52.54 1 .9 1.45.67.8 1.55 1.9 1.55 3.3 0 1.25-.8 2.25-1.75 3.25C9.5 11.75 9 12.8 9 13.75a3 3 0 1 0 6 0c0-.85-.3-1.63-.8-2.25-.18-.52-.54-1-.9-1.45-.67-.8-1.55-1.9-1.55-3.3 0-1.25.8-2.25 1.75-3.25.5-.5 1-1.55 1-2.5 0-.85.3-1.63.8-2.25.18.52.54 1 .9 1.45.67.8 1.55 1.9 1.55 3.3 0 3.86-3.14 7-7 7z" />
                  </svg>
                </div>
              </div>

              <p className="text-[11px] font-sans text-neutral-600 light:text-neutral-400 leading-relaxed font-medium mb-4 transition-colors">
                An AI Integrated Full Stack Engineer who designs high-performance server architectures and real-time computer vision hardware integrations.
              </p>

              <div className="w-full border-t border-black/10 light:border-white/10 pt-4 flex items-center justify-start space-x-5 transition-colors">
                <a href="#about" className="text-neutral-400 light:text-neutral-500 hover:text-orange-500 light:hover:text-orange-500 transition-colors" aria-label="About Me">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </a>
                <a href="https://github.com/Sharveswar007" target="_blank" rel="noopener noreferrer" className="text-neutral-400 light:text-neutral-500 hover:text-orange-500 light:hover:text-orange-500 transition-colors" aria-label="GitHub">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/sharveswar-madasamy" target="_blank" rel="noopener noreferrer" className="text-neutral-400 light:text-neutral-500 hover:text-orange-500 light:hover:text-orange-500 transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a href="mailto:msharveswar220@gmail.com" className="text-neutral-400 light:text-neutral-500 hover:text-orange-500 light:hover:text-orange-500 transition-colors" aria-label="Email Me">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Title & Stats */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          <div className="flex flex-col select-none">
            <motion.div style={{ y: title1Y, opacity: title1Opacity }} className="overflow-hidden pb-2 relative">
              <motion.h1 
                initial={{ y: '100%' }}
                animate={isLoaded ? { y: '0%' } : { y: '100%' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="text-4xl sm:text-6xl md:text-8xl font-black font-display tracking-tight leading-none text-cream-soft light:text-midnight-black uppercase transition-colors"
              >
                AI Integrated
              </motion.h1>
            </motion.div>
            <motion.div style={{ y: title2Y, opacity: title2Opacity }} className="overflow-hidden mt-1 relative">
              <motion.h2 
                initial={{ y: '100%' }}
                animate={isLoaded ? { y: '0%' } : { y: '100%' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-4xl sm:text-6xl md:text-8xl font-black font-display tracking-tight leading-none text-white/30 light:text-black/10 uppercase transition-colors"
              >
                Developer
              </motion.h2>
            </motion.div>
          </div>

          <motion.div style={{ y: descY, opacity: descOpacity }} className="relative">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="max-w-xl text-xs sm:text-base text-white/70 light:text-black/60 leading-relaxed font-mono mt-6 mb-10"
            >
              Passionate about crafting intelligent systems and low-latency full-stack architectures. Specializing in bridging local hardware pipelines with cloud LLMs.
            </motion.p>
          </motion.div>

          <motion.div style={{ y: statsY, opacity: statsOpacity }} className="relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 light:border-black/10 select-none"
            >
              <div>
                <span className="text-3xl sm:text-5xl font-black font-display text-cream-soft light:text-midnight-black leading-none block transition-colors">+5</span>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase text-neutral-400 light:text-neutral-500 mt-2 block">Projects <br /> Completed</span>
              </div>
              <div>
                <span className="text-3xl sm:text-5xl font-black font-display text-cream-soft light:text-midnight-black leading-none block transition-colors">+10</span>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase text-neutral-400 light:text-neutral-500 mt-2 block">Technical <br /> Certifications</span>
              </div>
              <div>
                <span className="text-3xl sm:text-5xl font-black font-display text-cream-soft light:text-midnight-black leading-none block transition-colors">3rd</span>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase text-neutral-400 light:text-neutral-500 mt-2 block">Hackathon <br /> Winners</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
