import { CartResponse } from "@/interfaces";

//delete item
export async function removeCartItem(productId: string) {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        method: "DELETE",
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDU5OGVmNDE4ODE5NzAyZjkxNmFhMCIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3ODM0NjA3LCJleHAiOjE3NjU2MTA2MDd9.M1tNVpLcY3_wAO6A03NF4v2SrG1sEnAGXnBmymfLIqo",
        },
      }
    );
    const data: CartResponse = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
