import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useScrollProgress(totalSections = 9) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          // Determine current section (1-based)
          const section = Math.min(
            totalSections,
            Math.floor(progress * totalSections) + 1
          );
          setCurrentSection(section);
        },
      });
    });

    return () => ctx.revert();
  }, [totalSections]);

  return { scrollProgress, currentSection, containerRef };
}
