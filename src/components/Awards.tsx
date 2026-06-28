import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion"
import React, { useRef, useState, useEffect } from "react"
import { AWARDS } from "../data/awards"

export default function Awards() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const galleryRef = useRef<HTMLDivElement>(null)
    
    const [isLocked, setIsLocked] = useState(false)

    // Using useMotionValue and useSpring to update the gallery position directly in DOM,
    // avoiding heavy React state updates and event-binding lag.
    const xTarget = useMotionValue(0)
    const xSpring = useSpring(xTarget, { damping: 30, stiffness: 220, mass: 0.7 })

    const lastScrollY = useRef(0)

    useEffect(() => {
        lastScrollY.current = window.scrollY
    }, [])

    // Track the scroll progress of the Awards section exiting the viewport.
    // 'end end': bottom of Awards hits bottom of viewport (progress 0)
    // 'end start': bottom of Awards hits top of viewport (progress 1)
    const { scrollYProgress: exitProgress } = useScroll({
        target: sectionRef,
        offset: ["end end", "end start"],
        layoutEffect: false
    })

    // Map exitProgress to scale, opacity, and blur transforms
    const exitScale = useTransform(exitProgress, [0, 1], [1, 0.98])
    const exitOpacity = useTransform(exitProgress, [0, 1], [1, 0.4])
    const blurVal = useTransform(exitProgress, [0, 1], [0, 6])
    const exitFilter = useTransform(blurVal, (v) => `blur(${v}px)`)

    useEffect(() => {
        const handlePageScroll = () => {
            const currentScrollY = window.scrollY

            if ((window as any).isProgrammaticScroll) {
                // If we are programmatically scrolling (nav link) and locked, unlock!
                if (isLocked) setIsLocked(false)
                
                // Keep lastScrollY synced so we don't trigger a phantom boundary crossing when the nav ends
                lastScrollY.current = currentScrollY
                return
            }

            if (isLocked) return

            const section = sectionRef.current
            if (!section) return
            
            const sectionOffset = section.offsetTop
            const isScrollingDown = currentScrollY > lastScrollY.current

            const galleryWidth = galleryRef.current?.scrollWidth || 0
            const viewportWidth = window.innerWidth
            const maxDist = Math.max(0, galleryWidth - viewportWidth)

            // Check if scroll crossed the section threshold in either direction (inclusive of landing exactly on it via Nav)
            const crossedDown = isScrollingDown && currentScrollY >= sectionOffset && lastScrollY.current <= sectionOffset
            const crossedUp = !isScrollingDown && currentScrollY <= sectionOffset && lastScrollY.current >= sectionOffset

            lastScrollY.current = currentScrollY

            if (crossedDown) {
                // Lock vertical scroll at start of horizontal carousel (jumping immediately to first card)
                xTarget.jump(0)
                xSpring.jump(0)
                lastScrollY.current = sectionOffset
                if ((window as any).lenis) {
                    (window as any).lenis.stop()
                    ;(window as any).lenis.scrollTo(sectionOffset, { immediate: true })
                } else {
                    document.body.style.overflow = "hidden"
                    window.scrollTo(0, sectionOffset)
                }
                setIsLocked(true)
            } else if (crossedUp) {
                // Lock vertical scroll at end of horizontal carousel for upward scroll (jumping immediately to last card/outro)
                xTarget.jump(-maxDist)
                xSpring.jump(-maxDist)
                lastScrollY.current = sectionOffset
                if ((window as any).lenis) {
                    (window as any).lenis.stop()
                    ;(window as any).lenis.scrollTo(sectionOffset, { immediate: true })
                } else {
                    document.body.style.overflow = "hidden"
                    window.scrollTo(0, sectionOffset)
                }
                setIsLocked(true)
            }
        }

        window.addEventListener("scroll", handlePageScroll, { passive: true })
        return () => window.removeEventListener("scroll", handlePageScroll)
    }, [isLocked])

    // 2. Intercept and convert wheel/touch scrolling delta when locked
    useEffect(() => {
        if (!isLocked) return

        const unlockScroll = (direction: 'up' | 'down') => {
            setIsLocked(false)
            
            const sectionOffset = sectionRef.current?.offsetTop || 0
            const offsetTarget = direction === 'down' ? sectionOffset + 15 : sectionOffset - 15
            lastScrollY.current = offsetTarget

            if ((window as any).lenis) {
                (window as any).lenis.start()
                ;(window as any).lenis.scrollTo(offsetTarget, { immediate: true })
            } else {
                document.body.style.overflow = ""
                window.scrollTo(0, offsetTarget)
            }
        }

        const handleWheel = (e: WheelEvent) => {
            // Actively block browser scrolling
            e.preventDefault()
            e.stopPropagation()

            const galleryWidth = galleryRef.current?.scrollWidth || 0
            const viewportWidth = window.innerWidth
            const maxDist = Math.max(0, galleryWidth - viewportWidth)
            const currentX = xTarget.get()

            // Combine deltaY (mouse wheel) and deltaX (trackpad swipe) for natural horizontal movement
            const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY

            if (delta > 0 && currentX === -maxDist) {
                unlockScroll('down')
                return
            }
            if (delta < 0 && currentX === 0) {
                unlockScroll('up')
                return
            }

            const next = currentX - delta * 0.8
            const clamped = Math.max(-maxDist, Math.min(0, next))
            xTarget.set(clamped)
        }

        let touchStartY = 0
        let touchStartX = 0
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY
            touchStartX = e.touches[0].clientX
        }

        const handleTouchMove = (e: TouchEvent) => {
            // Block swiping scrolling on mobile
            e.preventDefault()
            e.stopPropagation()

            const touchY = e.touches[0].clientY
            const touchX = e.touches[0].clientX
            const deltaY = touchStartY - touchY
            const deltaX = touchStartX - touchX
            touchStartY = touchY
            touchStartX = touchX

            const galleryWidth = galleryRef.current?.scrollWidth || 0
            const viewportWidth = window.innerWidth
            const maxDist = Math.max(0, galleryWidth - viewportWidth)
            const currentX = xTarget.get()

            // Support both vertical swiping and horizontal swiping on mobile
            const delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY

            if (delta > 0 && currentX === -maxDist) {
                unlockScroll('down')
                return
            }
            if (delta < 0 && currentX === 0) {
                unlockScroll('up')
                return
            }

            const next = currentX - delta * 1.5
            const clamped = Math.max(-maxDist, Math.min(0, next))
            xTarget.set(clamped)
        }

        window.addEventListener("wheel", handleWheel, { passive: false, capture: true })
        window.addEventListener("touchstart", handleTouchStart, { passive: true, capture: true })
        window.addEventListener("touchmove", handleTouchMove, { passive: false, capture: true })

        return () => {
            window.removeEventListener("wheel", handleWheel, { capture: true })
            window.removeEventListener("touchstart", handleTouchStart, { capture: true })
            window.removeEventListener("touchmove", handleTouchMove, { capture: true })
        }
    }, [isLocked])

    return (
        <motion.section 
            id="awards"
            ref={sectionRef} 
            className="relative w-full h-screen bg-midnight-black light:bg-cream-ivory transition-colors duration-500 overflow-hidden z-20 flex items-center justify-start will-change-[transform,opacity,filter]"
            style={{
                scale: exitScale,
                opacity: exitOpacity,
                filter: exitFilter
            }}
        >
            {/* Gallery Slider Track */}
            <motion.div 
                ref={galleryRef} 
                className="flex gap-6 sm:gap-10 pl-[10%] pr-[20%] will-change-transform items-center" 
                style={{ x: xSpring }}
            >
                {/* Intro Title Slide */}
                <div className="flex-shrink-0 w-[75vw] sm:w-[72vw] lg:w-[68vw] flex flex-col justify-center items-start select-none">
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-white/40 light:text-black/40 mb-3">
                        04 // Recognition
                    </span>
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl text-cream-soft light:text-midnight-black font-black font-display uppercase tracking-tight leading-none">
                        Awards &amp;<br />Certifications
                    </h1>
                </div>

                {/* Certification Cards */}
                {AWARDS.map((item) => (
                    <a
                        href={`/awards/${item.slug}`}
                        key={item.id}
                        className="cert-card flex-shrink-0 w-[280px] h-[360px] sm:w-[340px] sm:h-[420px] lg:w-[480px] lg:h-[550px] rounded-2xl relative overflow-hidden border shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] light:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.015] hover:border-white/20 light:hover:border-black/20 cursor-pointer block"
                        style={{ 
                            '--card-accent-fade': `${item.color}0a`,
                            '--card-accent-fade-light': `${item.color}06`
                        } as React.CSSProperties}
                    >
                        {/* Theme-aware bottom gradient overlay */}
                        <div 
                            className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 light:from-cream-ivory/90 light:via-cream-ivory/40 to-transparent pointer-events-none"
                        />

                        {/* Blended Certification Image Overlay */}
                        <div 
                            className="absolute top-8 left-8 right-8 bottom-32 sm:bottom-40 bg-contain bg-center bg-no-repeat opacity-100 mix-blend-normal z-20 drop-shadow-[0_0_20px_rgba(255,255,255,0.7)] light:drop-shadow-none pointer-events-none" 
                            style={{ backgroundImage: `url(${item.logo})` }}
                        />

                        {/* Certificate content */}
                        <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 z-30">
                            <span 
                                className="text-xs sm:text-sm font-mono font-bold tracking-widest block mb-2"
                                style={{ color: item.color }}
                            >
                                0{item.id}
                            </span>
                            <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold font-display text-cream-soft light:text-midnight-black leading-tight tracking-tight">
                                {item.title}
                            </h2>
                            <p className="text-[10px] sm:text-xs font-mono text-white/40 light:text-black/40 uppercase tracking-widest mt-2.5">
                                {item.issuer}
                            </p>
                        </div>
                    </a>
                ))}
            </motion.div>

            <StyleSheet />
        </motion.section>
    )
}

