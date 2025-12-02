import { useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiClock, FiCalendar } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

/**
 * Blog Grid Section
 * Displays all blog posts in a grid layout with filtering options
 */
const BlogGrid = ({ blogs, activeCategory, onCategoryChange }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // Get unique categories
  const categories = ['All', ...new Set(blogs.map(blog => blog.category))];

  // Filter blogs based on active category
  const filteredBlogs = activeCategory === 'All' 
    ? blogs 
    : blogs.filter(blog => blog.category === activeCategory);

  useGSAP(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            delay: (index % 3) * 0.1
          }
        );
      }
    });
  }, { scope: sectionRef, dependencies: [activeCategory] });

  return (
    <section ref={sectionRef} className="blog-grid py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-6 py-2.5 text-question font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <article
                key={blog.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="blog-card bg-white group overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500"
              >
                <Link to={`/blog/${blog.slug}`}>
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block bg-white/90 backdrop-blur-sm text-primary text-question font-semibold px-3 py-1 uppercase tracking-wide">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-question text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <FiCalendar className="w-3.5 h-3.5" />
                        <span>{new Date(blog.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FiClock className="w-3.5 h-3.5" />
                        <span>{blog.readTime} min</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-body text-gray-600 leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {/* Author & Read More */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-question text-gray-500">
                        By <span className="font-medium text-gray-900">{blog.author}</span>
                      </span>
                      <span className="text-question font-semibold text-primary group-hover:underline uppercase">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No blog posts found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

BlogGrid.propTypes = {
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
      readTime: PropTypes.number.isRequired
    })
  ).isRequired,
  activeCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired
};

export default BlogGrid;
