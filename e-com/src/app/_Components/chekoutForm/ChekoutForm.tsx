"use client";
import React, { FormEvent, useContext, useRef, useState } from "react";
import { Form, Input, Button, addToast } from "@heroui/react";
import XMark from "@/icons/xMark";
import { useRouter } from "next/navigation";
import { CartContext } from "../Context/CartContext";
import Loading from "@/app/loading";

interface CheckoutFormProps {
  cartId: string;
  onClose: () => void;
}

export default function CheckoutForm({ cartId, onClose }: CheckoutFormProps) {
  //loading and payment states
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState<string>("");
  //to navigate to allorders
  const router = useRouter();

  //useref to prevent rerendering while geting the form data
  let addressInput = useRef<HTMLInputElement | null>(null);
  let cityInput = useRef<HTMLInputElement | null>(null);
  let phoneInput = useRef<HTMLInputElement | null>(null);

  //to clear cartdata
  const { setcartData } = useContext(CartContext);

  //handleni submition
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Validation
    const address = addressInput.current?.value?.trim();
    const city = cityInput.current?.value?.trim();
    const phone = phoneInput.current?.value?.trim();

    if (!address || !city || !phone) {
      alert("Please fill all required fields");
      return;
    }

    if (!payment) {
      addToast({
        title: "Payment",
        description: "Please select Payment method!",
        color: "warning",
      });
      return;
    }

    setLoading(true);
    if (payment === "cash") {
      try {
        const shippingAddress = { details: address, city, phone };

        const response = await fetch(
          `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
          {
            method: "POST",
            body: JSON.stringify({ shippingAddress }),
            headers: {
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDU5OGVmNDE4ODE5NzAyZjkxNmFhMCIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3ODM0NjA3LCJleHAiOjE3NjU2MTA2MDd9.M1tNVpLcY3_wAO6A03NF4v2SrG1sEnAGXnBmymfLIqo",
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("Cash order:", data);

        if (data.status === "success") {
          addToast({
            title: "Success",
            description: "Order placed successfully!",
            color: "success",
          });

          setcartData(null);
          router.push("/allorders");
          // window.location.href = "/allorders";
          //there is a glitsh in hear betwen the cart and the all orders
          return;
        } else {
          addToast({
            title: "Error",
            description: "Failed to place cash order",
            color: "danger",
          });
        }
      } catch (err) {
        console.error(err);
        addToast({
          title: "Error",
          description: "Failed to place cash order",
          color: "danger",
        });
      } finally {
        setLoading(false);
      }
    } else if (payment === "visa") {
      try {
        const baseUrl =
          typeof window !== "undefined"
            ? window.location.origin
            : "http://localhost:3000";

        const shippingAddress = { details: address, city, phone };

        const response = await fetch(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${baseUrl}`,
          {
            method: "POST",
            body: JSON.stringify({ shippingAddress }),
            headers: {
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDU5OGVmNDE4ODE5NzAyZjkxNmFhMCIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3ODM0NjA3LCJleHAiOjE3NjU2MTA2MDd9.M1tNVpLcY3_wAO6A03NF4v2SrG1sEnAGXnBmymfLIqo",
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log(data);

        if (data.status === "success" && data.session?.url) {
          location.href = data.session.url;
        } else {
          addToast({
            title: "Error",
            description: "Failed to place cash order",
            color: "danger",
          });
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        addToast({
          title: "Error",
          description: "Failed to place cash order",
          color: "danger",
        });
        setLoading(false);
      }
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full relative">
          {/* close triger */}
          <Button
            variant="light"
            onPress={onClose}
            isIconOnly
            className="absolute right-0 top-0"
            size="md"
            disabled={loading}
          >
            <XMark />
          </Button>

          {/* Header */}
          <div className="mb-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Checkout</h2>
            <p className="text-gray-600 text-sm">
              Fill in your delivery information
            </p>
          </div>

          <Form className="space-y-3" onSubmit={handleSubmit}>
            <Input
              ref={addressInput}
              isRequired
              label="Address Details"
              labelPlacement="outside"
              name="details"
              placeholder="Enter your full address"
              type="text"
              variant="bordered"
            />

            <Input
              ref={cityInput}
              isRequired
              label="City"
              labelPlacement="outside"
              name="city"
              placeholder="Enter your city"
              type="text"
              variant="bordered"
            />

            <Input
              ref={phoneInput}
              isRequired
              label="Phone Number"
              labelPlacement="outside"
              name="phone"
              placeholder="+20 123 456 7890"
              type="tel"
              variant="bordered"
            />

            <div className="space-y-3">
              <label className="text-sm font-medium">Payment Method</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={payment === "cash"}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  Cash on Delivery
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="visa"
                    checked={payment === "visa"}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  Online Payment
                </label>
              </div>
            </div>

            <Button type="submit" color="primary" className="w-full ">
              Checkout
            </Button>
          </Form>
        </div>
      )}
    </>
  );
}
