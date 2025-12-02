import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import PropTypes from 'prop-types';
import { FiHeart, FiShoppingCart, FiPackage, FiTrendingUp } from 'react-icons/fi';

/**
 * Dashboard Overview Component
 * Quick stats and summary cards
 */
const DashboardOverview = ({ wishlistCount, ordersCount, cartCount }) => {
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
      iconBg: 'bg-pink-600'
    },
    {
      id: 'cart',
      label: 'Cart Items',
      value: cartCount,
      icon: FiShoppingCart,
      color: 'bg-blue-100 text-blue-600',
      iconBg: 'bg-blue-600'
    },
    {
      id: 'orders',
      label: 'Total Orders',
      value: ordersCount,
      icon: FiPackage,
      color: 'bg-green-100 text-green-600',
      iconBg: 'bg-green-600'
    },
    {
      id: 'activity',
      label: 'Recent Activity',
      value: '12',
      icon: FiTrendingUp,
      color: 'bg-purple-100 text-purple-600',
      iconBg: 'bg-purple-600'
    }
  ];

  return (
    <section ref={overviewRef} className="dashboard-overview mb-8">
      <h2 className="text-2xl md:text-3xl font-section font-bold text-gray-900 mb-6">
        Dashboard Overview
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <div
              key={stat.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="stat-card bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 group"
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
            </div>
          );
        })}
      </div>
    </section>
  );
};

DashboardOverview.propTypes = {
  wishlistCount: PropTypes.number.isRequired,
  ordersCount: PropTypes.number.isRequired,
  cartCount: PropTypes.number.isRequired
};

export default DashboardOverview;
