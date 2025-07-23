// Centralized GSAP registry to prevent multiple imports and registrations
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollSmoother from 'gsap/ScrollSmoother';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import Draggable from 'gsap/Draggable';
import InertiaPlugin from 'gsap/InertiaPlugin';

// Register all plugins once
gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  Draggable,
  InertiaPlugin
);

// Export configured gsap instance
export default gsap;
export { ScrollTrigger, ScrollSmoother, ScrollToPlugin, Draggable, InertiaPlugin }; 