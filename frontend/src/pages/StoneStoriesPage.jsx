import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchHomepageData } from "../api/homepage";
import StoneDetailModal from "../components/common/StoneDetailModal";

const StoneStoriesPage = () => {
  const [gemstones, setGemstones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStone, setSelectedStone] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { stoneName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchHomepageData();

        if (
          response &&
          response.success &&
          response.data &&
          response.data.gemstones
        ) {
          // Enhance gemstone data with additional properties
          const enhancedGemstones = response.data.gemstones.map((gem) => ({
            ...gem,
            hardness: getStoneHardness(gem.name),
            minesFound: getStoneMines(gem.name),
            birthstone: getStoneBirthstone(gem.name),
            story: getStoneStory(gem.name),
            variations: getStoneVariations(gem.name, gem.image),
          }));
          setGemstones(enhancedGemstones);

          // If URL has a stone name, open that stone's modal
          if (stoneName) {
            const stone = enhancedGemstones.find(
              (g) =>
                g.name.toLowerCase().replace(/\s+/g, "-") ===
                stoneName.toLowerCase()
            );
            if (stone) {
              setSelectedStone(stone);
              setIsModalOpen(true);
            }
          }
        }
      } catch (error) {
        console.error("Failed to load stone stories data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [stoneName]);

  const handleStoneClick = (stone) => {
    setSelectedStone(stone);
    setIsModalOpen(true);
    // Update URL without page reload
    const stoneSlug = stone.name.toLowerCase().replace(/\s+/g, "-");
    navigate(`/stone-stories/${stoneSlug}`, { replace: false });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStone(null);
    // Return to main stone stories page
    navigate("/stone-stories", { replace: false });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-sans">Loading stone stories...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-10 font-sans">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Stone Stories</span>
          </div>

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-gray-900 mb-6 tracking-tight">
              STONE <span className="italic text-primary">STORIES</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-sans max-w-3xl mx-auto">
              Every gemstone has a unique tale to tell. From the depths of the
              earth to the skilled hands of our artisans, explore the journey,
              meaning, and beauty behind the precious stones we use in our
              creations.
            </p>
          </div>

          {/* Grid */}
          {gemstones.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
              {gemstones.map((gem) => (
                <div
                  key={gem.id}
                  className="group cursor-pointer"
                  onClick={() => handleStoneClick(gem)}
                >
                  {/* Stone Image Container */}
                  <div className="relative aspect-square bg-white rounded-full overflow-hidden mb-5 flex items-center justify-center p-6 md:p-8 transition-all duration-500 group-hover:shadow-2xl border-2 border-gray-100 group-hover:border-primary/30">
                    {/* Subtle gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-80"></div>

                    <img
                      src={gem.image}
                      alt={gem.name}
                      className="w-full h-full object-contain transition-all duration-700 ease-out group-hover:scale-110 relative z-10 drop-shadow-lg"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Stone Info */}
                  <div className="text-center px-2">
                    <h3 className="text-base md:text-lg font-serif text-gray-900 mb-2 group-hover:text-primary transition-colors uppercase tracking-widest">
                      {gem.name}
                    </h3>
                    <div className="w-8 h-0.5 bg-primary/40 mx-auto transition-all duration-300 group-hover:w-16 group-hover:bg-primary"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200">
              <p className="text-gray-500 font-sans">
                No stone stories available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Stone Detail Modal */}
      <StoneDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        stone={selectedStone}
      />
    </>
  );
};

// Helper functions to provide stone data
const getStoneHardness = (stoneName) => {
  const hardnessData = {
    Diamond: "10.00 Mohs",
    Ruby: "9.00 Mohs",
    Sapphire: "9.00 Mohs",
    Emerald: "7.50-8.00 Mohs",
    Amethyst: "7.00 Mohs",
    Topaz: "8.00 Mohs",
    Aquamarine: "7.50-8.00 Mohs",
    Garnet: "6.50-7.50 Mohs",
    Peridot: "6.50-7.00 Mohs",
    Opal: "5.50-6.50 Mohs",
    Turquoise: "5.00-6.00 Mohs",
    Pearl: "2.50-4.50 Mohs",
  };
  return hardnessData[stoneName] || "7.00 Mohs";
};

const getStoneMines = (stoneName) => {
  const minesData = {
    Diamond: "Brazil, Russia, Australia, South Africa, Canada",
    Ruby: "Myanmar, Thailand, Sri Lanka, Madagascar, Tanzania",
    Sapphire: "Sri Lanka, Madagascar, Myanmar, Australia, Thailand",
    Emerald: "Colombia, Zambia, Brazil, Afghanistan, Pakistan",
    Amethyst: "Brazil, Uruguay, India, Madagascar, USA, Zambia",
    Topaz: "Brazil, Pakistan, Russia, Sri Lanka, Nigeria",
    Aquamarine: "Brazil, Pakistan, Madagascar, Nigeria, Mozambique",
    Garnet: "India, Madagascar, Sri Lanka, Tanzania, Brazil",
    Peridot: "Egypt, Myanmar, Pakistan, USA, China",
    Opal: "Australia, Ethiopia, Mexico, Brazil, USA",
    Turquoise: "Iran, USA, Egypt, China, Mexico",
    Pearl: "Japan, China, Australia, French Polynesia, Philippines",
  };
  return minesData[stoneName] || "Various locations worldwide";
};

const getStoneBirthstone = (stoneName) => {
  const birthstoneData = {
    Garnet: "January",
    Amethyst: "February",
    Aquamarine: "March",
    Diamond: "April",
    Emerald: "May",
    Pearl: "June",
    Ruby: "July",
    Peridot: "August",
    Sapphire: "September",
    Opal: "October",
    Topaz: "November",
    Turquoise: "December",
  };
  return birthstoneData[stoneName] || "";
};

const getStoneStory = (stoneName) => {
  const storyData = {
    Amethyst:
      "Amethyst has been a big part of the history of a lot of great civilizations, from Ancient Egypt to the British crown jewels. This purple variety of quartz has been prized for centuries for its stunning color and believed protective properties. Ancient Greeks believed it could prevent intoxication, while medieval European soldiers wore it as protection in battle.",
    Diamond:
      "Diamonds have captivated humanity for thousands of years. Formed deep within the Earth under extreme pressure and heat, these precious gems have symbolized eternal love and unbreakable bonds. From ancient India where they were first discovered to modern engagement rings, diamonds continue to be the ultimate symbol of commitment and luxury.",
    Ruby: "Known as the 'King of Gems,' rubies have been treasured throughout history for their vibrant red color. Ancient warriors in Burma believed rubies made them invincible in battle. The finest rubies, known as 'pigeon's blood,' come from Myanmar and are among the most valuable gemstones in the world.",
    Emerald:
      "Cleopatra's favorite gemstone, emeralds have been mined in Egypt since 1500 BCE. These lush green gems were believed to grant the owner foresight and good fortune. The Incas and Aztecs also held emeralds in high regard, using them in religious ceremonies and as symbols of power.",
    Sapphire:
      "For centuries, sapphires have been associated with royalty and romance. Ancient Persians believed the Earth rested on a giant sapphire, which made the sky blue. These gems have adorned the crowns of kings and queens, and today continue to symbolize wisdom, virtue, and good fortune.",
  };
  return (
    storyData[stoneName] ||
    `${stoneName} has been treasured throughout history for its unique beauty and remarkable properties. From ancient civilizations to modern jewelry, this gemstone continues to captivate with its natural elegance and timeless appeal.`
  );
};

const getStoneVariations = (stoneName, baseImage) => {
  const variationsData = {
    Amethyst: [
      { name: "African Amethyst", image: baseImage },
      { name: "Pink Amethyst", image: baseImage },
      { name: "Green Amethyst", image: baseImage },
      { name: "Brazilian Amethyst", image: baseImage },
    ],
    Sapphire: [
      { name: "Blue Sapphire", image: baseImage },
      { name: "Pink Sapphire", image: baseImage },
      { name: "Yellow Sapphire", image: baseImage },
      { name: "White Sapphire", image: baseImage },
    ],
    Topaz: [
      { name: "Blue Topaz", image: baseImage },
      { name: "Imperial Topaz", image: baseImage },
      { name: "White Topaz", image: baseImage },
      { name: "Pink Topaz", image: baseImage },
    ],
  };
  return variationsData[stoneName] || [];
};

export default StoneStoriesPage;
