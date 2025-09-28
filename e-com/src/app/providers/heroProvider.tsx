// app/providers.tsx
"use client";

import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import CartContextProvider from "../_Components/Context/CartContext";
import WishlistContextProvider from "../_Components/Context/wishlistContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <HeroUIProvider>
        <ToastProvider />
        <CartContextProvider>
          <WishlistContextProvider>{children}</WishlistContextProvider>
        </CartContextProvider>
      </HeroUIProvider>
    </NextThemesProvider>
  );
}
