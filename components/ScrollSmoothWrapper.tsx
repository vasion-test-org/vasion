'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

let smootherInstance = null;

export const getSmoother = () => smootherInstance;

// Device detection utility
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 768
  );
};

export default function ScrollSmootherWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  useEffect(() => {
    // Skip GSAP initialization on mobile devices
    if (isMobile) {
      return;
    }

    // Lazy load GSAP only on desktop after page is interactive
    const loadScrollSmoother = async () => {
      try {
        // Use requestIdleCallback to defer GSAP loading until browser is idle
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(async () => {
            const { default: gsap } = await import('gsap');
            const { default: ScrollSmoother } = await import(
              'gsap/ScrollSmoother'
            );
            const { default: ScrollTrigger } = await import(
              'gsap/ScrollTrigger'
            );

            gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

            if (!ScrollTrigger.isTouch) {
              smootherInstance = ScrollSmoother.create({
                smooth: 1.2,
                effects: true,
                normalizeScroll: true,
                ignoreMobileResize: true,
              });

              smootherInstance.scrollTo(0, false);
            }
          });
        } else {
          // Fallback for browsers without requestIdleCallback
          setTimeout(async () => {
            const { default: gsap } = await import('gsap');
            const { default: ScrollSmoother } = await import(
              'gsap/ScrollSmoother'
            );
            const { default: ScrollTrigger } = await import(
              'gsap/ScrollTrigger'
            );

            gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

            if (!ScrollTrigger.isTouch) {
              smootherInstance = ScrollSmoother.create({
                smooth: 1.2,
                effects: true,
                normalizeScroll: true,
                ignoreMobileResize: true,
              });

              smootherInstance.scrollTo(0, false);
            }
          }, 100);
        }
      } catch (error) {
        console.warn('Failed to load ScrollSmoother:', error);
      }
    };

    loadScrollSmoother();

    return () => {
      smootherInstance?.kill();
      smootherInstance = null;
    };
  }, [pathname, isMobile]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
