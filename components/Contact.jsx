"use client";

import Image from "next/image";
import Link from "next/link";
import { BsCartCheckFill } from "react-icons/bs";
import { Formik, Form, Field } from "formik";
import EmailIcon from "@mui/icons-material/Email";
import { subscriberSchema } from "@models/signUpSchema";
import { useDispatch } from "react-redux";
import { registersubscriber } from "@app/redux/features/admin/subscribers/subscribersSliceAd";

const initialValues = {
  email: "",
};

const Contact = () => {
  const dispatch = useDispatch();

  const onSubmit = async (values, action) => {
    console.log(values);
    const email = values.email;
    await dispatch(registersubscriber({ email: email }));
    action.resetForm();
    toast.success("Subscribed Successfully");
  };
  return (
    <section className="my-[100px] lg:mx-20 mx-5 flex max-lg:flex-col gap-10">
      <div className="flex flex-col justify-center items-center w-full">
        <Image
          src="/assets/icons/contactlogo.png"
          width={400}
          height={100}
          alt="Contact Logo"
        ></Image>
        <h3 className="mt-4 text-center">
          <span className="text-2xl text-[#4b077c] font-bold font-inter">
            Shoping<span className="text-2xl text-[#92c340]">Go</span>
          </span>{" "}
          -{" "}
          <span className="text-lg text-[#fe7f07] font-satoshi font-semibold">
            Where Style Meets Savings
          </span>
        </h3>
        <p className="mt-2 text-center text-slate-500 lg:max-w-xl">
          Welcome to ShopingGo, your one-stop destination for an unparalleled
          online shopping experience. At ShopingGo, we've curated a vast
          selection of high-quality products, ranging from fashion and
          electronics to home and lifestyle items, all designed to enhance your
          everyday life.
        </p>
        <Link href="/products">
          <button className="bg-[#fe7f07] mt-6 max-xl:mb-4 text-md font-semibold text-white px-6 py-2 rounded-lg">
            Shop Now
            <BsCartCheckFill className="inline-block ml-1" />
          </button>
        </Link>
      </div>
      <div className="flex flex-col shadow-2xl justify-center items-center px-5 py-10 w-full rounded-2xl">
        <h1 className="text-2xl text-[#4b077c] font-semibold mb-2">
          We Make Shopping Easier
        </h1>
        <p className="mt-4 text-center text-slate-500 lg:max-w-xl">
          Receive products news and updates in your inbox
        </p>
        <div className="w-full mt-4 p-10 max-md:p-3 rounded-xl">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={subscriberSchema}
          >
            {({ errors, touched, values, handleChange, isSubmitting }) => (
              <Form>
                <label
                  htmlFor="email"
                  className=" text-gray-700 text-md flex flex-col mb-5 relative"
                >
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter Your Email Id"
                    value={values.email}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c]"
                  />
                  <div className="absolute right-3 top-[15%] cursor-pointer text-slate-500 text-base">
                    <EmailIcon />
                  </div>
                </label>
                <div className="text-sm text-red-500 font-satoshi my-2 mx-2">
                  {errors.email && touched.email && <p>{errors.email}</p>}
                </div>

                <center>
                  <input
                    type="submit"
                    value="Submit"
                    name="submit"
                    disabled={isSubmitting || !values.email ? true : false}
                    className={
                      isSubmitting || !values.email
                        ? "bg-gray-400 w-[40%] mt-6 max-xl:mb-4 text-md font-semibold text-white px-6 py-2 rounded-lg cursor-not-allowed"
                        : "bg-red-500 w-[40%] mt-6 max-xl:mb-4 text-md font-semibold text-white px-6 py-2 rounded-lg cursor-pointer"
                    }
                  />{" "}
                </center>
              </Form>
            )}
          </Formik>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 mt-5">
          <div>
            <h1 className="text-md text-slate-500">
              Supported Payment Methods :{" "}
            </h1>
          </div>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <Image
              src="/assets/icons/mastercard.png"
              alt="mastercard"
              width={40}
              height={40}
            ></Image>
            <Image
              src="/assets/icons/visa.png"
              alt="Visa"
              width={40}
              height={40}
            ></Image>
            <Image
              src="/assets/icons/rupay.png"
              alt="Rupay"
              width={50}
              height={50}
            ></Image>
            <Image
              src="/assets/icons/amazon-pay.png"
              alt="AMazon Pay"
              width={50}
              height={50}
            ></Image>
            <Image
              src="/assets/icons/paytm.png"
              alt="Paytm"
              width={40}
              height={40}
            ></Image>
            <Image
              src="/assets/icons/paypal.png"
              alt="Pay Pal"
              width={40}
              height={40}
            ></Image>
            <Image
              src="/assets/icons/google-pay.png"
              alt="Google Pay"
              width={40}
              height={40}
            ></Image>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
