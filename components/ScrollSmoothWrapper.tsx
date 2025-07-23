'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap, { ScrollSmoother, ScrollTrigger } from '@/lib/gsap';

let smootherInstance = null; // <-- add this at the top

export const getSmoother = () => smootherInstance; // <-- export a getter

export default function ScrollSmootherWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (!ScrollTrigger.isTouch) {
      smootherInstance = ScrollSmoother.create({
        smooth: 1.2,
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true,
      });

      smootherInstance.scrollTo(0, false);

      return () => {
        smootherInstance?.kill();
        smootherInstance = null;
      };
    }
  }, [pathname]);

  return (
    <div id='smooth-wrapper'>
      <div id='smooth-content'>{children}</div>
    </div>
  );
}
