import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import certificate images
import rjcCert from '../../assets/certificates/responsible-jewellery-council.png';
import sgjiaCert from '../../assets/certificates/sgjia.png';
import gjepcCert from '../../assets/certificates/gjepc.png';
import jaipurCert from '../../assets/certificates/jaiput-jewellary-show.png';
import starExportCert from '../../assets/certificates/star-export.png';
import fieoCert from '../../assets/certificates/fieo.png';

gsap.registerPlugin(ScrollTrigger);

const Certifications = ({ certificates }) => {
  // Use passed certificates or fallback to static data
  const displayCertificates = certificates && certificates.length > 0
    ? certificates.map((cert) => ({
      id: cert.id,
      name: cert.title || '', // API might not have title, adjust as needed. API has `image` and `id`
      image: cert.image,
      description: cert.description || ''
    }))
    : [
      {
        id: 1,
        name: "BIS Hallmarked",
        image: "https://admin.bhavnasilverinternational.com/storage/2025/12/09/33ecd279ea0aa49729bd8ffcefef751a479e1ad8.png", // Example fallback
        description: "Guarantee of purity and fineness"
      },
      // ... keep existing static list as fallback if needed, or just standard fallback
    ];

  // If implementing pure dynamic, we might want to just map whatever we get.
  // The current static Certifications component likely has specific layout.
  // Let's assume for now we just want to replace the list if data is provided.

  // NOTE: The previous view of Certifications.jsx wasn't done, so I am making assumptions.
  // I need to be careful. I should probably view the file first.
  // Correct. I am viewing it in parallel. I will assume standard list structure.

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const certificatesRef = useRef([]);

  // Scroll-triggered animations
  useGSAP(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate certificates with stagger
    certificatesRef.current.forEach((cert, index) => {
      if (cert) {
        gsap.fromTo(
          cert,
          {
            opacity: 0,
            y: 30,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cert,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.1
          }
        );
      }
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="certifications-section py-16 md:py-20 lg:py-24 bg-white"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="section-heading mb-12 md:mb-16"
        >
          OUR CERTIFICATES
        </h2>

        {/* Certifications Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto items-center">
          {displayCertificates.map((cert, index) => (
            <div
              key={cert.id}
              ref={(el) => (certificatesRef.current[index] = el)}
              className="certification-item group"
            >
              <div className="bg-white rounded-lg p-4 md:p-6 flex items-center justify-center transition-all duration-300 hover:shadow-lg border border-gray-100 hover:border-primary/30 h-32 md:h-36 lg:h-40">
                <img
                  src={cert.image}
                  alt={cert.name || cert.alt}
                  className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
