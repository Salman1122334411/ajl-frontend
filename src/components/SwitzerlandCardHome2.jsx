import React from "react";
import ImageCarouselHome2 from "./ImageCarouselHome2";
import ButtonHome2 from "./ButtonHome2";
import tourImg01 from "../assets/t1.jpg";
import tourImg02 from "../assets/t2.jpg";
import tourImg03 from "../assets/t3.jpg";
import { useCurrency } from "../context/CurrencyContext";
import { useNavigate } from "react-router-dom";

const SwitzerlandCardHome2 = () => {
  const { symbol, rate } = useCurrency();
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center max-w-md w-full">
      <ImageCarouselHome2 images={[tourImg02, tourImg03, tourImg01]} alt="Switzerland" className="w-full h-64 object-cover rounded-lg mb-4" />
      <h2 className="text-3xl font-bold mb-2 text-black">Switzerland</h2>
      <div className="text-lg font-bold text-orange-600 mb-2">{symbol}{(15000 * rate).toFixed(2)} <span className="text-sm text-gray-500">/person</span></div>
      <p className="text-gray-600 mb-6 text-center">Experience the beauty of Switzerland: Alps, lakes, scenic trains, and more!</p>
      <ButtonHome2 onClick={() => navigate("/switzerland")}>Explore</ButtonHome2>
    </div>
  );
};

export default SwitzerlandCardHome2; 