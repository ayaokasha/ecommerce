"use client";

import HeartIcon from "@/icons/hearticon";
import { Button, Spinner, addToast } from "@heroui/react";
import React, { useContext, useState } from "react";
import { WishlistContext } from "../Context/wishlistContext";

export default function AddToWishlist({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { getWishlist } = useContext(WishlistContext);

  async function addProductToWishlist() {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          method: "POST",
          body: JSON.stringify({ productId }),
          headers: {
            token:
              localStorage.getItem("token") ||
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDU5OGVmNDE4ODE5NzAyZjkxNmFhMCIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3ODM0NjA3LCJleHAiOjE3NjU2MTA2MDd9.M1tNVpLcY3_wAO6A03NF4v2SrG1sEnAGXnBmymfLIqo",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        addToast({
          title: "Added",
          description: data.message || "Product added to wishlist!",
          color: "success",
        });
        await getWishlist(); // refresh wishlist
      } else {
        addToast({
          title: "Error",
          description: data.message || "Failed to add product",
          color: "danger",
        });
      }
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
    <Button
      onPress={addProductToWishlist}
      disabled={isLoading}
      className="absolute -top-2 -right-5 z-10 p-1 sm:p-2 bg-transparent hover:bg-transparent shadow-none transition-all duration-200"
    >
      {isLoading ? <Spinner size="sm" color="current" /> : <HeartIcon />}
    </Button>
  );
}
