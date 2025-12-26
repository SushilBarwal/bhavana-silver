import React from "react";
import PropTypes from "prop-types";

const OurStory = ({ data }) => {
  // Safe defaults or fallbacks
  const {
    story_title = "Bhawna Silver International",
    story_description_1 = "We're a B2B jewelry sourcing platform helping retailers and wholesalers find luxury at the right price — hassle-free, with endless design and gemstone options.",
    story_description_2 = "Born in 2019, JewelPin was created with one clear goal — to solve a recurring challenge faced by retailers and wholesalers: finding small-batch, high-quality jewelry in a variety of gemstones without the usual sourcing hassles.",
    story_image_1 = "https://plus.unsplash.com/premium_photo-1681276170683-706111cf496e?q=80&w=1170&auto=format&fit=crop",
    story_image_2 = "https://plus.unsplash.com/premium_photo-1674748385436-db725f68e312?q=80&w=1170&auto=format&fit=crop",
    monthly_production = "4000+",
    countries_count = "45+",
    partners_count = "100+",
  } = data || {};

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4">
        {/* HEADING */}
        <div className="text-center mb-16">
          <h2 className="text-3xl uppercase text-gray-800 mb-3">
            {story_title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {story_description_1}
          </p>
        </div>

        {/* MAIN 2 COLUMN SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-12 items-start">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-8">
            <p className="text-gray-600">{story_description_2}</p>

            <img
              src={story_image_1}
              alt="Team"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>

          {/* RIGHT COLUMN → first image then text (just like screenshot) */}
          <div>
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <p className="text-gray-600 mb-10">
                  Jewel Pin evolved from Valentine group, a globally trusted
                  export house known for its excellence in jewelry
                  manufacturing. Based in Jaipur, Valentine Silver has been at
                  the forefront of fine jewelry exports for over two decades,
                  with state-of-the-art infrastructure in Special Economic
                  Zones.
                </p>

                <p className="text-gray-600">
                  Today, Jewel Pin offers a curated range of 925 Sterling
                  Silver, Gold, and fashion jewelry — adorned with diamonds,
                  natural, and precious gemstones. It's where traditional
                  craftsmanship meets modern flexibility — a smarter, seamless
                  way to source luxury jewelry for retailers and wholesalers
                  alike.
                </p>
              </div>

              <div className="lg:w-[40%]">
                <img
                  src={story_image_2}
                  alt="Factory"
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
              </div>
            </div>
            {/* STATS SECTION */}
            <div className="border-t border-gray-200 pt-12 mt-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-y-0 text-center">
                {/* Stat 1 */}
                <div>
                  <p className="text-4xl sm:text-5xl font-bold text-primary">
                    {monthly_production}
                  </p>
                  <p className="text-gray-600 mt-2 text-xs sm:text-sm tracking-widest">
                    MONTHLY PRODUCTION
                  </p>
                </div>
                {/* Stat 2 */}
                <div className="md:border-l md:border-r border-gray-300">
                  <p className="text-4xl sm:text-5xl font-bold text-primary">
                    {countries_count}
                  </p>
                  <p className="text-gray-600 mt-2 text-xs sm:text-sm tracking-widest">
                    COUNTRIES
                  </p>
                </div>
                {/* Stat 3 */}
                <div>
                  <p className="text-4xl sm:text-5xl font-bold text-primary">
                    {partners_count}
                  </p>
                  <p className="text-gray-600 mt-2 text-xs sm:text-sm tracking-widest">
                    PARTNERS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

OurStory.propTypes = {
  data: PropTypes.shape({
    story_title: PropTypes.string,
    story_description_1: PropTypes.string,
    story_description_2: PropTypes.string,
    story_image_1: PropTypes.string,
    story_image_2: PropTypes.string,
    monthly_production: PropTypes.string,
    countries_count: PropTypes.string,
    partners_count: PropTypes.string,
  }),
};

export default OurStory;
