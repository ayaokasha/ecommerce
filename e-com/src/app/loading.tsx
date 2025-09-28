import React from "react";

export default function Loading() {
  return (
    <div className="relative -m-5 min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-black overflow-hidden">
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-light text-slate-800 dark:text-white tracking-tight mb-8">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-amber-200 dark:via-amber-100 dark:to-white bg-clip-text text-transparent">
            Euphoria
          </span>
        </h1>

        <div className="relative mb-8">
          <div className="w-16 h-16 mx-auto relative">
            <div className="absolute inset-0 border-4 border-indigo-200/30 dark:border-white/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-indigo-600 dark:border-t-amber-400 rounded-full animate-spin"></div>
            <div
              className="absolute inset-2 border-2 border-transparent border-b-purple-500 dark:border-b-amber-300 rounded-full animate-spin"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s",
              }}
            ></div>
          </div>
        </div>

        <p className="text-sm text-slate-500 dark:text-gray-400 tracking-widest uppercase">
          Loading your experience...
        </p>
      </div>
    </div>
  );
}
