/**
 * Performance utilities to reduce React Scheduler overhead
 */

/**
 * Batches multiple state updates to reduce scheduler pressure
 * @param {Function} setState - React state setter function
 * @param {Array} updates - Array of state updates to batch
 */
export const batchStateUpdates = (setState, updates) => {
  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => {
      updates.forEach((update) => setState(update));
    });
  } else {
    requestAnimationFrame(() => {
      updates.forEach((update) => setState(update));
    });
  }
};

/**
 * Defers non-critical operations to reduce initial scheduler load
 * @param {Function} callback - Function to defer
 * @param {number} delay - Optional delay in milliseconds
 */
export const deferNonCritical = (callback, delay = 0) => {
  if (window.requestIdleCallback) {
    return window.requestIdleCallback(callback, { timeout: delay });
  } else {
    return setTimeout(callback, delay);
  }
};

/**
 * Creates a throttled version of a function to reduce scheduler calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Creates a debounced version of a function to reduce scheduler calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Optimizes GSAP animations by batching DOM updates
 * @param {Function} animationCallback - GSAP animation function
 */
export const optimizeGSAPAnimation = (animationCallback) => {
  return requestAnimationFrame(() => {
    animationCallback();
  });
};

/**
 * Creates a performance-optimized event handler
 * @param {Function} handler - Event handler function
 * @param {Object} options - Event listener options
 */
export const createOptimizedHandler = (handler, options = {}) => {
  return {
    handleEvent: handler,
    options: {
      passive: true,
      ...options,
    },
  };
};

/**
 * Monitors React Scheduler performance
 */
export const monitorSchedulerPerformance = () => {
  if (typeof window === 'undefined') return;

  const originalRequestIdleCallback = window.requestIdleCallback;
  const originalRequestAnimationFrame = window.requestAnimationFrame;

  let schedulerCalls = 0;
  let animationFrameCalls = 0;

  window.requestIdleCallback = function (callback, options) {
    schedulerCalls++;
    return originalRequestIdleCallback.call(this, callback, options);
  };

  window.requestAnimationFrame = function (callback) {
    animationFrameCalls++;
    return originalRequestAnimationFrame.call(this, callback);
  };

  // Log performance metrics every 5 seconds
  setInterval(() => {
    if (schedulerCalls > 0 || animationFrameCalls > 0) {
      console.log('Scheduler Performance:', {
        idleCallbackCalls: schedulerCalls,
        animationFrameCalls: animationFrameCalls,
        timestamp: Date.now(),
      });
      schedulerCalls = 0;
      animationFrameCalls = 0;
    }
  }, 5000);
};
