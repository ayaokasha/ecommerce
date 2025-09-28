"use client";
import { useContext, useState, useEffect } from "react";
import { addToast, Button, Spinner } from "@heroui/react";
import Image from "next/image";
import { CartContext } from "@/app/_Components/Context/CartContext";
import StarIcon from "@/icons/starIcon";
import HeartIcon from "@/icons/hearticon";
import Link from "next/link";
import Loading from "@/app/loading";
import { formatCurrency } from "@/app/helpers/formatPrice";
import EmptyCart from "@/app/_Components/emptyCart/EmptyCart";
import TrashIcon from "@/icons/trash";
import { ClearCartItem } from "@/app/Apis/cart/clearCartItem";
import { updateCartItem } from "@/app/Apis/cart/updateCartItem";
import { removeCartItem } from "@/app/Apis/cart/removeCartItem";
import CheckoutForm from "@/app/_Components/chekoutForm/ChekoutForm";
import AddToWishlist from "@/app/_Components/addToWishlist/addToWushlist";

export default function Cart() {
  // states
  const { cartData, isloading, getCart, setcartData } = useContext(CartContext);
  // handel reloading
  const [isReloading, setIsReloading] = useState(false);
  //removing item loading
  const [removingId, setRemovingId] = useState<string | null>(null);
  //updating loading
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  //clearCart loading
  const [isClearing, setIsClearing] = useState<boolean>(false);
  // form state
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  //reload cart if product data is corrupted (returns string ID instead of full object)
  //reload the cart once to fetch correct product data.
  useEffect(() => {
    if (
      !isReloading &&
      cartData &&
      cartData.numOfCartItems &&
      cartData.numOfCartItems > 0 &&
      cartData.data?.products &&
      cartData.data.products.length > 0 &&
      typeof cartData.data.products[0].product === "string"
    ) {
      setIsReloading(true);
      const fetchCart = async () => {
        try {
          await getCart();
        } catch (error) {
          console.error("Failed to reload cart:", error);
        } finally {
          setIsReloading(false);
        }
      };
      fetchCart();
    }
  }, [cartData, isReloading, getCart]);

  //total cart items
  const totalItemsCount =
    cartData?.data?.products?.reduce((acc, item) => acc + item.count, 0) || 0;

  //handelers
  // handle clear cart
  const handleClearCart = async () => {
    setIsClearing(true);
    try {
      const data = await ClearCartItem();

      if (data?.status === "success" || data?.message === "success") {
        setcartData(null);
        addToast({
          title: "Success",
          description: "Cart cleared successfully!",
          color: "success",
        });
        await getCart();
      } else {
        addToast({
          title: "Error",
          description: "Failed to clear cart",
          color: "danger",
        });
      }
    } catch (error) {
      addToast({
        title: "Error",
        description: "Something went wrong, please try again.",
        color: "danger",
      });
    } finally {
      setIsClearing(false);
    }
  };
  //update cart product
  const handleUpdateCart = async (productId: string, count: number) => {
    //remove is handeled by the back end
    //if not call remove fun when the count == 0
    if (count === 0) {
      await handleRemoveItem(productId);
      return;
    }

    if (updatingId === productId) return;

    setUpdatingId(productId);
    try {
      const data = await updateCartItem(productId, count);
      if (data?.status === "success") {
        setcartData(data);
      } else {
        addToast({
          title: "Error",
          description: data?.message || "Failed to update item",
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
      setUpdatingId(null);
    }
  };
  //delete item
  const handleRemoveItem = async (productId: string) => {
    if (removingId === productId) return;

    setRemovingId(productId);
    try {
      const data = await removeCartItem(productId);
      console.log(data);
      //toast for errors
      if (data?.status === "success") {
        addToast({
          title: "Success",
          description: data.message || "Product Removed successfully!",
          color: "success",
        });
        setcartData(data);
      } else {
        addToast({
          title: "Error",
          description: data?.message || "Failed to Remove product",
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
      setRemovingId(null);
    }
  };

  return (
    <>
      {isloading ||
      isReloading ||
      (cartData?.data?.products &&
        cartData.data.products.length > 0 &&
        typeof cartData.data.products[0].product === "string") ? (
        <Loading />
      ) : cartData?.numOfCartItems && cartData.numOfCartItems > 0 ? (
        <div className="w-full overflow-x-hidden">
          <div className="container mx-auto py-6 sm:py-8 px-2 sm:px-4">
            <div className="flex items-center justify-between pb-4">
              <h1 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 dark:from-amber-200 dark:via-amber-100 dark:to-white bg-clip-text text-transparent font-normal">
                Your Cart
              </h1>
              <Button
                variant="light"
                color="danger"
                className="text-xs sm:text-sm"
                onPress={handleClearCart}
                disabled={isClearing}
              >
                {isClearing ? (
                  <Spinner size="sm" color="current" />
                ) : (
                  <>
                    <span className="hidden md:inline">Clear Cart</span>
                    <TrashIcon />
                  </>
                )}
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartData?.data.products.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700 p-3 sm:p-4"
                  >
                    <div className="flex gap-3">
                      {/* Product Image */}
                      <div className="relative flex-shrink-0 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px]">
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title}
                          height={400}
                          width={400}
                          className="w-full h-full rounded-xl object-cover"
                        />
                        <AddToWishlist productId={item.product.id} />
                      </div>

                      <div className="flex-1 min-w-0">
                        {/*details */}
                        <div className="space-y-1 sm:space-y-2">
                          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                            {item.product.brand.name}
                          </p>

                          <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900 dark:text-white line-clamp-2 leading-tight">
                            {item.product.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-gray-500">
                            {item.product.category.name}
                          </p>

                          <div className="hidden sm:flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <StarIcon
                                key={star}
                                star={star}
                                rating={item.product.ratingsAverage}
                              />
                            ))}
                            <span className="text-xs text-gray-500 ml-1">
                              ({item.product.ratingsAverage})
                            </span>
                          </div>
                        </div>

                        <div className="mt-2 space-y-2">
                          {/* update cart */}
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Button
                                size="sm"
                                variant="flat"
                                className="w-7 h-7 sm:w-8 sm:h-8 min-w-0 p-0 text-sm"
                                onPress={() =>
                                  handleUpdateCart(
                                    item.product.id,
                                    item.count - 1
                                  )
                                }
                                disabled={
                                  updatingId === item.product.id ||
                                  removingId === item.product.id
                                }
                              >
                                −
                              </Button>
                              <span className="w-8 text-center text-sm font-medium">
                                {updatingId === item.product.id ? (
                                  <Spinner size="sm" color="current" />
                                ) : (
                                  item.count
                                )}
                              </span>
                              <Button
                                size="sm"
                                variant="flat"
                                className="w-7 h-7 sm:w-8 sm:h-8 min-w-0 p-0 text-sm"
                                onPress={() =>
                                  handleUpdateCart(
                                    item.product.id,
                                    item.count + 1
                                  )
                                }
                                disabled={
                                  updatingId === item.product.id ||
                                  removingId === item.product.id
                                }
                              >
                                +
                              </Button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="flex justify-between items-center">
                            <span className="text-sm sm:text-base md:text-lg font-bold text-blue-600 dark:text-blue-400">
                              {formatCurrency(item.price)}
                            </span>
                            <span className="text-xs text-gray-400 line-through px-1">
                              {formatCurrency(item.price * 1.1)}
                            </span>
                          </div>

                          {/*remove Button */}
                          <Button
                            color="danger"
                            variant="flat"
                            size="sm"
                            className="w-full text-xs"
                            disabled={
                              removingId === item.product.id ||
                              updatingId === item.product.id
                            }
                            onPress={() => handleRemoveItem(item.product.id)}
                          >
                            Remove
                            {removingId === item.product.id && (
                              <Spinner size="sm" color="current" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
                  <h2 className="text-lg sm:text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                    Order Summary
                  </h2>

                  <div className="space-y-3 text-sm sm:text-base">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Cart Items
                      </span>
                      <span className="font-medium">
                        {totalItemsCount} Items
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Subtotal
                      </span>
                      <span className="font-medium">
                        {formatCurrency(cartData?.data.totalCartPrice || 0)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Shipping
                      </span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Tax
                      </span>
                      <span className="font-medium">
                        {formatCurrency(
                          (cartData?.data.totalCartPrice || 0) * 0.1
                        )}
                      </span>
                    </div>

                    <hr className="border-gray-200 dark:border-gray-700" />

                    <div className="flex justify-between text-base sm:text-lg font-semibold">
                      <span className="text-gray-900 dark:text-white">
                        Total
                      </span>
                      <span className="text-blue-600 dark:text-blue-400">
                        {formatCurrency(
                          (cartData?.data.totalCartPrice || 0) * 1.1
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Button
                      color="primary"
                      size="lg"
                      className="w-full font-semibold"
                      onPress={() => setShowCheckoutForm(true)}
                    >
                      Proceed to Checkout
                    </Button>

                    {/* form modal */}
                    {showCheckoutForm && (
                      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-md mx-auto">
                          <CheckoutForm
                            cartId={cartData?.data._id!}
                            onClose={() => setShowCheckoutForm(false)}
                          />
                        </div>
                      </div>
                    )}

                    <Link href="/products">
                      <Button variant="flat" size="lg" className="w-full">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </>
  );
}
