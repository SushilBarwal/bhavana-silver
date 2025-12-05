import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HowToOrder = () => {
  const [activeTab, setActiveTab] = useState("step1");

  const tabs = [
    { id: "step1", label: "Step 1" },
    { id: "step2", label: "Step 2" },
    { id: "step3", label: "Step 3" },
    { id: "step4", label: "Step 4" },
    { id: "step5", label: "Step 5" },
  ];

  const tabContent = {
    step1: {
      image:
        "https://images.unsplash.com/photo-1612150354898-a69132eb7c67?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Browse & Select",
      description:
        "Explore our exquisite collection of jewelry. Use our filters to find the perfect piece that suits your style.",
    },
    step2: {
      image:
        "https://images.unsplash.com/photo-1709737449381-ea4720ce8fc8?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Customize Your Order",
      description:
        "Many of our pieces can be customized. Select your preferred metal, gemstone, and size to create a truly unique item.",
    },
    step3: {
      image:
        "https://plus.unsplash.com/premium_photo-1678834778167-5b2172bccb6f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Add to Cart & Review",
      description:
        "Once you are happy with your selection, add the items to your cart. Review your order to ensure all details are correct.",
    },
    step4: {
      image:
        "https://images.unsplash.com/photo-1647849208531-65544855dd46?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Secure Checkout",
      description:
        "Proceed to our secure checkout. We offer various payment options for your convenience.",
    },
    step5: {
      image:
        "https://images.unsplash.com/photo-1631554272903-8e94a50701c7?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Make Your Payment",
      description:
        "We accept both online and offline payment options. Once confirmed, your order moves to production.",
    },
  };

  return (
    <section id="how-to-order" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
          How to Place an Order
        </h2>

        <div className="flex justify-center mb-10">
          <div className="flex items-center flex-wrap justify-center space-x-4">
            {tabs.map((tab, index) => (
              <div key={tab.id} className="flex items-center">
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-300 relative ${
                    activeTab === tab.id
                      ? "text-primary"
                      : "text-gray-500 hover:text-primary"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      layoutId="underline"
                    />
                  )}
                </button>
                {index < tabs.length - 1 && (
                  <span className="text-gray-400 mx-2">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
          >
            <div className="w-full md:w-1/2">
              <img
                src={tabContent[activeTab].image}
                alt={tabContent[activeTab].title}
                className="rounded-lg shadow-lg object-cover w-full h-64 md:h-80"
              />
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-serif mb-4">
                {tabContent[activeTab].title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {tabContent[activeTab].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HowToOrder;
