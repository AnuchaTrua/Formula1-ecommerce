// import { useEffect, useState } from "react";
// import axios from "axios";
// import ProductCard from "../components/ProductCard";

// const Home = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/products")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="mb-4 text-2xl font-bold">Products</h1>
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
//         {products.map((product) => (
//           <ProductCard key={product._id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;


import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const bannerImages = [
  "https://cdn-3.motorsport.com/images/mgl/2M0yqAmY/s8/f1-bahrain-gp-2023-lando-norri.webp",
  "https://cdn-3.motorsport.com/images/mgl/2Mmj48Q0/s8/f1-british-gp-2023-max-verstapp.webp",
  "https://cdn-7.motorsport.com/images/mgl/Y9gAAG10/s8/f1-austrian-gp-2023-charles-lec.webp"
];

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* ✅ Swiper Banner */}
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-[400px]"
      >
        {bannerImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={img}
                alt={`Banner ${index}`}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 🛍️ สินค้าแนะนำ */}
      <div className="p-4">
        <h2 className="mb-4 text-2xl font-bold text-center">สินค้าแนะนำ</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* 🔗 ปุ่ม View All */}
        <div className="mt-8 text-center">
          <Link
            to="/products"
            className="inline-block px-6 py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
          >
            ดูสินค้าทั้งหมด
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
