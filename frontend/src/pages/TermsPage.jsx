import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Breadcrumb } from '../components/common';
import { FiFileText } from 'react-icons/fi';
import { fetchTermsData } from '../api/terms';
import SkeletonLoader from '../components/common/SkeletonLoader';

/**
 * Terms and Conditions Page Component - Dynamic
 */
const TermsPage = () => {
  const pageRef = useRef(null);
  const [termsData, setTermsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const breadcrumbItems = [
    { label: 'HOME', link: '/' },
    { label: 'TERMS & CONDITIONS', active: true }
  ];

  useEffect(() => {
    const loadTermsData = async () => {
      try {
        const data = await fetchTermsData();
        if (data) {
          setTermsData(data);
        }
      } catch (error) {
        console.error('Failed to load terms data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTermsData();
  }, []);

  useGSAP(() => {
    if (!isLoading) {
      gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });
    }
  }, { scope: pageRef, dependencies: [isLoading] });

  if (isLoading) {
    return <SkeletonLoader type="page" />;
  }

  if (!termsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Failed to load terms and conditions.</p>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="terms-page bg-white min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <FiFileText className="w-12 h-12 text-primary" />
            <h1 className="section-heading">{termsData.title || 'TERMS & CONDITIONS'}</h1>
          </div>

          <div className="prose prose-lg max-w-none">
            {termsData.last_updated && (
              <p className="text-body text-gray-600 mb-8">
                {termsData.last_updated}
              </p>
            )}

            {termsData.intro_description && (
              <div className="bg-blue-50 border-l-4 border-primary p-6 mb-8">
                <div 
                  className="text-body text-gray-700 leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: termsData.intro_description }}
                />
              </div>
            )}

            {termsData.intro_image && (
              <div className="mb-8">
                <img 
                  src={termsData.intro_image} 
                  alt={termsData.title}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            )}

            {/* Dynamic Sections */}
            {termsData.sections && Object.values(termsData.sections).map((section, index) => (
              <section key={index} className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{section.title}</h2>
                <div 
                  className="prose prose-lg prose-slate max-w-none
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                    prose-ul:list-disc prose-ul:ml-6 prose-ul:space-y-2 prose-ul:text-gray-700
                    prose-ol:list-decimal prose-ol:ml-6 prose-ol:space-y-2 prose-ol:text-gray-700
                    prose-li:text-gray-700 prose-li:leading-relaxed
                    prose-strong:text-gray-900 prose-strong:font-semibold
                    prose-a:text-primary prose-a:underline hover:prose-a:text-primary/80
                    prose-h3:text-xl prose-h3:font-semibold prose-h3:text-gray-900 prose-h3:mt-6 prose-h3:mb-3"
                  dangerouslySetInnerHTML={{ __html: section.description }}
                />
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
