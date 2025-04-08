'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollSmoother from 'gsap/ScrollSmoother';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function ScrollSmootherWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!ScrollTrigger.isTouch) {
      const smoother = ScrollSmoother.create({
        smooth: 1.2,
        effects: true,
      });

      return () => {
        smoother.kill();
      };
    }
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
