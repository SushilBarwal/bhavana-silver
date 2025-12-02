import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import PropTypes from 'prop-types';
import { FiHeart, FiShoppingBag, FiEye } from 'react-icons/fi';

/**
 * Dashboard Overview Component
 * Quick stats and summary cards
 */
const DashboardOverview = ({ wishlistCount, recentlyViewedCount }) => {
  const overviewRef = useRef(null);
  const cardsRef = useRef([]);

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
            delay: index * 0.15
          }
        );
      }
    });
  }, { scope: overviewRef });

  const stats = [
    {
      id: 'wishlist',
      label: 'Wishlist Items',
      value: wishlistCount,
      icon: FiHeart,
      color: 'bg-pink-100 text-pink-600',
      iconBg: 'bg-pink-600',
      link: null
    },
    {
      id: 'shop',
      label: 'Shop',
      value: '0',
      icon: FiShoppingBag,
      color: 'bg-blue-100 text-blue-600',
      iconBg: 'bg-blue-600',
      link: '/shop'
    },
    {
      id: 'recently-viewed',
      label: 'Recently Viewed',
      value: recentlyViewedCount,
      icon: FiEye,
      color: 'bg-purple-100 text-purple-600',
      iconBg: 'bg-purple-600',
      link: '/recently-viewed'
    }
  ];

  return (
    <section ref={overviewRef} className="dashboard-overview mb-8">
      <h2 className="text-2xl md:text-3xl font-section font-bold text-gray-900 mb-6">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const CardWrapper = stat.link ? Link : 'div';
          const cardProps = stat.link ? { to: stat.link } : {};

          return (
            <CardWrapper
              key={stat.id}
              {...cardProps}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`stat-card bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 group ${stat.link ? 'cursor-pointer hover:-translate-y-1' : ''
                }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded ${stat.color}`}>
                  Active
                </span>
              </div>

              <div>
                <p className="text-question text-gray-600 uppercase tracking-wide mb-1">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </CardWrapper>
          );
        })}
      </div>
    </section>
  );
};

DashboardOverview.propTypes = {
  wishlistCount: PropTypes.number.isRequired,
  recentlyViewedCount: PropTypes.number.isRequired
};

export default DashboardOverview;
