import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Blog Hero Section Component
 * Displays the main hero banner for the blog page
 */
const BlogHero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      }
    );
  }, { scope: heroRef });

  return (
    <section 
      ref={heroRef}
      className="blog-hero relative bg-gradient-to-br from-primary/5 to-white py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #997BB7 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        <div ref={contentRef} className="max-w-4xl mx-auto text-center">
          {/* Section Label */}
          <div className="inline-block mb-4">
            <span className="text-question text-primary font-semibold uppercase tracking-widest">
              Our Blog
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="section-heading mb-6">
            JEWELRY INSIGHTS & STORIES
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
            Explore the world of fine jewelry with our expert guides, industry trends, care tips, and inspiring stories from the heart of craftsmanship.
          </p>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-0.5 bg-primary"></div>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="w-16 h-0.5 bg-primary"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
