import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    let current = 0;
    const interval = setInterval(() => {
      // Fast counter
      current += Math.floor(Math.random() * 15) + 5;
      if (current >= 100) {
        current = 100;
        setProgress(current);
        clearInterval(interval);
        
        // Wait a tiny bit at 100% then trigger exit
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = '';
          // Dispatch a custom event so other components (like Hero) know to start animating
          window.dispatchEvent(new Event('preloaderFinished'));
        }, 400);
      } else {
        setProgress(current);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ 
            y: '-100%', 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
          }}
          className="fixed inset-0 z-[9999] bg-midnight-black light:bg-cream-ivory flex items-center justify-center flex-col"
        >
          <div className="flex flex-col items-center justify-center w-full h-full relative">
            <div className="overflow-hidden mb-2">
              <motion.span 
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[10px] uppercase font-mono tracking-[0.4em] text-white/30 light:text-black/30"
              >
                Sharveswar M.
              </motion.span>
            </div>
            
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="text-7xl sm:text-8xl md:text-9xl font-black font-display text-cream-soft light:text-midnight-black"
              >
                {progress}%
              </motion.h1>
            </div>
            
            {/* Minimal loading bar */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-white/10 light:bg-black/10 overflow-hidden">
              <motion.div 
                className="h-full bg-cream-soft light:bg-midnight-black"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
