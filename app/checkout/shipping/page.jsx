"use client";

import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { shippingAddressSchema } from "../../../models/signUpSchema";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@app/loading";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Country, State, City } from "country-state-city";
import { shippingaddress } from "../../redux/features/cart/cartSlice";
import MetaData from "@components/MetaData";
import CheckOutSteps from "@components/CheckOutSteps";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
    if (shippingAddress) {
      const data = shippingAddress;
      dispatch(shippingaddress(data));
    }
  }, [dispatch]);

  const initialValues = {
    address: shippingAddress?.address || "",
    city: shippingAddress?.city || "",
    state: shippingAddress?.state || "",
    country: shippingAddress?.country || "",
    postalCode: shippingAddress?.postalCode || "",
    phone: shippingAddress?.phone || "",
  };

  const onSubmit = async (values, actions) => {
    const { address, city, state, country, postalCode, phone } = values;
    const data = {
      address,
      city,
      state,
      country,
      postalCode,
      phone,
    };
    dispatch(shippingaddress(data));
    toast.success("Shipping Address Added Successfully");
    router.push("/checkout/confirmorder");
  };

  return (
    <>
      <section className="md:mt-[110px] mt-[100px] mb-20 my-[100px] lg:mx-20">
        <CheckOutSteps activeStep={0} />
        <div className="flex max-lg:flex-col gap-10 mt-10">
          <MetaData title="Shipping Address" />

          <div className="flex flex-col items-center mt-10 w-full px-10">
            <Image
              src="/assets/icons/shipping.png"
              width={150}
              height={100}
              alt="Shipping Logo"
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
              Dear Valued Customer, Thank you for choosing <b>ShopingGo</b> for
              your online shopping needs ! We're thrilled to process your order
              and wanted to confirm the shipping details. Your package will be
              sent to your address
            </p>
          </div>
          <div className="flex flex-col justify-center items-center  w-full max-md:px-7">
            <h1 className="text-xl text-slate-500">
              <span className="text-2xl text-[#4b077c] font-bold font-inter">
                Shipping Address
                <span className="text-2xl text-[#92c340]"> Details</span>
              </span>
            </h1>
            {isLoading ? (
              <Loading />
            ) : (
              <div className="w-full px-8 py-10 shadow-xl flex-col mt-4 rounded-lg">
                <Formik
                  initialValues={initialValues}
                  validationSchema={shippingAddressSchema}
                  onSubmit={onSubmit}
                >
                  {({
                    errors,
                    touched,
                    values,
                    handleChange,
                    isSubmitting,
                  }) => (
                    <Form>
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

                      <label
                        htmlFor="phone"
                        className="text-gray-700 text-md flex flex-col mb-5 relative"
                      >
                        <span className="flex text-slate-500 font-semibold mb-3">
                          <PhoneIcon className="text-slate-500" /> &nbsp; Phone
                          Number
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

                      <label
                        htmlFor="country"
                        className=" text-gray-700 text-md flex flex-col mb-5 relative"
                      >
                        <span className="flex text-slate-500 font-semibold mb-3">
                          <PublicIcon className="text-slate-500" /> &nbsp;
                          Country
                        </span>
                        <Field
                          as="select"
                          name="country"
                          placeholder="Enter Your Country"
                          value={values.country}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c]"
                        >
                          <option value="">Select Country</option>
                          {Country &&
                            Country.getAllCountries().map((item) => (
                              <option key={item.isoCode} value={item.isoCode}>
                                {item.name}
                              </option>
                            ))}
                        </Field>
                      </label>
                      <div className="text-sm text-red-500 font-satoshi my-2 mx-2">
                        {errors.country && touched.country && (
                          <p>{errors.country}</p>
                        )}
                      </div>

                      {values.country && (
                        <>
                          <label
                            htmlFor="state"
                            className=" text-gray-700 text-md flex flex-col mb-5 relative"
                          >
                            <span className="flex text-slate-500 font-semibold mb-3">
                              <TransferWithinAStationIcon className="text-slate-500" />{" "}
                              &nbsp; State
                            </span>
                            <Field
                              as="select"
                              name="state"
                              placeholder="Enter Your State"
                              value={values.state}
                              onChange={handleChange}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c]"
                            >
                              <option value="">Select State</option>
                              {State &&
                                State.getStatesOfCountry(values.country).map(
                                  (item) => (
                                    <option
                                      key={item.isoCode}
                                      value={item.isoCode}
                                    >
                                      {item.name}
                                    </option>
                                  )
                                )}
                            </Field>
                          </label>
                          <div className="text-sm text-red-500 font-satoshi my-2 mx-2">
                            {errors.state && touched.state && (
                              <p>{errors.state}</p>
                            )}
                          </div>
                        </>
                      )}

                      {values.state && values.country && (
                        <>
                          <label
                            htmlFor="city"
                            className=" text-gray-700 text-md flex flex-col mb-5 relative"
                          >
                            <span className="flex text-slate-500 font-semibold mb-3">
                              <LocationCityIcon className="text-slate-500" />{" "}
                              &nbsp; City
                            </span>
                            <Field
                              as="select"
                              name="city"
                              placeholder="Enter Your City"
                              value={values.city}
                              onChange={handleChange}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c]"
                            >
                              <option value="">Select City</option>
                              {City &&
                                City.getCitiesOfState(
                                  values.country,
                                  values.state
                                ).map((item) => (
                                  <option
                                    key={item.isoCode}
                                    value={item.isoCode}
                                  >
                                    {item.name}
                                  </option>
                                ))}
                            </Field>
                          </label>
                          <div className="text-sm text-red-500 font-satoshi my-2 mx-2">
                            {errors.city && touched.city && (
                              <p>{errors.city}</p>
                            )}
                          </div>
                        </>
                      )}

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

                      <center>
                        <input
                          type="submit"
                          value="Continue"
                          name="submit"
                          disabled={isSubmitting ? true : false}
                          className={
                            isSubmitting
                              ? "bg-gray-400 max-md:mb-4 text-sm font-semibold text-white px-4 py-2 rounded-lg cursor-not-allowed col-span-2 max-md:col-span-4"
                              : "bg-[#fe7f07] max-md:mb-4 text-sm font-semibold text-white px-4 py-2 rounded-lg cursor-pointer col-span-2 max-md:col-span-4"
                          }
                        />
                      </center>
                    </Form>
                  )}
                </Formik>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
