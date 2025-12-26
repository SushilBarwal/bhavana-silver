import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

import SkeletonLoader from "../common/SkeletonLoader";

const RingBuilder = ({ gemstones: apiGemstones, loading }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const nameRef = useRef(null);

  const [activeGemIndex, setActiveGemIndex] = useState(0);

  // Use API gemstones directly, or empty array if not available
  const gemstones =
    apiGemstones && apiGemstones.length > 0
      ? apiGemstones.map((g) => ({
          id: g.id,
          name: g.name.toUpperCase(),
          image: g.image,
        }))
      : [];

  // Animate gemstone name change
  useEffect(() => {
    if (gemstones.length === 0) return;

    if (nameRef.current) {
      const tl = gsap.timeline();
      tl.to(nameRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.2,
        ease: "power2.in",
      }).to(nameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [activeGemIndex, gemstones.length]);

  // Initial scroll animations for title
  useGSAP(
    () => {
      if (!titleRef.current) return;
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [gemstones] }
  );

  // If no gemstones available, don't render the section unless loading
  if (loading) return <SkeletonLoader type="ring-builder" />;
  if (!gemstones || gemstones.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="ring-builder-section py-16 md:py-20 lg:py-24 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="section-heading mb-12 md:mb-16 text-center"
        >
          ONE DESIGN. MANY GEMSTONES.
        </h2>

        {/* Ring Builder Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Swiper Slider */}
          <div className="gemstone-slider py-8">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              loop={gemstones.length >= 3}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: false,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              onSlideChange={(swiper) => setActiveGemIndex(swiper.realIndex)}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              className="w-full"
              breakpoints={{
                320: {
                  slidesPerView: 3,
                },
                640: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 5,
                },
                1024: {
                  slidesPerView: 5,
                },
              }}
            >
              {gemstones.map((gem) => (
                <SwiperSlide
                  key={gem.id}
                  className="!w-32 !h-32 md:!w-40 md:!h-40 flex items-center justify-center"
                >
                  {({ isActive }) => (
                    <div
                      className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden transition-all duration-300 ${
                        isActive
                          ? "scale-125 shadow-2xl ring-4 ring-primary z-10"
                          : "scale-90 opacity-60 grayscale-[50%]"
                      }`}
                    >
                      <img
                        src={gem.image}
                        alt={gem.name}
                        className="w-full h-full object-contain bg-white"
                      />
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Gemstone Name */}
          <div ref={nameRef} className="mt-8 md:mt-12 text-center h-12">
            <p className="font-sans text-heading font-semibold tracking-widest text-gray-900 border-b-2 border-primary/50 inline-block pb-1 px-4">
              {gemstones[activeGemIndex]?.name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RingBuilder;
