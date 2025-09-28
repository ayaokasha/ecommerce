"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { ProductI } from "@/interfaces";

interface WishlistContextType {
  wishlistData: ProductI[] | null;
  isLoading: boolean;
  getWishlist: () => Promise<void>;
  removeFromWishlist: (
    id: string
  ) => Promise<{ status: string; message?: string }>;
}

export const WishlistContext = createContext<WishlistContextType>({
  wishlistData: null,
  isLoading: false,
  getWishlist: async () => {},
  removeFromWishlist: async () => ({ status: "error" }),
});

export default function WishlistContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [wishlistData, setWishlistData] = useState<ProductI[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getWishlist() {
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token:
              localStorage.getItem("token") ||
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDU5OGVmNDE4ODE5NzAyZjkxNmFhMCIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3ODM0NjA3LCJleHAiOjE3NjU2MTA2MDd9.M1tNVpLcY3_wAO6A03NF4v2SrG1sEnAGXnBmymfLIqo",
          },
        }
      );
      const data = await res.json();
      setWishlistData(data.data || []);
    } catch (err) {
      console.error(err);
      setWishlistData([]);
    } finally {
      setIsLoading(false);
    }
  }

  async function removeFromWishlist(id: string) {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {
          method: "DELETE",
          headers: {
            token:
              localStorage.getItem("token") ||
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDU5OGVmNDE4ODE5NzAyZjkxNmFhMCIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3ODM0NjA3LCJleHAiOjE3NjU2MTA2MDd9.M1tNVpLcY3_wAO6A03NF4v2SrG1sEnAGXnBmymfLIqo",
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      return { status: "error" };
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{ wishlistData, isLoading, getWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
