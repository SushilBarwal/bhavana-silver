import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Breadcrumb } from '../components/common';
import Faq from '../components/sections/AboutSections/Faq';

/**
 * FAQ Page Component
 * Displays frequently asked questions
 */
const FaqPage = () => {
    const pageRef = useRef(null);

    // Breadcrumb items
    const breadcrumbItems = [
        { label: 'HOME', link: '/' },
        { label: 'FAQs', active: true }
    ];

    // Page entrance animation
    useGSAP(() => {
        gsap.fromTo(
            pageRef.current,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out'
            }
        );
    }, { scope: pageRef });

    return (
        <div ref={pageRef} className="faq-page bg-gray-50 min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
                    <Breadcrumb items={breadcrumbItems} />
                </div>
            </div>

            {/* FAQ Section */}
            <Faq />
        </div>
    );
};

export default FaqPage;
