"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { offerPrice, shortenText } from "@functions";
import { useDispatch, useSelector } from "react-redux";
import { getadminproducts } from "@app/redux/features/admin/products/productSliceAd";
import { addproducttocart } from "@app/redux/features/cart/cartSlice";
import { useEffect } from "react";
import "swiper/swiper-bundle.css";
import Loading from "@app/loading";
import Rating from "@mui/material/Rating";
import { toast } from "react-toastify";

const MobilesCarousel = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.productAd);

  const addToCartHandler = (productId, quantity) => {
    dispatch(addproducttocart({ productId, quantity }));
    toast.success("Product added to cart successfully");
  };

  useEffect(() => {
    dispatch(getadminproducts());
  }, [dispatch]);

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
                <SwiperSlide key={product._id}>
                  <div className="shadow-xl w-full px-5 py-10 hfull mb-20 rounded-xl h-fit">
                    <Link href={`/products/Id/${product._id}`}>
                      <Image
                        src={
                          product.images && product.images.length > 0
                            ? product.images[0].url
                            : "/assets/icons/noimage.png"
                        }
                        alt={product.name}
                        width={400}
                        height={100}
                        className="object-contain h-40 w-full"
                      />
                      {product.price > 5000 ? (
                        <h1 className="text-[22px] items-baseline font-satoshi font-bold text-[#fe7f07] my-3">
                          <div className="flex gap-5 justify-center items-center">
                            {`₹ ${new Intl.NumberFormat("en-IN").format(
                              offerPrice(product.price, 20)
                            )}`}{" "}
                            <p className="text-slate-500 line-through text-base font-light">{`₹ ${new Intl.NumberFormat(
                              "en-In"
                            ).format(product.price)}`}</p>{" "}
                          </div>
                          <p className="text-green-500 text-center text-lg">
                            20 % Off
                          </p>
                        </h1>
                      ) : (
                        <h1 className="text-[22px] items-baseline gap-4 font-satoshi font-bold text-[#fe7f07] my-3">
                          <div className="flex gap-5 justify-center items-center">
                            {`₹ ${new Intl.NumberFormat("en-IN").format(
                              offerPrice(product.price, 10)
                            )}`}{" "}
                            <p className="text-slate-500 line-through text-base font-light">{`₹ ${new Intl.NumberFormat(
                              "en-In"
                            ).format(product.price)}`}</p>{" "}
                          </div>
                          <p className="text-green-500 text-center text-lg">
                            10 % Off
                          </p>
                        </h1>
                      )}
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

export default MobilesCarousel;
