"use client";

import AddCartIcon from "@/icons/addCartIcon";
import { Button, Spinner, addToast } from "@heroui/react";
import React, { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";

export default function AddToCart({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { getCart, setcartData } = useContext(CartContext);

  async function addProductToCart() {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          method: "POST",
          body: JSON.stringify({ productId }),
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDU5OGVmNDE4ODE5NzAyZjkxNmFhMCIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3ODM0NjA3LCJleHAiOjE3NjU2MTA2MDd9.M1tNVpLcY3_wAO6A03NF4v2SrG1sEnAGXnBmymfLIqo",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      // await getCart();
      setcartData(data);
      console.log(data);

      //toast for errors
      data.status === "success"
        ? addToast({
            title: "Success",
            description: data.message || "Product added to cart successfully!",
            color: "success",
          })
        : addToast({
            title: "Error",
            description: data.message || "Failed to add product",
            color: "danger",
          });
    } catch (err) {
      addToast({
        title: "Error",
        description: "Something went wrong, please try again.",
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Button
        onPress={addProductToCart}
        disabled={isLoading}
        className="cursor-pointer  bg-blue-600 hover:bg-blue-700
         text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg 
         text-xs sm:text-sm lg:text-base font-medium flex 
         items-center gap-1 sm:gap-2 transition-colors duration-200 "
      >
        <span className="hidden sm:inline">Add to Cart</span>
        <span className="sm:hidden">Add</span>
        {isLoading ? <Spinner size="sm" color="current" /> : <AddCartIcon />}
      </Button>
    </>
  );
}
