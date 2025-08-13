import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

export const AppContext = createContext();

const API_URL = "http://localhost:5000/api";
const SOCKET_URL = "http://localhost:5000";

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // Array of user objects
  const [bookings, setBookings] = useState([]); // Array of booking objects
  const [user, setUser] = useState(null); // Current logged-in user
  const [isAdmin, setIsAdmin] = useState(false);
  const [trips, setTrips] = useState([]); // Array of trip objects
  const [adminUsername, setAdminUsername] = useState("admin");
  const [adminPassword, setAdminPassword] = useState("admin@@1212");
  const [loading, setLoading] = useState(true);

  // Fetch users and bookings from backend
  useEffect(() => {
    const fetchData = async () => {
      const usersRes = await axios.get(`${API_URL}/users`);
      setUsers(usersRes.data);
      const bookingsRes = await axios.get(`${API_URL}/bookings`);
      setBookings(bookingsRes.data);
    };
    fetchData();
    // Real-time updates
    const socket = io(SOCKET_URL);
    socket.on("userCreated", (newUser) => {
      setUsers((prev) => [...prev, newUser]);
    });
    socket.on("bookingCreated", (newBooking) => {
      setBookings((prev) => [...prev, newBooking]);
    });
    return () => socket.disconnect();
  }, []);

  // Register a new user
  const addUser = async (newUser) => {
    const res = await axios.post(`${API_URL}/users`, newUser);
    setUsers((prev) => [...prev, res.data]);
    setUser(res.data);
  };

  // Login user
  const loginUser = (email, password) => {
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  // Logout
  const logout = () => {
    setUser(null);
    navigate("/");
  };

  // Add a booking
  const addBooking = async (booking) => {
    const res = await axios.post(`${API_URL}/bookings`, booking);
    setBookings((prev) => [...prev, res.data]);
  };

  // Get all bookings for current user
  const getBookings = () => {
    if (!user) return [];
    return bookings.filter((b) => b.email === user.email);
  };

  // Initialize isAdmin from localStorage
  useEffect(() => {
    const adminFlag = localStorage.getItem("isAdmin");
    if (adminFlag === "true") {
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  // Admin login
  const loginAdmin = (username, password) => {
    if (username === adminUsername && password === adminPassword) {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");
      return true;
    }
    return false;
  };

  // Change admin credentials
  const changeAdminCredentials = (username, password) => {
    setAdminUsername(username);
    setAdminPassword(password);
  };

  // Admin logout
  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
    navigate("/admin");
  };

  // Trip management (still local for now)
  const addTrip = (trip) => {
    setTrips((prev) => [...prev, trip]);
  };
  const deleteTrip = (id) => {
    setTrips((prev) => prev.filter((t) => t.id !== id));
  };

  const value = {
    user,
    users,
    bookings,
    setUser,
    addUser,
    loginUser,
    logout,
    addBooking,
    getBookings,
    isAdmin,
    loginAdmin,
    logoutAdmin,
    adminUsername,
    adminPassword,
    changeAdminCredentials,
    trips,
    addTrip,
    deleteTrip,
    setUsers,
    setBookings,
    loading,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
