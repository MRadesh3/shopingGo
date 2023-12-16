"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  RESET_AUTH,
  updateuser,
  getuser,
} from "../../redux/features/auth/authSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import { updateUserSchema } from "@models/signUpSchema";
import { toast } from "react-toastify";
import Image from "next/image";
import Loading from "@app/loading";
import { useState } from "react";
import MetaData from "@components/MetaData";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import ImageIcon from "@mui/icons-material/Image";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import PublicIcon from "@mui/icons-material/Public";
import PinDropIcon from "@mui/icons-material/PinDrop";
import uploadPhoto, { deletePhotoFromCloudinary } from "@actions/uploadActions";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isUpdated, user } = useSelector(
    (state) => state.auth
  );
  const [avatar, setAvatar] = useState();

  const initialValues = {
    name: user ? user.user.name : "",
    email: user ? user.user.email : "",
    phone: user ? user.user.phone : "",
    address: user && user.user.address ? user.user.address.address : "",
    city: user && user.user.address ? user.user.address.city : "",
    state: user && user.user.address ? user.user.address.state : "",
    postalCode: user && user.user.address ? user.user.address.postalCode : "",
    country: user && user.user.address ? user.user.address.country : "",
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (file.size < 1024 * 1024 * 2 && file.type.startsWith("image/")) {
      return setAvatar(file);
    } else {
      toast.error("Please select an image less than 2MB");
      return setAvatar(null);
    }
  };

  const onSubmit = async (values, actions) => {
    console.log(values);
    if (!values.name || !values.email) {
      return toast.error("Name and Email are must");
    }

    if (avatar) {
      const public_id = user && user.user.avatar.public_id;

      const deleteRes = deletePhotoFromCloudinary(public_id);
      console.log(deleteRes);

      const formData = new FormData();
      formData.append("file", avatar);

      const res = await uploadPhoto(formData);
      console.log(res);

      const userData = {
        avatar: {
          public_id: res.public_id,
          url: res.secure_url,
        },
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: {
          address: values.address,
          city: values.city,
          state: values.state,
          postalCode: values.postalCode,
          country: values.country,
        },
      };

      dispatch(updateuser(userData));
    } else {
      const userData = {
        avatar: {
          public_id: user && user.user.avatar.public_id,
          url: user && user.user.avatar.url,
        },
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: {
          address: values.address,
          city: values.city,
          state: values.state,
          postalCode: values.postalCode,
          country: values.country,
        },
      };

      dispatch(updateuser(userData));
    }
  };

  useEffect(() => {
    dispatch(getuser());

    if (isUpdated) {
      router.push("/profile");
      dispatch(RESET_AUTH());
    }
  }, [dispatch, router, isUpdated]);

  return (
    <section className="md:mt-20 mt-[80px] mb-20">
      <div className="flex flex-col justify-center items-center  ">
        <MetaData title={`${user && user.user.name}'s Profile`} />
        <h1 className="text-xl font-satoshi text-[#4b077c] font-bold mt-8">
          Update Profile
        </h1>
        <hr className="h-[1.5px] my-3  w-[30%] bg-gray-200 border-0 rounded dark:bg-gray-300" />
      </div>

      <section className="flex flex-col mb-20 lg:mx-20 max-lg:flex-col gap-10">
        <div className=" w-full px-8 py-10 shadow-xl mt-4 rounded-lg">
          {isLoading ? (
            <Loading />
          ) : (
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={updateUserSchema}
            >
              {({ errors, touched, values, handleChange, isSubmitting }) => (
                <Form>
                  <div className="grid grid-cols-4 gap-10 content-center">
                    <div className="col-start-2 col-end-4 text-center">
                      <center>
                        <Image
                          src={
                            avatar && URL.createObjectURL(avatar)
                              ? URL.createObjectURL(avatar)
                              : user && user.user.avatar.url
                              ? user.user.avatar.url
                              : "/assets/icons/user.png"
                          }
                          width={60}
                          height={60}
                          alt="avatar"
                          className="object-cover h-[150px] w-[150px] rounded-full"
                        />
                      </center>

                      <label
                        htmlFor="avatar"
                        className=" text-gray-700 text-md flex flex-col mb-5 relative"
                      >
                        <span className="flex text-slate-500 font-semibold mb-3">
                          <ImageIcon className="text-slate-500" /> &nbsp;
                          Profile Image
                        </span>
                        <input
                          type="file"
                          name="avatar"
                          id="avatar"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c]"
                        />
                      </label>
                      <div className="text-sm text-green-500 font-satoshi my-2 mx-2">
                        <p>Image should be less than 1 MB in size</p>
                      </div>
                    </div>

                    <div className="col-span-2">
                      <label
                        htmlFor="name"
                        className=" text-gray-700 text-md flex flex-col mb-5 relative"
                      >
                        <span className="flex text-slate-500 font-semibold mb-3">
                          <PersonIcon className="text-slate-500" /> &nbsp; Name
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
                        {errors.name && touched.name && <p>{errors.name}</p>}
                      </div>
                    </div>

                    <div className="col-span-2">
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
                    </div>

                    <div className="col-span-2">
                      <label
                        htmlFor="phone"
                        className=" text-gray-700 text-md flex flex-col mb-5 relative"
                      >
                        <span className="flex text-slate-500 font-semibold mb-3">
                          <PhoneIcon className="text-slate-500" /> &nbsp; Phone
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
                        {errors.phone && touched.phone && <p>{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="col-span-2">
                      <label
                        htmlFor="address"
                        className=" text-gray-700 text-md flex flex-col mb-5 relative"
                      >
                        <span className="flex text-slate-500 font-semibold mb-3">
                          <HomeIcon className="text-slate-500" /> &nbsp; Address
                        </span>
                        <Field
                          type="text"
                          name="address"
                          placeholder="Enter Your Address"
                          value={values.address}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c]"
                        />
                      </label>
                      <div className="text-sm text-red-500 font-satoshi my-2 mx-2">
                        {errors.address && touched.address && (
                          <p>{errors.address}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-2">
                      <label
                        htmlFor="city"
                        className=" text-gray-700 text-md flex flex-col mb-5 relative"
                      >
                        <span className="flex text-slate-500 font-semibold mb-3">
                          <LocationCityIcon className="text-slate-500" /> &nbsp;
                          City
                        </span>
                        <Field
                          type="text"
                          name="city"
                          placeholder="Enter Your Email"
                          value={values.city}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c]"
                        />
                      </label>
                      <div className="text-sm text-red-500 font-satoshi my-2 mx-2">
                        {errors.city && touched.city && <p>{errors.city}</p>}
                      </div>
                    </div>

                    <div className="col-span-2">
                      <label
                        htmlFor="state"
                        className=" text-gray-700 text-md flex flex-col mb-5 relative"
                      >
                        <span className="flex text-slate-500 font-semibold mb-3">
                          <TransferWithinAStationIcon className="text-slate-500" />{" "}
                          &nbsp; State
                        </span>
                        <Field
                          type="text"
                          name="state"
                          placeholder="Enter Your State"
                          value={values.state}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c]"
                        />
                      </label>
                      <div className="text-sm text-red-500 font-satoshi my-2 mx-2">
                        {errors.state && touched.state && <p>{errors.state}</p>}
                      </div>
                    </div>

                    <div className="col-span-2">
                      <label
                        htmlFor="postalCode"
                        className=" text-gray-700 text-md flex flex-col mb-5 relative"
                      >
                        <span className="flex text-slate-500 font-semibold mb-3">
                          <PinDropIcon className="text-slate-500" /> &nbsp; Pin
                          Code
                        </span>
                        <Field
                          type="number"
                          name="postalCode"
                          placeholder="Enter Your Pin Code"
                          value={values.postalCode}
                          onChange={handleChange}
                          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </label>
                      <div className="text-sm text-red-500 font-satoshi my-2 mx-2">
                        {errors.postalCode && touched.postalCode && (
                          <p>{errors.postalCode}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-2">
                      <label
                        htmlFor="country"
                        className=" text-gray-700 text-md flex flex-col mb-5 relative"
                      >
                        <span className="flex text-slate-500 font-semibold mb-3">
                          <PublicIcon className="text-slate-500" /> &nbsp;
                          Country
                        </span>
                        <Field
                          type="text"
                          name="country"
                          placeholder="Enter Your Country"
                          value={values.country}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c]"
                        />
                      </label>
                      <div className="text-sm text-red-500 font-satoshi my-2 mx-2">
                        {errors.country && touched.country && (
                          <p>{errors.country}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-4">
                      <center>
                        <input
                          type="submit"
                          value={
                            isSubmitting
                              ? "Updating Profile..."
                              : "Update Profile"
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
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </section>
    </section>
  );
};

export default Page;
