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
      // 1. Global progress tracker (robust viewport scroll height based calculation)
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });

      // 2. Individual section viewport triggers (accounts for varying section heights on mobile)
      const sections = gsap.utils.toArray('.scroll-section');
      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 45%', // triggers when section is in viewport view area
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) {
              setCurrentSection(index + 1);
            }
          },
        });
      });
    });

    return () => ctx.revert();
  }, [totalSections]);

  return { scrollProgress, currentSection, containerRef };
}
