import tourImg01 from "../t1.jpg";
import tourImg02 from "../t2.jpg";

const tours = [
  {
    id: "01",
    title: "Burj Khalifa Experience",
    city: "Dubai",
    distance: 0,
    price: 15000,
    maxGroupSize: 10,
    desc: "Experience the world's tallest building, Burj Khalifa, offering breathtaking views of Dubai's skyline from the observation deck.",
    availableDates: ["5-1-2025", "2-1-2025", "7-2-2025"],
    reviews: [
      {
        name: "Sarah Ahmed",
        rating: 4.8,
        comment: "Incredible experience! The view from the top is absolutely stunning."
      },
      {
        name: "Mohammed Ali",
        rating: 4.9,
        comment: "Must-visit destination in Dubai. Sunset view was magical!"
      }
    ],
    avgRating: 4.8,
    photo: tourImg01,
    featured: true,
  },
  {
    id: "switz-01",
    title: "4 Country Tours",
    city: "Switzerland",
    distance: 0,
    price: 15000,
    maxGroupSize: 10,
    desc: "A grand tour across Switzerland, Austria, Germany, and Liechtenstein. Visit castles, lakes, and enjoy scenic drives through four beautiful countries.",
    availableDates: ["10-6-2025", "15-7-2025", "20-8-2025"],
    reviews: [
      {
        name: "Anna Müller",
        rating: 4.9,
        comment: "Absolutely breathtaking! The best way to see so many countries in one trip."
      },
      {
        name: "Luca Rossi",
        rating: 4.8,
        comment: "Loved every stop, especially the castles and lakes."
      }
    ],
    avgRating: 4.85,
    photo: tourImg02,
    featured: true,
  }
];

export default tours;
