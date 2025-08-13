import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow, Navigation } from "swiper/modules";

const destinations = [
  {
    name: "Nepal",
    listings: 22,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Thailand",
    listings: 18,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Maldives",
    listings: 30,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Dubai",
    listings: 15,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Switzerland",
    listings: 12,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
];

const PopularDestinations = () => {
  return (
    <section className="w-full max-w-6xl mx-auto py-20">
      <div className="text-center mb-12">
        <div className="text-lg text-orange-600 font-semibold mb-2">Top Destination</div>
        <h2 className="text-4xl font-extrabold text-black">Popular Destination</h2>
      </div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 2.5,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Navigation]}
        className="w-full px-4"
        style={{ paddingBottom: "60px" }}
      >
        {destinations.map((dest, idx) => (
          <SwiperSlide
            key={dest.name}
            className="flex flex-col items-center justify-end bg-white rounded-3xl shadow-lg overflow-hidden relative"
            style={{ width: 320, height: 420 }}
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="absolute inset-0 w-full h-full object-cover z-0"
              style={{ filter: "brightness(0.85)" }}
            />
            <div className="absolute inset-0 bg-black/10 z-10" />
            <div className="relative z-20 flex flex-col justify-end h-full w-full p-6">
              <div className="mb-4">
                <button className="bg-white/80 text-black px-4 py-2 rounded-full font-semibold text-sm shadow">DRAG</button>
              </div>
              <div className="mt-auto">
                <div className="text-white text-xl font-bold mb-1">{dest.name}</div>
                <div className="text-white text-sm mb-4">{dest.listings} Listing</div>
                <button className="bg-white/90 text-black font-bold px-6 py-2 rounded-full text-sm shadow hover:bg-orange-600 hover:text-white transition">View All</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PopularDestinations; 