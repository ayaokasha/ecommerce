import React from "react";

export default function BgPatrens() {
  return (
    <>
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5 dark:opacity-10">
        <div
          className="absolute inset-0 bg-black dark:bg-white"
          style={{
            maskImage: `radial-gradient(circle at 25% 25%, black 1px, transparent 1px),
                        radial-gradient(circle at 75% 75%, black 1px, transparent 1px)`,
            maskSize: "100px 100px",
            WebkitMaskImage: `radial-gradient(circle at 25% 25%, black 1px, transparent 1px),
                              radial-gradient(circle at 75% 75%, black 1px, transparent 1px)`,
            WebkitMaskSize: "100px 100px",
          }}
        />
      </div>

      {/* shapes */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-20 left-5 sm:left-10 w-20 h-20 sm:w-32 sm:h-32 border border-black/10 dark:border-white/10 rotate-45 rounded-lg" />
        <div className="absolute bottom-20 right-5 sm:right-10 w-16 h-16 sm:w-24 sm:h-24 border border-black/5 dark:border-white/5 rotate-12 rounded-full" />
        <div className="absolute top-1/3 right-10 sm:right-20 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-black/5 dark:from-white/5 to-transparent rotate-45" />
      </div>
    </>
  );
}
