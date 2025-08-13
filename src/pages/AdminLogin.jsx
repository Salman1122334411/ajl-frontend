import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin@@1212";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setError("");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-8 text-center">Admin Portal</h1>
      <form onSubmit={handleSubmit} className="bg-white/20 p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="mb-4">
          <label className="block text-md font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Enter admin username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-md font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Enter admin password"
          />
        </div>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button type="submit" className="w-full text-lg py-3 px-6 bg-red-600 hover:bg-red-700 font-bold rounded-lg shadow-md transition-colors">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin; 