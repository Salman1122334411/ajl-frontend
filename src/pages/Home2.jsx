import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import tourImg01 from "../assets/t1.jpg";
import tourImg02 from "../assets/t2.jpg";
import tourImg03 from "../assets/t3.jpg";
import ImageCarousel from "../components/ImageCarousel";
import Button from "../components/Button";
import { useCurrency } from "../context/CurrencyContext";
import DubaiCardHome2 from "../components/DubaiCardHome2";
import SwitzerlandCardHome2 from "../components/SwitzerlandCardHome2";
import PopularDestinations from "../components/PopularDestinations";
import { Globe, Leaf, Mountain } from "lucide-react";

const Home2 = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      {/* Custom Home2 Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b bg-white">
        <div className="flex items-center gap-2">
          <img src="/logoTravel.png" alt="AJL Tours logo" className="w-36 h-auto" />
        </div>
        <ul className="hidden md:flex gap-8 text-lg font-semibold text-black">
          <li><Link to="/" className="hover:text-orange-600">Home1</Link></li>
          <li><Link to="#" className="hover:text-orange-600">Discover</Link></li>
          <li><Link to="#" className="hover:text-orange-600">Trips</Link></li>
          <li><Link to="#" className="hover:text-orange-600">Review</Link></li>
          <li><Link to="#" className="hover:text-orange-600">More</Link></li>
        </ul>
        <div className="flex items-center gap-4">
          <button className="text-lg font-semibold text-black flex items-center gap-1 px-3 py-1 rounded hover:bg-gray-100">
            <span className="hidden sm:inline">USD</span>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button className="bg-orange-600 hover:bg-black text-white font-bold px-6 py-2 rounded-full transition">Sign in</button>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-12 px-4">
        <h1 className="text-5xl font-extrabold text-black mb-8 mt-8 text-center">Where to?</h1>
        {/* Search Bar */}
        <div className="w-full max-w-2xl flex items-center bg-gray-100 rounded-full shadow px-4 py-2">
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-lg px-2 py-2 text-black"
            placeholder="Search Destination, Tour"
          />
          <button className="ml-2 bg-orange-600 hover:bg-black text-white font-bold px-8 py-2 rounded-full shadow transition">Search</button>
        </div>
      </section>
      {/* Experiences Section */}
      <section className="w-full flex flex-col md:flex-row items-center justify-center mt-8 mb-12">
        <div className="bg-orange-100 rounded-2xl flex flex-col md:flex-row w-full max-w-5xl mx-auto overflow-hidden shadow-lg">
          {/* Left: Image */}
          <div className="md:w-1/2 w-full flex items-center justify-center p-4">
            <div className="relative w-full h-64 md:h-80 flex items-end">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                alt="Experience"
                className="object-cover w-full h-full rounded-xl md:rounded-none md:rounded-l-2xl"
              />
              <span className="absolute bottom-4 left-4 bg-orange-500 text-black font-semibold px-4 py-2 rounded-full text-sm shadow">@adriansj88</span>
            </div>
          </div>
          {/* Right: Text */}
          <div className="md:w-1/2 w-full flex flex-col items-start justify-center p-8 text-left bg-orange-200 pl-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-2 leading-tight">Find things to do</h2>
            <h3 className="text-2xl font-bold text-black mb-4">Explore with us</h3>
            <p className="text-lg text-black mb-6">Browse all our Available tours</p>
            <button className="bg-black hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full text-lg transition self-start">Book now</button>
          </div>
        </div>
      </section>
      {/* Dubai and Switzerland Tours Section (reuse from Home1) */}
      <h2 className="text-5xl font-extrabold mb-8 text-center" style={{ marginTop: "140px" }}>
        <span className="text-black">Explore </span>
        <span className="text-orange-600">with us</span>
      </h2>
      <section className="flex flex-col sm:flex-row justify-center gap-8 my-12">
        <DubaiCardHome2 />
        <SwitzerlandCardHome2 />
      </section>
      {/* Special Offer, Testimonial, and Travel Benefit Section */}
      <section className="w-full mt-[150px]">
        {/* Special Offer Banner */}
        <div className="relative w-full max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-lg mb-16" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 p-10 flex flex-col items-start justify-center min-h-[320px]">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Get Special Offer</h2>
            <p className="text-white mb-4">Unlock a special offer and experience unique trips at your best price!</p>
            <button className="bg-orange-600 hover:bg-black text-white font-bold px-6 py-2 rounded-lg shadow mb-6">Booking Now</button>
            <div className="text-7xl font-extrabold text-white drop-shadow-lg">40% <span className="text-3xl align-top">Off</span></div>
          </div>
        </div>
        {/* Testimonial Section */}
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 mb-16">
          {/* Left: Client Info */}
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-orange-600 font-semibold mb-2">Explore Tour</span>
            <h3 className="text-2xl font-bold text-black mb-4">What Our Happy Client Say.</h3>
            <p className="text-gray-700 mb-4">Our clients rate our experienced service, expressing gratitude for the most exceptional experiences for their special trips.</p>
            <div className="flex items-center gap-2 mb-2">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="user1" className="w-8 h-8 rounded-full border-2 border-white -ml-2 first:ml-0" />
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="user2" className="w-8 h-8 rounded-full border-2 border-white -ml-2" />
              <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="user3" className="w-8 h-8 rounded-full border-2 border-white -ml-2" />
              <img src="https://randomuser.me/api/portraits/women/46.jpg" alt="user4" className="w-8 h-8 rounded-full border-2 border-white -ml-2" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 text-xl">★ 4.9</span>
              <span className="text-gray-500 text-sm">2.3k Client Reviews</span>
            </div>
          </div>
          {/* Right: Testimonial Card */}
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow p-8 max-w-md w-full border border-gray-100">
              <div className="text-4xl text-orange-600 mb-4 text-center">“</div>
              <p className="text-gray-700 text-lg mb-4 text-center">Booking with this travel agency was a game changer: their meticulous planning and personalized approach made our trip not just a vacation but a collection of unforgettable moments. From seamless logistics to hidden gems, they turned our travel dreams into a reality, earning our trust and loyalty.”</p>
              <div className="text-center font-bold text-black">TASHA STEWART</div>
            </div>
          </div>
        </div>
        {/* Travel Benefit Cards */}
        <div className="w-full max-w-6xl mx-auto">
          <h3 className="text-3xl font-extrabold text-black mb-10 text-center">Explore Exceptional Travel Benefit</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-start">
              <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="Brazil" className="w-full h-40 object-cover rounded-xl mb-4" />
              <h4 className="text-xl font-bold text-black mb-2">A Taste of Paradise: Exploring the Stunning Beaches of Brazil</h4>
              <span className="text-orange-600 font-semibold mb-1">Summer Trip</span>
              <p className="text-gray-700 text-sm mb-2">Discover the best beaches and vibrant culture of Brazil with our exclusive summer packages.</p>
              <span className="text-gray-500 text-xs">Emma Clark</span>
            </div>
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-start">
              <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80" alt="Solo Travel" className="w-full h-40 object-cover rounded-xl mb-4" />
              <h4 className="text-xl font-bold text-black mb-2">The Joys of Solo Travel: Emotional Independence and Discovery</h4>
              <span className="text-orange-600 font-semibold mb-1">Travel Experience</span>
              <p className="text-gray-700 text-sm mb-2">Embrace the freedom of solo travel and discover yourself on a journey of a lifetime.</p>
              <span className="text-gray-500 text-xs">Emma Clark</span>
            </div>
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-start">
              <img src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&q=80" alt="Sherwood Beach" className="w-full h-40 object-cover rounded-xl mb-4" />
              <h4 className="text-xl font-bold text-black mb-2">A Glorious Getaway at Sherwood Minamar Beach</h4>
              <span className="text-orange-600 font-semibold mb-1">Beach Holiday</span>
              <p className="text-gray-700 text-sm mb-2">Relax and unwind at the beautiful Sherwood Minamar Beach with our special holiday deals.</p>
              <span className="text-gray-500 text-xs">Emma Clark</span>
            </div>
          </div>
        </div>
      </section>
      {/* Adventure Travel Feature Section */}
      <section className="relative w-full py-20" style={{ background: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80") center/cover no-repeat' }}>
        {/* Wavy white overlay */}
        <div className="absolute inset-0 z-0">
          <svg viewBox="0 0 1440 320" className="w-full h-32" style={{ position: 'absolute', top: 0, left: 0 }}><path fill="#fff" fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,133.3C384,139,480,117,576,117.3C672,117,768,139,864,133.3C960,128,1056,96,1152,101.3C1248,107,1344,149,1392,170.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
          <div className="absolute top-24 left-0 w-full h-full bg-white rounded-t-3xl" style={{ zIndex: 1 }} />
          <svg viewBox="0 0 1440 320" className="w-full h-32" style={{ position: 'absolute', bottom: 0, left: 0 }}><path fill="#222" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,154.7C672,160,768,192,864,197.3C960,203,1056,181,1152,176C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between bg-transparent px-6 py-12">
          {/* Left: Heading */}
          <div className="flex-1 flex flex-col items-start mb-12 md:mb-0 md:mr-12">
            <div className="w-1 h-24 bg-orange-600 mb-4" />
            <div className="text-orange-600 font-semibold mb-2">TRAVEL YOUR WAY</div>
            <h2 className="text-4xl font-extrabold text-black leading-tight">Celebrating<br />40 Years of<br />Adventure Travel</h2>
          </div>
          {/* Right: Features */}
          <div className="flex-[2] grid grid-cols-1 sm:grid-cols-3 gap-10 w-full">
            {/* Trusted */}
            <div className="flex flex-col items-center text-center">
              <Mountain className="w-12 h-12 text-orange-600 mb-2" strokeWidth={2.2} />
              <div className="font-bold text-lg text-black mb-1">Trusted</div>
              <div className="text-gray-700 text-sm">40 years of operating; fully bonded and your money 100% protected.</div>
            </div>
            {/* Worldwide */}
            <div className="flex flex-col items-center text-center">
              <Globe className="w-12 h-12 text-orange-600 mb-2" strokeWidth={2.2} />
              <div className="font-bold text-lg text-black mb-1">Worldwide</div>
              <div className="text-gray-700 text-sm">400 Guided Group and Self-Guided adventures in 100 countries.</div>
            </div>
            {/* Sustainable */}
            <div className="flex flex-col items-center text-center">
              <Leaf className="w-12 h-12 text-orange-600 mb-2" strokeWidth={2.2} />
              <div className="font-bold text-lg text-black mb-1">Sustainable</div>
              <div className="text-gray-700 text-sm">100% carbon absorption. Caring for the environment and local communities.</div>
            </div>
          </div>
        </div>
      </section>
      <PopularDestinations />
    </div>
  );
};

export default Home2;

// Helper for price display
function TourPrice() {
  const { symbol, rate } = useCurrency();
  return (
    <div className="text-lg font-bold text-orange-600 mb-2">{symbol}{(15000 * rate).toFixed(2)} <span className="text-sm text-gray-500">/person</span></div>
  );
} 