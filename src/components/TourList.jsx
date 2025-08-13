import React from "react";
import { motion } from "framer-motion";
import tourData from "../assets/data/tour.js";
import TourCard from "../components/TourCard.jsx";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const TourList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 h-full justify-center items-stretch w-full max-w-5xl mx-auto">
      {tourData.map((tour, index) => (
        <motion.div
          key={index}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: index * 0.2 }}
          className="h-full min-w-[320px] max-w-[420px] w-full flex"
        >
          <TourCard tour={tour} />
        </motion.div>
      ))}
    </div>
  );
};

export default TourList;
