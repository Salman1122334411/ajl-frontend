import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-white border-t-2 border-red-500 shadow-inner mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <img src="/logoTravel.png" width={120} alt="AJL Tours logo" className="mb-4" />
          <p className="text-gray-600 text-sm">AJL Tours is your trusted partner for unforgettable travel experiences. Explore the world with us!</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-black">Quick Links</h3>
          <ul className="text-gray-600 text-sm space-y-1">
            <li><a href="/" className="hover:text-red-600">Home</a></li>
            <li><a href="/about" className="hover:text-red-600">About</a></li>
            <li><a href="/dubai" className="hover:text-red-600">Dubai Tours</a></li>
            <li><a href="/login" className="hover:text-red-600">Login</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-black">Contact Info</h3>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>Email: info@ajltours.com</li>
            <li>Phone: +1 234 567 890</li>
            <li>Address: 123 Main St, Dubai, UAE</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-black">Follow Us</h3>
          <div className="flex gap-3 mt-2">
            <img src={assets.facebook_icon} alt="fbimg" width={32} className="hover:scale-110 transition-transform" />
            <img src={assets.twitter_icon} alt="twitterimg" width={32} className="hover:scale-110 transition-transform" />
            <img src={assets.instagram_icon} alt="instaimg" width={32} className="hover:scale-110 transition-transform" />
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 text-xs py-4 border-t border-gray-200">
        &copy; 2024 AJL Tours. All Rights Reserved. | Powered by Innovation.
      </div>
    </footer>
  );
};

export default Footer;
