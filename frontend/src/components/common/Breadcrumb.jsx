import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Reusable Breadcrumb Component
 */
const Breadcrumb = ({ items }) => {
  // Insert "Shop" after "Home" only for product-related pages
  const processedItems = [...items];

  // Product-related keywords that should have Shop in breadcrumb
  const productRelatedKeywords = [
    'gold', 'silver', 'fashion', 'jewelry', 'jewellery',
    'ring', 'necklace', 'earring', 'bracelet', 'bangle',
    'collection', 'product', 'category', 'shop'
  ];

  // Check if this is a product-related page
  const isProductPage = processedItems.some((item, index) => {
    if (index === 0) return false; // Skip "Home"
    const label = item.label.toLowerCase();
    return productRelatedKeywords.some(keyword => label.includes(keyword));
  });

  // Only insert "Shop" if it's a product page and Shop is not already present
  if (isProductPage &&
    processedItems.length > 0 &&
    processedItems[0].label.toLowerCase() === 'home' &&
    (processedItems.length === 1 || processedItems[1].label.toLowerCase() !== 'shop')) {
    // Insert "Shop" after "Home"
    processedItems.splice(1, 0, { label: 'SHOP', link: '/shop' });
  }


  return (
    <nav className="mb-6">
      <ol className="flex items-center space-x-2 text-[13px] text-gray-600 uppercase">
        {processedItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="text-gray-400 mx-2">|</span>}
            {item.link ? (
              <Link
                to={item.link}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={item.active ? 'text-primary font-medium' : ''}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string,
      active: PropTypes.bool,
    })
  ).isRequired,
};

export default Breadcrumb;
