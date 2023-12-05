"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { shortenText } from "@functions";
import { useDispatch, useSelector } from "react-redux";
import { getmobileproducts } from "../app/redux/features/product/mobileSlice";
import { useEffect } from "react";
import "swiper/swiper-bundle.css";
import Loading from "@app/loading";
import Rating from "@mui/material/Rating";
import { addproducttocart } from "../app/redux/features/cart/cartSlice";
import { toast } from "react-toastify";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, products } = useSelector(
    (state) => state.mobile
  );
  const category = "Mobiles";

  const addToCartHandler = (productId, quantity) => {
    dispatch(addproducttocart({ productId, quantity }));
    toast.success("Product added to cart successfully");
  };

  useEffect(() => {
    dispatch(getmobileproducts({ category }));
  }, [dispatch, category]);

  return (
    <section className="mb-20 lg:mx-7 mx-3">
      {isLoading ? (
        <Loading />
      ) : (
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 4,
            },
            1440: {
              slidesPerView: 4,
            },
          }}
          className="mySwiper"
        >
          {products && (
            <div>
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="shadow-xl w-full px-5 py-10 hfull mb-20 rounded-xl">
                    <Link href={`/products/Id/${product._id}`}>
                      <Image
                        src={product.images[0].url}
                        alt={product.name}
                        width={400}
                        height={100}
                        className="object-contain h-40 w-full"
                      />
                      <p className="text-lg text-red-500 mt-4 mb-2 text-center">
                        {`₹ ${new Intl.NumberFormat("en-IN").format(
                          product.price
                        )}`}
                      </p>
                      <h4 className="text-xl text-center text-[#4b077c] font-semibold ">
                        {shortenText(product.name, 16)}
                      </h4>
                      <p className="mt-2 text-center text-slate-500">
                        {shortenText(product.description, 24)}
                      </p>
                      <div className="flex justify-center items-center gap-3 my-3">
                        <Rating
                          value={product.ratings}
                          size="small"
                          readOnly
                          precision={0.5}
                        />
                        <span className="text-sm text-slate-500">
                          {`(${product.numOfReviews} Reviews)`}
                        </span>
                      </div>
                    </Link>
                    <button
                      onClick={() => addToCartHandler(product._id, 1)}
                      className="bg-[#fe7f07] mt-5 text-md font-semibold text-white px-6 py-2 rounded-lg w-full"
                    >
                      Add to cart
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </div>
          )}
        </Swiper>
      )}

      <style>
        {`
            .swiper-pagination-bullet-active {
          margin: 100px 5px;
            
          }
        `}
      </style>
    </section>
  );
};

export default ProductCarousel;
