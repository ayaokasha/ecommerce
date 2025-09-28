"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/app/helpers/formatPrice";
import { Item, Order } from "@/interfaces/cart"; // your existing interface
import { ProductI } from "@/interfaces/product";
import Link from "next/link";
import Loading from "@/app/loading";

export default function AllOrders() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);

  async function getOrders() {
    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/orders/user/" +
          localStorage.getItem("userId")
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setOrders(data);
      } else if (data.data) {
        setOrders(data.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="min-h-screen container mx-auto px-4 sm:px-6 py-10">
      <h1
        className="text-4xl text-center sm:text-6xl md:text-8xl mb-6 sm:mb-8 
                 tracking-tight leading-tight sm:leading-none 
                 bg-gradient-to-r from-amber-600 via-amber-700 to-gray-900 
                 dark:from-amber-200 dark:via-amber-100 dark:to-white 
                 bg-clip-text text-transparent font-thin"
      >
        My Orders
      </h1>

      {loading ? (
        <Loading />
      ) : !orders || orders.length === 0 ? (
        <div className="min-h-[60vh] flex flex-col justify-center items-center text-center px-6">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-light text-slate-600 dark:text-gray-300 mb-6">
            No Orders found.
          </h2>
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-2xl 
       border border-black/30 dark:border-white/30 
       text-gray-900 dark:text-white font-medium tracking-wide uppercase text-sm sm:text-base
       hover:border-black/50 dark:hover:border-white/50 hover:bg-black/5 dark:hover:bg-white/5 
       transition-all duration-300 group"
          >
            Back To Home
            <div className="w-5 sm:w-7 h-px bg-black dark:bg-white group-hover:w-7 sm:group-hover:w-9 transition-all duration-300"></div>
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-md rounded-3xl shadow-2xl
                     p-6 border border-gray-200/30 dark:border-gray-700/30 flex flex-col justify-between 
                     transition-all duration-500 hover:scale-[1.02]"
            >
              {/* Header */}
              <div className="mb-4 space-y-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Order ID:</span> {order._id}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Status */}
              <div className="flex justify-between mb-4 text-sm">
                <span
                  className={`px-4 py-1 rounded-full font-semibold text-xs ${
                    order.isPaid
                      ? "bg-green-500/90 text-white"
                      : "bg-red-500/90 text-white"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Not Paid"}
                </span>
                <span
                  className={`px-4 py-1 rounded-full font-semibold text-xs ${
                    order.isDelivered
                      ? "bg-green-500/90 text-white"
                      : "bg-yellow-400/90 text-white"
                  }`}
                >
                  {order.isDelivered ? "Delivered" : "Pending"}
                </span>
              </div>

              {/* Items */}
              <div className="mb-4">
                <p className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
                  Items:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400/50 scrollbar-track-gray-200/20">
                  {order.cartItems?.length > 0 ? (
                    order.cartItems.map((item: Item) => (
                      <li
                        key={item._id}
                        className="hover:text-amber-600 transition-colors duration-300"
                      >
                        {item.product ? (
                          <Link
                            href={`/products/${item.product._id}`}
                            className="hover:underline"
                          >
                            {item.product.title}
                          </Link>
                        ) : (
                          "Unknown Product"
                        )}
                        | Qty: {item.count} | Price:
                        {formatCurrency(item.price)}
                      </li>
                    ))
                  ) : (
                    <li className="italic text-gray-500">
                      No items in this order.
                    </li>
                  )}
                </ul>
              </div>

              {/* Total */}
              <div className="mt-auto text-right">
                <p className="font-bold text-xl text-amber-600 dark:text-amber-300">
                  Total: {formatCurrency(order.totalOrderPrice)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
