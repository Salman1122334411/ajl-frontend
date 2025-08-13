import React from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Services from "../components/Services";
import AllTours from "../components/AllTours";
import Experience from "../components/Experience";
import NewsLetterBox from "../components/NewsLetterBox";
import SpecialOfferSection from "../components/SpecialOfferSection";
import { useNavigate } from "react-router-dom";
import tourImg01 from "../assets/t1.jpg";
import tourImg02 from "../assets/t2.jpg";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../components/Button";
import ImageCarousel from "../components/ImageCarousel";
import tourImg03 from "../assets/t3.jpg";
import { useCurrency } from "../context/CurrencyContext";

const Home = () => {
  const navigate = useNavigate();
  const [showMalaysiaPopup, setShowMalaysiaPopup] = useState(false);
  const { symbol, rate, currency } = useCurrency();
  console.log("Home.jsx currency context:", { symbol, rate, currency });

  useEffect(() => {
    // Show popup 1s after homepage appears (loader is 1.5s)
    const timer = setTimeout(() => setShowMalaysiaPopup(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handlePopupClick = () => {
    setShowMalaysiaPopup(false);
    navigate("/switzerland");
  };

  const handleCloseClick = (e) => {
    e.stopPropagation(); // Prevent background click
    setShowMalaysiaPopup(false);
  };

  return (
    <div>
      {/* Malaysia Popup */}
      {showMalaysiaPopup && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-60" onClick={handlePopupClick}>
          <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            <img
              src="/Malaysia.jpg"
              alt="Malaysia Promo"
              className="rounded-lg shadow-2xl object-contain max-w-full max-h-[80vh] border-4 border-white"
              style={{ cursor: "pointer" }}
            />
            <button
              className="absolute top-2 right-2 bg-red-600 text-white rounded-none w-8 h-8 flex items-center justify-center text-2xl font-bold shadow hover:bg-black transition-colors"
              style={{ lineHeight: 1 }}
              onClick={handleCloseClick}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
      {/* Remove the custom hero/banner section above the Header */}
      <Header malaysiaPopupOpen={showMalaysiaPopup} />
      <h1 className="text-4xl sm:text-6xl font-extrabold text-center mt-24 mb-8">
        <span className="text-black">Available </span>
        <span className="text-red-600">Tours</span>
      </h1>
      <div className="flex flex-col sm:flex-row justify-center gap-8 my-12">
        {/* Dubai Card */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center max-w-md w-full"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, y: -8 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <ImageCarousel images={[tourImg01, tourImg02, tourImg03]} alt="Dubai" className="w-full h-64 object-cover rounded-lg mb-4" />
          <h2 className="text-3xl font-bold mb-2 text-black">Dubai</h2>
          <div className="text-lg font-bold text-red-600 mb-2">{symbol}{(15000 * rate).toFixed(2)} <span className="text-sm text-gray-500">/person</span></div>
          <p className="text-gray-600 mb-6 text-center">Discover the wonders of Dubai: Burj Khalifa, Desert Safari, Marina Cruise, and more!</p>
          <Button onClick={() => navigate("/dubai")}>
            Explore
          </Button>
        </motion.div>
        {/* Switzerland Card */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center max-w-md w-full"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, y: -8 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ImageCarousel images={[tourImg02, tourImg03, tourImg01]} alt="Switzerland" className="w-full h-64 object-cover rounded-lg mb-4" />
          <h2 className="text-3xl font-bold mb-2 text-black">Switzerland</h2>
          <div className="text-lg font-bold text-red-600 mb-2">{symbol}{(15000 * rate).toFixed(2)} <span className="text-sm text-gray-500">/person</span></div>
          <p className="text-gray-600 mb-6 text-center">Experience the beauty of Switzerland: Alps, lakes, scenic trains, and more!</p>
          <Button onClick={() => navigate("/switzerland")}>
            Explore
          </Button>
        </motion.div>
      </div>
      <SearchBar />
      <Services />
      <AllTours />
      <Experience />
      <NewsLetterBox />
      <SpecialOfferSection />
    </div>
  );
};

export default Home;
