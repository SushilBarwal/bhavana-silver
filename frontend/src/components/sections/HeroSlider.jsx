import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCreative,
} from "swiper/modules";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

// Slide data with rich content
const SLIDES_DATA = [
  {
    id: 1,
    title: "Christmas Special",
    subtitle: "Limited Edition Collection",
    description: "Celebrate the season with our exclusive festive jewelry",
    buttonText: "Explore Collection",
    buttonLink: "/gold-jewelry",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&h=1080&fit=crop&q=90",
    gradient: "from-red-600/90 via-red-700/80 to-rose-900/90",
    accentColor: "#dc2626",
  },
  {
    id: 2,
    title: "Fast Delivery",
    subtitle: "Express Shipping Available",
    description: "Get your jewelry delivered within 24-48 hours",
    buttonText: "Ship Now",
    buttonLink: "/ship-now",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&h=1080&fit=crop&q=90",
    gradient: "from-blue-600/90 via-blue-700/80 to-indigo-900/90",
    accentColor: "#2563eb",
  },
  {
    id: 3,
    title: "Luxury Gold",
    subtitle: "Premium Craftsmanship",
    description: "Handcrafted gold jewelry with timeless elegance",
    buttonText: "Discover More",
    buttonLink: "/gold-jewelry",
    image:
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=1920&h=1080&fit=crop&q=90",
    gradient: "from-amber-600/90 via-yellow-700/80 to-orange-900/90",
    accentColor: "#d97706",
  },
  {
    id: 4,
    title: "Silver Collection",
    subtitle: "Exquisite Designs",
    description: "Contemporary silver pieces for modern elegance",
    buttonText: "Shop Collection",
    buttonLink: "/silver-jewelry",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1920&h=1080&fit=crop&q=90",
    gradient: "from-slate-700/90 via-gray-800/80 to-zinc-900/90",
    accentColor: "#475569",
  },
];

/**
 * Individual Slide Component with GSAP Animations
 */
