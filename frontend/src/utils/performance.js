/**
 * Performance monitoring utilities
 * Track and optimize website performance metrics
 */

// Debounce function for performance optimization
export const debounce = (func, wait = 300) => {
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

// Throttle function for scroll/resize events
export const throttle = (func, limit = 100) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Measure performance of async operations
export const measurePerformance = async (name, asyncFn) => {
  const start = performance.now();
  const result = await asyncFn();
  const end = performance.now();
  console.log(`⚡ ${name}: ${(end - start).toFixed(2)}ms`);
  return result;
};

// Report Web Vitals
export const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    }).catch(() => {
      // web-vitals not available, silently fail
    });
  }
};

// Lazy load images with Intersection Observer
export const lazyLoadImage = (imgElement, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.01,
  };

  const observerOptions = { ...defaultOptions, ...options };

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');
        
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
        }
        
        observer.unobserve(img);
      }
    });
  }, observerOptions);

  if (imgElement) {
    imageObserver.observe(imgElement);
  }

  return imageObserver;
};

// Preload critical resources
export const preloadResource = (url, type = 'image') => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;
  
  if (type === 'image') {
    link.as = 'image';
  } else if (type === 'font') {
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
  } else if (type === 'script') {
    link.as = 'script';
  } else if (type === 'style') {
    link.as = 'style';
  }
  
  document.head.appendChild(link);
};

// Prefetch pages for faster navigation
export const prefetchPage = (url) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  document.head.appendChild(link);
};

// Request Idle Callback wrapper with fallback
export const requestIdleCallback = (callback, options = {}) => {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, options);
  }
  // Fallback for browsers that don't support requestIdleCallback
  return setTimeout(() => {
    callback({
      didTimeout: false,
      timeRemaining: () => 50,
    });
  }, 1);
};

// Cancel Idle Callback wrapper with fallback
export const cancelIdleCallback = (id) => {
  if ('cancelIdleCallback' in window) {
    window.cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
};

// Optimize animations with RAF
export const optimizeAnimation = (callback) => {
  let ticking = false;
  
  return (...args) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        callback(...args);
        ticking = false;
      });
      ticking = true;
    }
  };
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get connection speed
export const getConnectionSpeed = () => {
  if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData,
    };
  }
  return null;
};

// Check if device has good performance
export const hasGoodPerformance = () => {
  const connection = getConnectionSpeed();
  
  if (!connection) return true; // Assume good if can't detect
  
  // Consider 3G or better as good performance
  const goodConnections = ['4g', 'slow-2g', '2g', '3g'];
  const isGoodConnection = !goodConnections.includes(connection.effectiveType) || 
                          connection.effectiveType === '4g';
  
  return isGoodConnection && !connection.saveData;
};

// Export all utilities
export default {
  debounce,
  throttle,
  measurePerformance,
  reportWebVitals,
  lazyLoadImage,
  preloadResource,
  prefetchPage,
  requestIdleCallback,
  cancelIdleCallback,
  optimizeAnimation,
  prefersReducedMotion,
  getConnectionSpeed,
  hasGoodPerformance,
};
