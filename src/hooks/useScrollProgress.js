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

    // Refresh ScrollTrigger to handle dynamic page elements / images changing heights
    const handleRefresh = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleRefresh);
    window.addEventListener('resize', handleRefresh);

    // Staggered timeouts to ensure recalculations happen as React mounts/renders images
    const t1 = setTimeout(handleRefresh, 500);
    const t2 = setTimeout(handleRefresh, 1000);
    const t3 = setTimeout(handleRefresh, 2000);
    const t4 = setTimeout(handleRefresh, 4000);

    return () => {
      ctx.revert();
      window.removeEventListener('load', handleRefresh);
      window.removeEventListener('resize', handleRefresh);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [totalSections]);

  return { scrollProgress, currentSection, setCurrentSection, containerRef };
}

