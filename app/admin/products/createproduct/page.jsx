"use client";

import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Sidebar from "@components/Sidebar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createnewproduct } from "@app/redux/features/admin/products/productSliceAd";
import MetaData from "@components/MetaData";
import Loading from "@app/loading";
import { Formik, Form, Field } from "formik";
import ImageIcon from "@mui/icons-material/Image";
import Image from "next/image";
import { createProductSchema } from "@models/signUpSchema";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const categories = [
  "Mobiles",
  "Laptops",
  "Electronics",
  "Clothing / Fashion",
  "Home / Furniture",
  "Beauty / Personal Care",
  "Sports / Outdoors",
  "Books / Movies / Music",
  "Health / Wellness",
  "Jewellery / Watches",
  "Baby / Maternity",
  "Travel / Luggage",
];

const initialValues = {
  name: "",
  price: "",
  stock: "",
  category: "",
  description: "",
  images: "",
};

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading } = useSelector((state) => state.productAd);
  const [allImages, setAllImages] = useState([]);
  const [allImagesPreview, setAllImagesPreview] = useState([]);

  const onSubmit = async (values, actions) => {
    console.log(values);

    const formData = new FormData();

    try {
      const uploadImages = await Promise.all(
        allImages.map(async (image, index) => {
          formData.append(`file`, image);
          formData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRODUCTS_PRESET_NAME
          );

          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
          );

          return {
            public_id: res.data.public_id,
            url: res.data.secure_url,
          };
        })
      );

      console.log(uploadImages);
      const productdata = {
        name: values.name,
        price: values.price,
        stock: values.stock,
        category: values.category,
        description: values.description,
        images: uploadImages,
      };
      dispatch(createnewproduct(productdata));
      router.push("/admin/dashboard");
    } catch (error) {
      console.log(error);
      return toast.error("Something went wrong");
    }
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setAllImages([]);
    setAllImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
          if (!allowedTypes.includes(file.type)) {
            toast.error("Invalid file type. Please select a valid image file.");
            return;
          }

          const maxSize = 2000000;
          if (file.size > maxSize) {
            toast.error("File size is too large. Max size is 2MB");
            return;
          }
          setAllImagesPreview((old) => [...old, reader.result]);
          setAllImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <section className="md:mt-[110px] mt-[100px] mb-20 my-[100px]">
      <MetaData title="Admin Create Product" />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-6 gap-2">
            <div className="col-span-1 max-md:col-span-6 h-full border-r-2">
              <Sidebar />
            </div>
            <div className="col-span-5 max-md:col-span-6 mx-4 lg:mx-8">
              <div className="flex flex-col justify-center items-center mb-8">
                <h1 className="text-xl font-satosh font-bold text-[#4b077c]">
                  Admin - Create New Product
                </h1>
                <hr className="h-[1.5px] my-3  w-[30%] bg-gray-200 border-0 rounded dark:bg-gray-300" />
              </div>

              <div>
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={createProductSchema}
                >
                  {({
                    errors,
                    touched,
                    values,
                    handleChange,
                    isSubmitting,
                  }) => (
                    <Form>
                      <div className="grid grid-cols-4 gap-10 max-md:5">
                        <div className="col-span-2 max-lg:col-span-4">
                          <label
                            htmlFor="name"
                            className=" text-gray-700 text-md flex flex-col mb-5 relative"
                          >
                            <span className="flex text-slate-500 font-semibold mb-3">
                              <SpellcheckIcon className="text-slate-500" />{" "}
                              &nbsp; Product Name
                            </span>
                            <Field
                              type="text"
                              name="name"
                              id="name"
                              placeholder="Enter Your Product Name"
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

                        <div className="col-span-2 max-lg:col-span-4">
                          <label
                            htmlFor="price"
                            className=" text-gray-700 text-md flex flex-col mb-5 relative"
                          >
                            <span className="flex text-slate-500 font-semibold mb-3">
                              <AttachMoneyIcon className="text-slate-500" />{" "}
                              &nbsp; Product Price ( in ₹ )
                            </span>
                            <Field
                              type="number"
                              name="price"
                              id="price"
                              placeholder="Enter Your Product Price"
                              value={values.price}
                              onChange={handleChange}
                              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </label>
                          <div className="text-sm text-red-500 font-satoshi my-2 mx-2">
                            {errors.price && touched.price && (
                              <p>{errors.price}</p>
                            )}
                          </div>
                        </div>

                        <div className="col-span-2 max-lg:col-span-4">
                          <label
                            htmlFor="category"
                            className=" text-gray-700 text-md flex flex-col mb-5 relative"
                          >
                            <span className="flex text-slate-500 font-semibold mb-3">
                              <AccountTreeIcon className="text-slate-500" />{" "}
                              &nbsp; Select Product Category
                            </span>
                            <Field
                              as="select"
                              name="category"
                              id="category"
                              placeholder="Select Your Product Category"
                              value={values.category}
                              onChange={handleChange}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c]"
                            >
                              <option value="">Select Product Category</option>
                              {categories &&
                                categories.map((item) => (
                                  <option
                                    key={item}
                                    value={item.replace(/ /g, "")}
                                  >
                                    {item}
                                  </option>
                                ))}
                            </Field>
                          </label>
                          <div className="text-sm text-red-500 font-satoshi my-2 mx-2">
                            {errors.category && touched.category && (
                              <p>{errors.category}</p>
                            )}
                          </div>
                        </div>

                        <div className="col-span-2 max-lg:col-span-4">
                          <label
                            htmlFor="stock"
                            className=" text-gray-700 text-md flex flex-col mb-5 relative"
                          >
                            <span className="flex text-slate-500 font-semibold mb-3">
                              <StorageIcon className="text-slate-500" /> &nbsp;
                              Product Stock
                            </span>
                            <Field
                              type="number"
                              name="stock"
                              id="stock"
                              placeholder="Enter Your Product Stock"
                              value={values.stock}
                              onChange={handleChange}
                              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </label>
                          <div className="text-sm text-red-500 font-satoshi my-2 mx-2">
                            {errors.stock && touched.stock && (
                              <p>{errors.stock}</p>
                            )}
                          </div>
                        </div>

                        <div className="col-span-2 max-lg:col-span-4">
                          <label
                            htmlFor="description"
                            className=" text-gray-700 text-md flex flex-col mb-5 relative"
                          >
                            <span className="flex text-slate-500 font-semibold mb-3">
                              <DescriptionIcon className="text-slate-500" />{" "}
                              &nbsp; Product Description
                            </span>
                            <Field
                              as="textarea"
                              rows={4}
                              type="text"
                              name="description"
                              id="description"
                              placeholder="Enter Your Product Description"
                              value={values.description}
                              onChange={handleChange}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c]"
                            />
                          </label>
                          <div className="text-sm text-red-500 font-satoshi my-2 mx-2">
                            {errors.description && touched.description && (
                              <p>{errors.description}</p>
                            )}
                          </div>
                        </div>

                        <div className="col-span-2 max-lg:col-span-4">
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
                              multiple
                              name="avatar"
                              id="avatar"
                              accept="image/*"
                              onChange={createProductImagesChange}
                              //   onChange={(e) =>
                              //     setAvatar(Array.from(e.target.files))
                              //   }
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c]"
                            />
                          </label>
                          <div className="text-sm text-red-500 font-satoshi my-2 mx-2">
                            {errors.avatar && touched.avatar && (
                              <p>{errors.avatar}</p>
                            )}
                          </div>
                        </div>

                        <div className="col-span-4 shadow-xl px-10 py-10">
                          <h1 className="text-lg mb-5 text-[#4b077c] font-semibold font-satoshi text-center">
                            Images Preview
                          </h1>
                          <center className="mb-10">
                            <hr className="h-[1.5px] my-3  w-[30%] bg-gray-200 border-0 rounded dark:bg-gray-300" />
                          </center>
                          <div className="grid grid-cols-4 gap-5">
                            {allImagesPreview &&
                              allImagesPreview.map((image, index) => (
                                <Image
                                  key={index}
                                  src={image}
                                  alt="Image Preview"
                                  width={200}
                                  height={200}
                                  className="object-cover h-[250px] w-full max-md:col-span-4 rounded-lg"
                                />
                              ))}
                          </div>
                        </div>
                      </div>
                      <center>
                        <input
                          type="submit"
                          value="Create Product"
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
  );
};

export default Page;
