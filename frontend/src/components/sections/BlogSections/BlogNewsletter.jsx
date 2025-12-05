import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMail } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

/**
 * Blog Newsletter Section
 * Newsletter subscription CTA for blog readers
 */
const BlogNewsletter = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      contentRef.current,
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
  }, { scope: sectionRef });

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log('Newsletter subscription:', email);
    alert('Thank you for subscribing to our blog updates!');
    e.target.reset();
  };

  return (
    <section ref={sectionRef} className="blog-newsletter py-16 md:py-20 bg-primary/5">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div ref={contentRef} className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <FiMail className="w-8 h-8 text-primary" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-section font-bold text-gray-900 mb-4">
            STAY UPDATED WITH OUR LATEST STORIES
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get weekly insights, expert tips, and exclusive content delivered straight to your inbox.
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <div className="flex-1 relative">
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                className="w-full px-6 py-4 text-body text-gray-900 bg-white border-2 border-gray-300 focus:border-primary focus:outline-none transition-colors duration-300 placeholder-gray-500"
              />
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white font-sans font-semibold text-body px-8 py-4 transition-all duration-300 uppercase tracking-wider shadow-md hover:shadow-lg"
            >
              Subscribe
            </button>
          </form>

          {/* Privacy Note */}
          <p className="text-question text-gray-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogNewsletter;
