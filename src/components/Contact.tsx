import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import emailjs from '@emailjs/browser';
import MagneticButton from './MagneticButton';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress of the Contact section entering the viewport.
  // 'start end': top of Contact enters bottom of viewport (progress 0)
  // 'start start': top of Contact hits top of viewport (progress 1)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
    layoutEffect: false
  });

  // Map progress to clip-path: inset(100% 0 0 0) -> inset(0% 0 0 0)
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  // Map progress to translateY: 40px -> 0px
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  // Map progress to scale: 0.98 -> 1.0
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);

  // Map progress to opacity: 0 -> 1
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSending(true);

    const SERVICE_ID = 'YOUR_SERVICE_ID';
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

    if (SERVICE_ID === 'YOUR_SERVICE_ID' || TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      console.warn('EmailJS has not been configured. Simulating success...');
      setTimeout(() => {
        setIsSending(false);
        setIsSuccess(true);
        formRef.current?.reset();
        setTimeout(() => setIsSuccess(false), 5000);
      }, 1000);
      return;
    }

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setIsSuccess(true);
        formRef.current?.reset();
        setTimeout(() => setIsSuccess(false), 5000);
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        alert('Failed to send email. Please try reaching out directly via socials.');
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <motion.section 
      id="contact" 
      ref={sectionRef}
      className="sticky bottom-0 h-[100dvh] w-full z-10 lg:-z-10 bg-midnight-black light:bg-cream-ivory flex items-center justify-center py-6 lg:py-20 overflow-hidden will-change-[clip-path,transform,opacity]"
      style={{
        clipPath,
        y,
        scale,
        opacity
      }}
    >
      {/* Backdrop details */}
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex flex-col justify-center h-full relative z-10 pt-16 sm:pt-16 lg:pt-0">
        {/* Header */}
        <div className="mb-4 sm:mb-8 lg:mb-12">
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 light:text-black/40">05 // Collaboration</span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-display text-cream-soft light:text-midnight-black mt-1 sm:mt-2">
            Let's Connect
          </h2>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-start">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-midnight-sub/80 light:bg-cream-offwhite/80 border border-white/5 light:border-black/5 p-4 sm:p-6 lg:p-8 rounded-2xl backdrop-blur-md">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div className="flex flex-col space-y-1 sm:space-y-2">
                  <label htmlFor="name" className="text-[10px] uppercase tracking-widest font-mono text-white/40 light:text-black/40">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="user_name" 
                    required 
                    placeholder="Sharveswar M." 
                    className="px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-midnight-carbon/50 light:bg-cream-rose/50 border border-white/10 light:border-black/10 text-cream-soft light:text-midnight-black font-sans text-xs sm:text-sm focus:outline-none focus:border-white/40 light:focus:border-black/40 transition-colors"
                  />
                </div>
                <div className="flex flex-col space-y-1 sm:space-y-2">
                  <label htmlFor="email" className="text-[10px] uppercase tracking-widest font-mono text-white/40 light:text-black/40">Your Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="user_email" 
                    required 
                    placeholder="name@domain.com" 
                    className="px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-midnight-carbon/50 light:bg-cream-rose/50 border border-white/10 light:border-black/10 text-cream-soft light:text-midnight-black font-sans text-xs sm:text-sm focus:outline-none focus:border-white/40 light:focus:border-black/40 transition-colors"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1 sm:space-y-2">
                <label htmlFor="message" className="text-[10px] uppercase tracking-widest font-mono text-white/40 light:text-black/40">Your Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={3} 
                  required 
                  placeholder="Hi, let's build something awesome..." 
                  className="px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-midnight-carbon/50 light:bg-cream-rose/50 border border-white/10 light:border-black/10 text-cream-soft light:text-midnight-black font-sans text-xs sm:text-sm focus:outline-none focus:border-white/40 light:focus:border-black/40 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <MagneticButton className="w-full">
                <button 
                  type="submit" 
                  disabled={isSending}
                  className="w-full flex items-center justify-center space-x-2 text-[10px] sm:text-xs font-mono tracking-widest uppercase bg-cream-soft text-midnight-black light:bg-midnight-black light:text-cream-soft py-3 sm:py-3.5 rounded-xl hover:opacity-95 transition-opacity font-bold disabled:opacity-50 cursor-pointer"
                >
                  {isSending ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1={22} y1={2} x2={11} y2={13}/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </MagneticButton>

              {/* Resume Download Button */}
              <MagneticButton className="w-full">
                <a 
                  href="/Sharveswar_Resume.pdf" 
                  download
                  className="w-full flex items-center justify-center space-x-2 text-[10px] sm:text-xs font-mono tracking-widest uppercase bg-transparent text-cream-soft light:text-midnight-black border border-white/20 light:border-black/20 py-3 sm:py-3.5 rounded-xl hover:bg-white/5 light:hover:bg-black/5 transition-colors font-bold cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  <span>Download Resume</span>
                </a>
              </MagneticButton>
            </form>

            {/* Success Toast Alert */}
            {isSuccess && (
              <div 
                className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center space-x-3 text-xs font-mono"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <span>Message sent successfully! I'll get back to you shortly.</span>
              </div>
            )}
          </div>

          {/* Right: Contact Information / Social Links */}
          <div className="lg:col-span-5 flex flex-col space-y-4 lg:space-y-8 select-none">
            <div>
              <h3 className="text-base lg:text-lg font-bold font-display text-cream-soft light:text-midnight-black">Connect Directly</h3>
              <p className="text-[10px] lg:text-xs text-white/40 light:text-black/40 font-mono mt-1">Feel free to reach out via socials or direct mail.</p>
            </div>

            <div className="flex flex-col space-y-3 lg:space-y-4">
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/sharveswar-madasamy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-3 lg:p-4 rounded-xl border border-white/5 light:border-black/5 bg-midnight-sub/40 light:bg-cream-offwhite/40 hover:bg-midnight-carbon/60 light:hover:bg-cream-rose/60 transition-all group"
              >
                <div className="p-2 lg:p-2.5 rounded-lg bg-white/5 light:bg-black/5 text-white/45 light:text-black/45 group-hover:text-cream-soft light:group-hover:text-midnight-black transition-colors shrink-0">
                  <svg className="w-4 h-4 lg:w-[18px] lg:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width={4} height={12} x={2} y={9}/><circle cx={4} cy={4} r={2}/></svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold font-display text-cream-soft light:text-midnight-black">LinkedIn</h4>
                  <p className="text-[10px] font-mono text-white/30 light:text-black/30">sharveswar-madasamy</p>
                </div>
              </a>

              {/* GitHub */}
              <a 
                href="https://github.com/Sharveswar007" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-3 lg:p-4 rounded-xl border border-white/5 light:border-black/5 bg-midnight-sub/40 light:bg-cream-offwhite/40 hover:bg-midnight-carbon/60 light:hover:bg-cream-rose/60 transition-all group"
              >
                <div className="p-2 lg:p-2.5 rounded-lg bg-white/5 light:bg-black/5 text-white/45 light:text-black/45 group-hover:text-cream-soft light:group-hover:text-midnight-black transition-colors shrink-0">
                  <svg className="w-4 h-4 lg:w-[18px] lg:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold font-display text-cream-soft light:text-midnight-black">GitHub</h4>
                  <p className="text-[10px] font-mono text-white/30 light:text-black/30">Sharveswar007</p>
                </div>
              </a>

              {/* Direct Email Link */}
              <a 
                href="mailto:msharveswar220@gmail.com" 
                className="flex items-center space-x-4 p-3 lg:p-4 rounded-xl border border-white/5 light:border-black/5 bg-midnight-sub/40 light:bg-cream-offwhite/40 hover:bg-midnight-carbon/60 light:hover:bg-cream-rose/60 transition-all group"
              >
                <div className="p-2 lg:p-2.5 rounded-lg bg-white/5 light:bg-black/5 text-white/45 light:text-black/45 group-hover:text-cream-soft light:group-hover:text-midnight-black transition-colors shrink-0">
                  <svg className="w-4 h-4 lg:w-[18px] lg:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect width={20} height={16} x={2} y={4} rx={2}/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold font-display text-cream-soft light:text-midnight-black">Email</h4>
                  <p className="text-[10px] font-mono text-white/30 light:text-black/30">msharveswar220@gmail.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      </motion.section>
  );
}
