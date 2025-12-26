import { useEffect } from "react";
import PropTypes from "prop-types";
import { FiX } from "react-icons/fi";

/**
 * Stone Detail Modal Component
 * Displays comprehensive information about a selected gemstone
 */
const StoneDetailModal = ({ isOpen, onClose, stone }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen || !stone) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full my-8 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-all duration-300 z-10 group"
          aria-label="Close modal"
        >
          <FiX className="w-6 h-6 text-gray-600 group-hover:text-gray-900 group-hover:rotate-90 transition-all duration-300" />
        </button>

        {/* Modal Content */}
        <div className="p-8 md:p-12">
          {/* Header Section */}
          <div className="text-center mb-12 border-b border-gray-200 pb-8">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4 uppercase tracking-widest">
              {stone.name}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Left Column - Image and Basic Info */}
            <div>
              {/* Main Stone Image */}
              <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden mb-8 flex items-center justify-center p-12 shadow-inner">
                <div className="absolute inset-0 bg-radial-gradient from-white/50 to-transparent"></div>
                <img
                  src={stone.image}
                  alt={stone.name}
                  className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                />
              </div>

              {/* Stone Properties */}
              <div className="space-y-4">
                {stone.hardness && (
                  <div className="flex items-start">
                    <span className="font-semibold text-gray-700 min-w-[140px] font-sans">
                      Hardness:
                    </span>
                    <span className="text-gray-600 font-sans">
                      {stone.hardness}
                    </span>
                  </div>
                )}
                {stone.minesFound && (
                  <div className="flex items-start">
                    <span className="font-semibold text-gray-700 min-w-[140px] font-sans">
                      Mines found:
                    </span>
                    <span className="text-gray-600 font-sans">
                      {stone.minesFound}
                    </span>
                  </div>
                )}
                {stone.birthstone && (
                  <div className="flex items-start">
                    <span className="font-semibold text-gray-700 min-w-[140px] font-sans">
                      Birthstone:
                    </span>
                    <span className="text-gray-600 font-sans">
                      {stone.birthstone}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Story */}
            <div>
              <h3 className="text-2xl font-serif text-gray-900 mb-6">Story</h3>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed font-sans text-base">
                  {stone.story ||
                    `${stone.name} has been a big part of the history of a lot of great civilizations, from Ancient Egypt to the British crown jewels. Discover the rich heritage and timeless beauty of this magnificent gemstone, treasured across cultures and centuries for its unique properties and captivating allure.`}
                </p>
              </div>
            </div>
          </div>

          {/* Stone Variations */}
          {stone.variations && stone.variations.length > 0 && (
            <div className="border-t border-gray-200 pt-12">
              <h3 className="text-2xl font-serif text-gray-900 mb-8 text-center">
                Variations
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stone.variations.map((variation, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer transition-all duration-300 hover:scale-105"
                  >
                    <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden mb-4 flex items-center justify-center p-6 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                      <img
                        src={variation.image}
                        alt={variation.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-center text-sm font-medium text-gray-700 uppercase tracking-wide font-sans">
                      {variation.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

StoneDetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  stone: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    hardness: PropTypes.string,
    minesFound: PropTypes.string,
    birthstone: PropTypes.string,
    story: PropTypes.string,
    variations: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      })
    ),
  }),
};

export default StoneDetailModal;
