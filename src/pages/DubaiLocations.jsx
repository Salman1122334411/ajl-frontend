import React from "react";
import { useNavigate } from "react-router-dom";
import tourImg01 from "../assets/t1.jpg";
import tourImg02 from "../assets/t2.jpg";
import tourImg03 from "../assets/t3.jpg";
import ImageCarousel from "../components/ImageCarousel";
import { useCurrency } from "../context/CurrencyContext";

const dubaiPlaces = [
  {
    id: "01",
    title: "Burj Khalifa Experience",
    desc: "Experience the world's tallest building and breathtaking views of Dubai's skyline.",
    images: [tourImg01, tourImg02, tourImg03],
    price: 15000,
    luxury: true,
  },
  {
    id: "02",
    title: "Desert Safari Adventure",
    desc: "Dune bashing, camel riding, and a traditional Bedouin camp under the stars.",
    images: [tourImg02, tourImg03, tourImg01],
    price: 12000,
  },
  {
    id: "03",
    title: "Dubai Marina Cruise",
    desc: "Luxurious dinner cruise through Dubai Marina with spectacular views.",
    images: [tourImg03, tourImg01, tourImg02],
    price: 8000,
  },
];

const DubaiLocations = () => {
  const navigate = useNavigate();
  const { symbol, rate } = useCurrency();
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-16">
      <h1 className="text-4xl font-bold mb-10 text-center text-black">Explore Dubai</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full max-w-5xl">
        {dubaiPlaces.map((place) => (
          <div
            key={place.id}
            className="rounded-xl shadow-lg bg-white p-6 flex flex-col items-center border-2 hover:border-red-600 transition-transform hover:scale-105 cursor-pointer"
            onClick={() => navigate(`/dubai/${place.id}`)}
          >
            <div className="relative w-40 h-40 mb-4">
              <ImageCarousel images={place.images} alt={place.title} className="w-40 h-40 object-cover rounded-lg" />
              {place.luxury && (
                <span className="absolute top-2 left-2 bg-yellow-500 text-white py-1 px-3 rounded-md text-xs font-bold shadow">Luxury</span>
              )}
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-black">{place.title}</h2>
            <p className="text-gray-600 text-center mb-4">{place.desc}</p>
            <div className="text-lg font-bold text-red-600 mb-4">{symbol}{(place.price * rate).toFixed(2)} <span className="text-sm text-gray-500">/person</span></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DubaiLocations; 