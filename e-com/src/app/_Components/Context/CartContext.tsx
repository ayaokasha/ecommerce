"use client";

import { CartResponse } from "@/interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext = createContext<{
  cartData: CartResponse | null;
  setcartData: (value: CartResponse | null) => void;
  isloading: boolean;
  setIsloading: (value: boolean) => void;
  getCart: () => void;
}>({
  cartData: null,
  setcartData: () => {},
  isloading: false,
  setIsloading: () => {},
  getCart: () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartData, setcartData] = useState<CartResponse | null>(null);
  const [isloading, setIsloading] = useState<boolean>(true);

  async function getCart() {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        method: "GET",
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDU5OGVmNDE4ODE5NzAyZjkxNmFhMCIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3ODM0NjA3LCJleHAiOjE3NjU2MTA2MDd9.M1tNVpLcY3_wAO6A03NF4v2SrG1sEnAGXnBmymfLIqo",
        },
      }
    );
    const data: CartResponse = await response.json();
    setcartData(data);
    setIsloading(false);
    if (cartData?.data.cartOwner) {
      localStorage.setItem("userId", cartData?.data.cartOwner);
    }
    console.log(data);
  }
  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        isloading,
        setIsloading,
        cartData,
        setcartData,
        getCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
