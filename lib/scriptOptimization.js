/**
 * Script optimization utilities for better TBT performance
 */

/**
 * Loads a script with optimized loading strategy
 * @param {string} src - Script source URL
 * @param {Object} options - Loading options
 * @returns {Promise} - Promise that resolves when script is loaded
 */
export const loadScript = (src, options = {}) => {
  return new Promise((resolve, reject) => {
    const {
      strategy = 'afterInteractive',
      defer = true,
      async = true,
      onLoad = null,
      onError = null,
    } = options;

    // Check if script is already loaded
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      resolve(existingScript);
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.defer = defer;
    script.async = async;

    script.onload = () => {
      if (onLoad) onLoad();
      resolve(script);
    };

    script.onerror = () => {
      if (onError) onError();
      reject(new Error(`Failed to load script: ${src}`));
    };

    // Add to head or body based on strategy
    if (strategy === 'beforeInteractive') {
      document.head.appendChild(script);
    } else {
      document.body.appendChild(script);
    }
  });
};

/**
 * Loads multiple scripts in sequence to avoid blocking
 * @param {Array} scripts - Array of script configurations
 * @returns {Promise} - Promise that resolves when all scripts are loaded
 */
export const loadScriptsSequentially = async (scripts) => {
  const results = [];
  for (const script of scripts) {
    try {
      const result = await loadScript(script.src, script.options);
      results.push(result);
    } catch (error) {
      console.warn(`Failed to load script: ${script.src}`, error);
      results.push(null);
    }
  }
  return results;
};

/**
 * Preloads critical scripts for better performance
 * @param {Array} scripts - Array of script URLs to preload
 */
export const preloadScripts = (scripts) => {
  scripts.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'script';
    link.href = src;
    document.head.appendChild(link);
  });
};

/**
 * Defers non-critical scripts until user interaction
 * @param {Array} scripts - Array of script configurations
 */
export const deferScriptsOnInteraction = (scripts) => {
  const loadScripts = () => {
    scripts.forEach((script) => {
      loadScript(script.src, script.options).catch((error) => {
        console.warn(`Failed to load deferred script: ${script.src}`, error);
      });
    });
  };

  // Load on first user interaction
  const events = ['click', 'scroll', 'mousemove', 'keydown'];
  events.forEach((event) => {
    document.addEventListener(event, loadScripts, {
      once: true,
      passive: true,
    });
  });
};

/**
 * Optimizes GSAP loading for better performance
 */
export const optimizeGSAP = () => {
  // Only load GSAP when needed
  if (typeof window !== 'undefined' && !window.gsap) {
    return import('gsap').then((gsap) => {
      window.gsap = gsap.default || gsap;
      return gsap;
    });
  }
  return Promise.resolve(window.gsap);
};

/**
 * Optimizes Rive loading for better performance
 */
export const optimizeRive = () => {
  if (typeof window !== 'undefined' && !window.rive) {
    return import('@rive-app/react-canvas').then((rive) => {
      return rive;
    });
  }
  return Promise.resolve();
};
