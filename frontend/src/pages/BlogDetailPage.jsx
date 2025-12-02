import { useState, useRef, useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiClock, FiCalendar, FiUser, FiTag, FiShare2 } from 'react-icons/fi';
import { Breadcrumb } from '../components/common';
import { 
  BlogSidebar, 
  BlogNavigation, 
  BlogComments 
} from '../components/sections/BlogSections';
import blogsData from '../data/blogs.json';
import { getNestedComments, addComment } from '../utils/commentData';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Blog Detail Page Component
 * Single blog post view with sidebar, navigation, and comments
 */
const BlogDetailPage = () => {
  const { slug } = useParams();
  const pageRef = useRef(null);
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);

  // Get all blogs
  const allBlogs = blogsData.blogs;

  // Find the current blog by slug
  const blog = allBlogs.find(b => b.slug === slug);

  // Get nested comments for this blog
  const [comments, setComments] = useState(
    blog ? getNestedComments(blog.id) : []
  );

  // Redirect if blog not found
  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  // Breadcrumb items
  const breadcrumbItems = useMemo(() => [
    { label: 'HOME', link: '/' },
    { label: 'BLOG', link: '/blog' },
    { label: blog.category.toUpperCase(), link: `/blog?category=${blog.category}` },
    { label: blog.id, active: true }
  ], [blog]);

  // Handle adding new comment
  const handleAddComment = (parentId, author, content) => {
    const newComment = addComment(blog.id, author, content, parentId);
    
    // Update comments state (in real app, this would refetch from API)
    if (parentId) {
      // This is a reply - we need to update the nested structure
      const updateReplies = (commentsList) => {
        return commentsList.map(comment => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), { ...newComment, replies: [] }]
            };
          }
          if (comment.replies && comment.replies.length > 0) {
            return {
              ...comment,
              replies: updateReplies(comment.replies)
            };
          }
          return comment;
        });
      };
      setComments(updateReplies(comments));
    } else {
      // Root comment
      setComments([...comments, { ...newComment, replies: [] }]);
    }
  };

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // GSAP Animations
  useGSAP(() => {
    gsap.fromTo(
      pageRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      }
    );

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      sidebarRef.current,
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sidebarRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: pageRef });

  return (
    <div ref={pageRef} className="blog-detail-page bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Hero Image */}
      <div className="blog-hero-image mb-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="relative aspect-[21/9] max-h-[500px] overflow-hidden shadow-xl">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            
            {/* Category Badge */}
            <div className="absolute top-6 left-6">
              <span className="inline-block bg-primary text-white text-body font-semibold px-6 py-2 uppercase tracking-wider shadow-lg">
                {blog.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
          {/* Main Content */}
          <article ref={contentRef} className="blog-content">
            {/* Article Header */}
            <header className="mb-8 pb-8 border-b-2 border-gray-200">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-section font-bold text-gray-900 mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-body text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <FiUser className="w-4 h-4 text-primary" />
                  <span>By <strong className="text-gray-900">{blog.author}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCalendar className="w-4 h-4 text-primary" />
                  <span>{new Date(blog.publishDate).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiClock className="w-4 h-4 text-primary" />
                  <span>{blog.readTime} min read</span>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors ml-auto"
                >
                  <FiShare2 className="w-4 h-4" />
                  <span className="font-medium">Share</span>
                </button>
              </div>

              {/* Excerpt */}
              <p className="text-xl text-gray-700 leading-relaxed font-light italic border-l-4 border-primary pl-6">
                {blog.excerpt}
              </p>
            </header>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-body text-gray-700 leading-relaxed mb-6">
                {blog.content}
              </p>

              {/* Sample content paragraphs */}
              <p className="text-body text-gray-700 leading-relaxed mb-6">
                When it comes to selecting the perfect piece of jewelry, understanding the intricacies of gemstones, metals, and craftsmanship is essential. Each element plays a crucial role in determining not only the aesthetic appeal but also the value and longevity of your jewelry.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
                Understanding Quality and Craftsmanship
              </h2>

              <p className="text-body text-gray-700 leading-relaxed mb-6">
                Quality craftsmanship is the foundation of exceptional jewelry. Our artisans bring decades of experience to every piece, ensuring that each detail is meticulously executed. From the initial design concept to the final polish, every step is carefully monitored to meet the highest standards.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
                Making the Right Choice
              </h2>

              <p className="text-body text-gray-700 leading-relaxed mb-6">
                Whether you're purchasing jewelry for yourself or as a gift, taking the time to understand these key factors will help you make an informed decision. Consider your personal style, budget, and the occasion to find the perfect piece that will be treasured for years to come.
              </p>

              <blockquote className="border-l-4 border-primary pl-6 py-4 my-8 bg-gray-50 italic text-lg text-gray-700">
                "The beauty of jewelry lies not just in its sparkle, but in the stories it tells and the memories it creates."
              </blockquote>

              <p className="text-body text-gray-700 leading-relaxed mb-6">
                At Bhavan Silver Jewellery, we're committed to helping you find pieces that perfectly match your vision and exceed your expectations. Our extensive collection offers something for every taste and occasion.
              </p>
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-gray-200">
                <FiTag className="w-5 h-5 text-gray-600" />
                <span className="text-body font-semibold text-gray-900">Tags:</span>
                {blog.tags.map((tag, index) => (
                  <Link
                    key={index}
                    to={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="inline-block px-4 py-1.5 bg-gray-100 hover:bg-primary hover:text-white text-question text-gray-700 transition-colors duration-300 font-medium"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Blog Navigation */}
            <BlogNavigation currentSlug={slug} allBlogs={allBlogs} />

            {/* Comments Section */}
            <BlogComments 
              blogId={blog.id}
              comments={comments}
              onAddComment={handleAddComment}
            />
          </article>

          {/* Sidebar */}
          <aside ref={sidebarRef} className="blog-sidebar-container">
            <div className="sticky top-24">
              <BlogSidebar currentBlogId={blog.id} allBlogs={allBlogs} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
