// Optimized GSAP imports - only import what we need
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

// Register commonly used plugins
gsap.registerPlugin(
  ScrollTrigger,
  ScrollToPlugin,
  ScrollSmoother,
  Draggable,
  InertiaPlugin
);

// Export commonly used methods
export const { to, from, set, timeline, registerPlugin, utils } = gsap;
export {
  ScrollTrigger,
  ScrollToPlugin,
  ScrollSmoother,
  Draggable,
  InertiaPlugin,
};
export default gsap;
