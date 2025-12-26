import HeroSlider from "../components/sections/HeroSlider";
import Collections from "../components/sections/Collections";
import RingBuilder from "../components/sections/RingBuilder";
import FeaturesSlider from "../components/sections/FeaturesSlider";
import BestSellers from "../components/sections/BestSellers";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import Testimonials from "../components/sections/Testimonials";
import Certifications from "../components/sections/Certifications";

/**
 * Home Page Component
 * Combines all homepage sections
 */
import { useState, useEffect } from "react";
import { fetchHomepageData } from "../api/homepage";

/**
 * Home Page Component
 * Combines all homepage sections
 */
const HomePage = () => {
  const [homeData, setHomeData] = useState({
    hero_slides: [],
    collections: [],
    best_sellers: [],
    certificates: [],
    about_slides: [],
    testimonials: [],
    features: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchHomepageData();
        if (response && response.success && response.data) {
          setHomeData(response.data);
        }
      } catch (error) {
        console.error("Failed to load homepage data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Loading state is now handled by individual components via the loading prop

  return (
    <>
      <HeroSlider slides={homeData.hero_slides} loading={loading} />
      <Collections collections={homeData.collections} loading={loading} />
      <RingBuilder gemstones={homeData.gemstones} loading={loading} />
      <FeaturesSlider slides={homeData.about_slides} loading={loading} />
      <BestSellers bestSellersData={homeData.best_sellers} loading={loading} />
      <WhyChooseUs features={homeData.features} loading={loading} />
      <Testimonials testimonials={homeData.testimonials} loading={loading} />
      <Certifications certificates={homeData.certificates} loading={loading} />
    </>
  );
};

export default HomePage;
