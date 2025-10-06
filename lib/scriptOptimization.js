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
      timeout = 10000, // 10 second timeout
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

    // Set up timeout
    const timeoutId = setTimeout(() => {
      reject(new Error(`Script load timeout: ${src}`));
    }, timeout);

    script.onload = () => {
      clearTimeout(timeoutId);
      if (onLoad) onLoad();
      resolve(script);
    };

    script.onerror = () => {
      clearTimeout(timeoutId);
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
  let hasInteracted = false;

  const loadScriptsOnInteraction = () => {
    if (hasInteracted) return;
    hasInteracted = true;

    // Remove all event listeners after first interaction
    events.forEach((event) => {
      document.removeEventListener(event, loadScriptsOnInteraction);
    });

    // Load all scripts
    scripts.forEach((script) => {
      loadScript(script.src, script.options).catch((error) => {
        console.warn(`Failed to load deferred script: ${script.src}`, error);
      });
    });
  };

  const events = ['click', 'scroll', 'mousemove', 'keydown'];
  events.forEach((event) => {
    document.addEventListener(event, loadScriptsOnInteraction, {
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

/**
 * Loads scripts when a specific element becomes visible in the viewport
 * @param {Array} scripts - Array of script configurations
 * @param {string|Element} targetElement - CSS selector or DOM element to observe
 * @param {Object} options - Intersection Observer options
 */
export const loadScriptsOnIntersection = (scripts, targetElement, options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    once = true,
  } = options;

  const element = typeof targetElement === 'string' 
    ? document.querySelector(targetElement) 
    : targetElement;

  if (!element) {
    console.warn('Target element not found for script loading');
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Load all scripts
          scripts.forEach((script) => {
            loadScript(script.src, script.options).catch((error) => {
              console.warn(`Failed to load script on intersection: ${script.src}`, error);
            });
          });

          if (once) {
            observer.disconnect();
          }
        }
      });
    },
    {
      threshold,
      rootMargin,
    }
  );

  observer.observe(element);
  return observer;
};

/**
 * Loads scripts when the browser is idle using requestIdleCallback
 * @param {Array} scripts - Array of script configurations
 * @param {Object} options - Idle callback options
 */
export const loadScriptsOnIdle = (scripts, options = {}) => {
  const { timeout = 2000 } = options;

  const loadScripts = () => {
    scripts.forEach((script) => {
      loadScript(script.src, script.options).catch((error) => {
        console.warn(`Failed to load script on idle: ${script.src}`, error);
      });
    });
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(loadScripts, { timeout });
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(loadScripts, 0);
  }
};
