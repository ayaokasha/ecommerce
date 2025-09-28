"use client";
import Loading from "@/app/loading";
import ProductCard from "@/app/_Components/productCard/ProductCard";
import { CategoryI } from "@/interfaces";
import { ProductI } from "@/interfaces/product";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function SingleBrand({ id }: { id: string }) {
  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState<CategoryI | null>(null);
  const [products, setProducts] = useState<ProductI[]>([]);

  async function getBrand() {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`
    );
    const res = await response.json();
    setBrand(res.data);
  }

  async function getProducts() {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    const res = await response.json();
    const allProducts: ProductI[] = res.data;
    const filtered = allProducts.filter((p) => p.brand._id === id);
    setProducts(filtered);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        await Promise.all([getBrand(), getProducts()]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <h1
              className="text-4xl text-center sm:text-6xl md:text-8xl mb-10 sm:mb-12 
                 tracking-tight leading-tight sm:leading-none 
                 bg-gradient-to-r from-amber-600 via-amber-700 to-gray-900 
                 dark:from-amber-200 dark:via-amber-100 dark:to-white 
                 bg-clip-text text-transparent font-thin"
            >
              {brand?.name}
            </h1>
            {products.length === 0 ? (
              <div className="min-h-[65vh] flex flex-col justify-center items-center text-center px-6">
                <h2 className="text-lg sm:text-2xl md:text-3xl font-light text-slate-600 dark:text-gray-300 mb-6">
                  No products found in this Brand.
                </h2>
                <Link
                  href="/brands"
                  className="inline-flex items-center gap-3 px-8 py-3 rounded-2xl 
             border border-black/30 dark:border-white/30 
             text-gray-900 dark:text-white font-medium tracking-wide uppercase text-sm sm:text-base
             hover:border-black/50 dark:hover:border-white/50 hover:bg-black/5 dark:hover:bg-white/5 
             transition-all duration-300 group"
                >
                  Back To Brands
                  <div className="w-5 sm:w-7 h-px bg-black dark:bg-white group-hover:w-7 sm:group-hover:w-9 transition-all duration-300"></div>
                </Link>
              </div>
            ) : (
              <div
                className="grid gap-6 sm:gap-8 lg:gap-10 
          grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-2 sm:px-4"
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
