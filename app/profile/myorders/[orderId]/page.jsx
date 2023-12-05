"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "@components/MetaData";
import { getorderdetails } from "@app/redux/features/order/orderSlice";
import Loading from "@app/loading";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import CartItem from "@components/CartItem";

const Page = (req, { params }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { order, isLoading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getorderdetails(req.params.orderId));
  }, [dispatch, req.params.orderId]);

  return (
    <section className="md:mt-[110px] mt-[100px] mb-20 my-[100px] max-lg:mx-10 lg:mx-20">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Order Details" />
          <div className="flex flex-col justify-center items-center ">
            <h1 className="mt-5 text-xl font-satoshi font-bold text-[#4b077c]">
              Order Details - {order && order._id}
            </h1>
            <hr className="h-[1.5px] my-3  w-[30%] bg-gray-200 border-0 rounded dark:bg-gray-300" />
          </div>
          <div className="grid grid-cols-6 gap-5 mt-5">
            <div className="col-span-6 lg:col-span-4 lg:border-r-2 lg:px-5">
              <div className="mb-6">
                <h1 className="text-lg font-satoshi font-semibold mb-5 tracking-wide text-[#4b077c]">
                  Shipping Information
                </h1>
                <div className="flex flex-col justify-start items-start">
                  <div className="grid grid-cols-5 gap-4 max-md:gap-2">
                    <p className=" col-span-1 max-md:col-span-2 text-base font-semibold">
                      Name :{" "}
                    </p>
                    <p className="col-start-2 col-end-6 max-md:col-span-3">
                      {order && order.user.name}
                    </p>
                    <p className=" col-span-1 max-md:col-span-2 text-base font-semibold">
                      Phone Number :{" "}
                    </p>
                    <p className="col-start-2 col-end-6 max-md:col-span-3">
                      {order && order.shippingInfo.phone}
                    </p>
                    <p className=" col-span-1 max-md:col-span-2 text-base font-semibold">
                      Address :{" "}
                    </p>
                    <p className="col-start-2 col-end-6 max-md:col-span-3">
                      {order && order.shippingInfo.address},{" "}
                      {order && order.shippingInfo.city},{" "}
                      {order && order.shippingInfo.postalCode},{" "}
                      {order && order.shippingInfo.state},{" "}
                      {order && order.shippingInfo.country}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h1 className="text-lg font-satoshi font-semibold mb-5 tracking-wide text-[#4b077c]">
                  Payment Information
                </h1>
                <div className="flex flex-col justify-start items-start">
                  <div className="grid grid-cols-5 gap-4 max-md:gap-2">
                    <p className=" col-span-1 max-md:col-span-2 text-base font-semibold">
                      Payment ID :{" "}
                    </p>
                    <p className="col-start-2 col-end-6 max-md:col-span-3">
                      {order && order.paymentInfo.id}
                    </p>
                    <p className=" col-span-1 max-md:col-span-2 text-base font-semibold">
                      Payment Status :{" "}
                    </p>
                    <p
                      className={
                        order && order.paymentInfo.status === "succeeded"
                          ? "col-start-2 col-end-6 max-md:col-span-3 text-green-500 px-2 py-1 rounded-lg font-extrabold font-satoshi tracking-wider"
                          : "col-start-2 col-end-6 max-md:col-span-3 text-red-500 px-2 py-1 rounded-lg font-extrabold font-satoshi tracking-wider"
                      }
                    >
                      {order && order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h1 className="text-lg font-satoshi font-semibold my-9 tracking-wide text-[#4b077c]">
                  Your Ordered Items
                </h1>
                <div className="grid grid-cols-2 gap-5 w-full text-center bg-[#4b077c] text-white p-3 tracking-wide font-satoshi max-md:hidden">
                  <h1>Product</h1>
                  <h1>Quantity & Price</h1>
                </div>
                <div>
                  {order && order.orderItems.length > 0 ? (
                    <>
                      {order.orderItems.map((item) => (
                        <>
                          <div
                            key={item._id}
                            className="grid grid-cols-2 max-md:grid-cols-1 gap-5 my-5 text-center"
                          >
                            <CartItem item={item} />
                            <p className="flex justify-center items-center">
                              {item.quantity} X ₹{" "}
                              {new Intl.NumberFormat("en-In").format(
                                item.price
                              )}{" "}
                              = &nbsp;
                              <b>
                                ₹{" "}
                                {new Intl.NumberFormat("en-In").format(
                                  item.quantity * item.price
                                )}
                              </b>
                            </p>
                          </div>
                          <hr className="h-[1.5px] my-3 bg-gray-200 border-0 rounded dark:bg-gray-300" />
                        </>
                      ))}
                    </>
                  ) : (
                    <div className="flex justify-center items-center">
                      <h1 className="text-lg font-satoshi font-semibold my-9 tracking-wide text-[#4b077c]">
                        Your Cart is Empty
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-6 lg:col-span-2 ">
              <div className="shadow-xl px-10 rounded-xl py-10">
                <h1 className="text-lg text-center font-satoshi font-semibold mb-8 tracking-wide text-[#4b077c]">
                  Order Summary
                </h1>
                <div className="flex justify-between mb-4">
                  <p className="text-base font-semibold">Order Status : </p>
                  <p
                    className={
                      order && order.orderStatus === "Processing"
                        ? "text-white bg-yellow-500 px-3 py-1 rounded-lg text-center"
                        : order && order.orderStatus === "Shipped"
                        ? "text-white bg-blue-500 px-3 py-1 rounded-lg text-center"
                        : order && order.orderStatus === "Delivered"
                        ? "text-white bg-yellow-500 px-3 py-1 rounded-lg text-center"
                        : ""
                    }
                  >
                    {" "}
                    {order && order.orderStatus}{" "}
                  </p>
                </div>
                <div className="flex justify-between mb-4">
                  <p className="text-base font-semibold">Items Amount : </p>
                  <p>
                    {" "}
                    ₹{" "}
                    {new Intl.NumberFormat("en-In").format(
                      order && order.itemsPrice
                    )}{" "}
                  </p>
                </div>
                <div className=" flex justify-between mb-4">
                  <p className="text-base font-semibold">Tax Amount : </p>
                  <p>
                    {" "}
                    ₹{" "}
                    {new Intl.NumberFormat("en-In").format(
                      order && order.taxPrice
                    )}{" "}
                  </p>
                </div>

                <hr className="h-[1.5px] my-6 bg-gray-200 border-0 rounded dark:bg-gray-300" />
                <div className="flex justify-between mb-8 text-lg font-semibold">
                  <p>Total Amount: </p>
                  <p>
                    {" "}
                    ₹{" "}
                    {new Intl.NumberFormat("en-In").format(
                      order && order.totalPrice
                    )}{" "}
                  </p>
                </div>
                <button
                  onClick={() => router.push("/products")}
                  className="bg-[#fe7f07] text-sm mb-10 font-semibold w-full text-white px-6 py-2 rounded-lg"
                >
                  Place New Orders
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Page;
