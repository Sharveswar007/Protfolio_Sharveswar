import { motion, useScroll, useTransform } from "framer-motion"
import React, { useRef } from "react"

interface CurtainTransitionProps {
    from: React.ReactNode
    to: React.ReactNode
}

export default function CurtainTransition({ from, to }: CurtainTransitionProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    
    // Track scroll progress of the transition area. 
    // The container is 200vh tall to provide a smooth 100vh scroll span for the curtains wipe.
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Phase 1 (0 -> 0.5): Curtains close and meet in the center
    // Phase 2 (0.5 -> 1): Curtains open to reveal the 'to' content
    
    // Left Curtain: slides out from left to cover the left half, then retracts back to left
    const leftClip = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [
            "inset(0% 100% 0% 0%)", // Open
            "inset(0% 50% 0% 0%)",  // Closed (covers left 50%)
            "inset(0% 100% 0% 0%)"  // Open
        ]
    )

    // Right Curtain: slides out from right to cover the right half, then retracts back to right
    const rightClip = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [
            "inset(0% 0% 0% 100%)", // Open
            "inset(0% 0% 0% 50%)",  // Closed (covers right 50%)
            "inset(0% 0% 0% 100%)"  // Open
        ]
    )

    // Content Opacity cross-fade at the exact center (0.5 progress)
    const fromOpacity = useTransform(scrollYProgress, [0, 0.49, 0.5, 1], [1, 1, 0, 0])
    const toOpacity = useTransform(scrollYProgress, [0, 0.5, 0.51, 1], [0, 0, 1, 1])

    // Coordinate pointer-events to prevent inactive layer from blocking clicks
    const fromPointerEvents = useTransform(scrollYProgress, (progress) => progress < 0.5 ? "auto" : "none")
    const toPointerEvents = useTransform(scrollYProgress, (progress) => progress >= 0.5 ? "auto" : "none")

    return (
        <div 
            ref={containerRef} 
            className="relative w-full h-[200vh] bg-midnight-black light:bg-cream-ivory transition-colors duration-500"
        >
            {/* Sticky Viewport Container */}
            <div className="sticky top-0 w-full h-screen overflow-hidden">
                
                {/* Background Layer ('to' content, e.g. Contact Form) */}
                <motion.div 
                    className="absolute inset-0 w-full h-full z-10"
                    style={{ opacity: toOpacity, pointerEvents: toPointerEvents }}
                >
                    {to}
                </motion.div>

                {/* Foreground Layer ('from' content, e.g. Awards Section) */}
                <motion.div 
                    className="absolute inset-0 w-full h-full z-20"
                    style={{ opacity: fromOpacity, pointerEvents: fromPointerEvents }}
                >
                    {from}
                </motion.div>

                {/* Left Curtain (Theme-colored panel) */}
                <motion.div 
                    className="absolute inset-y-0 left-0 w-full h-full bg-midnight-black light:bg-cream-ivory z-30 pointer-events-none border-r border-white/5 light:border-black/5 will-change-[clip-path]"
                    style={{ clipPath: leftClip }}
                />

                {/* Right Curtain (Theme-colored panel) */}
                <motion.div 
                    className="absolute inset-y-0 right-0 w-full h-full bg-midnight-black light:bg-cream-ivory z-30 pointer-events-none border-l border-white/5 light:border-black/5 will-change-[clip-path]"
                    style={{ clipPath: rightClip }}
                />

            </div>
        </div>
    )
}
