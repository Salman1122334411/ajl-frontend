import React from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

function PaymentSection({
  tourName,
  location,
  description,
  price,
  tickets,
  setTickets,
  totalPrice,
  currency,
  tour,
  date,
  time
}) {
  const navigate = useNavigate();
  const { setBooking } = useBooking();
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-red-600 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-center">{tourName}</h2>
      <p className="text-gray-600 mb-2 text-center">{location}</p>
      <p className="text-gray-700 mb-4 text-center">{description}</p>
      <div className="flex flex-col gap-2 w-full mb-4">
        <div className="flex justify-between">
          <span className="font-semibold">Price per ticket:</span>
          <span className="font-bold text-red-600">{currency}{price}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold">Tickets:</span>
          <input
            type="number"
            min="1"
            value={tickets}
            onChange={e => setTickets(Number(e.target.value))}
            className="w-16 border rounded px-2 py-1 text-center"
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-bold text-lg">Total:</span>
          <span className="font-bold text-red-600 text-2xl">{currency}{totalPrice}</span>
        </div>
      </div>
      <button
        type="button"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl mt-4 transition"
        onClick={() => {
          setBooking({ tour, tickets, date, time });
          navigate("/flexibility");
        }}
      >
        Pay
      </button>
    </div>
  );
}

export default PaymentSection; 