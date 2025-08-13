import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import tourImg02 from "../assets/t2.jpg";
import tourImg03 from "../assets/t3.jpg";
import tourImg04 from "../assets/t4.jpg";
import tourImg05 from "../assets/t5.jpg";
import ImageCarousel from "../components/ImageCarousel";
import { motion, AnimatePresence } from "framer-motion";
import PaymentSection from "../components/PaymentSection";

const switzerlandTours = [
  { id: "01", name: "4 Country Tours", images: [tourImg02, tourImg03, tourImg04], price: 15000, duration: "12 hours", type: "Day Tour, Private Tour", reviews: [], currency: "CHF", reviewText: "No reviews yet" },
  { id: "02", name: "Grindelwald Tours", images: [tourImg03, tourImg04, tourImg05], price: 12000, duration: "10 hours", type: "Day Tour, Private Tour", reviews: [], currency: "CHF", reviewText: "No reviews yet" },
  { id: "03", name: "Crashlanding Tours", images: [tourImg02, tourImg03, tourImg04], price: 11000, duration: "8 hours", type: "Day Tour, Private Tour", reviews: [], currency: "CHF", reviewText: "No reviews yet" },
  { id: "04", name: "Lauterbrunnen & Interlaken", images: [tourImg03, tourImg04, tourImg05], price: 10000, duration: "9 hours", type: "Day Tour, Private Tour", reviews: [], currency: "CHF", reviewText: "No reviews yet" },
];

const itineraryData = [
  {
    title: "2 pickup location options:",
    locations: "Lucerne, Zürich",
    icon: (
      <svg className="inline-block mr-2 text-red-600" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21c-4.418 0-8-5.373-8-10a8 8 0 1116 0c0 4.627-3.582 10-8 10z" /><circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth={2} fill="white" /></svg>
    ),
    duration: null,
    isPickup: true,
  },
  {
    title: "Isetwald",
    icon: (
      <svg className="inline-block mr-2 text-red-600" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21c-4.418 0-8-5.373-8-10a8 8 0 1116 0c0 4.627-3.582 10-8 10z" /><circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth={2} fill="white" /></svg>
    ),
    duration: "Sightseeing (2.5 hours)",
  },
  {
    title: "Lauterbrunnen",
    icon: (
      <svg className="inline-block mr-2 text-red-600" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21c-4.418 0-8-5.373-8-10a8 8 0 1116 0c0 4.627-3.582 10-8 10z" /><circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth={2} fill="white" /></svg>
    ),
    duration: "Sightseeing (2 hours)",
  },
  {
    title: "Grindelwald",
    icon: (
      <svg className="inline-block mr-2 text-red-600" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21c-4.418 0-8-5.373-8-10a8 8 0 1116 0c0 4.627-3.582 10-8 10z" /><circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth={2} fill="white" /></svg>
    ),
    duration: "Sightseeing (1.5 hours)",
  },
];

