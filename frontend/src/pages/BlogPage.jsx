import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Breadcrumb } from '../components/common';
import { BlogHero, FeaturedBlogs, BlogGrid, BlogNewsletter } from '../components/sections/BlogSections';
import blogsData from '../data/blogs.json';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Blog Page Component
 * Displays blog posts with hero section, featured posts, grid, and newsletter
 */
const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const pageRef = useRef(null);

  // Get all blogs from JSON data
  const allBlogs = blogsData.blogs;

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'HOME', link: '/' },
    { label: 'BLOG', active: true }
  ];

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // Page entrance animation
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
  }, { scope: pageRef });

  return (
    <div ref={pageRef} className="blog-page">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <BlogHero />

      {/* Featured Blog Posts */}
      <FeaturedBlogs blogs={allBlogs} />

      {/* All Blog Posts Grid */}
      <BlogGrid 
        blogs={allBlogs} 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Newsletter Subscription */}
      <BlogNewsletter />
    </div>
  );
};

export default BlogPage;