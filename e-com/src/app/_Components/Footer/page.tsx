import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="relative ">
      {/* Shapes Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 border border-black/10 dark:border-white/10 rotate-45 rounded-lg"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 border border-black/5 dark:border-white/5 rotate-12 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-black/5 dark:from-white/5 to-transparent -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-lg"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 text-center">
        {/* Brand */}
        <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 dark:from-amber-200 dark:via-amber-100 dark:to-white bg-clip-text text-transparent font-normal">
            Euphoria
          </span>
        </h2>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm">
          <Link
            href="/"
            className="text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-amber-400 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-amber-400 transition-colors"
          >
            Products
          </Link>
          <Link
            href="/brands"
            className="text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-amber-400 transition-colors"
          >
            Brands
          </Link>
          <Link
            href="/categories"
            className="text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-amber-400 transition-colors"
          >
            Categories
          </Link>
          <Link
            href="/contact"
            className="text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-amber-400 transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-black/10 dark:bg-white/10 mb-6"></div>

        {/* Copyright */}
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Euphoria. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
