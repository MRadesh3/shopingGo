"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "@components/MetaData";
import {
  getuser,
  updateuserdetails,
  deleteuser,
} from "@app/redux/features/admin/users/usersSliceAd";
import Loading from "@app/loading";
import { useRouter } from "next/navigation";
import { dateIN } from "@functions";
import Sidebar from "@components/Sidebar";
import GradingIcon from "@mui/icons-material/Grading";
import { Formik, Form, Field } from "formik";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { updateUserAdSchema } from "@models/signUpSchema";
import AlertDialogBox from "@components/Alert";
import { generateSHA1 } from "@functions/signature";
import { generateSignature } from "@functions/signature";
import axios from "axios";
import { deletePhotoFromCloudinary } from "@actions/uploadActions";

const Page = (req, { params }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isLoading } = useSelector((state) => state.userAd);

  useEffect(() => {
    dispatch(getuser(req.params.userId));
  }, [dispatch, req.params.userId]);

  const initialValues = {
    name: user && user.name,
    email: user && user.email,
    phone: user && user.phone,
    role: "",
  };

  const onSubmit = async (values, actions) => {
    console.log(values);
    const userdetails = req.params.userId;
    const userdata = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      role: values.role ? values.role : `${user && user.role}`,
    };
    console.log(userdata);

    await dispatch(updateuserdetails({ userdetails, userdata }));
    router.push("/admin/users");
  };

  const deleteUserHandler = async () => {
    const user = await dispatch(getuser(req.params.userId));
    const publicId = user && user.payload.user.avatar.public_id;
    deletePhotoFromCloudinary(publicId);
    await dispatch(deleteuser(req.params.userId));
    router.push("/admin/users");
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
              Admin - User Details - {user && user._id}
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
                      User Information
                    </h1>
                    <div className="flex flex-col justify-start items-start">
                      <div className="my-5 mx-auto">
                        <center>
                          {" "}
                          <Image
                            src={user && user.avatar && user.avatar.url}
                            alt={user && user.name}
                            width={150}
                            height={150}
                            className="mx-auto shadow-xl rounded-lg mb-5"
                          ></Image>
                        </center>
                      </div>
                      <hr className="h-[1.5px] my-6 w-full bg-gray-200 border-0 rounded dark:bg-gray-300" />
                      <div className="grid grid-cols-7 gap-3 max-md:gap-2">
                        <p className=" col-span-2 max-md:col-span-2 text-base font-semibold mb-2">
                          Address :{" "}
                        </p>
                        <p className="col-start-3 col-end-8 max-md:col-span-5">
                          {user.address && user.address.address},{" "}
                          {user.address && user.address.city},{" "}
                          {user.address && user.address.postalCode},{" "}
                          {user.address && user.address.state},{" "}
                          {user.address && user.address.country}
                        </p>
                        <p className=" col-span-2 max-md:col-span-2 text-base font-semibold mb-2">
                          Registration Date :{" "}
                        </p>
                        <p className="col-start-3 col-end-8 max-md:col-span-5">
                          {dateIN(user && user.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-3 max-lg:col-span-6 lg:px-5">
                  <div className="shadow-xl px-10 rounded-xl py-10">
                    <h1 className="text-lg text-center font-satoshi font-semibold mb-8 tracking-wide text-[#4b077c]">
                      User Role
                    </h1>

                    <div className="flex justify-between mb-6">
                      <p className="text-base font-semibold">
                        User Role Status :{" "}
                      </p>
                      <p
                        className={
                          user && user.role === "Admin"
                            ? "text-white bg-red-500 font-medium px-3 py-2 rounded-lg text-center"
                            : user && user.role === "Customer"
                            ? "text-white bg-green-500 font-medium px-3 py-2 rounded-lg text-center"
                            : ""
                        }
                      >
                        {" "}
                        {user && user.role}{" "}
                      </p>
                    </div>
                    <hr className="h-[1.5px] my-6 bg-gray-200 border-0 rounded dark:bg-gray-300" />

                    <Formik
                      initialValues={initialValues}
                      onSubmit={onSubmit}
                      validationSchema={updateUserAdSchema}
                    >
                      {({
                        errors,
                        touched,
                        values,
                        handleChange,
                        isSubmitting,
                      }) => (
                        <Form>
                          {" "}
                          <div className="grid grid-cols-4 gap-4">
                            <div className="col-span-4">
                              <label
                                htmlFor="name"
                                className=" text-gray-700 text-md flex flex-col mb-5 relative"
                              >
                                <span className="flex text-slate-500 font-semibold mb-3">
                                  <PersonIcon className="text-slate-500" />{" "}
                                  &nbsp; Name
                                </span>
                                <Field
                                  type="text"
                                  name="name"
                                  placeholder="Enter Your Name"
                                  value={values.name}
                                  onChange={handleChange}
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c]"
                                />
                              </label>
                              <div className="text-sm text-red-500 font-satoshi my-2 mx-2">
                                {errors.name && touched.name && (
                                  <p>{errors.name}</p>
                                )}
                              </div>
                            </div>
                            <div className="col-span-4">
                              <label
                                htmlFor="email"
                                className=" text-gray-700 text-md flex flex-col mb-5 relative"
                              >
                                <span className="flex text-slate-500 font-semibold mb-3">
                                  <EmailIcon className="text-slate-500" />{" "}
                                  &nbsp; Email ID
                                </span>
                                <Field
                                  type="email"
                                  name="email"
                                  placeholder="Enter Your Email Id"
                                  value={values.email}
                                  onChange={handleChange}
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c]"
                                />
                              </label>
                              <div className="text-sm text-red-500 font-satoshi my-2 mx-2">
                                {errors.email && touched.email && (
                                  <p>{errors.email}</p>
                                )}
                              </div>
                            </div>
                            <div className="col-span-4">
                              <label
                                htmlFor="phone"
                                className=" text-gray-700 text-md flex flex-col mb-5 relative"
                              >
                                <span className="flex text-slate-500 font-semibold mb-3">
                                  <PhoneIcon className="text-slate-500" />{" "}
                                  &nbsp; Phone
                                </span>
                                <Field
                                  type="number"
                                  name="phone"
                                  placeholder="Enter Your Phone Number"
                                  value={values.phone}
                                  onChange={handleChange}
                                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                              </label>
                              <div className="text-sm text-red-500 font-satoshi my-2 mx-2">
                                {errors.phone && touched.phone && (
                                  <p>{errors.phone}</p>
                                )}
                              </div>
                            </div>
                            <div className="col-span-4">
                              <label
                                htmlFor="role"
                                className=" text-gray-700 text-md flex flex-col relative col-span-2 max-md:col-span-4 max-md:mb-4"
                              >
                                <span className="flex text-slate-500 font-semibold mb-3">
                                  <GradingIcon className="text-slate-500" />{" "}
                                  &nbsp; User Role
                                </span>
                                <Field
                                  as="select"
                                  type="text"
                                  name="role"
                                  placeholder="Enter Your Confirm Password"
                                  value={values.role}
                                  onChange={handleChange}
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c]"
                                >
                                  <option value="">Choose Role</option>
                                  {user && user.role === "Admin" && (
                                    <option value="Customer">Customer</option>
                                  )}
                                  {user && user.role === "Customer" && (
                                    <option value="Admin">Admin</option>
                                  )}
                                </Field>
                              </label>
                            </div>

                            <div className="col-span-4 my-3">
                              <input
                                type="submit"
                                value="Update User"
                                name="submit"
                                disabled={
                                  !values.name ||
                                  !values.email ||
                                  !values.phone ||
                                  isSubmitting
                                    ? true
                                    : false
                                }
                                className={
                                  !values.name ||
                                  !values.email ||
                                  !values.phone ||
                                  isSubmitting
                                    ? "bg-gray-400 w-full max-md:mb-4 text-sm font-semibold text-white px-4 py-2 rounded-lg cursor-not-allowed col-span-2 max-md:col-span-4"
                                    : "bg-[#fe7f07] w-full max-md:mb-4 text-sm font-semibold text-white px-4 py-2 rounded-lg cursor-pointer col-span-2 max-md:col-span-4"
                                }
                              />
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                    <div className="mt-10 flex justify-end">
                      <AlertDialogBox
                        deleteHandler={deleteUserHandler}
                        type={`user : ${user && user.name}`}
                        btnName="Delete User"
                      />
                    </div>
                  </div>
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
