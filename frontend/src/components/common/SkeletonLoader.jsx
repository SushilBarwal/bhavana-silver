import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const CollectionSkeleton = () => {
  return (
    <div className="collection-skeleton">
      <Skeleton height="100%" className="aspect-square mb-4 rounded-none" />
      <Skeleton width="60%" className="mx-auto block" />
    </div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="product-card-skeleton">
      <Skeleton className="aspect-square mb-4 rounded-none" />
      <div className="space-y-2">
        <Skeleton width="40%" height={24} />
        <Skeleton width="30%" />
        <Skeleton width="90%" height={20} />
        <Skeleton width="50%" />
      </div>
    </div>
  );
};

export const TestimonialSkeleton = () => {
  return (
    <div className="testimonial-skeleton bg-white shadow-lg rounded-xl p-6 md:p-8 min-h-[300px] flex flex-col items-center text-center">
      <Skeleton circle width={60} height={60} className="mb-4" />
      <Skeleton width="40%" height={20} className="mb-2" />
      <Skeleton width="30%" className="mb-6" />
      <Skeleton count={3} width="100%" className="mb-2" />
      <div className="flex gap-1 mt-auto">
        <Skeleton width={100} height={20} />
      </div>
    </div>
  );
};

export const FeatureCardSkeleton = () => {
  return (
    <div className="feature-card-skeleton h-full">
      <div className="bg-white rounded-lg p-6 md:p-8 border border-gray-100 h-full">
        <div className="flex items-start gap-4">
          <Skeleton width={56} height={56} className="rounded-lg shrink-0" />
          <div className="flex-1">
            <Skeleton width="70%" height={20} className="mb-2" />
            <Skeleton count={2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const FeatureSliderSkeleton = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-6">
          <Skeleton width="20%" height={20} />
          <Skeleton width="40%" height={20} />
          <Skeleton width="80%" height={40} />
          <Skeleton count={4} />
          <div className="flex gap-2 pt-4">
            <Skeleton width={30} height={10} />
            <Skeleton width={10} height={10} />
            <Skeleton width={10} height={10} />
            <Skeleton width={10} height={10} />
          </div>
        </div>
        <div className="h-[500px] md:h-[600px] lg:h-[700px]">
          <Skeleton height="100%" />
        </div>
      </div>
    </div>
  );
};

export const RingBuilderSkeleton = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20 lg:py-24 text-center">
      <Skeleton width="40%" height={30} className="mb-12 mx-auto" />
      <div className="flex justify-center gap-6 overflow-hidden py-8">
        <Skeleton circle width={100} height={100} />
        <Skeleton circle width={120} height={120} />
        <Skeleton circle width={150} height={150} />
        <Skeleton circle width={120} height={120} />
        <Skeleton circle width={100} height={100} />
      </div>
      <Skeleton width="20%" height={24} className="mt-8 mx-auto" />
    </div>
  );
};

export const HeroSkeleton = () => {
  return (
    <div className="w-full h-[60vh] md:h-[80vh] relative bg-gray-100">
      <Skeleton height="100%" width="100%" />
    </div>
  );
};

export const CertificationSkeleton = () => {
  return (
    <div className="certification-skeleton">
      <Skeleton className="aspect-[3/4] mb-4" />
      <Skeleton width="60%" className="mx-auto block" />
    </div>
  );
};

export const FooterSkeleton = () => {
  return (
    <footer className="footer bg-white border-t border-gray-100">
      {/* Links Section */}
      <div className="border-t border-gray-200 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <Skeleton width="60%" height={24} className="mb-6" />
                <div className="space-y-3">
                  <Skeleton width="40%" height={20} />
                  <Skeleton width="50%" height={20} />
                  <Skeleton width="45%" height={20} />
                  <Skeleton width="35%" height={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-50 py-10 md:py-12 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Skeleton width="30%" height={24} className="mb-4 mx-auto" />
            <Skeleton width="60%" height={20} className="mb-6 mx-auto" />
            <div className="flex gap-4 justify-center max-w-2xl mx-auto">
              <Skeleton width="70%" height={50} />
              <Skeleton width="25%" height={50} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-primary py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <Skeleton width={150} height={50} className="mb-6" />
              <Skeleton count={3} className="mb-2 opacity-50" />
            </div>
            <div className="text-right">
              <Skeleton width="30%" height={24} className="mb-4 ml-auto" />
              <Skeleton
                count={3}
                width="50%"
                className="mb-2 ml-auto opacity-50"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SkeletonLoader = ({ type, count = 1 }) => {
  const skeletons = [];

  const SkeletonComponent =
    {
      collection: CollectionSkeleton,
      product: ProductCardSkeleton,
      testimonial: TestimonialSkeleton,
      feature: FeatureCardSkeleton,
      "feature-slider": FeatureSliderSkeleton,
      "ring-builder": RingBuilderSkeleton,
      hero: HeroSkeleton,
      certification: CertificationSkeleton,
      footer: FooterSkeleton,
    }[type] || Skeleton;

  for (let i = 0; i < count; i++) {
    skeletons.push(<SkeletonComponent key={i} />);
  }

  return (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
      <>{skeletons}</>
    </SkeletonTheme>
  );
};

export default SkeletonLoader;
