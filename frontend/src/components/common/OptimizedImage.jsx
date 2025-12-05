import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Optimized Image Component with lazy loading and performance optimizations
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Alternative text for accessibility
 * @param {string} className - Additional CSS classes
 * @param {string} loading - Loading strategy ('lazy' or 'eager')
 * @param {string} placeholder - Placeholder color or image while loading
 */
const OptimizedImage = ({
  src,
  alt = '',
  className = '',
  loading = 'lazy',
  placeholder = '#f3f4f6',
  onLoad,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // Use Intersection Observer for lazy loading
    if (loading === 'lazy' && imgRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '50px', // Start loading 50px before entering viewport
          threshold: 0.01,
        }
      );

      observer.observe(imgRef.current);

      return () => {
        if (imgRef.current) {
          observer.unobserve(imgRef.current);
        }
      };
    } else {
      setIsInView(true);
    }
  }, [loading]);

  const handleImageLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(e);
    }
  };

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundColor: isLoaded ? 'transparent' : placeholder,
      }}
    >
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          onLoad={handleImageLoad}
          className={`w-full h-full transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transform: 'translateZ(0)', // GPU acceleration
          }}
          {...props}
        />
      )}
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  placeholder: PropTypes.string,
  onLoad: PropTypes.func,
};

export default OptimizedImage;
