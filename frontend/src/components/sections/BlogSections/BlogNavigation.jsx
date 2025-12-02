import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

/**
 * Blog Navigation Component
 * Previous and Next blog post navigation
 */
const BlogNavigation = ({ currentSlug, allBlogs }) => {
  // Find current blog index
  const currentIndex = allBlogs.findIndex(blog => blog.slug === currentSlug);
  
  if (currentIndex === -1) return null;

  // Get previous and next blogs (by publish date order)
  const sortedBlogs = [...allBlogs].sort(
    (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
  );
  
  const currentSortedIndex = sortedBlogs.findIndex(blog => blog.slug === currentSlug);
  const prevBlog = sortedBlogs[currentSortedIndex + 1] || null;
  const nextBlog = sortedBlogs[currentSortedIndex - 1] || null;

  return (
    <nav className="blog-navigation border-t border-b border-gray-200 py-8 my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Previous Post */}
        <div className="nav-item">
          {prevBlog ? (
            <Link
              to={`/blog/${prevBlog.slug}`}
              className="flex items-start gap-4 p-4 bg-gray-50 hover:bg-primary/5 transition-colors duration-300 group h-full"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <FiChevronLeft className="w-5 h-5" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-question text-gray-500 uppercase tracking-wide block mb-1">
                  Previous Post
                </span>
                <h4 className="text-body font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                  {prevBlog.title}
                </h4>
              </div>
            </Link>
          ) : (
            <div className="p-4 bg-gray-50 opacity-50 h-full">
              <span className="text-question text-gray-400 uppercase tracking-wide">
                No Previous Post
              </span>
            </div>
          )}
        </div>

        {/* Next Post */}
        <div className="nav-item">
          {nextBlog ? (
            <Link
              to={`/blog/${nextBlog.slug}`}
              className="flex items-start gap-4 p-4 bg-gray-50 hover:bg-primary/5 transition-colors duration-300 group h-full"
            >
              <div className="flex-1 min-w-0 text-right">
                <span className="text-question text-gray-500 uppercase tracking-wide block mb-1">
                  Next Post
                </span>
                <h4 className="text-body font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                  {nextBlog.title}
                </h4>
              </div>
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <FiChevronRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ) : (
            <div className="p-4 bg-gray-50 opacity-50 h-full text-right">
              <span className="text-question text-gray-400 uppercase tracking-wide">
                No Next Post
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

BlogNavigation.propTypes = {
  currentSlug: PropTypes.string.isRequired,
  allBlogs: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      publishDate: PropTypes.string.isRequired
    })
  ).isRequired
};

export default BlogNavigation;
