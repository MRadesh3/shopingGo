"use client";

import Loading from "@app/loading";
import { useState } from "react";
import CartItem from "@components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import {
  addproducttocart,
  removeproductfromcart,
} from "../redux/features/cart/cartSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { BsCartCheckFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import MetaData from "@components/MetaData";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [storedCartItems, setStoredCartItems] = useState([]);
  const { cartItems, isLoading } = useSelector((state) => state.cart);

  console.log(cartItems);

  const increaseQuantity = (id, quantity, stock) => {
    const newQuantity = quantity + 1;
    if (stock <= quantity) {
      return toast.error("Sorry, Product stock limit reached");
    }
    dispatch(addproducttocart({ productId: id, quantity: newQuantity }));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQuantity = quantity - 1;
    if (quantity <= 1) {
      return toast.error("Sorry, Product quantity limit reached");
    }
    dispatch(addproducttocart({ productId: id, quantity: newQuantity }));
  };

  const removeFromCartHandler = (productId) => {
    dispatch(removeproductfromcart(productId));
    toast.success("Product removed from cart");
  };

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    setStoredCartItems(storedCartItems);
    if (storedCartItems && storedCartItems.length > 0) {
      storedCartItems.forEach((item) => {
        dispatch(
          addproducttocart({ productId: item._id, quantity: item.quantity })
        );
      });
    }
  }, [dispatch]);

  return (
    <section className="md:mt-20 mt-[80px] mb-20">
      <MetaData title="Cart" />
      <div className="flex flex-col justify-center items-center ">
        <h1 className="mt-10 text-xl font-satoshi font-bold text-[#4b077c]">
          Cart
        </h1>
        <hr className="h-[1.5px] my-3  w-[30%] bg-gray-200 border-0 rounded dark:bg-gray-300" />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="m-10 max-md:m-2">
          <div className="grid grid-cols-6 gap-5 w-full text-center bg-[#4b077c] text-white p-3 tracking-wide font-satoshi max-md:hidden">
            <h1>Product</h1>
            <h1>Name</h1>
            <h1>Price</h1>
            <h1>Quantity</h1>
            <h1>Subtotal</h1>
            <h1>Action</h1>
          </div>

          {cartItems && cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-6 gap-5 w-full text-center shadow-xl rounded-lg py-5 mb-5"
                >
                  <div className="col-start-1 col-end-3 max-md:col-span-6">
                    <CartItem item={item} />
                  </div>
                  <div className="flex justify-center items-center max-md:col-span-3">
                    <h1>{`₹ ${new Intl.NumberFormat("en-IN").format(
                      item.price
                    )}`}</h1>
                  </div>
                  <div className="flex justify-center gap-2 items-center max-md:col-span-3">
                    <button
                      onClick={() =>
                        decreaseQuantity(item._id, item.quantity, item.stock)
                      }
                      className="border-2 px-2 border-[#4b077c] font-bold hover:bg-[#4b077c] hover:text-white"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="border-2 w-20 max-lg:w-14 border-[#4b077c] text-center"
                      value={item.quantity}
                      readOnly
                    />
                    <button
                      onClick={() =>
                        increaseQuantity(item._id, item.quantity, item.stock)
                      }
                      className="border-2 px-2 border-[#4b077c] font-bold hover:bg-[#4b077c] hover:text-white"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex justify-center items-center max-md:col-span-3">
                    <h1 className="md:hidden">Subtotal :</h1> &nbsp;
                    <h1>
                      {`₹ ${new Intl.NumberFormat("en-IN").format(
                        item.quantity * item.price
                      )}`}
                    </h1>
                  </div>
                  <div className="flex justify-center items-center max-md:col-span-3">
                    <button
                      onClick={() => removeFromCartHandler(item._id)}
                      className="border-[1px] border-red-500 text-red-500 px-4 py-1 rounded-xl hover:bg-red-500 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex justify-center items-center">
                <button
                  onClick={() => router.push("/products")}
                  className="bg-[#fe7f07] text-base font-semibold mt-10 text-white px-6 py-2 rounded-lg"
                >
                  Add More Products
                  <BsCartCheckFill className="inline-block ml-1" />
                </button>
              </div>
            </>
          ) : (
            <div className="col-span-3 max-md:col-span-4 flex flex-col justify-items-start items-center my-10">
              <Image
                src="/assets/icons/trolley.png"
                alt="empty"
                width={100}
                height={100}
                className="object-contain"
              />
              <h1 className="text-center text-lg font-semibold font-satoshi text-[#4b077c] my-6">
                No Products In Cart 😥 ! Explore more products
              </h1>

              <button
                onClick={() => router.push("/products")}
                className="bg-[#fe7f07] text-lg font-semibold text-white px-6 py-2 rounded-lg"
              >
                Shop Now
                <BsCartCheckFill className="inline-block ml-1" />
              </button>
            </div>
          )}

          <hr className="h-[2px] my-3  w-full bg-[#fe7f07] mt-10 border-0 rounded dark:bg-gray-300" />

          <div className="grid grid-cols-6 gap-5 text-center">
            <div className="col-start-5 col-end-6 max-md:col-span-6">
              <h1 className="mt-5 text-xl font-satoshi font-bold text-[#4b077c]">
                Gross Total
              </h1>
            </div>
            <div className="col-start-6 col-end-7 max-md:col-span-6">
              <h1 className="mt-5 text-xl font-satoshi font-bold text-[#4b077c]">
                {` ₹ ${new Intl.NumberFormat("en-IN").format(
                  cartItems &&
                    cartItems.reduce(
                      (acc, item) => acc + item.price * item.quantity,
                      0
                    )
                )}`}
              </h1>
            </div>
            <div className="col-start-5 col-end-7 mt-5 max-md:col-span-6">
              <button
                onClick={() => {
                  cartItems && storedCartItems && cartItems.length > 0
                    ? router.push("/checkout/shipping")
                    : toast.error("No products in cart");
                }}
                className="bg-[#fe7f07] text-md w-full font-semibold text-white px-6 py-2 rounded-lg"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Page;
