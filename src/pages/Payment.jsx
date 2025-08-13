import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

const Flexibility = () => {
  const navigate = useNavigate();
  const { booking, updateFlexibility, updateTickets } = useBooking();
  const { tour, tickets = 1, date, time, flexibility } = booking || {};
  const [localTickets, setLocalTickets] = useState(tickets);
  const [localFlex, setLocalFlex] = useState(flexibility || "standard");
  const pricePerTicket = tour?.price || 35;
  const upgradePrice = Math.round(pricePerTicket * 1.225 * 100) / 100;
  const totalPrice = (localFlex === "standard" ? pricePerTicket : upgradePrice) * localTickets;

  if (!tour) {
    return <div className="text-center mt-20 text-xl text-red-600">No tour selected for payment. Please go back and try again.</div>;
  }

  const steps = ["Flexibility", "User Details", "Payment"];
  const currentStep = 1;

  // Sync local state with context on change
  const handleFlexChange = (val) => {
    setLocalFlex(val);
    updateFlexibility(val);
  };
  const handleTicketsChange = (val) => {
    setLocalTickets(val);
    updateTickets(val);
  };

  return (
    <div className="min-h-screen bg-neutral-100 py-8 px-2 flex flex-col items-center">
      {/* Step Progress Bar */}
      <div className="flex justify-center items-center gap-8 mb-8 w-full max-w-3xl mx-auto">
        {steps.map((step, idx) => (
          <div key={step} className="flex items-center gap-2 cursor-pointer" onClick={() => {
            if (idx === 0) navigate("/flexibility");
            if (idx === 1 && localFlex) navigate("/userDetails");
            if (idx === 2 && localFlex) navigate("/payment");
          }}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg border-2 ${idx + 1 === currentStep ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-blue-700 border-blue-700'}`}>{idx + 1}</div>
            <span className={`font-semibold ${idx + 1 === currentStep ? 'text-blue-700' : 'text-gray-500'}`}>{step}</span>
            {idx < steps.length - 1 && <div className="w-8 h-1 bg-blue-200 rounded-full" />}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto">
        {/* Left: Flexibility Options */}
        <div className="flex-1 bg-white rounded-xl shadow p-6 mb-8 md:mb-0">
          <div className="mb-4 flex items-center gap-4">
            {tour?.images && tour.images[0] && (
              <img src={tour.images[0]} alt={tour.title || tour.name} className="w-16 h-16 object-cover rounded" />
            )}
            <div>
              <div className="font-bold text-lg">{tour.title || tour.name}</div>
            </div>
          </div>
          <div className="mb-6">
            <label className="block mb-4 cursor-pointer border rounded-xl p-4 flex flex-col gap-2 transition-all duration-200 border-blue-500 bg-blue-50">
              <div className="flex items-center gap-2">
                <input type="radio" name="ticketOption" checked={localFlex === "standard"} onChange={() => handleFlexChange("standard")}/>
                <span className="font-bold">Standard ticket only</span>
              </div>
              <div className="flex flex-col gap-1 ml-6">
                <span className="text-green-700 flex items-center gap-1 text-sm">✓ Cancel until <b>24 hours</b> before activity starts to get <b>{tour.currency || "$"}{pricePerTicket.toFixed(2)}</b> back</span>
                <span className="text-green-700 flex items-center gap-1 text-sm">✓ Cancel for any reason, <span className="underline">no questions asked</span></span>
              </div>
              <div className="text-right font-bold text-lg mt-2">{tour.currency || "$"}{pricePerTicket.toFixed(2)}</div>
            </label>
            <label className="block cursor-pointer border rounded-xl p-4 flex flex-col gap-2 transition-all duration-200 mt-4 border-gray-300 bg-gray-50">
              <div className="flex items-center gap-2">
                <input type="radio" name="ticketOption" checked={localFlex === "upgrade"} onChange={() => handleFlexChange("upgrade")}/>
                <span className="font-bold">Ticket + Flexibility Upgrade</span>
              </div>
              <div className="flex flex-col gap-1 ml-6">
                <span className="text-green-700 flex items-center gap-1 text-sm">✓ Cancel until <b>1 hour</b> before activity starts to get <b>{tour.currency || "$"}{pricePerTicket.toFixed(2)}</b> back</span>
                <span className="text-green-700 flex items-center gap-1 text-sm">✓ Get the full price of <b className="whitespace-nowrap">{tour.currency || "$"}{upgradePrice.toFixed(2)}</b>&nbsp;back when cancelling until 24 hours before activity starts</span>
                <span className="text-green-700 flex items-center gap-1 text-sm">✓ Cancel for any reason, <span className="underline">no questions asked</span></span>
              </div>
              <div className="text-right font-bold text-lg mt-2">{tour.currency || "$"}{upgradePrice.toFixed(2)}</div>
            </label>
          </div>
          <div className="flex justify-between items-center mt-4 mb-2">
            <span className="font-semibold">Tickets:</span>
            <input
              type="number"
              min="1"
              value={localTickets}
              onChange={e => handleTicketsChange(Number(e.target.value))}
              className="w-16 border rounded px-2 py-1 text-center"
            />
          </div>
          <div className="flex justify-between items-center mt-2 font-bold text-lg">
            <span>Total</span>
            <span>{tour.currency || "$"}{totalPrice.toFixed(2)}</span>
          </div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl mt-4 transition"
            onClick={() => {
              if (localFlex) {
                updateFlexibility(localFlex);
                updateTickets(localTickets);
                navigate("/userDetails");
              }
            }}
          >
            Continue without upgrade
          </button>
        </div>

        {/* Right: Order Summary */}
        <div className="w-full md:w-[400px] bg-white rounded-xl shadow p-6 flex flex-col gap-4">
          <div className="flex items-center gap-4 mb-4">
            {tour?.images && tour.images[0] && (
              <img src={tour.images[0]} alt={tour.title || tour.name} className="w-16 h-16 object-cover rounded" />
            )}
            <div>
              <div className="font-bold text-lg">{tour.title || tour.name}</div>
              <div className="text-yellow-600 text-sm">★ 4.6 (1,268)</div>
            </div>
          </div>
          <div className="border-b pb-2 mb-2">
            <div className="text-sm">{tour.address || tour.location || ""}</div>
            <div className="text-sm">{date || "Date not selected"} • {time || "Time not selected"}</div>
            <div className="text-sm">{localTickets} adult{localTickets > 1 ? "s" : ""} (Age 13 - 99)</div>
            <button className="text-blue-600 underline text-xs mt-1">Change date or participants</button>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <span className="text-green-700">Free cancellation</span>
            <span className="text-green-700">Great value</span>
          </div>
          <div className="flex justify-between items-center mt-4 font-bold text-lg">
            <span>Total</span>
            <span>{tour.currency || "$"}{totalPrice.toFixed(2)}</span>
          </div>
          <div className="text-xs text-gray-500 text-right">All taxes and fees included</div>
        </div>
      </div>
    </div>
  );
};

export default Flexibility; 