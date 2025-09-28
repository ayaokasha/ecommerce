import AddToCart from "@/app/_Components/addToCart/AddToCart";
import AddToWishlist from "@/app/_Components/addToWishlist/addToWushlist";
import ProductGallery from "@/app/_Components/productGallery/ProductGallery";
import HeartIcon from "@/icons/hearticon";
import StarIcon from "@/icons/starIcon";
import { ProductI } from "@/interfaces/product";
import { Params } from "next/dist/server/request/params";
import Link from "next/link";
import React from "react";

export default async function ProudctDetailes({ params }: { params: Params }) {
  let { productId } = await params;

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products/" + productId
  );
  const { data: product }: { data: ProductI } = await response.json();

  console.log(product);

  return (
    <>
      <div
        key={product.id}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start overflow-x-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Image Container */}
        <div className="flex flex-col items-center justify-center w-full">
          <ProductGallery product={product} />
        </div>

        {/* Card Content */}
        <div className="relative p-3 sm:p-6 flex flex-col justify-between space-y-4 sm:space-y-6 w-full">
          {/* Product Info */}
          <div className="space-y-2 sm:space-y-3 lg:space-y-6">
            <Link href={`/brand/${product.brand._id}`}>
              <p className="text-xs py-2 sm:text-sm text-gray-500 uppercase tracking-wide font-medium lg:text-base hover:text-amber-600 transition-colors">
                {product.brand.name}
              </p>
            </Link>

            <h3 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white leading-tight lg:text-2xl">
              {product.title}
            </h3>

            <Link href={`/category/${product.category._id}`}>
              <p className="text-xs py-2 sm:text-sm text-gray-500 lg:text-base hover:text-amber-600 transition-colors">
                {product.category.name}
              </p>
            </Link>

            <p className="text-xs sm:text-sm text-gray-500 lg:text-base">
              In Stock : {product.quantity}
            </p>

            <div className="flex items-center gap-1 flex-wrap">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    star={star}
                    rating={product.ratingsAverage}
                  />
                ))}
              </div>
              <span className="text-xs lg:text-sm text-gray-500 ml-1">
                {product.ratingsAverage} / 5
              </span>
              <span className="text-xs lg:text-sm text-gray-500 ml-2">
                ({product.ratingsQuantity} Reviews)
              </span>
            </div>

            <h4 className="font-semibold text-sm sm:text-lg text-gray-700 dark:text-white leading-tight lg:text-2xl">
              {product.description}
            </h4>
          </div>

          {/* Price and Cart Section */}
          <div className="flex items-center justify-between pt-2 sm:pt-4 gap-2">
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400">
                {product.price}
              </span>
              <span className="text-xs sm:text-sm text-gray-400 line-through">
                {(product.price * 1.1).toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <AddToWishlist productId={product.id} />

              <AddToCart productId={product.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
