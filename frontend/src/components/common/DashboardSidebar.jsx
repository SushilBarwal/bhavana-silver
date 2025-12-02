import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiUser, FiHeart, FiShoppingCart, FiPackage, FiSettings, FiLogOut } from 'react-icons/fi';

/**
 * Dashboard Sidebar Component
 * Navigation menu for dashboard sections
 */
const DashboardSidebar = ({ activeSection }) => {
  const location = useLocation();

  const menuItems = [
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: FiHeart,
      path: '/dashboard/wishlist',
      badge: true
    },
    {
      id: 'settings',
      label: 'Account Settings',
      icon: FiSettings,
      path: '/dashboard/settings'
    }
  ];

  return (
    <aside className="dashboard-sidebar bg-white shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">JD</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
            <p className="text-question text-gray-500">john.doe@email.com</p>
          </div>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path ||
              (item.id === activeSection);

            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded transition-all duration-300 ${isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-body font-medium flex-1">{item.label}</span>
                  {item.badge && !isActive && (
                    <span className="text-question bg-primary text-white px-2 py-0.5 rounded-full">
                      5
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <button className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded transition-all duration-300 w-full">
            <FiLogOut className="w-5 h-5" />
            <span className="text-body font-medium">Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

DashboardSidebar.propTypes = {
  activeSection: PropTypes.string
};

export default DashboardSidebar;
