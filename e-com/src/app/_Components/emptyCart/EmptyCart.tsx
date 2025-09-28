import Link from "next/link";
import React from "react";

export default function EmptyCart() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 gap-6 ">
        <span className="text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 dark:from-amber-200 dark:via-amber-100 dark:to-white bg-clip-text text-transparent">
          Oops!
        </span>

        <h1 className="text-2xl sm:text-3xl font-medium text-slate-800 dark:text-white">
          Your cart is empty
        </h1>

        <h2 className="text-slate-600 dark:text-gray-300">
          Looks like you haven’t added anything yet.
        </h2>
        <Link
          href="/products"
          className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-black/20 dark:border-white/20 
                 text-gray-900 dark:text-white font-light tracking-wider uppercase text-xs sm:text-sm
                 hover:border-black/40 dark:hover:border-white/40 hover:bg-black/5 dark:hover:bg-white/5 
                 transition-all duration-300 group"
        >
          Browse Products
          <div className="w-4 sm:w-6 h-px bg-black dark:bg-white group-hover:w-6 sm:group-hover:w-8 transition-all duration-300"></div>
        </Link>
      </div>
    </>
  );
}
