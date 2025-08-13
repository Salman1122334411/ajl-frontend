import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AppContext } from "../context/AppContext.jsx";
import { assets } from "../assets/assets.js";

const Navbar = () => {
  const { user, logout } = useContext(AppContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="w-full flex justify-between items-center py-2 px-2 sm:p-6 sm:px-20 top-0 sticky z-50 bg-white shadow-md border-b border-gray-200">
      <Link to="/">
        <img
          src="/logoTravel.png"
          className="w-[140px] sm:w-[180px] md:w-[200px]"
          alt="AJL Tours logo"
        />
      </Link>

      {/* Flex container for small screens */}
      <div className="flex items-center gap-4 sm:hidden">
        {user && (
          <div className="relative group">
            <img
              src={assets.user}
              alt="profileimg"
              className="w-10 drop-shadow"
            />
            {/* Tooltip with the user's name on hover */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 p-2 bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Hi,{user.name}
            </div>
          </div>
        )}

        {/* Hamburger icon for mobile */}
        <button onClick={toggleMenu} className="text-2xl">
          {menuOpen ? (
            <X className="text-black" />
          ) : (
            <Menu className="text-black" />
          )}
        </button>
      </div>

      {/* Menu for desktop */}
      <div className="hidden sm:flex items-center gap-6">
        <ul className="flex gap-6">
          <li>
            <Link
              to="/"
              className={`hover:text-red-600 ${
                location.pathname === "/" ? "text-red-600 font-bold" : "text-black"
              }`}
            >
              Home1
            </Link>
          </li>
          <li>
            <Link
              to="/home2"
              className={`hover:text-blue-600 ${
                location.pathname === "/home2" ? "text-blue-600 font-bold" : "text-black"
              }`}
            >
              Home2
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`hover:text-red-600 ${
                location.pathname === "/about" ? "text-red-600 font-bold" : "text-black"
              }`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/tours"
              className={`hover:text-red-600 ${
                location.pathname === "/tours" ? "text-red-600 font-bold" : "text-black"
              }`}
            >
              Tours
            </Link>
          </li>
          <li>
            <Link
              to="/checkout"
              className={`hover:text-red-600 ${
                location.pathname === "/checkout" ? "text-red-600 font-bold" : "text-black"
              }`}
            >
              Checkout
            </Link>
          </li>
        </ul>
        {user ? (
          <div className="flex items-center gap-4">
            <div className="relative group">
              <img src={assets.user} alt="profile" width={40} />
              {/* Tooltip for user name */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 p-2 bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Hi,{user.name}
              </div>
            </div>
            <button
              onClick={logout}
              className="button-31"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="button-31">
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden absolute top-16 left-0 w-full bg-white border-b border-red-100 p-4 shadow-lg z-50">
          <ul className="flex flex-col items-center gap-4">
            <li>
              <Link
                to="/"
                className={`hover:text-red-600 ${
                  location.pathname === "/" ? "text-red-600 font-bold" : "text-black"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Home1
              </Link>
            </li>
            <li>
              <Link
                to="/home2"
                className={`hover:text-blue-600 ${
                  location.pathname === "/home2"
                    ? "text-blue-600 font-bold"
                    : "text-black"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Home2
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`hover:text-red-600 ${
                  location.pathname === "/about"
                    ? "text-red-600 font-bold"
                    : "text-black"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/tours"
                className={`hover:text-red-600 ${
                  location.pathname === "/tours"
                    ? "text-red-600 font-bold"
                    : "text-black"
                }`}
                onClick={() => scrollTo(0, 0) && setMenuOpen(false)}
              >
                Tours
              </Link>
            </li>
            <li>
              <Link
                to="/checkout"
                className={`hover:text-red-600 ${
                  location.pathname === "/checkout"
                    ? "text-red-600 font-bold"
                    : "text-black"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Checkout
              </Link>
            </li>

            {user ? (
              <>
                <li>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="button-31"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="button-31">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
