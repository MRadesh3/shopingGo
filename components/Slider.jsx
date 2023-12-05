"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
import { Pagination, Navigation } from "swiper/modules";
import { sliderData } from "@constants";
import Image from "next/image";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
import { BsCartCheckFill } from "react-icons/bs";
import Search from "./Search";

const Slider = () => {
  SwiperCore.use([Pagination, Navigation, Autoplay]);

  return (
    <section className="relative">
      <Search />
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="mySwiper"
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={index} className="swiperSlide">
            <div className="relative mix-blend-overlay h-[80vh] lg:h-[80vh]">
              <Image
                src={slide.imageURL}
                alt={slide.heading}
                width={1920}
                height={1080}
                className="absolute h-[80vh] lg:h-[80vh] w-full object-cover object-right opacity-30 "
              />
              <div className="absolute -z-10 bg-gradient-to-r from-[#0a020f] to-[#6c3e8d] h-[80vh] lg:h-[80vh] w-full" />
              <div className="flex flex-col justify-center items-center absolute shadow-md inset-0 text-center text-white">
                <div className="shadow-xl md:border-r-2 p-10 max-md:p-4 border-red-400 max-md:px-10 md:border-b-2">
                  <h1 className="text-3xl lg:text-5xl font-bold sliderHeading">
                    {slide.heading}
                  </h1>
                  <hr className="w-full my-3 bg-white text-center" />
                  <p className="text-lg lg:text-xl">{slide.desc}</p>
                  <Link href="/products">
                    <button className="bg-[#fe7f07] mt-5 text-xl font-semibold text-white px-6 py-2 rounded-lg">
                      Shop Now
                      <BsCartCheckFill className="inline-block ml-1" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style>
        {`
          .swiper-button-prev, .swiper-button-next {
            color: #fe7f07;
            padding: 0 10px;
          font-size: 10px;
          }

          .swiper-pagination-fraction {
            color: #fff;
            padding-bottom: 20px; 
          }
        `}
      </style>
    </section>
  );
};

export default Slider;
