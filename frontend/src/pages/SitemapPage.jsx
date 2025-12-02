import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FiHome, FiShoppingBag, FiTruck, FiInfo, FiFileText, 
  FiShoppingCart, FiHeart, FiUser, FiPackage, FiShield,
  FiLock, FiMap, FiSearch, FiChevronRight, FiGrid
} from 'react-icons/fi';
import { Breadcrumb } from '../components/common';

gsap.registerPlugin(ScrollTrigger);

/**
 * Interactive Sitemap Page Component
 * Features animated category cards, search, and visual connections
 */
const SitemapPage = () => {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const searchRef = useRef(null);
  const cardsRef = useRef([]);
  const linesRef = useRef(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);

  const breadcrumbItems = [
    { label: 'HOME', link: '/' },
    { label: 'SITEMAP', active: true }
  ];

  // Sitemap structure with categories
  const sitemapData = [
    {
      id: 'main',
      title: 'Main Pages',
      icon: FiHome,
      color: 'from-purple-500 to-pink-500',
      links: [
        { label: 'Home', path: '/', description: 'Welcome to Bhavana Silver Jewellery' },
        { label: 'About Us', path: '/about-us', description: 'Our story and values' },
        { label: 'Ship Now', path: '/ship-now', description: 'Ready to ship products' },
        { label: 'Search', path: '/search', description: 'Find your perfect jewelry' }
      ]
    },
    {
      id: 'shop',
      title: 'Shop',
      icon: FiShoppingBag,
      color: 'from-blue-500 to-cyan-500',
      links: [
        { label: 'Gold Jewelry', path: '/gold-jewelry', description: 'Premium gold collections' },
        { label: 'Silver Jewelry', path: '/silver-jewelry', description: 'Sterling silver pieces' },
        { label: 'Fashion Jewelry', path: '/fashion-jewelry', description: 'Trendy designs' },
        { label: 'All Collections', path: '/collection', description: 'Browse all collections' }
      ]
    },
    {
      id: 'account',
      title: 'My Account',
      icon: FiUser,
      color: 'from-green-500 to-emerald-500',
      links: [
        { label: 'Dashboard', path: '/dashboard', description: 'Your personal dashboard' },
        { label: 'My Wishlist', path: '/dashboard/wishlist', description: 'Saved favorite items' },
        { label: 'My Orders', path: '/dashboard/orders', description: 'Track your orders' },
        { label: 'Account Settings', path: '/account', description: 'Manage your profile' }
      ]
    },
    {
      id: 'cart',
      title: 'Shopping',
      icon: FiShoppingCart,
      color: 'from-orange-500 to-red-500',
      links: [
        { label: 'Shopping Cart', path: '/cart', description: 'Review your items' },
        { label: 'Checkout', path: '/checkout', description: 'Complete your purchase' },
        { label: 'Wishlist', path: '/wishlist', description: 'Your saved products' }
      ]
    },
    {
      id: 'info',
      title: 'Information',
      icon: FiInfo,
      color: 'from-indigo-500 to-purple-500',
      links: [
        { label: 'Blog', path: '/blog', description: 'Jewelry insights & stories' },
        { label: 'FAQs', path: '/about-us#faqs', description: 'Frequently asked questions' },
        { label: 'How to Order', path: '/about-us#how-to-order', description: 'Order process guide' },
        { label: 'Meet the Team', path: '/about-us#meet-the-team', description: 'Our craftsmen' }
      ]
    },
    {
      id: 'policies',
      title: 'Policies',
      icon: FiShield,
      color: 'from-pink-500 to-rose-500',
      links: [
        { label: 'Terms & Conditions', path: '/terms', description: 'Legal agreements' },
        { label: 'Shipping & Delivery', path: '/shipping', description: 'Delivery information' },
        { label: 'Privacy Policy', path: '/privacy', description: 'Data protection' }
      ]
    }
  ];

  // Filter sitemap based on search
  const filteredSitemap = sitemapData.map(category => ({
    ...category,
    links: category.links.filter(link =>
      link.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => 
    activeCategory === 'all' || category.id === activeCategory
  ).filter(category => category.links.length > 0);

  // GSAP Animations - Optimized
  useGSAP(() => {
    // Hero animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(heroRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8 }
    ).fromTo(searchRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6 },
      '-=0.4'
    );

    // Animate cards on scroll - Batch for performance
    const validCards = cardsRef.current.filter(card => card !== null);
    
    gsap.fromTo(validCards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: validCards[0],
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true // Only animate once for better performance
        }
      }
    );
  }, { scope: pageRef, dependencies: [searchQuery, activeCategory] });

  // Animated background particles - Optimized
  useEffect(() => {
    const canvas = linesRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 30; // Reduced from 50 for better performance

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(153, 123, 183, 0.3)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) { // Reduced connection distance
            ctx.beginPath();
            ctx.strokeStyle = `rgba(153, 123, 183, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    let animationFrameId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const categoryTabs = [
    { id: 'all', label: 'All Pages', icon: FiGrid },
    { id: 'main', label: 'Main', icon: FiHome },
    { id: 'shop', label: 'Shop', icon: FiShoppingBag },
    { id: 'account', label: 'Account', icon: FiUser },
    { id: 'policies', label: 'Policies', icon: FiShield }
  ];

  return (
    <div ref={pageRef} className="sitemap-page relative bg-gradient-to-br from-gray-50 via-white to-purple-50 min-h-screen overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas
        ref={linesRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.4 }}
      />

      <div className="relative z-10">
        {/* Breadcrumb */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>

        {/* Hero Section */}
        <div ref={heroRef} className="text-center py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="inline-flex items-center gap-3 bg-primary/10 px-6 py-2 rounded-full mb-6">
              <FiMap className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-question text-primary font-semibold uppercase tracking-wider">
                Site Navigation
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-section font-bold text-gray-900 mb-6">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">Website</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Navigate through all pages and sections of Bhavana Silver Jewellery with our interactive sitemap
            </p>

            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-3 mb-12">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent to-primary rounded-full"></div>
              <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
              <div className="w-16 h-1 bg-gradient-to-l from-transparent to-primary rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div ref={searchRef} className="container mx-auto px-4 md:px-6 lg:px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-8">
              <FiSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pages, categories, or features..."
                className="w-full pl-16 pr-6 py-5 text-lg border-2 border-gray-200 rounded-2xl focus:border-primary focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl bg-white/90 backdrop-blur-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-3">
              {categoryTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeCategory === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary to-pink-500 text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-question uppercase tracking-wide">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sitemap Grid */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 pb-20">
          {filteredSitemap.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSitemap.map((category, index) => {
                const Icon = category.icon;
                
                return (
                  <div
                    key={category.id}
                    ref={(el) => (cardsRef.current[index] = el)}
                    className="sitemap-card group relative"
                    onMouseEnter={() => setHoveredCard(category.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-2xl ${
                      hoveredCard === category.id ? 'ring-4 ring-primary/50' : ''
                    }`}>
                      {/* Gradient Header */}
                      <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>

                      {/* Card Content */}
                      <div className="p-6">
                        {/* Category Icon and Title */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-lg`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                            {category.title}
                          </h3>
                        </div>

                        {/* Links */}
                        <ul className="space-y-3">
                          {category.links.map((link, linkIndex) => (
                            <li
                              key={linkIndex}
                              className="transform transition-all duration-300 hover:translate-x-2"
                              style={{
                                animation: hoveredCard === category.id 
                                  ? `slideIn 0.3s ease-out ${linkIndex * 0.05}s both` 
                                  : 'none'
                              }}
                            >
                              <Link
                                to={link.path}
                                className="group/link flex items-start gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent transition-all duration-300"
                              >
                                <FiChevronRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 transform transition-transform duration-300 group-hover/link:translate-x-1" />
                                <div className="flex-1">
                                  <span className="text-body font-semibold text-gray-900 group-hover/link:text-primary transition-colors">
                                    {link.label}
                                  </span>
                                  <p className="text-question text-gray-500 mt-1 leading-relaxed">
                                    {link.description}
                                  </p>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>

                        {/* Link Count Badge */}
                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <span className="inline-flex items-center gap-2 text-question text-gray-500">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                            {category.links.length} {category.links.length === 1 ? 'page' : 'pages'}
                          </span>
                        </div>
                      </div>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-pink-500/0 group-hover:from-primary/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <FiSearch className="w-24 h-24 mx-auto text-gray-300 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Results Found</h3>
              <p className="text-body text-gray-600 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Stats Footer */}
        <div className="bg-gradient-to-r from-primary to-pink-500 py-12">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <div className="text-4xl font-bold mb-2">{sitemapData.reduce((acc, cat) => acc + cat.links.length, 0)}</div>
                <div className="text-white/80 text-question uppercase tracking-wide">Total Pages</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">{sitemapData.length}</div>
                <div className="text-white/80 text-question uppercase tracking-wide">Categories</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-white/80 text-question uppercase tracking-wide">Responsive</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-white/80 text-question uppercase tracking-wide">Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .sitemap-card {
          perspective: 1000px;
        }

        .sitemap-card:hover {
          z-index: 10;
        }
      `}</style>
    </div>
  );
};

export default SitemapPage;
