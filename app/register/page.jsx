"use client";

import { useEffect, useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signUpSchema } from "../../models/signUpSchema";
import { toast } from "react-toastify";
import { validateEmail } from "@constants";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, register } from "@app/redux/features/auth/authSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ImageIcon from "@mui/icons-material/Image";
import MetaData from "@components/MetaData";
import uploadPhoto from "@actions/uploadActions";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);
  const [avatar, setAvatar] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const formRef = useRef();
  const { isLoggedIn } = useSelector((state) => state.auth);

  async function createUserImageChange(e) {
    const file = e.target.files[0];
    console.log(file);

    if (file.size < 1024 * 1024 * 2 && file.type.startsWith("image/")) {
      setAvatar(file);
    } else {
      toast.error("Please select an image less than 2 MB");
      setAvatar(null);
    }
  }

  const onSubmit = async (values, actions) => {
    console.log(values);
    if (
      !values.name ||
      !values.email ||
      !values.password ||
      !values.confirmPassword
    ) {
      return toast.error("All fields are necessary");
    }

    if (values.password < 6) {
      return toast.error("Password must be atleast 6 characters long");
    }

    if (!validateEmail(values.email)) {
      return toast.error("Invalid email");
    }
    if (values.password !== values.confirmPassword) {
      return toast.error("Password and Confirm Password must be same");
    }
    if (!avatar) {
      return toast.error("Please select an image");
    }

    console.log(avatar);
    const formData = new FormData();
    formData.append("file", avatar);

    const res = await uploadPhoto(formData);
    console.log(res);

    try {
      const userData = {
        avatar: {
          public_id: res.public_id,
          url: res.secure_url,
        },
        name: values.name,
        email: values.email,
        password: values.password,
      };

      await dispatch(register(userData));
    } catch (error) {
      actions.resetForm();
      console.log(error);
      toast.error("Please refresh the page and try again");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    } else {
      dispatch(RESET_AUTH());
    }
  }, [isLoggedIn, router, dispatch]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const togglePasswordVisibility1 = () => {
    setIsPasswordVisible1(!isPasswordVisible1);
  };

  return (
    <>
      <section className="flex  md:mt-[140px] mt-[100px] mb-20 my-[100px] lg:mx-20 max-lg:flex-col gap-10">
        <MetaData title="Register" />
        <div className="flex flex-col items-center mt-10 w-full px-10">
          <Image
            src="/assets/icons/registerlogo.png"
            width={250}
            height={100}
            alt="Register Logo"
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
            Our registration page is your gateway to a world of convenience and
            savings. Sign up now to unlock a seamless shopping experience,
            access exclusive deals, and enjoy personalized recommendations
            tailored just for you
          </p>
        </div>
        <div className="flex flex-col justify-center items-center  w-full max-md:px-7">
          <h1 className="text-xl text-slate-500">
            SignUp to{" "}
            <span className="text-2xl text-[#4b077c] font-bold font-inter">
              Shoping<span className="text-2xl text-[#92c340]">Go</span>
            </span>
          </h1>

          <div className="w-full px-8 py-10 shadow-xl flex-col mt-4 rounded-lg">
            <Formik
              initialValues={initialValues}
              validationSchema={signUpSchema}
              onSubmit={onSubmit}
              innerRef={formRef}
            >
              {({ errors, touched, values, handleChange, isSubmitting }) => (
                <Form>
                  <div className="flex justify-center items-center mb-5">
                    <div className="h-[100px] w-[100px] rounded-full">
                      <Image
                        src={
                          avatar
                            ? URL.createObjectURL(avatar)
                            : "/assets/icons/user.png"
                        }
                        width={60}
                        height={60}
                        alt="avatar"
                        className="object-cover h-[100px] w-full rounded-full"
                      />
                    </div>
                  </div>

                  <label
                    htmlFor="avatar"
                    className=" text-gray-700 text-md flex flex-col mb-5 relative"
                  >
                    <span className="flex text-slate-500 font-semibold mb-3">
                      <ImageIcon className="text-slate-500" /> &nbsp; Profile
                      Image
                    </span>
                    <input
                      type="file"
                      name="avatar"
                      id="avatar"
                      accept="image/*"
                      onChange={createUserImageChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c]"
                    />
                  </label>
                  <div className="text-sm text-green-500 font-satoshi my-2 mx-2">
                    <p>Please select image less than 1 MB in size</p>
                  </div>

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
                      <LockOpenIcon className="text-slate-500" /> &nbsp;
                      Password
                    </span>
                    <Field
                      type={isPasswordVisible ? "text" : "password"}
                      name="password"
                      placeholder="Create Your Password"
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

                  <label
                    htmlFor="confirmPassword"
                    className=" text-gray-700 text-md flex flex-col mb-5 relative"
                  >
                    <span className="flex text-slate-500 font-semibold mb-3">
                      <LockIcon className="text-slate-500" /> &nbsp; Confirm
                      Password
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
                    <input
                      type="submit"
                      value={isSubmitting ? " Signing Up ..." : "Sign Up"}
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
                    Already have an account ?{" "}
                    <Link href="/login">
                      <span className="text-lg text-blue-500"> SignIn</span>
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
