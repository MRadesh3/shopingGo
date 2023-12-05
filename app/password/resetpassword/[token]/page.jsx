"use client";

import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { resetPasswordSchema } from "../../../../models/signUpSchema";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Loading from "@app/loading";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "@components/MetaData";
import { useEffect } from "react";
import { resetpassword } from "../../../redux/features/auth/authSlice";

const initialValues = {
  newPassword: "",
  confirmPassword: "",
};

const Page = (req, { params }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, isSuccess, isUpdated } = useSelector(
    (state) => state.auth
  );
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);

  const onSubmit = (values, actions) => {
    console.log(values);
    const token = req.params.token;
    const passwords = {
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    };

    dispatch(resetpassword({ token, passwords }));
  };

  useEffect(() => {
    if (isSuccess && isUpdated) {
      router.push("/login");
    }
  }, [isSuccess, isUpdated, router]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const togglePasswordVisibility1 = () => {
    setIsPasswordVisible1(!isPasswordVisible1);
  };

  return (
    <section className="md:mt-[130px] mt-[100px] mb-20 my-[100px] lg:mx-20 ">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-4">
          <MetaData title="Reset Password" />
          <div className="col-start-2 col-end-4 shadow-xl px-20 max-lg:px-5 py-10 rounded-xl max-md:col-span-4">
            <div className="mt-2 w-full">
              <Image
                src="/assets/icons/reset-password.png"
                width={100}
                height={100}
                alt="reset-password"
                className="object-contain mx-auto mb-7"
              ></Image>
              <Formik
                initialValues={initialValues}
                validationSchema={resetPasswordSchema}
                onSubmit={onSubmit}
              >
                {({ errors, touched, values, handleChange }) => (
                  <Form>
                    <label
                      htmlFor="newPassword"
                      className=" text-gray-700 text-md flex flex-col mb-5 relative w-full"
                    >
                      <span className="flex text-slate-500 font-semibold mb-3">
                        <LockOpenIcon /> &nbsp; New Password
                      </span>
                      <Field
                        type={isPasswordVisible ? "text" : "password"}
                        name="newPassword"
                        placeholder="Create Your New Password"
                        value={values.newPassword}
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
                        type={isPasswordVisible1 ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Enter Your Confirm Password"
                        value={values.confirmPassword}
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
                      {errors.confirmPassword && touched.confirmPassword && (
                        <p>{errors.confirmPassword}</p>
                      )}
                    </div>

                    <center>
                      <button
                        type="submit"
                        className="bg-[#fe7f07] mt-6 max-xl:mb-4 text-md font-semibold text-white px-6 py-2 rounded-lg"
                      >
                        Reset Password
                      </button>
                    </center>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Page;
