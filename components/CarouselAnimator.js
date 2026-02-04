'use client';

import { useEffect, useState } from 'react';

import { horizontalLoop } from '@/functions/horizontalLoop';
import { optimizeGSAP } from '@/lib/scriptOptimization';

/**
 * CarouselAnimator (Client Component)
 * Reusable client component for GSAP horizontal loop animations.
 * Can be used by any carousel component that needs infinite scrolling.
 *
 * @param {string} selector - CSS selector for items to animate (e.g., '.cubeLogos', '.carousel-item')
 * @param {object} options - Configuration options for horizontalLoop
 * @param {boolean} options.deep - Deep clone items (default: false)
 * @param {number} options.repeat - Number of repeats, -1 for infinite (default: -1)
 * @param {number} options.speed - Animation speed in pixels per second (default: 1)
 * @param {boolean} options.reversed - Reverse direction (default: false)
 * @param {boolean} options.paused - Start paused (default: false)
 * @param {number} options.paddingRight - Gap between items in pixels (default: 0)
 * @param {boolean} options.draggable - Enable drag interaction (default: false)
 * @param {string} options.center - Center alignment ('top', 'center', 'bottom')
 * @param {function} onChange - Callback when active item changes
 */
const CarouselAnimator = ({ onChange, options = {}, selector = '.carousel-item' }) => {
  const [gsapLoaded, setGsapLoaded] = useState(false);

  useEffect(() => {
    optimizeGSAP().then(() => {
      setGsapLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!gsapLoaded) return;

    const items = window.gsap?.utils?.toArray(selector);
    if (!items?.length) return;

    // Default options
    const loopOptions = {
      deep: false,
      paused: false,
      repeat: -1,
      reversed: false,
      speed: 1,
      ...options,
    };

    // Add onChange callback if provided
    if (onChange) {
      loopOptions.onChange = onChange;
    }

    const loop = horizontalLoop(items, loopOptions);

    // Cleanup on unmount
    return () => {
      if (loop?.kill) {
        loop.kill();
      }
    };
  }, [gsapLoaded, selector, options, onChange]);

  // This component renders nothing - it only runs the animation
  return null;
};

export default CarouselAnimator;
