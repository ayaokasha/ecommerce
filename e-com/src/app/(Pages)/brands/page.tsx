"use client";
import Loading from "@/app/loading";
import { CategoryI } from "@/interfaces";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Brands() {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<CategoryI[]>([]);

  async function getBrands() {
    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      const res = await response.json();
      setBrands(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div>
              <h1 className="text-4xl  text-center sm:text-6xl md:text-8xl mb-6 sm:mb-8 tracking-tight leading-tight sm:leading-none block bg-gradient-to-r from-amber-600 via-amber-700 to-gray-900 dark:from-amber-200 dark:via-amber-100 dark:to-white bg-clip-text text-transparent font-thin">
                Brands
              </h1>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
              {brands.length > 0 ? (
                brands.map((brand) => (
                  <Link
                    key={brand._id}
                    href={`/brand/${brand._id}`} // dynamic route
                    className="group block rounded-3xl overflow-hidden border border-gray-200 bg-white/60 backdrop-blur-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
                  >
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                      <img
                        src={brand.image}
                        alt={brand.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-semibold text-lg md:text-xl text-white drop-shadow-lg">
                        {brand.name}
                      </h3>
                      <p className="text-xs text-gray-200 mt-1 truncate">
                        {brand.slug}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="min-h-screen text-center">
                  <h1 className="text-3xl">No Brands available.</h1>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
