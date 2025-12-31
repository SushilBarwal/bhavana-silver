import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Breadcrumb } from '../components/common';
import { FiShield, FiLock } from 'react-icons/fi';
import { fetchPrivacyData } from '../api/privacy';
import SkeletonLoader from '../components/common/SkeletonLoader';

/**
 * Privacy Policy Page Component - Dynamic
 */
const PrivacyPage = () => {
  const pageRef = useRef(null);
  const [privacyData, setPrivacyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const breadcrumbItems = [
    { label: 'HOME', link: '/' },
    { label: 'PRIVACY POLICY', active: true }
  ];

  useEffect(() => {
    const loadPrivacyData = async () => {
      try {
        const data = await fetchPrivacyData();
        if (data) {
          setPrivacyData(data);
        }
      } catch (error) {
        console.error('Failed to load privacy data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPrivacyData();
  }, []);

  useGSAP(() => {
    if (!isLoading) {
      gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });
    }
  }, { scope: pageRef, dependencies: [isLoading] });

  if (isLoading) {
    return <SkeletonLoader type="page" />;
  }

  if (!privacyData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Failed to load privacy policy.</p>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="privacy-page bg-white min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <FiShield className="w-12 h-12 text-primary" />
            <h1 className="section-heading">{privacyData.title || 'PRIVACY POLICY'}</h1>
          </div>

          <div className="prose prose-lg max-w-none">
            {privacyData.last_updated && (
              <p className="text-body text-gray-600 mb-8">
                {privacyData.last_updated}
              </p>
            )}

            {privacyData.intro_description && (
              <div className="bg-blue-50 border-l-4 border-primary p-6 mb-8">
                <div className="flex items-start gap-3">
                  <FiLock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div 
                    className="text-body text-gray-700 leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: privacyData.intro_description }}
                  />
                </div>
              </div>
            )}

            {privacyData.intro_image && (
              <div className="mb-8">
                <img 
                  src={privacyData.intro_image} 
                  alt={privacyData.title}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            )}

            {/* Dynamic Sections */}
            {privacyData.sections && Object.values(privacyData.sections).map((section, index) => (
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

export default PrivacyPage;
