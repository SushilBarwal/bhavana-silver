import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';

const faqData = [
  {
    id: 'faq-1',
    question: 'What materials are your jewelry made from?',
    answer:
      'Our jewelry is crafted from high-quality materials, including 925 sterling silver, 14k and 18k gold, and genuine gemstones. We provide detailed information about the materials used in each product description.',
  },
  {
    id: 'faq-2',
    question: 'How do I care for my jewelry?',
    answer:
      'To keep your jewelry looking its best, we recommend avoiding contact with harsh chemicals, such as perfumes and cleaning agents. Store your jewelry in a dry, cool place, and clean it regularly with a soft cloth. For more specific care instructions, please refer to our jewelry care guide.',
  },
  {
    id: 'faq-3',
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day return policy for all unworn and undamaged jewelry. If you are not completely satisfied with your purchase, you can return it for a full refund or exchange. Please visit our returns page for more information.',
  },
  {
    id: 'faq-4',
    question: 'Do you offer international shipping?',
    answer:
      'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary depending on the destination. You can find more information about our shipping options on our shipping policy page.',
  },
];

const FAQItem = React.memo(
  ({ faq, index, activeIndex, toggleAccordion }) => {
    const isOpen = index === activeIndex;

    return (
      <motion.div
        key={faq.id}
        className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
        whileHover={{ y: -5 }}
      >
        <button
          onClick={() => toggleAccordion(index)}
          className="flex items-center justify-between w-full text-lg font-medium text-left text-gray-900"
          aria-expanded={isOpen}
          aria-controls={faq.id}
        >
          <span className="flex-1 text-base font-semibold text-gray-800 md:text-lg">
            {faq.question}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaPlus
              className={`w-6 h-6 text-gray-500 ${
                isOpen ? 'transform rotate-45' : ''
              }`}
            />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={faq.id}
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="mt-4 text-base text-gray-600"
              role="region"
              aria-labelledby={`question-${faq.id}`}
            >
              {faq.answer}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const memoizedFAQItems = useMemo(
    () =>
      faqData.map((faq, index) => (
        <FAQItem
          key={faq.id}
          faq={faq}
          index={index}
          activeIndex={activeIndex}
          toggleAccordion={toggleAccordion}
        />
      )),
    [activeIndex]
  );

  return (
    <section id="faqs" className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Find answers to common questions about our products, shipping, and
            returns.
          </p>
        </div>
        <div className="max-w-3xl mx-auto mt-12 space-y-4">
          {memoizedFAQItems}
        </div>
      </div>
    </section>
  );
};

export default FAQ;