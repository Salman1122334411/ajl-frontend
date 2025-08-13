import React from "react";
import ServiceCard from "./ServiceCard";
import { Hotel, Plane, Pyramid } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: <Hotel className="text-red-600" />,
    title: "Flight Booking",
    desc: "Book flights to your desired destination with ease. Our platform offers competitive prices and convenient booking options.",
  },
  {
    icon: <Plane className="text-red-600" />,
    title: "Hotel Booking",
    desc: "Find and book the best hotels at your destination. From budget stays to luxury accommodations, we have something for every traveler.",
  },
  {
    icon: <Pyramid className="text-red-600" />,
    title: "Adventure Tours",
    desc: "Embark on thrilling adventure tours to some of the most exciting and unexplored destinations. Perfect for adrenaline junkies and nature lovers.",
  },
];

const ServiceList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15, duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <ServiceCard item={item} />
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceList;
