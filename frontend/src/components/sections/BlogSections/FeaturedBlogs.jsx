import { useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiClock, FiCalendar } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

/**
 * Featured Blog Posts Section
 * Displays the top 3 featured blog posts in a prominent grid
 */
const FeaturedBlogs = ({ blogs }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  const featuredBlogs = blogs.filter(blog => blog.featured).slice(0, 3);

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

    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.15
          }
        );
      }
    });
  }, { scope: sectionRef });

  if (featuredBlogs.length === 0) return null;

  return (
    <section ref={sectionRef} className="featured-blogs py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <h2 ref={titleRef} className="section-heading mb-12">
          FEATURED ARTICLES
        </h2>

        {/* Featured Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredBlogs.map((blog, index) => (
            <article
              key={blog.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="featured-blog-card group"
            >
              <Link to={`/blog/${blog.slug}`} className="block">
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3] mb-6 shadow-lg">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-primary text-white text-question font-semibold px-4 py-1.5 uppercase tracking-wider">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-question text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <FiCalendar className="w-4 h-4" />
                      <span>{new Date(blog.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FiClock className="w-4 h-4" />
                      <span>{blog.readTime} min read</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-body text-gray-600 leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-question text-gray-500">By</span>
                    <span className="text-question font-medium text-gray-900">{blog.author}</span>
                  </div>

                  {/* Read More */}
                  <div className="pt-2">
                    <span className="text-body font-semibold text-primary group-hover:underline uppercase tracking-wide">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

FeaturedBlogs.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      publishDate: PropTypes.string.isRequired,
      readTime: PropTypes.number.isRequired,
      featured: PropTypes.bool
    })
  ).isRequired
};

export default FeaturedBlogs;
