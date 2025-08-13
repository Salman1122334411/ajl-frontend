import React, { useEffect, useRef, useState } from "react";

const ImageCarousel = ({ images, alt, className = "" }) => {
  const [index, setIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [images]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: carouselRef.current.offsetWidth * index,
        behavior: "smooth",
      });
    }
  }, [index]);

  if (!images || images.length === 0) return null;

  return (
    <div
      ref={carouselRef}
      className={`relative overflow-hidden rounded-lg flex justify-center ${className}`}
      style={{ minHeight: 0 }}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ width: `${images.length * 100}%` }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={alt}
            className="object-cover h-full flex-shrink-0"
            style={{ width: "100%", minWidth: 0, minHeight: 0 }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel; 