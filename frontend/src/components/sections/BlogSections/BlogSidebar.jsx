import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiClock, FiCalendar } from 'react-icons/fi';

/**
 * Blog Sidebar Component
 * Shows related posts, categories, and recent posts
 */
const BlogSidebar = ({ currentBlogId, allBlogs }) => {
  // Get current blog
  const currentBlog = allBlogs.find(blog => blog.id === currentBlogId);
  
  // Get related posts (same category, excluding current)
  const relatedPosts = allBlogs
    .filter(blog => 
      blog.category === currentBlog?.category && 
      blog.id !== currentBlogId
    )
    .slice(0, 3);

  // Get recent posts (excluding current)
  const recentPosts = allBlogs
    .filter(blog => blog.id !== currentBlogId)
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .slice(0, 5);

  // Get unique categories with counts
  const categoryMap = {};
  allBlogs.forEach(blog => {
    categoryMap[blog.category] = (categoryMap[blog.category] || 0) + 1;
  });
  const categories = Object.entries(categoryMap).map(([name, count]) => ({ name, count }));

  return (
    <aside className="blog-sidebar space-y-8">
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="sidebar-section bg-white p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wider border-b-2 border-primary pb-2">
            Related Posts
          </h3>
          <div className="space-y-4">
            {relatedPosts.map(blog => (
              <Link
                key={blog.id}
                to={`/blog/${blog.slug}`}
                className="flex gap-4 group"
              >
                <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-body font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-1">
                    {blog.title}
                  </h4>
                  <div className="flex items-center gap-2 text-question text-gray-500">
                    <FiCalendar className="w-3 h-3" />
                    <span>{new Date(blog.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="sidebar-section bg-white p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wider border-b-2 border-primary pb-2">
          Categories
        </h3>
        <ul className="space-y-3">
          {categories.map(({ name, count }) => (
            <li key={name}>
              <Link
                to={`/blog?category=${encodeURIComponent(name)}`}
                className="flex items-center justify-between text-body text-gray-700 hover:text-primary transition-colors group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  {name}
                </span>
                <span className="text-question text-gray-500 bg-gray-100 group-hover:bg-primary group-hover:text-white px-2 py-0.5 rounded-full transition-colors">
                  {count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="sidebar-section bg-white p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wider border-b-2 border-primary pb-2">
          Recent Posts
        </h3>
        <div className="space-y-4">
          {recentPosts.map(blog => (
            <Link
              key={blog.id}
              to={`/blog/${blog.slug}`}
              className="block group"
            >
              <h4 className="text-body font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                {blog.title}
              </h4>
              <div className="flex items-center gap-3 text-question text-gray-500">
                <div className="flex items-center gap-1">
                  <FiCalendar className="w-3 h-3" />
                  <span>{new Date(blog.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiClock className="w-3 h-3" />
                  <span>{blog.readTime} min</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tags */}
      {currentBlog?.tags && currentBlog.tags.length > 0 && (
        <div className="sidebar-section bg-white p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wider border-b-2 border-primary pb-2">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {currentBlog.tags.map((tag, index) => (
              <Link
                key={index}
                to={`/blog?tag=${encodeURIComponent(tag)}`}
                className="inline-block px-3 py-1 bg-gray-100 hover:bg-primary hover:text-white text-question text-gray-700 transition-colors duration-300"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

BlogSidebar.propTypes = {
  currentBlogId: PropTypes.string.isRequired,
  allBlogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      publishDate: PropTypes.string.isRequired,
      readTime: PropTypes.number.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired
};

export default BlogSidebar;
