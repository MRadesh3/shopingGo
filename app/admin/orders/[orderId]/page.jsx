"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "@components/MetaData";
import {
  getorderdetails,
  updateorder,
  deleteorder,
} from "@app/redux/features/admin/orders/orderSliceAd";
import Loading from "@app/loading";
import { useRouter } from "next/navigation";
import CartItem from "@components/CartItem";
import { dateIN } from "@functions";
import Sidebar from "@components/Sidebar";
import GradingIcon from "@mui/icons-material/Grading";
import { Formik, Form, Field } from "formik";
import AlertDialogBox from "@components/Alert";

const Page = (req, { params }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { order, isLoading } = useSelector((state) => state.orderAd);

  useEffect(() => {
    dispatch(getorderdetails(req.params.orderId));
  }, [dispatch, req.params.orderId]);

  const initialValues = {
    orderStatus: "",
  };

  const onSubmit = async (values, actions) => {
    console.log(values);
    const orderStatus = values.orderStatus;
    const orderId = req.params.orderId;

    await dispatch(updateorder({ orderStatus, orderId }));
    router.push("/admin/orders");
  };

  const deleteOrderHandler = async () => {
    await dispatch(deleteorder(req.params.orderId));
    router.push("/admin/orders");
  };

  return (
    <section className="md:mt-[110px] mt-[100px] mb-20 my-[100px]">
      <MetaData title="Order Details" />

      <div className="grid grid-cols-6 gap-2">
        <div className="col-span-1 max-md:col-span-6 h-full border-r-2">
          <Sidebar />
        </div>
        <div className="col-span-5 max-md:col-span-6 mx-4">
          <div className="flex flex-col justify-center items-center ">
            <h1 className="mt-5 text-xl font-satoshi font-bold text-[#4b077c]">
              Admin - Order Details - {order && order._id}
            </h1>
            <hr className="h-[1.5px] my-3  w-[30%] bg-gray-200 border-0 rounded dark:bg-gray-300" />
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className="grid grid-cols-6 gap-4 mt-5">
                <div className="col-span-3 max-lg:col-span-6 lg:px-5">
                  <div className="mb-6">
                    <h1 className="text-lg font-satoshi font-semibold mb-5 tracking-wide text-[#4b077c]">
                      Shipping Information
                    </h1>
                    <div className="flex flex-col justify-start items-start">
                      <div className="grid grid-cols-7 gap-3 max-md:gap-2">
                        <p className=" col-span-2 max-md:col-span-2 text-base font-semibold mb-2">
                          Name :{" "}
                        </p>
                        <p className="col-start-3 col-end-8 max-md:col-span-5">
                          {order.user && order.user.name}
                        </p>
                        <p className=" col-span-2 max-md:col-span-2 text-base font-semibold mb-2">
                          Phone Number :{" "}
                        </p>
                        <p className="col-start-3 col-end-8 max-md:col-span-5">
                          {order.shippingInfo && order.shippingInfo.phone}
                        </p>
                        <p className=" col-span-2 max-md:col-span-2 text-base font-semibold mb-2">
                          Email Id :{" "}
                        </p>
                        <p className="col-start-3 col-end-8 max-md:col-span-5">
                          {order.user && order.user.email}
                        </p>
                        <p className=" col-span-2 max-md:col-span-2 text-base font-semibold mb-2">
                          Address :{" "}
                        </p>
                        <p className="col-start-3 col-end-8 max-md:col-span-5">
                          {order.shippingInfo && order.shippingInfo.address},{" "}
                          {order.shippingInfo && order.shippingInfo.city},{" "}
                          {order.shippingInfo && order.shippingInfo.postalCode},{" "}
                          {order.shippingInfo && order.shippingInfo.state},{" "}
                          {order.shippingInfo && order.shippingInfo.country}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h1 className="text-lg font-satoshi font-semibold mb-5 tracking-wide text-[#4b077c]">
                      Payment Information
                    </h1>
                    <div className="flex flex-col justify-start items-start">
                      <div className="grid grid-cols-7 gap-3 max-md:gap-2">
                        <p className=" col-span-2 max-md:col-span-2 text-base font-semibold mb-2">
                          Payment ID :{" "}
                        </p>
                        <p className="col-start-3 col-end-8 max-md:col-span-5">
                          {order.paymentInfo && order.paymentInfo.id}
                        </p>
                        <p className=" col-span-2 max-md:col-span-2 text-base font-semibold mb-2">
                          Payment Date :{" "}
                        </p>
                        <p className="col-start-3 col-end-8 max-md:col-span-5">
                          {order && dateIN(order.paidAt)}
                        </p>
                        <p className=" col-span-2 max-md:col-span-2 text-base font-semibold mb-2">
                          Payment Status :{" "}
                        </p>
                        <p
                          className={
                            order.paymentInfo &&
                            order.paymentInfo.status === "succeeded"
                              ? "col-start-3 col-end-5 max-md:col-span text-green-500 px-2 py-1 rounded-lg text-center font-extrabold font-satoshi tracking-wider"
                              : "col-start-3 col-end-5 max-md:col-span-3 text-red-500 px-2 py-1 rounded-lg text-center font-extrabold font-satoshi tracking-wider"
                          }
                        >
                          {order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "PAID"
                            : "NOT PAID"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-3 max-lg:col-span-6 lg:px-5">
                  <div className="shadow-xl px-10 rounded-xl py-10">
                    <h1 className="text-lg text-center font-satoshi font-semibold mb-8 tracking-wide text-[#4b077c]">
                      Order Summary
                    </h1>

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

                    <hr className="h-[1.5px] my-6 bg-gray-200 border-0 rounded dark:bg-gray-300" />
                    <div className="flex justify-between mb-6">
                      <p className="text-base font-semibold">Order Status : </p>
                      <p
                        className={
                          order && order.orderStatus === "Processing"
                            ? "text-white bg-yellow-500 font-medium px-3 py-2 rounded-lg text-center"
                            : order && order.orderStatus === "Shipped"
                            ? "text-white bg-blue-500 font-medium px-3 py-2 rounded-lg text-center"
                            : order && order.orderStatus === "Delivered"
                            ? "text-white bg-yellow-500 font-medium px-3 py-2 rounded-lg text-center"
                            : ""
                        }
                      >
                        {" "}
                        {order && order.orderStatus}{" "}
                      </p>
                    </div>
                    <div
                      className={
                        order && order.deliveredAt
                          ? "flex justify-between mb-4"
                          : "hidden"
                      }
                    >
                      <p className="text-base font-semibold">
                        Delivered Date :{" "}
                      </p>
                      <p>{dateIN(order && order.deliveredAt)}</p>
                    </div>

                    <div
                      className={
                        order && order.orderStatus === "Delivered"
                          ? "hidden"
                          : "block"
                      }
                    >
                      <Formik initialValues={initialValues} onSubmit={onSubmit}>
                        {({ values, handleChange, isSubmitting }) => (
                          <Form>
                            {" "}
                            <div className="grid grid-cols-4 gap-4">
                              <label
                                htmlFor="orderStatus"
                                className=" text-gray-700 text-md flex flex-col relative col-span-2 max-md:col-span-4 max-md:mb-4"
                              >
                                <Field
                                  as="select"
                                  type="text"
                                  name="orderStatus"
                                  placeholder="Enter Your Confirm Password"
                                  value={values.orderStatus}
                                  onChange={handleChange}
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c]"
                                >
                                  <option value="">Choose status</option>
                                  {order &&
                                    order.orderStatus === "Processing" && (
                                      <option value="Shipped">Shipped</option>
                                    )}
                                  {order && order.orderStatus === "Shipped" && (
                                    <option value="Delivered">Delivered</option>
                                  )}
                                </Field>
                                <div className="absolute right-3 top-[13%] cursor-pointer text-slate-500 text-base">
                                  <GradingIcon />
                                </div>
                              </label>
                              <input
                                type="submit"
                                value="Update Status"
                                name="submit"
                                disabled={
                                  !values.orderStatus || isSubmitting
                                    ? true
                                    : false
                                }
                                className={
                                  !values.orderStatus || isSubmitting
                                    ? "bg-gray-400 max-md:mb-4 text-sm font-semibold text-white px-4 py-2 rounded-lg cursor-not-allowed col-span-2 max-md:col-span-4"
                                    : "bg-[#fe7f07] max-md:mb-4 text-sm font-semibold text-white px-4 py-2 rounded-lg cursor-pointer col-span-2 max-md:col-span-4"
                                }
                              />
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                    <div className="mt-10 flex justify-end">
                      <AlertDialogBox
                        deleteHandler={deleteOrderHandler}
                        type={`order : ${order && order._id}`}
                        btnName="Delete Order"
                      />
                    </div>
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
                  {order.orderItems && order.orderItems.length > 0 ? (
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
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
