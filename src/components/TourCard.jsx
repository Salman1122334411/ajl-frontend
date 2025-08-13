import React from "react";
import { House, Star } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "./Button";
import ImageCarousel from "./ImageCarousel";
import { useCurrency } from "../context/CurrencyContext";

const hoverEffect = {
  scale: 1.07,
  y: -8,
  transition: { duration: 0.3 },
};

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const TourCard = ({ tour }) => {
  const { id, title, photo, desc, price, featured, city, avgRating } = tour;
  const navigate = useNavigate();
  const { symbol, rate } = useCurrency();

  return (
    <motion.div
      className="bg-white/20 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300"
      whileHover={hoverEffect}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      viewport={{ once: true }}
    >
      <div className="relative">
        <ImageCarousel images={tour.images || [photo]} alt="tourimg" className="w-full h-64 object-cover" />
        {featured && (
          <span className="absolute top-4 left-4 bg-red-500 text-white py-1 px-3 rounded-md text-sm font-semibold">
            Featured
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center text-gray-600 mb-2">
          <House className="mr-2 text-gray-500" />
          <h3 className="text-lg">{city}</h3>
        </div>
        <div className="flex items-center text-yellow-500 mb-2">
          <Star className="mr-2" />
          <h3 className="text-lg">{avgRating}</h3>
        </div>

        <h3 className="text-xl font-semibold mb-4">
          <Link
            to={`/tours/${id}`}
            onClick={() => scrollTo(0, 0)}
            className="text-red-600 hover:underline"
          >
            {title}
          </Link>
        </h3>

        <div className="flex justify-between items-center mt-6">
          <h5 className="text-xl font-semibold text-gray-800">
            {symbol}{(price * rate).toFixed(2)} <span className="text-sm text-gray-500">/person</span>
          </h5>
          <Button
            onClick={() => {
              let path = "/tours/" + id; // fallback
              if (city && city.toLowerCase() === "dubai") {
                path = `/dubai/${id}`;
              } else if (city && city.toLowerCase() === "switzerland") {
                path = `/switzerland/${id}`;
              }
              navigate(path);
            }}
            className="ml-8 w-full bg-red-600 rounded-md font-bold text-white text-base min-h-[44px] px-6 py-2 transition-opacity duration-150 hover:opacity-75 focus:opacity-75 focus:outline-none"
            style={{ fontFamily: 'Lato, Helvetica Neue, Arial, sans-serif', lineHeight: 1.5, boxSizing: 'border-box' }}
          >
            Book Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TourCard;
