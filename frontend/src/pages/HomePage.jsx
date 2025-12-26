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

  if (loading) {
    // Optional: Render a loading skeleton or just return null/layout-placeholder
    // For now, we can just render the structure, components handle empty states gracefully or show defaults
  }

  return (
    <>
      <HeroSlider slides={homeData.hero_slides} />
      <Collections collections={homeData.collections} />
      <RingBuilder gemstones={homeData.gemstones} />
      <FeaturesSlider slides={homeData.about_slides} />
      <BestSellers bestSellersData={homeData.best_sellers} />
      <WhyChooseUs features={homeData.features} />
      <Testimonials testimonials={homeData.testimonials} />
      <Certifications certificates={homeData.certificates} />
    </>
  );
};

export default HomePage;