function ItineraryAccordion() {
  const [open, setOpen] = useState(itineraryData.map(() => false));
  return (
    <div className="flex flex-col gap-6">
      {itineraryData.map((item, idx) => (
        <div key={idx}>
          <div
            className="flex items-center justify-between bg-gray-100 rounded px-6 py-4 cursor-pointer select-none"
            onClick={() => setOpen((prev) => prev.map((v, i) => (i === idx ? !v : v)))}
          >
            <span className={`font-bold ${item.isPickup ? 'text-red-700' : 'text-red-800'}`}>{item.icon}<span>{item.title}</span></span>
            <span className="text-gray-400">{open[idx] ? <>&#9650;</> : <>&#9660;</>}</span>
          </div>
          <AnimatePresence initial={false}>
            {open[idx] && (
              <motion.div
                key="content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-6 py-2 text-gray-700">
                  {item.isPickup && <div>{item.locations}</div>}
                  {item.duration && <div className="italic mt-2">{item.duration}</div>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

const Checkout = () => {
  const location = useLocation();
  const { id } = useParams();
  let tour = location.state?.tour;
  if (!tour && id) {
    tour = switzerlandTours.find((t) => t.id === id);
  }
  const tourName = tour?.title || tour?.name || "the Tour";

  // State for booking form and calendar
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const todayStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  // Choose next available time slot (9:00 or 10:00)
  let defaultTime = '09:00';
  if (now.getHours() >= 10) defaultTime = '10:00';
  if (now.getHours() >= 11) defaultTime = '09:00'; // fallback to 9:00 if past 10am

  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedTime, setSelectedTime] = useState(defaultTime);
  const [tickets, setTickets] = useState(1);
  const pricePerTicket = tour?.price || 199;
  const totalPrice = pricePerTicket * tickets;

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-black w-full">
      <h1 className="text-4xl font-bold mb-6 text-left w-full max-w-6xl mt-10 px-4">Explore {tourName}</h1>
      {/* Image Carousel */}
      {tour?.images && (
        <div className="w-full max-w-6xl px-4 mb-8">
          <ImageCarousel images={tour.images} alt={tourName} className="h-[320px] md:h-[400px]" />
        </div>
      )}
      {/* Info Row */}
      <div className="w-full max-w-6xl flex flex-wrap justify-between items-center bg-gray-50 rounded-xl shadow p-6 mb-10 gap-6">
        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-500">Price</span>
          <span className="text-lg font-bold text-red-600">From {tour?.currency || "CHF"}{tour?.price}</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-500">Duration</span>
          <span className="text-lg font-bold">{tour?.duration || "12 hours"}</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-500">Tour Type</span>
          <span className="text-lg font-bold">{tour?.type || "Day Tour, Private Tour"}</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-500">Reviews</span>
          <span className="text-lg font-bold">{tour?.reviewText || "No reviews yet"}</span>
        </div>
      </div>
      {/* Two-column layout */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 mb-16 px-4">
        {/* Left: Overview/Details */}
        <div className="flex-1 bg-white rounded-xl p-8 shadow">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <h3 className="text-xl font-semibold mb-2">Swiss Alps Tour from Lucerne – Explore Interlaken, Grindelwald, and Lauterbrunnen</h3>
          <h4 className="text-lg font-bold mb-2">Start Your Private Lucerne Tour in Comfort</h4>
          <p className="mb-4 text-gray-700">Your <b>Lucerne to Interlaken tour</b> begins with a hotel pickup in Lucerne. From the first moment, you'll enjoy the comfort of a premium, air-conditioned vehicle and the full attention of your private driver-guide.</p>
          <p className="mb-4 text-gray-700"><b>First</b>, you'll head to <b>Iseltwald</b>, a peaceful lakeside village made famous by the Korean drama <i>Crash Landing on You</i>. Walk along the wooden pier, enjoy the turquoise waters of Lake Brienz, and take in the calm, alpine atmosphere.</p>
          <h4 className="text-lg font-bold mb-2">Discover Lauterbrunnen – The Valley of 72 Waterfalls</h4>
          <p className="mb-4 text-gray-700"><b>Next</b>, your tour continues to the stunning <b>Lauterbrunnen Valley</b>. Surrounded by towering cliffs and home to the famous <b>Staubbach Falls</b>, it’s one of the most scenic places in Switzerland. <b>In addition</b>, you can take a short walk through the village or relax near the falls.</p>
          <h3 className="text-xl font-bold mt-8 mb-2">This stop on your Lucerne to Interlaken tour offers a perfect blend of dramatic nature and quiet Swiss charm.</h3>
          <p className="mb-4 text-gray-700">Explore Grindelwald – The Glacier Village</p>
          <p className="mb-4 text-gray-700">After Lauterbrunnen, your journey brings you to <b>Grindelwald</b>, a charming village nestled under the mighty Eiger. Whether you’re relaxing at a café or taking the cable car to the <b>First Cliff Walk</b> (optional), the panoramic views are unforgettable.</p>
          <h3 className="text-xl font-bold mb-2">Moreover, Grindelwald’s alpine charm adds depth and variety to your Lucerne day trip.</h3>
          <h4 className="text-lg font-bold mb-2">Wrap Up in Interlaken</h4>
          <p className="mb-4 text-gray-700">Your final destination is the popular resort town of <b>Interlaken</b>. Located between two beautiful lakes and surrounded by mountain peaks, it's the perfect place to end your <b>Lucerne to Interlaken tour</b>.</p>
          <p className="mb-4 text-gray-700">Enjoy some shopping, a walk through <b>Höhematte Park</b>, or a relaxing drink with a view. <b>Finally</b>, your driver will take you back to Lucerne in comfort.</p>
          <h3 className="text-2xl font-bold mt-8 mb-4">Highlights:</h3>
          <ul className="pl-6 space-y-3 text-gray-700 list-none">
            <li className="flex items-start"><span className="text-red-600 text-lg align-middle mr-2 mt-1">•</span><span>Visit <b>Iseltwald</b>, the stunning lakeside village featured in <i>Crash Landing on You</i>, and walk along its famous wooden pier</span></li>
            <li className="flex items-start"><span className="text-red-600 text-lg align-middle mr-2 mt-1">•</span><span>Discover <b>Lauterbrunnen Valley</b>, known for its 72 waterfalls and dramatic cliffside views</span></li>
            <li className="flex items-start"><span className="text-red-600 text-lg align-middle mr-2 mt-1">•</span><span>Explore <b>Grindelwald</b>, the “Glacier Village”, and enjoy optional activities like the <b>First Cliff Walk</b> or cable car ride</span></li>
            <li className="flex items-start"><span className="text-red-600 text-lg align-middle mr-2 mt-1">•</span><span>Stroll through <b>Interlaken</b>, nestled between Lake Thun and Lake Brienz, with beautiful views of the Jungfrau region</span></li>
          </ul>
          <hr className="my-8 border-gray-200" />
          <h2 className="text-2xl font-bold mb-4">Included/Excluded</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ul className="space-y-4">
              <li className="flex items-center gap-3 group">
                <span className="text-green-600">{/* Check SVG */}
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle"><polyline points="20 6 10 18 4 12" /></svg>
                </span>
                <span className="text-green-700 group-hover:font-semibold transition">Private tour</span>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="text-green-600">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle"><polyline points="20 6 10 18 4 12" /></svg>
                </span>
                <span className="text-green-700 group-hover:font-semibold transition">Round-trip transportation in a modern and comfortable car</span>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="text-green-600">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle"><polyline points="20 6 10 18 4 12" /></svg>
                </span>
                <span className="text-green-700 group-hover:font-semibold transition">Driver/guide</span>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="text-green-600">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle"><polyline points="20 6 10 18 4 12" /></svg>
                </span>
                <span className="text-green-700 group-hover:font-semibold transition">Customizable itinerary based on your preferences</span>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="text-green-600">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle"><polyline points="20 6 10 18 4 12" /></svg>
                </span>
                <span className="text-green-700 group-hover:font-semibold transition">Hotel pickup and drop-off</span>
              </li>
            </ul>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 group">
                <span className="text-red-500">{/* Cross SVG */}
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </span>
                <span className="text-red-600 group-hover:font-semibold transition">Food and drinks</span>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="text-red-500">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </span>
                <span className="text-red-600 group-hover:font-semibold transition">Entry tickets</span>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="text-red-500">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </span>
                <span className="text-red-600 group-hover:font-semibold transition">Additional activities</span>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="text-red-500">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </span>
                <span className="text-red-600 group-hover:font-semibold transition">Tips (optional)</span>
              </li>
            </ul>
          </div>

          {/* Itinerary Section */}
          <hr className="my-8 border-gray-200" />
          <h2 className="text-3xl font-bold mb-6 text-red-600">Itinerary</h2>
          <ItineraryAccordion />

          {/* Calendar & Prices Section */}
          <hr className="my-8 border-gray-200" />
          <h2 className="text-2xl font-bold mb-6">Calendar & Prices</h2>
          <CalendarPrices selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>
        {/* Right: Book This Tour Box + Related Tours */}
        <div className="w-full md:w-[350px] flex flex-col gap-8">
          <PaymentSection
            tour={tour}
            tourName={tourName}
            location={tour?.address || tour?.location || ""}
            description={tour?.desc || tour?.description || ""}
            price={pricePerTicket}
            tickets={tickets}
            setTickets={setTickets}
            totalPrice={totalPrice}
            currency={tour?.currency || "CHF"}
            date={selectedDate}
            time={selectedTime}
          />
          {/* Related Tours */}
          <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-4 mt-4">
            <h4 className="text-lg font-bold text-black mb-2">Related Tours</h4>
            <div className="flex flex-col gap-3">
              {/* Example related tours, replace with real data as needed */}
              <div className="flex items-center gap-3 border-b pb-2">
                <img src={tourImg03} alt="Interlaken" className="w-14 h-14 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold text-sm truncate">Interlaken: Scenic Day Tour</div>
                  <div className="text-red-600 font-bold text-base">CHF220</div>
                </div>
              </div>
              <div className="flex items-center gap-3 border-b pb-2">
                <img src={tourImg04} alt="Hidden Treasures" className="w-14 h-14 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold text-sm truncate">Hidden Treasures of Switzerland</div>
                  <div className="text-red-600 font-bold text-base">CHF199</div>
                </div>
              </div>
              <div className="flex items-center gap-3 border-b pb-2">
                <img src={tourImg05} alt="Paris & Swiss Alps" className="w-14 h-14 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold text-sm truncate">Paris & Swiss Alps Adventure</div>
                  <div className="text-red-600 font-bold text-base">CHF1600</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img src={tourImg02} alt="Zurich Full-day" className="w-14 h-14 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold text-sm truncate">From Zurich Full-day Tour</div>
                  <div className="text-red-600 font-bold text-base">CHF250</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-lg mb-10">This is the checkout page. Add your payment and order details here.</p>
    </div>
  );
};

// Update CalendarPrices to accept selectedDate and setSelectedDate as props
function CalendarPrices({ selectedDate, setSelectedDate }) {
  const [month, setMonth] = useState(6); // July (0-indexed)
  const [year, setYear] = useState(2025);
  const [selected, setSelected] = useState(() => {
    if (selectedDate) {
      const d = new Date(selectedDate);
      if (d.getFullYear() === 2025 && d.getMonth() === 6) return d.getDate();
    }
    return null;
  });
  useEffect(() => {
    if (selectedDate) {
      const d = new Date(selectedDate);
      if (d.getFullYear() === year && d.getMonth() === month) {
        setSelected(d.getDate());
      } else {
        setSelected(null);
      }
    }
  }, [selectedDate, month, year]);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const prices = "CHF199";

  // Get first day of the month (0=Sun, 1=Mon...)
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevMonthLastDay = new Date(year, month, 0);
  // Adjust for Monday as first day
  let startDay = firstDay.getDay() - 1;
  if (startDay < 0) startDay = 6;
  const daysInMonth = lastDay.getDate();
  const daysInPrevMonth = prevMonthLastDay.getDate();

  // Build calendar grid
  let calendar = [];
  let dayNum = 1;
  let nextMonthDay = 1;
  for (let week = 0; week < 6; week++) {
    let weekRow = [];
    for (let d = 0; d < 7; d++) {
      let cell = null;
      if (week === 0 && d < startDay) {
        // Previous month
        cell = { day: daysInPrevMonth - startDay + d + 1, prev: true };
      } else if (dayNum > daysInMonth) {
        // Next month
        cell = { day: nextMonthDay++, next: true };
      } else {
        // Current month
        cell = { day: dayNum++, current: true };
      }
      weekRow.push(cell);
    }
    calendar.push(weekRow);
    if (dayNum > daysInMonth && nextMonthDay > 7) break;
  }

  function prevMonth() {
    if (month === 0) {
      setMonth(11); setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
    setSelected(null);
  }
  function nextMonthFn() {
    if (month === 11) {
      setMonth(0); setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
    setSelected(null);
  }

  const today = new Date();

  return (
    <div className="w-full max-w-3xl">
      <div className="grid grid-cols-7 mb-2">
        {daysOfWeek.map((d) => (
          <div key={d} className="text-center py-2 font-semibold bg-gray-100 rounded-t-lg border-r last:border-r-0">{d}</div>
        ))}
      </div>
      <div className="flex">
        <button onClick={prevMonth} className="bg-red-700 text-white px-4 py-2 rounded-l-lg font-bold">&#60;</button>
        <div className="flex-1 bg-red-700 text-white text-center py-2 font-bold">{new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
        <button onClick={nextMonthFn} className="bg-red-700 text-white px-4 py-2 rounded-r-lg font-bold">&#62;</button>
      </div>
      <div className="grid grid-cols-7 border border-gray-200 rounded-b-lg overflow-hidden">
        {calendar.map((week, i) => (
          <React.Fragment key={i}>
            {week.map((cell, j) => {
              const isSelected = cell.current && cell.day === selected;
              // Disable previous dates
              let isDisabled = false;
              if (cell.current) {
                const cellDate = new Date(year, month, cell.day);
                isDisabled = cellDate < today.setHours(0,0,0,0);
              }
              return (
                <div
                  key={j}
                  className={`h-16 flex flex-col items-center justify-center border-r border-b border-gray-200 last:border-r-0 ${cell.current ? (isDisabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white cursor-pointer hover:bg-gray-50') : 'bg-gray-50 text-gray-400'} ${isSelected ? 'bg-blue-900 text-white font-bold' : ''}`}
                  onClick={() => {
                    if (cell.current && !isDisabled) {
                      setSelected(cell.day);
                      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(cell.day).padStart(2, '0')}`;
                      setSelectedDate(dateStr);
                    }
                  }}
                  style={isDisabled ? { pointerEvents: 'none' } : {}}
                >
                  <span className="text-base">{cell.day}</span>
                  {cell.current && <span className={`text-xs mt-1 font-bold ${isSelected ? 'text-white' : 'text-red-700'}`}>{prices}</span>}
                  {!cell.current && <span className="text-xs mt-1">{cell.prev || cell.next ? '' : ''}</span>}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Checkout; 