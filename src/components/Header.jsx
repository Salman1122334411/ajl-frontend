import React, { useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import { motion, useInView, useAnimation, useScroll, useTransform } from "framer-motion";

const Header = ({ malaysiaPopupOpen }) => {
  const imgRef = useRef(null);
  const inView = useInView(imgRef, { amount: 0.3, triggerOnce: false });
  const controls = useAnimation();

  // Scroll-based animation
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  // Fade out and scale up as you scroll past
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);

  useEffect(() => {
    if (!malaysiaPopupOpen && inView) {
      controls.start({ opacity: 1, x: 0, scale: 1.1, transition: { duration: 1 } });
    } else {
      controls.start({ opacity: 0, x: -80, scale: 0.95, transition: { duration: 1 } });
    }
  }, [inView, controls, malaysiaPopupOpen]);

  return (
    <>
      <motion.div
        className="flex flex-col items-center text-center my-20"
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <motion.h1
          className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-5 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
        >
          Welcome to <span className="text-red-600">AJL Tours</span>
        </motion.h1>

        <motion.p
          className="text-center text-md sm:text-xl mx-auto mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Your ultimate travel companion!
        </motion.p>

        <motion.p
          className="text-center text-md sm:text-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Discover exciting destinations, exclusive deals, and seamless booking
          experience.
        </motion.p>

        <motion.img
          ref={imgRef}
          src={assets.headerimg}
          alt="earth"
          className="w-[200px] sm:w-[300px] lg:w-[450px] mt-10"
          initial={{ opacity: 0, x: -80, scale: 0.95 }}
          animate={controls}
          style={{ opacity, scale }}
        />
      </motion.div>
    </>
  );
};

export default Header;
