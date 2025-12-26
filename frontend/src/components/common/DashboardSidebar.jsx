import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiPackage,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

/**
 * Dashboard Sidebar Component
 * Navigation menu for dashboard sections
 */
const DashboardSidebar = ({ activeSection }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      id: "wishlist",
      label: "Wishlist",
      icon: FiHeart,
      path: "/account",
      badge: true,
    },
    {
      id: "settings",
      label: "Account Settings",
      icon: FiSettings,
      path: "/account/settings",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "U";

  return (
    <aside className="dashboard-sidebar bg-white shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">
              {userInitials}
            </span>
          </div>
          <div className="overflow-hidden">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {user?.name || "User"}
            </h3>
            <p className="text-question text-gray-500 truncate text-sm">
              {user?.email || ""}
            </p>
          </div>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              location.pathname.includes(item.id) ||
              (activeSection && item.id === activeSection);

            // Note: Wishlist badge count logic should ideally get data from context or props if dynamic
            // For now leaving as is or removing hardcoded number if not passed.
            // Let's hide badge number if static to avoid confusion, or keep if preferred.
            // Placeholder logic:

            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-body font-medium flex-1">
                    {item.label}
                  </span>
                  {/* {item.badge && !isActive && (
                    <span className="text-question bg-primary text-white px-2 py-0.5 rounded-full">
                      5
                    </span>
                  )} */}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded transition-all duration-300 w-full"
          >
            <FiLogOut className="w-5 h-5" />
            <span className="text-body font-medium">Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

DashboardSidebar.propTypes = {
  activeSection: PropTypes.string,
};

export default DashboardSidebar;
