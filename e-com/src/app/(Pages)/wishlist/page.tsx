"use client";

import { useContext, useState, useEffect } from "react";
import { addToast, Button, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import HeartIcon from "@/icons/hearticon";
import Loading from "@/app/loading";
import { WishlistContext } from "@/app/_Components/Context/wishlistContext";
import EmptyWishlist from "@/app/_Components/emptyWishlist/EmptyWishlist";
import AddToCart from "@/app/_Components/addToCart/AddToCart";
import { formatCurrency } from "@/app/helpers/formatPrice";

export default function Wishlist() {
  const { wishlistData, isLoading, getWishlist, removeFromWishlist } =
    useContext(WishlistContext);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleRemove = async (id: string) => {
    setRemovingId(id);
    try {
      const res = await removeFromWishlist(id);
      if (res?.status === "success") {
        addToast({
          title: "Removed",
          description: "Product removed from wishlist",
          color: "success",
        });
        await getWishlist();
      } else {
        addToast({
          title: "Error",
          description: res?.message || "Failed to remove",
          color: "danger",
        });
      }
    } catch {
      addToast({
        title: "Error",
        description: "Something went wrong",
        color: "danger",
      });
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="w-full overflow-x-hidden py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 dark:from-amber-200 dark:via-amber-100 dark:to-white">
          Your Wishlist
        </h1>

        {isLoading ? (
          <Loading />
        ) : wishlistData && wishlistData.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {wishlistData.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700 p-3 sm:p-4 flex gap-3"
              >
                <div className="relative flex-shrink-0 w-[100px] h-[100px] sm:w-[120px] sm:h-[120px]">
                  <Link href={`/products/${item.id}`}>
                    <Image
                      src={item.imageCover}
                      alt={item.title}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </Link>

                  <button
                    onClick={() => handleRemove(item._id)}
                    className="absolute top-1 right-1 bg-white/90 backdrop-blur-sm rounded-full p-1 hover:bg-white shadow-sm transition-all duration-200"
                  >
                    {removingId === item._id ? (
                      <Spinner size="sm" color="current" />
                    ) : (
                      <HeartIcon />
                    )}
                  </button>
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900 dark:text-white line-clamp-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {item.category.name}
                    </p>
                    <p className="text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400 mt-2">
                      {formatCurrency(item.price)}
                    </p>
                  </div>

                  <div className="mt-auto flex justify-end">
                    <AddToCart productId={item.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyWishlist />
        )}
      </div>
    </div>
  );
}
