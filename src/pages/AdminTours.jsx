import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { useCurrency } from "../context/CurrencyContext";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const API_URL = "http://localhost:5000/api";
const SOCKET_URL = "http://localhost:5000";

const AdminTours = () => {
  const { trips: tours, setTrips: setTours, isAdmin } = useContext(AppContext);
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({ name: "", price: "" });
  const [deleteMode, setDeleteMode] = useState(false);
  const [selected, setSelected] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const { symbol, rate } = useCurrency();
  const [editId, setEditId] = useState(null);
  const [editPrice, setEditPrice] = useState("");
  const [priceModal, setPriceModal] = useState({ open: false, tour: null });
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [calendarPrice, setCalendarPrice] = useState("");
  const [loadingPrice, setLoadingPrice] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin");
    }
    // Real-time tour add/delete
    const socket = io(SOCKET_URL);
    socket.on("tripCreated", (tour) => {
      setTours((prev) => [...prev, tour]);
    });
    socket.on("tripDeleted", (id) => {
      setTours((prev) => prev.filter(t => t.id !== Number(id)));
    });
    socket.on("tripPriceUpdated", ({ id, price }) => {
      setTours((prev) => prev.map(t => t.id === Number(id) ? { ...t, price: Number(price) } : t));
    });
    // Initial fetch (in case not loaded)
    const fetchTours = async () => {
      const res = await axios.get(`${API_URL}/trips`);
      setTours(res.data);
    };
    fetchTours();
    return () => socket.disconnect();
  }, [isAdmin, navigate, setTours]);

  const handleAddTour = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/trips`, { ...addForm });
      setTours((prev) => [...prev, res.data]);
      setShowAddModal(false);
      setAddForm({ name: "", price: "" });
    } catch (err) {
      alert("Failed to add tour: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteTours = async () => {
    try {
      await Promise.all(selected.map(id => axios.delete(`${API_URL}/trips/${id}`)));
      setTours((prev) => prev.filter(t => !selected.includes(t.id)));
      setSelected([]);
      setDeleteMode(false);
      setShowConfirm(false);
    } catch (err) {
      alert("Failed to delete tours: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEditPrice = (id, price) => {
    setEditId(id);
    setEditPrice(price);
  };
  const handleUpdatePrice = async (id) => {
    try {
      await axios.patch(`${API_URL}/trips/${id}/price`, { price: editPrice });
      setEditId(null);
      setEditPrice("");
    } catch (err) {
      alert("Failed to update price: " + (err.response?.data?.message || err.message));
    }
  };

  const openPriceModal = async (tour) => {
    setPriceModal({ open: true, tour });
    setCalendarDate(new Date());
    setCalendarPrice("");
    setLoadingPrice(true);
    // Fetch price for today
    try {
      const res = await axios.get(`${API_URL}/trips/${tour.id}/price`, { params: { date: new Date().toISOString().slice(0,10) } });
      setCalendarPrice(res.data.price);
    } catch {
      setCalendarPrice(tour.price);
    }
    setLoadingPrice(false);
  };
  const handleCalendarChange = async (date) => {
    setCalendarDate(date);
    setLoadingPrice(true);
    try {
      const res = await axios.get(`${API_URL}/trips/${priceModal.tour.id}/price`, { params: { date: date.toISOString().slice(0,10) } });
      setCalendarPrice(res.data.price);
    } catch {
      setCalendarPrice(priceModal.tour.price);
    }
    setLoadingPrice(false);
  };
  const handleUpdateCalendarPrice = async () => {
    setLoadingPrice(true);
    try {
      await axios.patch(`${API_URL}/trips/${priceModal.tour.id}/price-by-date`, {
        date: calendarDate.toISOString().slice(0,10),
        price: calendarPrice
      });
      setPriceModal({ open: false, tour: null });
    } catch (err) {
      alert("Failed to update price: " + (err.response?.data?.message || err.message));
    }
    setLoadingPrice(false);
  };

  const toggleSelect = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-center">Tour Management</h1>
      <div className="flex gap-4 mb-6">
        {!deleteMode && (
          <button
            className="px-4 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-800"
            onClick={() => setShowAddModal(true)}
          >
            Add Tour
          </button>
        )}
        {!deleteMode && (
          <button
            className="px-4 py-2 bg-red-600 text-white rounded font-bold hover:bg-red-800"
            onClick={() => setDeleteMode(true)}
          >
            Remove Tour
          </button>
        )}
        {deleteMode && (
          <button
            className="px-4 py-2 bg-red-700 text-white rounded font-bold hover:bg-black"
            onClick={() => setShowConfirm(true)}
            disabled={selected.length === 0}
          >
            Delete Selected
          </button>
        )}
        {deleteMode && (
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded font-bold hover:bg-gray-600"
            onClick={() => { setDeleteMode(false); setSelected([]); }}
          >
            Cancel
          </button>
        )}
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr>
              {deleteMode && <th className="py-2 px-4">Select</th>}
              <th className="py-2 px-4">Tour Name</th>
              <th className="py-2 px-4">Price</th>
            </tr>
          </thead>
          <tbody>
            {tours.length === 0 ? (
              <tr>
                <td colSpan={deleteMode ? 3 : 2} className="text-center py-4">No tours found.</td>
              </tr>
            ) : (
              tours.map((tour) => (
                <tr key={tour.id}>
                  {deleteMode && (
                    <td className="py-2 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={selected.includes(tour.id)}
                        onChange={() => toggleSelect(tour.id)}
                      />
                    </td>
                  )}
                  <td className="py-2 px-4">{tour.name}</td>
                  <td className="py-2 px-4">
                    {symbol}{(tour.price * rate).toFixed(2)}
                    <button
                      className="ml-3 bg-blue-600 text-white px-2 py-1 rounded"
                      onClick={() => openPriceModal(tour)}
                    >Update Price</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Add Tour Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-2xl text-red-600 hover:text-black"
              onClick={() => setShowAddModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">Add Tour</h3>
            <form onSubmit={handleAddTour} className="space-y-4">
              <div>
                <label className="block text-md font-medium">Tour Name</label>
                <input
                  type="text"
                  value={addForm.name}
                  onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
              </div>
              <div>
                <label className="block text-md font-medium">Price</label>
                <input
                  type="number"
                  value={addForm.price}
                  onChange={e => setAddForm(f => ({ ...f, price: e.target.value }))}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-800"
              >
                Add Tour
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Confirm Delete Popup */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-2xl text-red-600 hover:text-black"
              onClick={() => setShowConfirm(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <div className="mb-6">Are you sure you want to permanently delete the selected tour(s)?</div>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-red-700 text-white rounded font-bold hover:bg-black"
                onClick={handleDeleteTours}
              >
                Yes, Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded font-bold hover:bg-gray-600"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Price Calendar Modal */}
      {priceModal.open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative flex flex-col md:flex-row gap-6">
            <button
              className="absolute top-2 right-2 text-2xl text-red-600 hover:text-black"
              onClick={() => setPriceModal({ open: false, tour: null })}
              aria-label="Close"
            >
              &times;
            </button>
            <div>
              <h3 className="text-xl font-bold mb-4">Update Price for {priceModal.tour.name}</h3>
              <Calendar
                onChange={handleCalendarChange}
                value={calendarDate}
                minDate={new Date()}
              />
            </div>
            <div className="flex flex-col gap-4 justify-center items-center w-full">
              <label className="block text-md font-medium">Selected Date</label>
              <div className="text-lg font-bold mb-2">{calendarDate.toISOString().slice(0,10)}</div>
              <label className="block text-md font-medium">Enter New Price</label>
              <input
                type="number"
                value={calendarPrice}
                onChange={e => setCalendarPrice(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
              <button
                className="w-full px-4 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-800 mt-2"
                onClick={handleUpdateCalendarPrice}
                disabled={loadingPrice}
              >{loadingPrice ? 'Updating...' : 'Update'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTours; 