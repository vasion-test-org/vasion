// GSAP Performance Optimization Utilities

let gsapInstance = null;
let isGSAPInitialized = false;

/**
 * Initialize GSAP with performance optimizations
 */
export const initializeGSAP = async () => {
  if (typeof window === 'undefined' || isGSAPInitialized) {
    return gsapInstance;
  }

  try {
    const gsapModule = await import('gsap');
    gsapInstance = gsapModule.default;
    
    // Set GSAP performance optimizations
    gsapInstance.config({
      nullTargetWarn: false,
      trialWarn: false,
    });

    // Optimize for performance
    gsapInstance.set({}, { duration: 0 });
    
    isGSAPInitialized = true;
    return gsapInstance;
  } catch (error) {
    console.warn('GSAP initialization failed:', error);
    return null;
  }
};

/**
 * Lazy load GSAP plugins
 */
export const loadGSAPPlugin = async (pluginName) => {
  if (!gsapInstance) {
    await initializeGSAP();
  }

  try {
    const pluginModule = await import(`gsap/${pluginName}`);
    const plugin = pluginModule.default;
    gsapInstance.registerPlugin(plugin);
    return plugin;
  } catch (error) {
    console.warn(`Failed to load GSAP plugin ${pluginName}:`, error);
    return null;
  }
};

/**
 * Optimize ScrollTrigger performance
 */
export const optimizeScrollTrigger = (trigger, options = {}) => {
  return {
    ...trigger,
    // Performance optimizations
    fastScrollEnd: true,
    preventOverlaps: true,
    // Reduce repaints
    syncInterval: 60,
    // Better memory management
    refreshPriority: -1,
    ...options,
  };
};

/**
 * Batch GSAP animations for better performance
 */
export const batchAnimations = (animations, stagger = 0.1) => {
  if (!gsapInstance) return null;
  
  return gsapInstance.timeline({
    defaults: { 
      ease: "power2.out",
      duration: 0.6 
    }
  }).add(animations, stagger);
};

/**
 * Clean up GSAP instances
 */
export const cleanupGSAP = () => {
  if (gsapInstance) {
    // Kill all tweens and timelines
    gsapInstance.killTweensOf("*");
    gsapInstance.globalTimeline.clear();
    
    // Kill all ScrollTriggers
    if (gsapInstance.ScrollTrigger) {
      gsapInstance.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
    
    // Kill ScrollSmoother
    if (gsapInstance.ScrollSmoother) {
      const smoother = gsapInstance.ScrollSmoother.get();
      if (smoother) {
        smoother.kill();
      }
    }
  }
};

/**
 * Get GSAP instance
 */
export const getGSAP = () => gsapInstance;

/**
 * Check if GSAP is initialized
 */
export const isInitialized = () => isGSAPInitialized; 