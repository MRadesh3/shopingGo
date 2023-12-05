"use client";

import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { updatePasswordSchema } from "@models/signUpSchema";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET_AUTH,
  updatepassword,
} from "../../redux/features/auth/authSlice";
import Loading from "@app/loading";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MetaData from "@components/MetaData";

const initialValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { isLoading, isUpdated, isError } = useSelector((state) => state.auth);

  const onSubmit = (values, actions) => {
    console.log(values);

    const passwords = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    };

    dispatch(updatepassword(passwords));
  };

  useEffect(() => {
    if (isUpdated) {
      router.push("/profile");
    }
    dispatch(RESET_AUTH());
  }, [dispatch, isUpdated, router]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const togglePasswordVisibility1 = () => {
    setIsPasswordVisible1(!isPasswordVisible1);
  };
  const togglePasswordVisibility2 = () => {
    setIsPasswordVisible2(!isPasswordVisible2);
  };

  return (
    <section className=" md:mt-[130px] mt-[100px] mb-20 my-[100px]">
      <MetaData title="Update Password" />
      <div className="flex justify-center items-start gap-10 max-lg:flex-col">
        <div className="flex flex-col justify-center items-center w-full px-10">
          <Image
            src="/assets/icons/change-password.png"
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
            Your safety is our top priority, and changing your password
            regularly is a simple yet effective way to safeguard your
            information
          </p>
        </div>
        <div className="flex flex-col justify-center items-center  w-full max-md:px-7">
          <h1 className="text-xl text-slate-500">
            <span className="text-2xl text-[#4b077c] font-bold font-inter">
              Change<span className="text-2xl text-[#92c340]"> Password</span>
            </span>
          </h1>
          <div className="w-full px-8 py-10 shadow-xl flex-col mt-5 rounded-lg">
            {isLoading ? (
              <Loading />
            ) : (
              <Formik
                initialValues={initialValues}
                validationSchema={updatePasswordSchema}
                onSubmit={onSubmit}
              >
                {({ errors, touched, values, handleChange }) => (
                  <Form>
                    <label
                      htmlFor="oldPassword"
                      className=" text-gray-700 text-md flex flex-col mb-5 relative"
                    >
                      <span className="flex text-slate-500 font-semibold mb-3">
                        <VpnKeyIcon /> &nbsp; Old Password
                      </span>
                      <Field
                        type={isPasswordVisible ? "text" : "password"}
                        name="oldPassword"
                        placeholder="Enter Your Old Password"
                        value={values.oldPassword}
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
                      {errors.oldPassword && touched.oldPassword && (
                        <p>{errors.oldPassword}</p>
                      )}
                    </div>

                    <label
                      htmlFor="newPassword"
                      className=" text-gray-700 text-md flex flex-col mb-5 relative"
                    >
                      <span className="flex text-slate-500 font-semibold mb-3">
                        <LockOpenIcon /> &nbsp; New Password
                      </span>
                      <Field
                        type={isPasswordVisible1 ? "text" : "password"}
                        name="newPassword"
                        placeholder="Create New Password"
                        value={values.newPassword}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c]"
                      />
                      <div
                        className="absolute right-3 top-[55%] cursor-pointer text-slate-500 text-base"
                        onClick={togglePasswordVisibility1}
                      >
                        {isPasswordVisible1 ? (
                          <VisibilityOffIcon fontSize="small" />
                        ) : (
                          <VisibilityIcon fontSize="small" />
                        )}
                      </div>
                    </label>
                    <div className="text-sm text-red-500 font-satoshi my-2 mx-2">
                      {errors.newPassword && touched.newPassword && (
                        <p>{errors.newPassword}</p>
                      )}
                    </div>

                    <label
                      htmlFor="confirmPassword"
                      className=" text-gray-700 text-md flex flex-col mb-5 relative"
                    >
                      <span className="flex text-slate-500 font-semibold mb-3">
                        <LockIcon /> &nbsp; Confirm Password
                      </span>
                      <Field
                        type={isPasswordVisible2 ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Enter Confirm Password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c]"
                      />
                      <div
                        className="absolute right-3 top-[55%] cursor-pointer text-slate-500 text-base"
                        onClick={togglePasswordVisibility2}
                      >
                        {isPasswordVisible2 ? (
                          <VisibilityOffIcon fontSize="small" />
                        ) : (
                          <VisibilityIcon fontSize="small" />
                        )}
                      </div>
                    </label>
                    <div className="text-sm text-red-500 font-satoshi my-2 mx-2">
                      {errors.confirmPassword && touched.confirmPassword && (
                        <p>{errors.confirmPassword}</p>
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

                    {error && (
                      <div className="text-md text-center text-red-500 font-satoshi my-2 mx-2">
                        {error}
                      </div>
                    )}

                    <center>
                      <button
                        type="submit"
                        className="bg-[#fe7f07] mt-6 max-xl:mb-4 text-md font-semibold text-white px-6 py-2 rounded-lg"
                      >
                        Change Password
                      </button>
                    </center>
                    <p className="text-md text-slate-500 text-center my-3">
                      Go back to{" "}
                      <Link href="/profile">
                        <span className="text-lg text-blue-500">Profile</span>
                      </Link>
                    </p>
                  </Form>
                )}
              </Formik>
            )}
            {/* <div className="relative flex py-6 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-500">
              Or continue with
            </span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div> */}
            {/* <div
            onClick={() => googleSignIn()}
            className="flex cursor-pointer justify-center gap-5 items-center border-slate-400 border px-2 py-2 rounded-lg"
          >
            <FcGoogle className="text-xl" />
            <p>Login with Google</p>
          </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