const SlideContent = ({ slide, isActive }) => {
  const slideRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  // GSAP animation for slide entrance
  useGSAP(() => {
    if (!isActive || !slideRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Reset all elements
      gsap.set(
        [
          ".slide-subtitle",
          ".slide-title",
          ".slide-description",
          ".slide-button",
        ],
        {
          opacity: 0,
          y: 60,
        }
      );

      gsap.set(".slide-image", {
        scale: 1.2,
        opacity: 0,
      });

      // Animate image first
      tl.to(".slide-image", {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "power2.out",
      })
        // Then animate content with smoother stagger
        .to(
          ".slide-subtitle",
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=1.5"
        )
        .to(
          ".slide-title",
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .to(
          ".slide-description",
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .to(
          ".slide-button",
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "expo.out",
          },
          "-=0.8"
        );
    }, slideRef);

    return () => ctx.revert();
  }, [isActive]);

  // Parallax effect on mouse move
  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 30;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;

      gsap.to(imageRef.current, {
        x: xPos,
        y: yPos,
        duration: 1.2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isActive]);

  return (
    <div ref={slideRef} className="relative w-full h-full overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={imageRef}
          className="slide-image absolute inset-0 w-full h-full"
          style={{ willChange: "transform" }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover scale-150"
            loading="lazy"
          />
        </div>

        {/* Lighter Gradient Overlay for Better Image Visibility */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${slide.gradient
            .replace(/\/90/g, "/40")
            .replace(/\/80/g, "/30")} mix-blend-multiply`}
        />

        {/* Subtle Vignette Effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/10 to-black/60" />

        {/* Left-side darker gradient for text readability - slightly stronger now that box is gone */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content Container */}
      <div ref={contentRef} className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          {/* Content Backdrop Removed for Cleaner Look */}
          <div className="max-w-4xl pl-4">
            {/* Subtitle - Eyebrow Style */}
            <div className="slide-subtitle mb-4 opacity-0">
              <span
                className="inline-block text-sm md:text-base font-bold tracking-[0.2em] uppercase"
                style={{
                  color: slide.accentColor,
                  textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                }}
              >
                {slide.subtitle}
              </span>
            </div>

            {/* Title */}
            <h1
              className="slide-title opacity-0 text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight"
              style={{ textShadow: "0 4px 16px rgba(0,0,0,0.5)" }}
            >
              {slide.title}
              <span
                className="block text-4xl md:text-5xl lg:text-6xl mt-2 font-light italic"
                style={{
                  color: "#fff",
                  opacity: 0.9,
                }}
              >
                Collection
              </span>
            </h1>

            {/* Description */}
            <p
              className="slide-description opacity-0 text-lg md:text-xl text-gray-200 mb-10 max-w-xl font-light leading-relaxed"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
            >
              {slide.description}
            </p>

            {/* Button */}
            <a
              href={slide.buttonLink}
              className="slide-button opacity-0 group inline-flex items-center gap-4 px-10 py-5 bg-white text-black font-medium text-sm uppercase tracking-widest hover:bg-gray-100 transition-colors duration-300"
            >
              <span>{slide.buttonText}</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements - More Subtle */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: slide.accentColor }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: slide.accentColor }}
        />
      </div>
    </div>
  );
};

/**
 * Custom Navigation Button
 */
const NavButton = ({ direction, onClick }) => {
  const isNext = direction === "next";

  return (
    <button
      onClick={onClick}
      className={`absolute ${
        isNext ? "right-8" : "left-8"
      } top-1/2 -translate-y-1/2 z-30 w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:border-white/40 group`}
      aria-label={`${isNext ? "Next" : "Previous"} slide`}
    >
      <svg
        className="w-7 h-7 text-white transition-transform duration-300 group-hover:scale-110"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d={isNext ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
        />
      </svg>
    </button>
  );
};

/**
 * Main HeroSlider Component
 */
const HeroSlider = ({ slides }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Use passed slides or fallback to empty array (or SLIDES_DATA if you want a default fallback, but typically we want dynamic)
  // We need to map the API data structure to our component's expected structure if they differ.
  // API: image, title, description, button_text, button_link
  // Component: image, title, subtitle, description, buttonText, buttonLink, gradient, accentColor

  const activeSlides =
    slides && slides.length > 0
      ? slides.map((slide) => ({
          id: slide.id,
          title: slide.title,
          subtitle: "Collection", // or derive from somewhere else if available
          description: slide.description,
          buttonText: slide.button_text || "Explore",
          buttonLink: slide.button_link || "/",
          image: slide.image,
          // Default gradients/colors since API doesn't provide them yet
          gradient: "from-slate-800/90 via-slate-900/80 to-black/90",
          accentColor: "#ffffff",
        }))
      : SLIDES_DATA;

  // Initialize slider
  useEffect(() => {
    setIsReady(true);
  }, []);

  // Handle slide change
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  // Navigation handlers
  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div className="hero-slider relative w-full h-screen overflow-hidden bg-black">
      {isReady && activeSlides.length > 0 && (
        <>
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay, EffectCreative]}
            effect="creative"
            creativeEffect={{
              prev: {
                translate: ["-100%", 0, -500],
                opacity: 0,
              },
              next: {
                translate: ["100%", 0, -500],
                opacity: 0,
              },
            }}
            speed={1200}
            loop={activeSlides.length >= 2}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
              bulletClass: "custom-bullet",
              bulletActiveClass: "custom-bullet-active",
            }}
            onSlideChange={handleSlideChange}
            className="w-full h-full"
          >
            {activeSlides.map((slide, index) => (
              <SwiperSlide key={slide.id}>
                <SlideContent slide={slide} isActive={activeIndex === index} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <NavButton direction="prev" onClick={goPrev} />
          <NavButton direction="next" onClick={goNext} />

          {/* Custom Pagination */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-3 custom-pagination" />

          {/* Progress Indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{
                width: `${((activeIndex + 1) / activeSlides.length) * 100}%`,
                transition: "width 0.3s ease-out",
              }}
            />
          </div>

          {/* Slide Counter */}
          <div className="absolute top-8 right-8 z-30 flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
            <span className="text-white text-2xl font-bold">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-white/60 text-sm">/</span>
            <span className="text-white/60 text-sm">
              {String(activeSlides.length).padStart(2, "0")}
            </span>
          </div>
        </>
      )}

      {/* Custom Pagination Styles */}
      <style>{`
        .custom-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .custom-bullet:hover {
          background: rgba(255, 255, 255, 0.5);
          transform: scale(1.2);
        }

        .custom-bullet-active {
          width: 40px;
          border-radius: 6px;
          background: white;
          border-color: rgba(255, 255, 255, 0.5);
        }

        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
