import { motion, useScroll, useTransform } from "framer-motion"
import React, { useState, useEffect, useRef } from "react"

export default function CurtainOverlay() {
    const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)

    useEffect(() => {
        const el = document.getElementById("contact")
        if (el) {
            setTargetElement(el)
        }
    }, [])

    if (!targetElement) {
        return null // Don't render until the Contact section is found in the DOM
    }

    return <CurtainOverlayInner targetElement={targetElement} />
}

function CurtainOverlayInner({ targetElement }: { targetElement: HTMLElement }) {
    const targetRef = useRef<HTMLElement>(targetElement)
    
    // Track the scroll progress of the Contact section entering the viewport.
    // 'start end': top of Contact enters bottom of viewport (progress 0)
    // 'start start': top of Contact hits top of viewport (progress 1)
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "start start"],
        layoutEffect: false
    })

    // Left Curtain: slides in to meet at the center (50%), then retracts back to left (100%)
    const leftClip = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [
            "inset(0% 100% 0% 0%)", // Fully open
            "inset(0% 50% 0% 0%)",  // Closed (covers left 50%)
            "inset(0% 100% 0% 0%)"  // Fully open
        ]
    )

    // Right Curtain: slides in to meet at the center (50%), then retracts back to right (100%)
    const rightClip = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [
            "inset(0% 0% 0% 100%)", // Fully open
            "inset(0% 0% 0% 50%)",  // Closed (covers right 50%)
            "inset(0% 0% 0% 100%)"  // Fully open
        ]
    )

    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-50 overflow-hidden">
            {/* Left Curtain Panel */}
            <motion.div 
                className="absolute inset-y-0 left-0 w-full h-full bg-midnight-black light:bg-cream-ivory border-r border-white/5 light:border-black/5 will-change-[clip-path]"
                style={{ clipPath: leftClip }}
            />

            {/* Right Curtain Panel */}
            <motion.div 
                className="absolute inset-y-0 right-0 w-full h-full bg-midnight-black light:bg-cream-ivory border-l border-white/5 light:border-black/5 will-change-[clip-path]"
                style={{ clipPath: rightClip }}
            />
        </div>
    )
}
