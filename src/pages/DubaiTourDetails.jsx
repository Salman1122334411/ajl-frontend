import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import tourImg01 from "../assets/t1.jpg";
import tourImg02 from "../assets/t2.jpg";
import tourImg03 from "../assets/t3.jpg";
import Button from "../components/Button";
import FeaturesSection from "../components/FeaturesSection";
import ImageCarousel from "../components/ImageCarousel";
import { useCurrency } from "../context/CurrencyContext";

const dubaiPlaces = [
  {
    id: "01",
    title: "Burj Khalifa Experience",
    desc: "Experience the world's tallest building and breathtaking views of Dubai's skyline.",
    images: [tourImg01, tourImg02, tourImg03],
    price: 15000,
    address: "1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai, Dubai, UAE",
    features: [
      "Observation Deck Access",
      "Fast Track Entry",
      "Panoramic City Views",
      "Multilingual Guide",
      "Souvenir Photo"
    ]
  },
  {
    id: "02",
    title: "Desert Safari Adventure",
    desc: "Dune bashing, camel riding, and a traditional Bedouin camp under the stars.",
    images: [tourImg01, tourImg02, tourImg03],
    price: 12000,
    address: "Dubai Desert Conservation Reserve, Dubai, UAE",
    features: [
      "Dune Bashing",
      "Camel Ride",
      "BBQ Dinner",
      "Live Entertainment",
      "Sandboarding"
    ]
  },
  {
    id: "03",
    title: "Dubai Marina Cruise",
    desc: "Luxurious dinner cruise through Dubai Marina with spectacular views.",
    images: [tourImg01, tourImg02, tourImg03],
    price: 8000,
    address: "Dubai Marina Walk, Dubai, UAE",
    features: [
      "Dinner Buffet",
      "Live Music",
      "City Skyline Views",
      "Welcome Drinks",
      "Upper Deck Seating"
    ]
  },
];

const DubaiTourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const place = dubaiPlaces.find((p) => p.id === id);
  const { symbol, rate } = useCurrency();

  if (!place) {
    return <div className="text-center mt-20 text-xl text-red-600">Tour not found.</div>;
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-16">
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full">
        <div className="pt-2.5 px-2.5 bg-white rounded-t-xl">
          <ImageCarousel images={place.images} alt={place.title} className="rounded-t-xl" />
        </div>
        <div className="p-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-2 text-black">{place.title}</h1>
          <div className="text-lg font-bold text-red-600 mb-2">{symbol}{(place.price * rate).toFixed(2)} <span className="text-sm text-gray-500">/person</span></div>
          <p className="text-gray-700 text-center mb-4">{place.desc}</p>
          <FeaturesSection address={place.address} features={place.features} />
          <Button onClick={() => navigate("/booking", { state: { tour: { id: place.id, title: place.title, price: place.price } } })}>
            Proceed to Booking
          </Button>
          <Button
            onClick={() => navigate(`/dubai/${place.id}/checkout-dubai`, { state: { tour: place } })}
            className="mt-4 bg-black text-white"
          >
            Go to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DubaiTourDetails; 