/**
 * ==============   Styles   ================
 */

function StyleSheet() {
    return (
        <style>{`
            .cert-card {
                background: linear-gradient(135deg, rgba(20, 20, 20, 0.85) 0%, rgba(10, 10, 10, 0.95) 60%, var(--card-accent-fade) 100%);
                border-color: rgba(255, 255, 255, 0.08);
            }
            .light .cert-card {
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(249, 249, 249, 0.98) 60%, var(--card-accent-fade-light) 100%);
                border-color: rgba(0, 0, 0, 0.08);
            }

            @media (max-width: 768px) {
                .gallery-item {
                    width: 340px;
                    height: 420px;
                }
                .gallery {
                    gap: 20px;
                    padding-left: 5%;
                    padding-right: 15%;
                }
                .gallery-item h2 {
                    font-size: 22px;
                }
                .item-content {
                    bottom: 30px;
                    left: 30px;
                    right: 30px;
                }
            }

            @media (max-width: 480px) {
                .gallery-item {
                    width: 280px;
                    height: 360px;
                }
                .gallery {
                    gap: 15px;
                    padding-left: 20px;
                    padding-right: 30px;
                }
                .gallery-item h2 {
                    font-size: 18px;
                }
                .item-content {
                    bottom: 24px;
                    left: 24px;
                    right: 24px;
                }
            }
        `}</style>
    )
}

/**
 * ==============   Data Extracted to src/data/awards.ts   ================
 */
