import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeaturesSlider = ({ slides }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Use passed slides or fallback to static data
  // API structure: title, subtitle, image, description
  const features = slides && slides.length > 0
    ? slides.map((slide, index) => ({
      id: slide.id,
      subtitle: slide.subtitle,
      title: slide.title,
      slideNumber: `${index + 1} / ${slides.length}`,
      description: slide.description,
      image: slide.image
    }))
    : [
      {
        id: 1,
        subtitle: 'What is JewelPin?',
        title: 'Smart Sourcing for Global Buyers',
        slideNumber: '1 / 4',
        description: 'JewelPin is a modern B2B jewelry sourcing platform built for retailers and wholesalers worldwide (except India). Whether you\'re a small boutique or a large-scale retailer, our platform simplifies your sourcing process with speed, variety, and convenience.',
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&h=900&fit=crop&q=90"
      },
      {
        id: 2,
        subtitle: 'Why Choose Us?',
        title: 'Unmatched Quality & Selection',
        slideNumber: '2 / 4',
        description: 'Access thousands of unique jewelry pieces from verified manufacturers. Our curated collection ensures you get premium quality products at competitive wholesale prices.',
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=900&fit=crop&q=90"
      },
      {
        id: 3,
        subtitle: 'Global Reach',
        title: 'Worldwide Shipping Solutions',
        slideNumber: '3 / 4',
        description: 'Fast and reliable shipping to over 100 countries. Track your orders in real-time and enjoy hassle-free international delivery with full insurance coverage.',
        image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=1200&h=900&fit=crop&q=90"
      },
      {
        id: 4,
        subtitle: 'Partnership',
        title: 'Trusted By Thousands',
        slideNumber: '4 / 4',
        description: 'Join a network of over 5,000 satisfied retailers worldwide. Our commitment to excellence has made us a preferred sourcing partner for jewelry businesses globally.',
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&h=900&fit=crop&q=90"
      }
    ];

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [features.length]);

  // Scroll-triggered animations
  useGSAP(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: sectionRef });

  const handleDotClick = (index) => {
    setActiveSlide(index);
  };

  return (
    <section
      ref={sectionRef}
      className="features-slider-section py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Side - Features Slider */}
          <div ref={contentRef} className="space-y-6">
            {/* Slide Number & Subtitle */}
            <div className="space-y-2">
              <p className="text-question text-gray-600 font-light tracking-wide">
                {features[activeSlide].slideNumber}
              </p>
              <p className="text-primary text-question font-semibold tracking-wider uppercase">
                {features[activeSlide].subtitle}
              </p>
            </div>

            {/* Title */}
            <h2 className="font-sans text-[20px] font-semibold text-gray-900 leading-tight text-left">
              {features[activeSlide].title}
            </h2>

            {/* Description */}
            <p className="text-body text-gray-700 leading-relaxed max-w-xl">
              {features[activeSlide].description}
            </p>

            {/* Pagination Dots */}
            <div className="flex gap-3 pt-4">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`transition-all duration-300 rounded-full ${activeSlide === index
                      ? 'w-8 h-3 bg-primary'
                      : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Image */}
          <div ref={imageRef} className="relative h-full">
            <div className="relative overflow-hidden shadow-2xl h-[500px] md:h-[600px] lg:h-[700px]">
              <img
                src={features[activeSlide].image}
                alt={features[activeSlide].title}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSlider;
