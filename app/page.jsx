"use client";

import Link from "next/link";
import Slider from "@components/Slider";
import Infobox from "@components/Infobox";
import { BsCartCheckFill } from "react-icons/bs";
import ProductCarousel from "@components/ProductCarousel";
import ProductsCategory from "@components/ProductsCategory";
import MobilesCarousel from "@components/MobilesCarousel";
import Contact from "@components/Contact";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getloginstatus } from "./redux/features/auth/authSlice";
import axios from "axios";
import MetaData from "@components/MetaData";
import VideoPlayer from "@components/VideoPlayer";

const PageHeading = ({ headingText, buttonText }) => {
  return (
    <div className="max-md:mx-2 lg:pb-2 lg:border-b-2  border-b-gray-300 mx-20 max-md:flex-col mt-[100px] mb-10 flex justify-between items-center">
      <h1 className="text-3xl max-md:text-2xl max-md:mb-2 text-[#4b077c] font-bold">
        {headingText}
      </h1>
      <Link href="/products">
        <button className="bg-[#fe7f07] text-lg font-semibold text-white px-6 py-2 rounded-lg">
          {buttonText} <BsCartCheckFill className="inline-block ml-1" />
        </button>
      </Link>
    </div>
  );
};

const Home = () => {
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getloginstatus());
  }, [dispatch]);

  return (
    <section className="md:mt-20 mt-[80px]">
      <MetaData title="Home" />
      <Slider />
      <Infobox />
      <VideoPlayer />
      <PageHeading headingText={"Latest Products"} buttonText={"Shop Now"} />
      <ProductCarousel />
      <PageHeading
        headingText={"Products Categories"}
        buttonText={"Shop Now"}
      />
      <ProductsCategory />
      <PageHeading headingText={"Mobiles Categories"} buttonText={"Shop Now"} />
      <MobilesCarousel />
      <Contact />
    </section>
  );
};

export default Home;
