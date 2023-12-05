"use client";

import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signInSchema } from "../../models/signUpSchema";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, login } from "../redux/features/auth/authSlice";
import EmailIcon from "@mui/icons-material/Email";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MetaData from "@components/MetaData";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { isSuccess, isLoggedIn, isError } = useSelector((state) => state.auth);

  const onSubmit = (values, actions) => {
    console.log(values);

    const userData = {
      email: values.email,
      password: values.password,
    };

    dispatch(login(userData));
  };

  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      router.push("/");
    }
    if (isError) {
      toast.error("Invalid Credentials");
    }
  }, [isError, isSuccess, isLoggedIn, router]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <section className="md:mt-[130px] mt-[100px] mb-20 my-[100px] lg:mx-20 ">
      <MetaData title="Login" />
      <div className="flex justify-center items-start gap-10 max-lg:flex-col">
        <div className="flex flex-col justify-center items-center w-full px-10 mt-10">
          <Image
            src="/assets/icons/registerlogo.png"
            alt="Register Logo"
            width={250}
            height={100}
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
            The ShoppingGo login page is your gateway to a seamless online
            shopping experience. With a user-friendly design, it offers a quick
            and secure way to access your account, manage your preferences, and
            explore a world of products and deals
          </p>
        </div>
        <div className="flex flex-col justify-center items-center  w-full max-md:px-7">
          <h1 className="text-xl text-slate-500">
            Login to{" "}
            <span className="text-2xl text-[#4b077c] font-bold font-inter">
              Shoping<span className="text-2xl text-[#92c340]">Go</span>
            </span>
          </h1>
          <div className="w-full px-8 py-10 shadow-xl flex-col mt-10 rounded-lg">
            <Formik
              initialValues={initialValues}
              validationSchema={signInSchema}
              onSubmit={onSubmit}
            >
              {({ errors, touched, values, handleChange, isSubmitting }) => (
                <Form>
                  <label
                    htmlFor="email"
                    className=" text-gray-700 text-md flex flex-col mb-5 relative"
                  >
                    <span className="flex text-slate-500 font-semibold mb-3">
                      <EmailIcon className="text-slate-500" /> &nbsp; Email
                    </span>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter Your Email"
                      value={values.email}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c]"
                    />
                  </label>
                  <div className="text-sm text-red-500 font-satoshi my-2 mx-2">
                    {errors.email && touched.email && <p>{errors.email}</p>}
                  </div>

                  <label
                    htmlFor="password"
                    className=" text-gray-700 text-md flex flex-col mb-5 relative"
                  >
                    <span className="flex text-slate-500 font-semibold mb-3">
                      <VpnKeyIcon className="text-slate-500" /> &nbsp; Password
                    </span>
                    <Field
                      type={isPasswordVisible ? "text" : "password"}
                      name="password"
                      placeholder="Enter Your Password"
                      value={values.password}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c]"
                    />
                    <div
                      className="absolute right-3 top-[55%] cursor-pointer text-slate-500 text-base"
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordVisible ? (
                        <VisibilityOffIcon fontSize="small" />
                      ) : (
                        <VisibilityIcon fontSize="small" />
                      )}
                    </div>
                  </label>
                  <div className="text-sm text-red-500 font-satoshi my-2 mx-2">
                    {errors.password && touched.password && (
                      <p>{errors.password}</p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Link
                      href="/password/forgotpassword"
                      className="text-md text-slate-500 font-satoshi my-2 mx-2"
                    >
                      Forgot Password ?
                    </Link>
                  </div>

                  <center>
                    <input
                      type="submit"
                      value="Sign In"
                      name="submit"
                      disabled={isSubmitting ? true : false}
                      className={
                        isSubmitting
                          ? "bg-gray-400 mt-6 max-xl:mb-4 text-md font-semibold text-white px-6 py-2 rounded-lg cursor-not-allowed"
                          : "bg-[#fe7f07] mt-6 max-xl:mb-4 text-md font-semibold text-white px-6 py-2 rounded-lg cursor-pointer"
                      }
                    />
                  </center>
                  <p className="text-md text-slate-500 text-center my-3">
                    Don't have a account ?{" "}
                    <Link href="/register">
                      <span className="text-lg text-blue-500"> SignUp</span>
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
