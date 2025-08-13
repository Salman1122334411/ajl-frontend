import React from "react";
import { useNavigate } from "react-router-dom";
import tourImg02 from "../assets/t2.jpg";
import tourImg03 from "../assets/t3.jpg";
import tourImg04 from "../assets/t4.jpg";
import tourImg05 from "../assets/t5.jpg";
import ImageCarousel from "../components/ImageCarousel";
import { useCurrency } from "../context/CurrencyContext";

const switzerlandTours = [
  {
    id: "01",
    name: "4 Country Tours",
    images: [tourImg02, tourImg03, tourImg04],
    price: 15000,
    summary: "Explore four countries in one trip: castles, lakes, and scenic views across Switzerland, Austria, Germany, and Liechtenstein.",
    luxury: true,
  },
  {
    id: "02",
    name: "Grindelwald Tours",
    images: [tourImg03, tourImg04, tourImg05],
    price: 12000,
    summary: "Experience the Swiss Alps: mountain views, scenic hikes, and charming alpine villages in Grindelwald and beyond.",
  },
  {
    id: "03",
    name: "Crashlanding Tours",
    images: [tourImg04, tourImg05, tourImg02],
    price: 11000,
    summary: "Visit iconic filming locations, lakes, and adventure spots. Perfect for fans and explorers alike.",
  },
  {
    id: "04",
    name: "Lauterbrunnen & Interlaken",
    images: [tourImg05, tourImg02, tourImg03],
    price: 10000,
    summary: "Discover waterfalls, valley walks, and adventure sports in Switzerland's most scenic regions.",
  }
];

const SwitzerlandLocations = () => {
  const navigate = useNavigate();
  const { symbol, rate } = useCurrency();
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-16">
      <h1 className="text-4xl font-bold mb-10 text-center text-black">Explore Switzerland</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10 w-full max-w-5xl">
        {switzerlandTours.map((tour) => (
          <div
            key={tour.id}
            className="rounded-xl shadow-lg bg-white p-6 flex flex-col items-center border-2 hover:border-red-600 transition-transform hover:scale-105 cursor-pointer"
            onClick={() => navigate(`/switzerland/${tour.id}`)}
          >
            <div className="relative w-full h-56 mb-4">
              <ImageCarousel images={tour.images} alt={tour.name} className="w-full h-56 object-cover rounded-lg" />
              {tour.luxury && (
                <span className="absolute top-2 left-2 bg-yellow-500 text-white py-1 px-3 rounded-md text-xs font-bold shadow">Luxury</span>
              )}
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-black">{tour.name}</h2>
            <div className="text-gray-600 text-base mb-2 text-center">{tour.summary}</div>
            <div className="text-lg font-bold text-red-600 mb-2">{symbol}{(tour.price * rate).toFixed(2)} <span className="text-sm text-gray-500">/person</span></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwitzerlandLocations; 