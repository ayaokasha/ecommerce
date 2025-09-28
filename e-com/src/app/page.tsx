import Link from "next/link";
import Products from "./(Pages)/products/page";
import SecureIcon from "@/icons/secureIcon";
import BoxIcon from "@/icons/boxIcon";
import TruckIcon from "@/icons/truckIcon";
import Categories from "./(Pages)/categories/page";

export default function Home() {
  return (
    <main className="">
      <section className="container relative min-h-screen sm:min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Main Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-4 sm:px-6 py-2 mb-8 sm:mb-12 bg-black/5 dark:bg-white/5 backdrop-blur-md rounded-full border border-black/10 dark:border-white/10">
            <div className="w-2 h-2 bg-amber-500 dark:bg-amber-400 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-light text-gray-600 dark:text-gray-300 tracking-wide">
              Premium Shopping Experience
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-light text-gray-900 dark:text-white mb-6 sm:mb-8 tracking-tight leading-tight sm:leading-none">
            <span className="block">Discover</span>
            <span className="block bg-gradient-to-r from-amber-600 via-amber-700 to-gray-900 dark:from-amber-200 dark:via-amber-100 dark:to-white bg-clip-text text-transparent font-thin">
              Euphoria
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-gray-600 dark:text-gray-400 mb-12 sm:mb-16 max-w-2xl sm:max-w-3xl mx-auto font-light leading-relaxed px-2">
            Curated collections for the discerning individual.
            <span className="text-gray-700 dark:text-gray-300">
              Experience luxury redefined.
            </span>
          </p>

          {/* Minimalist Stats */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-16 mb-12 sm:mb-16 text-gray-600 dark:text-gray-400">
            <div className="grid grid-cols-2 gap-6 sm:flex sm:gap-16">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-white mb-1">
                  10K+
                </div>
                <div className="text-xs sm:text-sm tracking-widest uppercase">
                  Clients
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-white mb-1">
                  500+
                </div>
                <div className="text-xs sm:text-sm tracking-widest uppercase">
                  Products
                </div>
              </div>
              <div className="text-center col-span-2 sm:col-span-1">
                <div className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-white mb-1">
                  24/7
                </div>
                <div className="text-xs sm:text-sm tracking-widest uppercase">
                  Service
                </div>
              </div>
            </div>
          </div>

          {/* buttons */}
          <div className="flex flex-row gap-3 sm:gap-6 justify-center items-center w-full sm:w-auto">
            <Link
              href="/products"
              className="group relative w-1/2 sm:w-auto px-6 sm:px-10 py-2 sm:py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-medium tracking-wider uppercase text-xs sm:text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-500 overflow-hidden flex justify-center items-center"
            >
              <span className="relative z-10">Explore</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </Link>

            <Link
              href="/login"
              className="group w-1/2 sm:w-auto flex items-center justify-center gap-2 sm:gap-3 px-6 py-2 sm:py-4 border border-black/20 dark:border-white/20 text-gray-900 dark:text-white font-light tracking-wider uppercase text-xs sm:text-sm hover:border-black/40 dark:hover:border-white/40 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
            >
              <span>Login</span>
              <div className="relative h-px overflow-hidden">
                <div className="w-0 sm:w-0 group-hover:w-6 sm:group-hover:w-8 h-px bg-black dark:bg-white transition-all duration-500 ease-out"></div>
              </div>
            </Link>
          </div>

          {/*Features */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 mt-16 sm:mt-24 max-w-4xl mx-auto">
            {/* Card 1 */}
            <div className="group p-6 sm:p-8 bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-500">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-black/10 dark:from-white/10 to-black/5 dark:to-white/5 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <TruckIcon />
              </div>
              <h3 className="text-gray-900 dark:text-white text-base sm:text-lg font-light mb-2 sm:mb-3 tracking-wide">
                Free Delivery
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
                Complimentary white-glove service for orders above 100
              </p>
            </div>

            {/* Card 2 */}
            <div className="group p-6 sm:p-8 bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-500">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-black/10 dark:from-white/10 to-black/5 dark:to-white/5 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <SecureIcon />
              </div>
              <h3 className="text-gray-900 dark:text-white text-base sm:text-lg font-light mb-2 sm:mb-3 tracking-wide">
                Secure Experience
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
                Bank-level encryption with privacy guaranteed
              </p>
            </div>

            {/* Card 3 */}
            <div className="group col-span-2 sm:col-span-1 p-6 sm:p-8 bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-500">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-black/10 dark:from-white/10 to-black/5 dark:to-white/5 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <BoxIcon />
              </div>
              <h3 className="text-gray-900 dark:text-white text-base sm:text-lg font-light mb-2 sm:mb-3 tracking-wide">
                Lifetime Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
                Dedicated concierge service for all your needs
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* cat */}
      <section className="mt-8">
        <Categories />
      </section>
      {/* prod */}
      <section className="mt-8">
        <Products />
      </section>
    </main>
  );
}
