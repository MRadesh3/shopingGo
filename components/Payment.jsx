"use client";

import { useEffect, useState, useRef } from "react";
import CheckOutSteps from "@components/CheckOutSteps";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "@components/MetaData";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import Image from "next/image";
import { Formik, Form, Field } from "formik";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  addproducttocart,
  removeproductfromcart,
  shippingaddress,
  RESET_CART_STATE,
} from "../app/redux/features/cart/cartSlice";
import {
  createneworder,
  resetOrder,
} from "@app/redux/features/order/orderSlice";
import { ElementStripe } from "@app/redux/Elements";
import Loading from "@app/loading";

const initialValues = {
  amount: 0,
  cardNumber: "",
};

const Page = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderInfo, setOrderInfo] = useState({});
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingAddress, isLoading } = useSelector(
    (state) => state.cart
  );
  const { isSuccess } = useSelector((state) => state.order);

  useEffect(() => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    if (orderInfo) {
      setTotalPrice(orderInfo.totalprice);
      setOrderInfo(orderInfo);
    }
    const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
    if (shippingAddress) {
      const data = shippingAddress;
      dispatch(shippingaddress(data));
    }
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems) {
      cartItems.forEach((item) => {
        dispatch(
          addproducttocart({ productId: item._id, quantity: item.quantity })
        );
      });
    }
  }, [dispatch]);

  const paymentInfo = {
    amount: Math.round(totalPrice * 100),
  };

  const order = {
    shippingInfo: shippingAddress && shippingAddress,
    orderItems: cartItems && cartItems,
    itemsPrice: orderInfo && orderInfo.subtotal,
    taxPrice: orderInfo && orderInfo.tax,
    shippingPrice: orderInfo && orderInfo.shippingCharges,
    totalPrice: totalPrice,
  };

  const onSubmit = async () => {
    if (cartItems && cartItems.length === 0) {
      toast.error("Your cart is empty, please add some products");
      return router.push("/cart");
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/payment", paymentInfo, config);
      console.log(data);
      const clientSecret = data.client_secret;
      if (!stripe || !elements) {
        return;
      }
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user && user.user.name,
            email: user && user.user.email,
            address: {
              line1: shippingAddress && shippingAddress.address,
              postal_code: shippingAddress && shippingAddress.postalCode,
              city: shippingAddress && shippingAddress.city,
              country: shippingAddress && shippingAddress.country,
            },
          },
        },
      });

      console.log(result);

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          console.log(order);

          dispatch(createneworder(order));
          toast.success("Order placed successfully");
          router.push("/checkout/success");
          dispatch(RESET_CART_STATE());
          cartItems.forEach((item) => {
            dispatch(removeproductfromcart(item._id));
          });
        } else {
          toast.error("There is some issue while payment processing");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("There is some issue while payment processing");
    }
  };

  return (
    <>
      <section className="md:mt-[110px] mt-[100px] mb-20 my-[100px] lg:mx-20">
        <CheckOutSteps activeStep={2} />
        <MetaData title="Payment Process" />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="flex max-lg:flex-col gap-10 mt-10">
              <div className="flex flex-col items-center mt-10 w-full px-10">
                <Image
                  src="/assets/icons/payment.png"
                  width={150}
                  height={100}
                  alt="PAyment Logo"
                  className="object-contain"
                ></Image>
                <h3 className="mt-4 text-center">
                  <span className="text-lg text-[#fe7f07] font-satoshi font-semibold">
                    Welcome To{" "}
                  </span>
                  <span className="text-2xl text-[#4b077c] font-bold font-inter">
                    Shoping<span className="text-2xl text-[#92c340]">Go</span>
                  </span>
                </h3>
                <p className="mt-2 text-center text-slate-500 lg:max-w-xl">
                  Transparent pricing and no hidden fees for a straightforward
                  payment process
                </p>
              </div>
              <div className="flex flex-col justify-center items-center  w-full max-md:px-7">
                <h1 className="text-xl text-slate-500">
                  <span className="text-2xl text-[#4b077c] font-bold font-inter">
                    Card
                    <span className="text-2xl text-[#92c340]"> Info</span>
                  </span>
                </h1>
                <div className="w-full px-8 py-10 shadow-xl flex-col mt-4 rounded-lg">
                  <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ isSubmitting }) => (
                      <Form>
                        <label
                          htmlFor="cardNumber"
                          className=" text-gray-700 text-md flex flex-col mb-5 relative"
                        >
                          <span className="flex text-slate-500 font-semibold mb-3">
                            <CreditCardIcon className="text-slate-500" /> &nbsp;
                            Card Number
                          </span>
                          <CardNumberElement className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c]" />
                        </label>

                        <label
                          htmlFor="cardExpiry"
                          className=" text-gray-700 text-md flex flex-col mb-5 relative"
                        >
                          <span className="flex text-slate-500 font-semibold mb-3">
                            <EventIcon className="text-slate-500" /> &nbsp;
                            Expiry Date
                          </span>
                          <CardExpiryElement className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c]" />
                        </label>

                        <label
                          htmlFor="cardCvc"
                          className=" text-gray-700 text-md flex flex-col mb-5 relative"
                        >
                          <span className="flex text-slate-500 font-semibold mb-3">
                            <VpnKeyIcon className="text-slate-500" /> &nbsp; CVC
                          </span>
                          <CardCvcElement className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c]" />
                        </label>

                        <center>
                          <input
                            type="submit"
                            value={
                              cartItems && cartItems.length === 0
                                ? ` ₹ - 0`
                                : `Pay - ₹ ${new Intl.NumberFormat(
                                    "en-In"
                                  ).format(totalPrice)}`
                            }
                            name="submit"
                            disabled={isSubmitting ? true : false}
                            className={
                              isSubmitting
                                ? "bg-gray-400 mt-6 max-xl:mb-4 text-md font-semibold text-white px-6 py-2 rounded-lg cursor-not-allowed"
                                : "bg-[#fe7f07] mt-6 max-xl:mb-4 text-md font-semibold text-white px-6 py-2 rounded-lg cursor-pointer"
                            }
                          />
                        </center>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Page;
