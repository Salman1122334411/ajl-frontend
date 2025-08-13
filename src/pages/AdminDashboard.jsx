import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { isAdmin, users, bookings, loading } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin, navigate, loading]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-2xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User Management Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">User Management</h2>
          <div className="text-lg">Total Users: {users.length}</div>
        </section>
        {/* Trip Management Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Trip Management</h2>
          {/* Trip creation and list will go here */}
        </section>
        {/* Stats Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
          <div className="text-lg">Total Bookings: {bookings.length}</div>
        </section>
        {/* Admin Settings Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Admin Settings</h2>
          {/* Change username/password functionality will go here */}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard; 