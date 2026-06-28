import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'project'>('default');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for the main arrow pointer cursor (fast and precise)
  const arrowSpringConfig = { damping: 45, stiffness: 450, mass: 0.2 };
  const cursorX = useSpring(mouseX, arrowSpringConfig);
  const cursorY = useSpring(mouseY, arrowSpringConfig);

  // Springs for the floating target (slower and more fluid/sluggish)
  const targetSpringConfig = { damping: 22, stiffness: 85, mass: 0.55 };
  const targetX = useSpring(mouseX, targetSpringConfig);
  const targetY = useSpring(mouseY, targetSpringConfig);

  useEffect(() => {
    // Only enable custom cursor on devices that support hover (desktops)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);
    document.documentElement.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Look up to see if any parent is a project card with data attribute
      const hasProjectHover = target.closest('[data-hover-project]');
      if (hasProjectHover) {
        setCursorType('project');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Main Trailing Arrow Pointer (Always Visible, Color-Inverting) */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          translateX: '-4px', // Align tip of the SVG arrow to mouse position
          translateY: '-4px',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
        }}
        animate={{
          width: 24,
          height: 24,
        }}
        className="hidden md:flex items-center justify-center"
      >
        <svg 
          viewBox="0 0 24 24" 
          className="w-full h-full fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m4 4 7.07 17 2.51-7.39L21 11.07z" />
        </svg>
      </motion.div>

      {/* 2. Floating Target (Appears on Project Hover, Sluggishly Trails Pointer) */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: targetX,
          y: targetY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9998,
          mixBlendMode: 'difference',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: cursorType === 'project' ? 1 : 0,
          opacity: cursorType === 'project' ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 180,
        }}
        className="hidden md:flex items-center justify-center w-28 h-28"
      >
        {/* Rotating Circular Text Badge */}
        <div className="relative w-full h-full flex items-center justify-center">
          <svg 
            viewBox="0 0 100 100" 
            style={{ animation: 'spin 12s linear infinite' }}
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              id="textPathCircle" 
              d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" 
              fill="none" 
            />
            <text className="fill-white text-[7.5px] font-mono font-bold tracking-[0.14em] uppercase">
              <textPath href="#textPathCircle">
                View Project • View Project •
              </textPath>
            </text>
          </svg>
          
          {/* Inner core dot */}
          <div className="absolute w-2 h-2 rounded-full bg-white"></div>
        </div>
      </motion.div>
    </>
  );
}
