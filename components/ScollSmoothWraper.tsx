'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import ScrollSmoother from 'gsap/ScrollSmoother';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function ScrollSmootherWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // ✅ safe here

  useEffect(() => {
    if (!ScrollTrigger.isTouch) {
      const smoother = ScrollSmoother.create({
        smooth: 1.2,
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true,
      });


      smoother.scrollTo(0, false);

      return () => {
        smoother.kill();
      };
    }
  }, [pathname]); 

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
