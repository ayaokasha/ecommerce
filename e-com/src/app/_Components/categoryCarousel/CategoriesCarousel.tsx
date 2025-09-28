"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useEffect, useState } from "react";
import { CategoryI } from "@/interfaces";

export default function CategoriesCarousel({
  categories,
}: {
  categories: CategoryI[];
}) {
  const [validCategories, setValidCategories] = useState<CategoryI[]>([]);

  useEffect(() => {
    // optional: validate categories
    const filtered = categories.filter((cat) => cat.image && cat.name);
    setValidCategories(filtered);
  }, [categories]);

  return (
    <section className="py-16 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          Explore Categories
        </h2>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
        >
          {validCategories.map((cat) => (
            <SwiperSlide key={cat._id}>
              <a
                href={`/category/${encodeURIComponent(cat.slug)}`}
                className="group block rounded-3xl overflow-hidden border border-gray-200 bg-white/60 backdrop-blur-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
                aria-label={`Open ${cat.name} category`}
              >
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-purple-600 transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
