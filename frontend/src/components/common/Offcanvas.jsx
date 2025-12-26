import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { FiX } from "react-icons/fi";

/**
 * Offcanvas Component - Slide-in panel from the right
 * Uses React Portal to render outside parent hierarchy for robust viewport positioning
 */
const Offcanvas = ({
  isOpen,
  onClose,
  title,
  children,
  position = "right",
  scrollPosition = 0,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lock body scroll when offcanvas is open
  useEffect(() => {
    if (isOpen) {
      // Lock body scroll - JUST overflow hidden, no fixed positioning of body
      // This keeps the scroll bar visual but prevents scrolling
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollPosition);
      };
    }
  }, [isOpen, scrollPosition]);

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

  if (!isOpen || !mounted) return null;

  const positionClasses = {
    right: "right-0",
    left: "left-0",
    top: "left-0 right-0",
    bottom: "left-0 right-0",
  };

  const currentSlideClass = (() => {
    switch (position) {
      case "right":
        return isOpen ? "translate-x-0" : "translate-x-full";
      case "left":
        return isOpen ? "translate-x-0" : "-translate-x-full";
      case "top":
        return isOpen ? "translate-y-0" : "-translate-y-full";
      case "bottom":
        return isOpen ? "translate-y-0" : "translate-y-full";
      default:
        return "translate-x-0";
    }
  })();

  const sizeClasses = {
    right: "w-full sm:w-[500px] md:w-[600px] h-[100dvh]",
    left: "w-full sm:w-[500px] md:w-[600px] h-[100dvh]",
    top: "h-auto max-h-[80vh] w-full",
    bottom: "h-auto max-h-[80vh] w-full",
  };

  const content = (
    <div
      className="offcanvas-portal absolute top-0 left-0 w-full z-[9999]"
      aria-labelledby={title ? "offcanvas-title" : undefined}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop - Absolute positioned at current scroll */}
      <div
        className="absolute inset-x-0 bg-black bg-opacity-50 transition-opacity duration-300 h-[100dvh]"
        style={{ top: `${scrollPosition}px` }}
        onClick={onClose}
      />

      {/* Offcanvas Panel - Absolute style at current scroll */}
      <div
        className={`absolute ${positionClasses[position]} ${sizeClasses[position]} bg-white shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${currentSlideClass}`}
        style={{ top: `${scrollPosition}px` }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          {title && (
            <h2
              id="offcanvas-title"
              className="text-xl font-bold text-gray-900"
            >
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="ml-auto p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
            aria-label="Close"
          >
            <FiX className="w-6 h-6 text-gray-600 hover:text-gray-900" />
          </button>
        </div>

        {/* Content - Scrollable, takes remaining height */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

Offcanvas.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(["right", "left", "top", "bottom"]),
  scrollPosition: PropTypes.number,
};

export default Offcanvas;
