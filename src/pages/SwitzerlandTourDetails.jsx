import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import tourImg02 from "../assets/t2.jpg";
import tourImg03 from "../assets/t3.jpg";
import tourImg04 from "../assets/t4.jpg";
import tourImg05 from "../assets/t5.jpg";
import Button from "../components/Button";
import FeaturesSection from "../components/FeaturesSection";
import ImageCarousel from "../components/ImageCarousel";
import { useCurrency } from "../context/CurrencyContext";

const switzerlandTours = [
  {
    id: "01",
    name: "4 Country Tours",
    images: [tourImg02, tourImg03, tourImg04],
    price: 15000,
    address: "Zurich Main Station, Zurich, Switzerland",
    features: [
      "Meersburg Castle Visit",
      "Lindau Island Tour",
      "Bregenz Lake Promenade",
      "Vaduz Castle Viewpoint",
      "Multilingual Guide"
    ]
  },
  {
    id: "02",
    name: "Grindelwald Tours",
    images: [tourImg03, tourImg04, tourImg05],
    price: 12000,
    address: "Grindelwald Terminal, Grindelwald, Switzerland",
    features: [
      "Alpine Train Ride",
      "Mountain Hikes",
      "Village Walks",
      "Cable Car Experience",
      "Local Cuisine Tasting"
    ]
  },
  {
    id: "03",
    name: "Crashlanding Tours",
    images: [tourImg02, tourImg03, tourImg04],
    price: 11000,
    address: "Iseltwald Pier, Iseltwald, Switzerland",
    features: [
      "Iseltwald Photo Stop",
      "Sigriswil Panorama Bridge",
      "Interlaken Adventure Sports",
      "Lake Brienz Cruise",
      "Filming Location Tour"
    ]
  },
  {
    id: "04",
    name: "Lauterbrunnen & Interlaken",
    images: [tourImg03, tourImg04, tourImg05],
    price: 10000,
    address: "Lauterbrunnen Station, Lauterbrunnen, Switzerland",
    features: [
      "Staubbach Falls Visit",
      "Valley Walks",
      "Paragliding Experience",
      "Interlaken Lake Views",
      "Adventure Sports"
    ]
  }
];

const locationPin = (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block text-red-600 align-middle mx-1">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21c-4.418 0-8-5.373-8-10a8 8 0 1116 0c0 4.627-3.582 10-8 10z" />
    <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth={2} fill="white" />
  </svg>
);

const SwitzerlandTourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tour = switzerlandTours.find((t) => t.id === id);
  const { symbol, rate } = useCurrency();

  if (!tour) {
    return <div className="text-center mt-20 text-xl text-red-600">Tour not found.</div>;
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-16">
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full">
        <div className="pt-2.5 px-2.5 bg-white rounded-t-xl">
          <ImageCarousel images={tour.images} alt={tour.name} className="rounded-t-xl" />
        </div>
        <div className="p-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-2 text-black">{tour.name}</h1>
          <div className="text-lg font-bold text-red-600 mb-2">{symbol}{(tour.price * rate).toFixed(2)} <span className="text-sm text-gray-500">/person</span></div>
          <p className="text-gray-700 text-center mb-4">{tour.desc}</p>
          {tour.id === "01" ? (
            <div className="w-full flex flex-col md:flex-row gap-8 items-start justify-center mb-6">
              {/* Left: Tour Route */}
              <div className="flex-1 flex flex-col items-center md:items-start">
                <h2 className="text-xl font-bold text-black mb-4">Tour Route</h2>
                <div className="flex flex-col items-start justify-center w-full relative">
                  {["Zurich","Meersburg","Lindau","Bregenz","Vaduz","Zurich"].map((city, idx, arr) => (
                    <div key={city + idx} className="flex items-start">
                      <div className="flex flex-col items-center">
                        {locationPin}
                        {idx !== arr.length - 1 && <div className="w-1 h-6 bg-gray-300" />}
                      </div>
                      <span className="ml-3 text-base font-semibold text-gray-800 mt-1">{city}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right: Features */}
              <div className="flex-1 w-full mt-8 md:mt-0">
                <h2 className="text-xl font-semibold mb-2 text-black">Features We Offer</h2>
                <ul className="list-disc list-inside text-gray-700 mb-2">
                  {tour.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <FeaturesSection address={tour.address} features={tour.features} />
          )}
          <Button
            onClick={() => navigate("/booking", { state: { tour: { id: tour.id, title: tour.name, price: tour.price } } })}
          >
            Proceed to Booking
          </Button>
          <Button
            onClick={() => navigate(`/switzerland/${tour.id}/checkout-sw`, { state: { tour } })}
            className="mt-4 bg-black text-white"
          >
            Go to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SwitzerlandTourDetails; 