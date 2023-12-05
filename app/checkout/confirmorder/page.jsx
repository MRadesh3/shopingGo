"use client";

import Loading from "@app/loading";
import { useDispatch, useSelector } from "react-redux";
import CheckOutSteps from "@components/CheckOutSteps";
import MetaData from "@components/MetaData";
import { useEffect } from "react";
import {
  addproducttocart,
  shippingaddress,
} from "../../redux/features/cart/cartSlice";
import CartItem from "@components/CartItem";
import PaymentIcon from "@mui/icons-material/Payment";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cartItems, shippingAddress, isLoading } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems) {
      cartItems.forEach((item) => {
        dispatch(
          addproducttocart({ productId: item._id, quantity: item.quantity })
        );
      });
    }
    const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
    if (shippingAddress) {
      const data = shippingAddress;
      dispatch(shippingaddress(data));
    }
  }, [dispatch]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges =
    cartItems && cartItems.length > 0 ? `${subtotal > 1000 ? 0 : 100}` : 0;
  const tax = subtotal * 0.18;
  const totalprice = subtotal + parseInt(shippingCharges) + tax;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalprice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    if (cartItems && cartItems.length === 0) {
      toast.error("Your cart is empty");
      return router.push("/cart");
    }
    toast.success("Proceeding to payment");
    router.push("/checkout/payment");
  };

  return (
    <section className="md:mt-[110px] mt-[100px] mb-20 my-[100px] max-lg:mx-10 lg:mx-20">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <CheckOutSteps activeStep={1} />
          <MetaData title="Confirm Order" />
          <div className="flex flex-col justify-center items-center ">
            <h1 className="mt-5 text-xl font-satoshi font-bold text-[#4b077c]">
              Confirm Order
            </h1>
            <hr className="h-[1.5px] my-3  w-[30%] bg-gray-200 border-0 rounded dark:bg-gray-300" />
          </div>
          <div className="grid grid-cols-6 gap-5 mt-5">
            <div className="col-span-6 lg:col-span-4 lg:border-r-2 lg:px-5">
              <div>
                <h1 className="text-lg font-satoshi font-semibold mb-5 tracking-wide text-[#4b077c]">
                  Shipping Information
                </h1>
                <div className="flex flex-col justify-start items-start">
                  <div className="grid grid-cols-5 gap-4 max-md:gap-2">
                    <p className=" col-span-1 max-md:col-span-2 text-base font-semibold">
                      Name :{" "}
                    </p>
                    <p className="col-start-2 col-end-6 max-md:col-span-3">
                      {user && user.user.name}
                    </p>
                    <p className=" col-span-1 max-md:col-span-2 text-base font-semibold">
                      Phone Number :{" "}
                    </p>
                    <p className="col-start-2 col-end-6 max-md:col-span-3">
                      {shippingAddress && shippingAddress.phone}
                    </p>
                    <p className=" col-span-1 max-md:col-span-2 text-base font-semibold">
                      Address :{" "}
                    </p>
                    <p className="col-start-2 col-end-6 max-md:col-span-3">
                      {shippingAddress && shippingAddress.address},{" "}
                      {shippingAddress && shippingAddress.city},{" "}
                      {shippingAddress && shippingAddress.postalCode},{" "}
                      {shippingAddress && shippingAddress.state},{" "}
                      {shippingAddress && shippingAddress.country}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h1 className="text-lg font-satoshi font-semibold my-9 tracking-wide text-[#4b077c]">
                  Your Cart Items
                </h1>
                <div className="grid grid-cols-2 gap-5 w-full text-center bg-[#4b077c] text-white p-3 tracking-wide font-satoshi max-md:hidden">
                  <h1>Product</h1>
                  <h1>Quantity & Price</h1>
                </div>
                <div>
                  {cartItems && cartItems.length > 0 ? (
                    <>
                      {cartItems.map((item) => (
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
              <div className="shadow-xl px-10 rounded-xl">
                <h1 className="text-lg text-center font-satoshi font-semibold mb-8 tracking-wide text-[#4b077c]">
                  Order Summary
                </h1>
                <div className="flex justify-between mb-4">
                  <p className="text-base font-semibold">Sub Total : </p>
                  <p> ₹ {new Intl.NumberFormat("en-In").format(subtotal)} </p>
                </div>
                <div className=" flex justify-between mb-4">
                  <p className="text-base font-semibold">Shipping Charges : </p>
                  <p>
                    {" "}
                    ₹ {new Intl.NumberFormat("en-In").format(
                      shippingCharges
                    )}{" "}
                  </p>
                </div>
                <div className="flex justify-between mb-4">
                  <p className="text-base font-semibold">GST : </p>
                  <p> ₹ {new Intl.NumberFormat("en-In").format(tax)} </p>
                </div>
                <hr className="h-[1.5px] my-6 bg-gray-200 border-0 rounded dark:bg-gray-300" />
                <div className="flex justify-between mb-8 text-lg font-semibold">
                  <p>Total : </p>
                  <p> ₹ {new Intl.NumberFormat("en-In").format(totalprice)} </p>
                </div>
                <button
                  onClick={proceedToPayment}
                  className="bg-[#fe7f07] text-lg mb-10 font-semibold w-full text-white px-6 py-2 rounded-lg"
                >
                  Proceed to payment
                  <PaymentIcon className="inline-block ml-1 max-md:hidden" />
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
