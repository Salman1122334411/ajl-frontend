import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import tourImg01 from "../assets/t1.jpg";
import tourImg02 from "../assets/t2.jpg";
import tourImg03 from "../assets/t3.jpg";
import ImageCarousel from "../components/ImageCarousel";
import { motion, AnimatePresence } from "framer-motion";
import { useAdmin } from "../context/AdminContext";

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
    ],
    currency: "AED",
    duration: "4 hours",
    type: "Landmark, Observation Deck",
    reviewText: "No reviews yet"
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
    ],
    currency: "AED",
    duration: "6 hours",
    type: "Adventure, Safari",
    reviewText: "No reviews yet"
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
    ],
    currency: "AED",
    duration: "3 hours",
    type: "Cruise, Dinner",
    reviewText: "No reviews yet"
  },
];

const CheckoutDubai = () => {
  const location = useLocation();
  const { id } = useParams();
  let tour = location.state?.tour;
  if (!tour && id) {
    tour = dubaiPlaces.find((t) => t.id === id);
  }
  const tourName = tour?.title || tour?.name || "the Tour";

  // State for booking form and calendar
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const todayStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  let defaultTime = '09:00';
  if (now.getHours() >= 10) defaultTime = '10:00';
  if (now.getHours() >= 11) defaultTime = '09:00';

  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedTime, setSelectedTime] = useState(defaultTime);
  const [tickets, setTickets] = useState(1);
  // Use a unique localStorage key per tour
  const storageKey = `calendarPrices_dubai_${id}`;
  const [prices, setPrices] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : {};
  });
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(prices));
  }, [prices, storageKey]);

  const pricePerTicket = prices[selectedDate] || tour?.price || 199;
  const totalPrice = pricePerTicket * tickets;
  const { isAdmin } = useAdmin();

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-black w-full">
      <h1 className="text-4xl font-bold mb-6 text-left w-full max-w-6xl mt-10 px-4">Explore {tourName}</h1>
      {/* Image Carousel */}
      {tour?.images && (
        <div className="w-full max-w-6xl px-4 mb-8">
          <ImageCarousel images={tour.images} alt={tourName} className="h-[320px] md:h-[400px]" />
        </div>
      )}
      {/* Info Row */}
      <div className="w-full max-w-6xl flex flex-wrap justify-between items-center bg-gray-50 rounded-xl shadow p-6 mb-10 gap-6">
        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-500">Price</span>
          <span className="text-lg font-bold text-red-600">From {tour?.currency || "AED"}{tour?.price}</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-500">Duration</span>
          <span className="text-lg font-bold">{tour?.duration || "4 hours"}</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-500">Tour Type</span>
          <span className="text-lg font-bold">{tour?.type || "Adventure"}</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-500">Reviews</span>
          <span className="text-lg font-bold">{tour?.reviewText || "No reviews yet"}</span>
        </div>
      </div>
      {/* Two-column layout */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 mb-16 px-4">
        {/* Left: Overview/Details */}
        <div className="flex-1 bg-white rounded-xl p-8 shadow">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <h3 className="text-xl font-semibold mb-2">{tour?.title}</h3>
          <p className="mb-4 text-gray-700">{tour?.desc}</p>
          <h3 className="text-2xl font-bold mt-8 mb-4">Features:</h3>
          <ul className="pl-6 space-y-3 text-gray-700 list-disc">
            {tour?.features?.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>
        {/* Right: Book This Tour Box + Related Tours */}
        <div className="w-full md:w-[350px] flex flex-col gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-red-600">
            <h3 className="text-xl font-bold text-black mb-6 border-b-2 border-red-100 w-full pb-2 text-center">Book This Tour</h3>
            <form className="w-full flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">From:</label>
                <input type="date" className="w-full border rounded px-3 py-2" value={selectedDate} min={todayStr} onChange={e => setSelectedDate(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Time:</label>
                <div className="flex gap-4 items-center">
                  <label className="flex items-center gap-1">
                    <input type="radio" name="time" value="09:00" checked={selectedTime === '09:00'} onChange={e => setSelectedTime(e.target.value)} />
                    <span>9:00 am</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="radio" name="time" value="10:00" checked={selectedTime === '10:00'} onChange={e => setSelectedTime(e.target.value)} />
                    <span>10:00 am</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Tickets:</label>
                <div className="flex items-center gap-2">
                  <span>Adult (18+ years)</span>
                  <span className="font-bold text-gray-700">AED{pricePerTicket}</span>
                  <input type="number" min="1" value={tickets} onChange={e => setTickets(Number(e.target.value))} className="w-16 border rounded px-2 py-1" />
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-lg">Total:</span>
                <span className="font-bold text-red-600 text-2xl">AED{totalPrice}</span>
              </div>
              <button type="button" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl mt-4 transition">Book Now</button>
            </form>
          </div>
        </div>
      </div>
      <p className="text-lg mb-10">This is the checkout page. Add your payment and order details here.</p>
    </div>
  );
};

export default CheckoutDubai; 