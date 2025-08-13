import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const AdminNavbar = () => {
  const { isAdmin, logoutAdmin } = useContext(AppContext);
  const navigate = useNavigate();

  if (!isAdmin) return null;

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin");
  };

  return (
    <nav className="flex items-center justify-between py-4 bg-gray-900 text-white shadow-md mb-8 px-6">
      <div className="flex items-center gap-6">
        <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "font-bold underline" : ""}>Dashboard</NavLink>
        <NavLink to="/admin/users" className={({ isActive }) => isActive ? "font-bold underline" : ""}>Users</NavLink>
        <NavLink to="/admin/tours" className={({ isActive }) => isActive ? "font-bold underline" : ""}>Tours</NavLink>
        <NavLink to="/admin/orders" className={({ isActive }) => isActive ? "font-bold underline" : ""}>Orders</NavLink>
        <NavLink to="/admin/settings" className={({ isActive }) => isActive ? "font-bold underline" : ""}>Settings</NavLink>
      </div>
      <button onClick={handleLogout} className="button-31 ml-4 w-auto min-w-0 px-4 py-2">Logout</button>
    </nav>
  );
};

export default AdminNavbar; 