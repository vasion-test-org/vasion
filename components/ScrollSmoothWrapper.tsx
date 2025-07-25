'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import ScrollSmoother from 'gsap/ScrollSmoother';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let smootherInstance = null; // <-- add this at the top
let isInitialized = false;

export const getSmoother = () => smootherInstance; // <-- export a getter

export default function ScrollSmootherWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const initRef = useRef(false);

  useEffect(() => {
    if (!ScrollTrigger.isTouch && !isInitialized) {
      // Performance optimizations for ScrollSmoother
      smootherInstance = ScrollSmoother.create({
        smooth: 1.2,
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true,
        // Performance optimizations
        smoothTouch: 0.1,
        ease: "power2.out",
        // Reduce CPU usage
        speed: 1,
      });

      smootherInstance.scrollTo(0, false);
      isInitialized = true;

      return () => {
        smootherInstance?.kill();
        smootherInstance = null;
        isInitialized = false;
      };
    }
  }, [pathname]);

  // Handle pathname changes
  useEffect(() => {
    if (smootherInstance) {
      // Reset scroll position on route change
      smootherInstance.scrollTo(0, false);
    }
  }, [pathname]);

  return (
    <div id='smooth-wrapper'>
      <div id='smooth-content'>{children}</div>
    </div>
  );
}
