import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Tour from "./pages/Tour";
import TourDetails from "./pages/TourDetails";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Booking from "./pages/Booking";
import Invoice from "./pages/Invoice";
import About from "./pages/About";
import Locations from "./pages/Locations";
import DubaiLocations from "./pages/DubaiLocations";
import DubaiTourDetails from "./pages/DubaiTourDetails";
import Preloader from "./components/Preloader";
import SwitzerlandLocations from "./pages/SwitzerlandLocations";
import SwitzerlandTourDetails from "./pages/SwitzerlandTourDetails";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminTrips from "./pages/AdminTrips";
import AdminOrders from "./pages/AdminOrders";
import AdminSettings from "./pages/AdminSettings";
import AdminNavbar from "./components/AdminNavbar";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import CurrencySelector from "./components/CurrencySelector";
import Home2 from "./pages/Home2";
import Checkout from "./pages/Checkout";
import CheckoutDubai from "./pages/CheckoutDubai";
import Payment from "./pages/Payment";
import Contact from "./pages/Contact";
import Flexibility from "./pages/Payment";
import UserDetails from "./pages/Contact";

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { isAdmin } = useContext(AppContext);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CurrencyProvider>
      {loading && <Preloader />}
      {!loading && (
        <div className="flex flex-col min-h-screen px-4 sm:px-8 md:px-10 lg:px-22 bg-neutral-100">
          <ToastContainer theme="dark" position="bottom-right" autoClose={1000} />
          {location.pathname.startsWith("/admin") && isAdmin
            ? <AdminNavbar />
            : (location.pathname !== "/home2" && <Navbar />)}
          {location.pathname !== "/home2" && <CurrencySelector />}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tours" element={<Tour />} />
              <Route path="/about" element={<About />} />
              <Route path="/tours/:id" element={<TourDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/dubai" element={<DubaiLocations />} />
              <Route path="/dubai/:id" element={<DubaiTourDetails />} />
              <Route path="/dubai/:id/checkout-dubai" element={<CheckoutDubai />} />
              <Route path="/switzerland" element={<SwitzerlandLocations />} />
              <Route path="/switzerland/:id" element={<SwitzerlandTourDetails />} />
              <Route path="/switzerland/:id/checkout-sw" element={<Checkout />} />
              <Route path="/home2" element={<Home2 />} />
              <Route path="/flexibility" element={<Flexibility />} />
              <Route path="/userDetails" element={<UserDetails />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/trips" element={<AdminTrips />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </CurrencyProvider>
  );
};

export default App;
