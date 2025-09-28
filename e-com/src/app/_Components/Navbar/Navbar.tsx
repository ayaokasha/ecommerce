"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { ThemeSwitcher } from "../themeSwitcher/ThemeSwitcher";
import {
  Navbar as HeroNav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Badge,
  Spinner,
} from "@heroui/react";
import { CartContext } from "../Context/CartContext";

export default function Navbar() {
  //product id
  let pathname = usePathname();
  //togle open
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //badge state
  const [isInvisible, setIsInvisible] = useState(false);
  //cart context
  const { isloading, cartData } = useContext(CartContext);
  //total cart items
  const totalItemsCount =
    cartData?.data?.products?.reduce((acc, item) => acc + item.count, 0) ?? 0;
  //userouter
  const router = useRouter();

  return (
    <>
      <HeroNav
        shouldHideOnScroll
        className="bg-transparent shadow-none backdrop-blur-none"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        {/* Logo & toggle*/}
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden text-slate-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition-colors"
          />
          <NavbarBrand>
            <h1 className="font-light text-2xl tracking-wide text-slate-800 dark:text-white hover:text-indigo-600 dark:hover:text-amber-400 transition-colors duration-300">
              <Link href="/">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 dark:from-amber-200 dark:via-amber-100 dark:to-white bg-clip-text text-transparent font-normal">
                  Euphoria
                </span>
              </Link>
            </h1>
          </NavbarBrand>
        </NavbarContent>

        {/* Desktop Menu */}
        <NavbarContent className="hidden sm:flex gap-8" justify="center">
          <NavbarItem>
            <Link
              className={`font-light text-sm tracking-wider uppercase transition-all duration-300 ${
                pathname.includes("/products")
                  ? "text-indigo-600 dark:text-amber-400 border-b-2 border-indigo-600 dark:border-amber-400 pb-1"
                  : "text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-amber-400"
              }`}
              href="/products"
            >
              Products
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className={`font-light text-sm tracking-wider uppercase transition-all duration-300 ${
                pathname === "/brands"
                  ? "text-indigo-600 dark:text-amber-400 border-b-2 border-indigo-600 dark:border-amber-400 pb-1"
                  : "text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-amber-400"
              }`}
              href="/brands"
            >
              Brands
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className={`font-light text-sm tracking-wider uppercase transition-all duration-300 ${
                pathname === "/categories"
                  ? "text-indigo-600 dark:text-amber-400 border-b-2 border-indigo-600 dark:border-amber-400 pb-1"
                  : "text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-amber-400"
              }`}
              href="/categories"
            >
              Categories
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end" className="flex items-center gap-4">
          {/* user menu */}
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger className="cursor-pointer p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-white/10 transition-all duration-300 border-0 outline-none focus:outline-none focus:ring-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-10 mb-1.5 text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-amber-400 transition-colors"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Profile Actions"
                variant="flat"
                className=" backdrop-blur-lg rounded-xl shadow-lg"
              >
                <DropdownItem
                  key="profile"
                  onClick={() => router.push("/profile")}
                  className=" hover:bg-indigo-50 dark:hover:bg-white/5"
                >
                  Profile
                </DropdownItem>

                <DropdownItem
                  key="my-orders"
                  onClick={() => router.push("/allorders")}
                  className=" hover:bg-indigo-50 dark:hover:bg-white/5"
                >
                  Orders
                </DropdownItem>
                <DropdownItem
                  key="wishlist"
                  onClick={() => router.push("/wishlist")}
                  className=" hover:bg-indigo-50 dark:hover:bg-white/5"
                >
                  Wishlist
                </DropdownItem>
                <DropdownItem
                  key="addresses"
                  onClick={() => router.push("/addresses")}
                  className=" hover:bg-indigo-50 dark:hover:bg-white/5"
                >
                  Addresses
                </DropdownItem>

                <DropdownItem
                  key="logout"
                  color="danger"
                  className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <span className="text-red-600 dark:text-red-400">
                    Log Out
                  </span>
                </DropdownItem>
                <DropdownItem
                  key="mood"
                  className="hover:bg-indigo-50 dark:hover:bg-white/5"
                >
                  <ThemeSwitcher />
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>

          {/* cart */}
          <NavbarItem className="cursor-pointer p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-white/10 transition-all duration-300">
            <Link href={"/cart"}>
              <Badge
                color="danger"
                content={
                  isloading ? (
                    <span className="animate-pulse">…</span>
                  ) : (
                    totalItemsCount
                  )
                }
                isInvisible={isInvisible}
                shape="circle"
                className="bg-gradient-to-r from-red-500 to-pink-500 border-0 shadow-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6  text-slate-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-amber-400 transition-colors"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </Badge>
            </Link>
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-indigo-100/50 dark:border-white/10">
          <NavbarItem className="py-3">
            <Link
              className={`font-light text-lg tracking-wide transition-all duration-300 block ${
                pathname === "/"
                  ? "text-indigo-600 dark:text-amber-400 pl-4 border-l-4 border-indigo-600 dark:border-amber-400"
                  : "text-slate-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-amber-400 hover:pl-2"
              }`}
              href="/"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </NavbarItem>
          <NavbarItem className="py-3">
            <Link
              className={`font-light text-lg tracking-wide transition-all duration-300 block ${
                pathname.includes("/products")
                  ? "text-indigo-600 dark:text-amber-400 pl-4 border-l-4 border-indigo-600 dark:border-amber-400"
                  : "text-slate-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-amber-400 hover:pl-2"
              }`}
              href="/products"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
          </NavbarItem>
          <NavbarItem className="py-3">
            <Link
              className={`font-light text-lg tracking-wide transition-all duration-300 block ${
                pathname === "/brands"
                  ? "text-indigo-600 dark:text-amber-400 pl-4 border-l-4 border-indigo-600 dark:border-amber-400"
                  : "text-slate-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-amber-400 hover:pl-2"
              }`}
              href="/brands"
              onClick={() => setIsMenuOpen(false)}
            >
              Brands
            </Link>
          </NavbarItem>
          <NavbarItem className="py-3">
            <Link
              className={`font-light text-lg tracking-wide transition-all duration-300 block ${
                pathname === "/categories"
                  ? "text-indigo-600 dark:text-amber-400 pl-4 border-l-4 border-indigo-600 dark:border-amber-400"
                  : "text-slate-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-amber-400 hover:pl-2"
              }`}
              href="/categories"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
          </NavbarItem>
        </NavbarMenu>
      </HeroNav>
    </>
  );
}
