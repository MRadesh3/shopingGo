"use client";

import { Formik, Form, Field } from "formik";
import EmailIcon from "@mui/icons-material/Email";
import { forgotPasswordSchema } from "../../../models/signUpSchema";
import { useDispatch, useSelector } from "react-redux";
import { forgotpassword } from "../../redux/features/auth/authSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MetaData from "@components/MetaData";
import Loading from "@app/loading";

const Page = () => {
  const dispatch = useDispatch();
  const { isLoading, isUpdated } = useSelector((state) => state.auth);
  const router = useRouter();

  const initialValues = {
    email: "",
  };

  const onSubmit = (values, actions) => {
    console.log(values);

    const email = {
      email: values.email,
    };
    dispatch(forgotpassword(email));
  };

  useEffect(() => {
    if (isUpdated) {
      router.push("/login");
    }
  }, [isUpdated, router]);

  return (
    <section className="md:mt-[130px] mt-[100px] mb-20 my-[100px] lg:mx-20 ">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-7">
          <MetaData title="Forgot Password" />
          <div className="col-start-2 col-end-4 text-center max-md:col-span-7 mt-20 bg-[#37164f] text-white px-5 py-10 shadow-xl">
            <h1 className="font-satoshi text-xl font-semibold tracking-wide mb-5">
              Forgot Your Password ?
            </h1>
            <p className="text-base">
              To reset your password, enter the registered e-mail address and we
              will send you password reset link on your e-mail
            </p>
          </div>
          <div className="col-start-4 col-end-7 max-md:col-span-7 mt-20 shadow-xl px-10 py-10">
            <Formik
              initialValues={initialValues}
              validationSchema={forgotPasswordSchema}
              onSubmit={onSubmit}
            >
              {({ errors, touched, values, handleChange }) => (
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
                  <center>
                    <button
                      type="submit"
                      className="bg-[#fe7f07] mt-6 max-xl:mb-4 text-md font-semibold text-white px-6 py-2 rounded-lg"
                    >
                      Send Reset Link
                    </button>
                  </center>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </section>
  );
};

export default Page;
