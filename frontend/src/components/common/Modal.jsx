import { useEffect } from "react";
import PropTypes from "prop-types";
import { FiX } from "react-icons/fi";

/**
 * Custom Modal Component
 * Built without external packages for full control
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "3xl",
  showCloseButton = true,
}) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = "hidden";

      return () => {
        // Restore body scroll
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
  };

  // Handle overlay click
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        className={`relative ${maxWidthClasses[maxWidth]} w-full bg-white rounded-lg shadow-2xl max-h-[90vh] flex flex-col my-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-300 z-10"
            aria-label="Close modal"
          >
            <FiX className="w-6 h-6 text-gray-600 hover:text-gray-900" />
          </button>
        )}

        {/* Modal Content - Scrollable */}
        <div className="p-6 md:p-8 lg:p-10 overflow-y-auto">
          {title && (
            <h2 id="modal-title" className="section-heading mb-8">
              {title}
            </h2>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.oneOf(["sm", "md", "lg", "xl", "2xl", "3xl", "4xl"]),
  showCloseButton: PropTypes.bool,
};

export default Modal;
