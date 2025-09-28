"use client";

import HeartIcon from "@/icons/hearticon";
import StarIcon from "@/icons/starIcon";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddToCart from "../addToCart/AddToCart";
import AddToWishlist from "../addToWishlist/addToWushlist";
import { ProductI } from "@/interfaces";
import { formatCurrency } from "@/app/helpers/formatPrice";

export default function ProductCard({ product }: { product: ProductI }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700
                 flex flex-col justify-between"
    >
      {/* Image Container */}
      <div className="relative w-full">
        <Link href={"/products/" + product.id}>
          <Image
            alt={product.title}
            width={400}
            height={400}
            src={product.imageCover}
            className="w-full object-cover h-[200px] sm:h-[220px] md:h-[240px] lg:h-[200px] transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Wishlist Heart Icon */}
        <div className="absolute top-3 right-3 z-10">
          <AddToWishlist productId={product.id} />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3 sm:p-4 flex flex-col justify-between space-y-2">
        {/* Product Info */}
        <div className="space-y-1">
          <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide font-medium">
            {product.brand.name}
          </p>
          <Link href={"/products/" + product.id}>
            <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white line-clamp-2 leading-tight">
              {product.title}
            </h3>
          </Link>
          <p className="text-xs sm:text-sm text-gray-500">
            {product.category.name}
          </p>

          {/* Rating Stars */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                star={star}
                rating={product.ratingsAverage}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">
              ({product.ratingsAverage})
            </span>
          </div>
        </div>

        {/* Price and Cart Section */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 pt-2">
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(product.price)}
            </span>
            <span className="text-xs sm:text-sm text-gray-400 line-through">
              {formatCurrency(Number((product.price * 1.1).toFixed(2)))}
            </span>
          </div>

          <AddToCart productId={product.id} />
        </div>
      </div>
    </div>
  );
}
