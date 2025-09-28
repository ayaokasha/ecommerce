"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { useState } from "react";

export default function ProductGallery({ product }: { product: any }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const allImages = [product.imageCover, ...(product.images || [])];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Main Carousel */}
      <div className="w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[550px] mb-4">
        <Swiper
          spaceBetween={10}
          navigation={{
            enabled: true,
          }}
          modules={[Navigation, Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          className="w-full rounded-xl overflow-hidden main-swiper"
          breakpoints={{
            320: {
              spaceBetween: 5,
            },
            640: {
              spaceBetween: 10,
            },
            768: {
              spaceBetween: 15,
            },
            1024: {
              spaceBetween: 20,
            },
          }}
        >
          {allImages.map((img: string, i: number) => (
            <SwiperSlide key={i} className="flex justify-center">
              <div className="relative w-full aspect-square">
                <Image
                  alt={`${product.title} - ${i}`}
                  fill
                  src={img}
                  className="object-contain rounded-xl"
                  sizes="(max-width: 640px) 350px, (max-width: 768px) 400px, (max-width: 1024px) 450px, (max-width: 1280px) 500px, 550px"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnail Carousel */}
      <div className="w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[550px]">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView={3}
          modules={[Thumbs]}
          watchSlidesProgress
          className="w-full overflow-hidden thumb-swiper"
          breakpoints={{
            320: {
              slidesPerView: 3,
              spaceBetween: 6,
            },
            480: {
              slidesPerView: 4,
              spaceBetween: 8,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 12,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 15,
            },
          }}
        >
          {allImages.map((img: string, i: number) => (
            <SwiperSlide key={i} className="flex justify-center">
              <div className="relative w-full aspect-square">
                <Image
                  alt={`thumb-${i}`}
                  fill
                  src={img}
                  className="object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  sizes="(max-width: 480px) 100px, (max-width: 640px) 90px, (max-width: 768px) 80px, (max-width: 1024px) 75px, 70px"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
