"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET_PRODUCT_STATE,
  getproductdetails,
  addproductreview,
} from "../../../redux/features/product/productSlice";
import { useEffect } from "react";
import Image from "next/image";
import Loading from "@app/loading";
import MetaData from "@components/MetaData";
import Link from "next/link";
import { BsCartCheckFill } from "react-icons/bs";
import { useState } from "react";
import { addproducttocart } from "../../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Rating,
} from "@mui/material";
import { offerPrice } from "@functions";
import { useRouter } from "next/navigation";

const ProductDetails = (req, { params }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, isSuccess, isError, product } = useSelector(
    (state) => state.product
  );

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };
  const productId = req.params.productId;

  const addToCartHandler = () => {
    dispatch(addproducttocart({ productId, quantity }));
    toast.success("Product added to cart successfully");
  };

  const addToBuyListHandler = () => {
    dispatch(addproducttocart({ productId, quantity }));
    toast.success("Product is ready to buy successfully");
    router.push("/cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const review = {
      rating,
      comment,
      productId,
    };
    dispatch(addproductreview(review));
    toast.success("Review submitted successfully");
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getproductdetails(productId));
  }, [dispatch, productId]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section>
          <section className=" md:mt-[100px] mt-[100px] justify-center mx-5 max-md:mr-5 flex max-lg:flex-col gap-8 max-md:gap-1">
            {isSuccess && product ? (
              <>
                <MetaData title={`${product.name}`} />
                <div className="lg:w-1/2 p-4 max-md:w-full max-md:px-2 px-10 max-md:5">
                  <Swiper
                    spaceBetween={30}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Pagination]}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                    loop={true}
                    slidesPerView={1}
                    className="mySwiper"
                  >
                    {product.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <div className="shadow-xl px-5 py-10 mb-[50px] flex justify-center items-center rounded-xl">
                          <Image
                            src={image.url}
                            alt={product.name}
                            width={430}
                            height={200}
                            className="object-contain h-[260px] w-full"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="lg:w-1/2 p-4 flex flex-col justify-center ">
                  <div className="">
                    <div className="my-2">
                      <h1 className="text-xl text-justify font-satoshi font-bold text-[#4b077c] mb-1">
                        {product.name}
                      </h1>
                      <p className="text-slate-500 text-md">
                        Product Id : {product._id}
                      </p>
                    </div>
                    <hr className="h-px my-3 bg-gray-200 border-0 rounded dark:bg-gray-300" />
                    <div className="flex items-center gap-3">
                      <Rating
                        value={product.ratings}
                        size="large"
                        readOnly
                        precision={0.5}
                      />
                      <span className="text-sm text-slate-500">
                        {`( ${product.numOfReviews} Reviews )`}
                      </span>
                    </div>
                    <div className="my-3">
                      <p className="bg-red-500 text-white px-3 py-1 mb-3 inline-block rounded-xl">
                        Deal of the day
                      </p>
                      {product.price > 5000 ? (
                        <h1 className="text-[22px] flex gap-4 items-baseline font-satoshi font-bold text-[#fe7f07] mb-5">
                          {`₹ ${new Intl.NumberFormat("en-IN").format(
                            offerPrice(product.price, 20)
                          )}`}{" "}
                          <p className="text-slate-500 line-through text-base font-light">{`₹ ${new Intl.NumberFormat(
                            "en-In"
                          ).format(product.price)}`}</p>{" "}
                          <p className="text-green-500 text-lg">20 % Off</p>
                        </h1>
                      ) : (
                        <h1 className="text-[22px] flex items-baseline gap-4 font-satoshi font-bold text-[#fe7f07] mb-5">
                          {`₹ ${new Intl.NumberFormat("en-IN").format(
                            offerPrice(product.price, 10)
                          )}`}{" "}
                          <p className="text-slate-500 line-through text-base font-light">{`₹ ${new Intl.NumberFormat(
                            "en-In"
                          ).format(product.price)}`}</p>{" "}
                          <p className="text-green-500 text-lg">10 % Off</p>
                        </h1>
                      )}

                      <div>
                        <div className="my-2 flex items-center gap-2">
                          <button
                            onClick={decreaseQuantity}
                            className="border-2 px-2 border-[#4b077c] font-bold hover:bg-[#4b077c] hover:text-white"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="border-2 w-20 border-[#4b077c] text-center"
                            value={quantity}
                            readOnly
                          />
                          <button
                            onClick={increaseQuantity}
                            className="border-2 px-2 border-[#4b077c] font-bold hover:bg-[#4b077c] hover:text-white"
                          >
                            +
                          </button>
                          <button
                            onClick={addToCartHandler}
                            disabled={product.stock < 1 ? true : false}
                            className={
                              product.stock < 1
                                ? "bg-gray-400 text-md font-semibold text-white px-6 py-2 rounded-lg cursor-not-allowed"
                                : "bg-[#fe7f07] text-md font-semibold text-white px-6 py-2 rounded-lg cursor-pointer"
                            }
                          >
                            Add to cart
                          </button>
                        </div>

                        <p className="my-2">
                          <span className="text-slate-500">Status </span> :{" "}
                          <b
                            className={
                              product.stock < 1
                                ? "text-red-500"
                                : "text-green-500"
                            }
                          >
                            {product.stock < 1 ? "Out of stock" : "In stock"}
                          </b>
                        </p>

                        <button
                          onClick={addToBuyListHandler}
                          className="bg-green-500 mt-3 text-md font-semibold text-white px-10 py-2 rounded-lg cursor-pointer"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                    <hr className=" h-[1.5px] my-8 bg-gray-200 border-0 rounded dark:bg-gray-300" />
                    <div className="my-1">
                      <h6 className="text-slate-500">Description : </h6>{" "}
                      <p className="my-2 text-justify">{product.description}</p>
                      <button
                        onClick={submitReviewToggle}
                        className="bg-transparent border-[1px] border-[#4b077c] mt-3 text-md text-[#4b077c] px-6 py-2 rounded-lg hover:bg-[#4b077c] hover:text-white"
                      >
                        Submit Review
                      </button>
                    </div>

                    <Dialog
                      aria-labelledby="simple-dialog-title"
                      open={open}
                      onClose={submitReviewToggle}
                    >
                      <DialogTitle>Submit Review</DialogTitle>
                      <DialogContent className="flex flex-col gap-5">
                        <Rating
                          onChange={(e) => setRating(e.target.value)}
                          value={rating}
                          size="large"
                        />

                        <textarea
                          cols={30}
                          rows={5}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="border-[1px] border-gray-500 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#4b077c] focus:border-transparent w-full h-32 resize-none"
                        ></textarea>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={submitReviewToggle} color="secondary">
                          Cancel
                        </Button>
                        <Button onClick={reviewSubmitHandler} color="primary">
                          Submit
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </div>
              </>
            ) : (
              <div className=" flex flex-col justify-items-start items-center my-10">
                <Image
                  src="/assets/icons/noproduct.png"
                  alt="empty"
                  width={100}
                  height={100}
                  className="object-contain"
                />
                <h1 className="text-center text-lg font-semibold font-satoshi text-[#4b077c] my-6 px-8">
                  No product found for Product Id : {req.params.productId}{" "}
                  <br />
                  Explore more products
                </h1>
                <Link href="/products">
                  <button className="bg-[#fe7f07] text-lg font-semibold text-white px-6 py-2 rounded-lg">
                    Shop Now
                    <BsCartCheckFill className="inline-block ml-1" />
                  </button>
                </Link>
              </div>
            )}
            <style>
              {`
          .swiper-pagination-bullet-active {
            margin: 80px 5px 20px 5px;
          }
          
          @media (max-width: 768px) {
            .flex-wrap {
              flex-direction: column;
            }
          }
        `}
            </style>
          </section>
          <div className="my-20 max-md:mx-5 mx-20 ">
            {isSuccess && product && product.reviews && product.reviews[0] && (
              <h1 className="text-xl text-center font-satoshi font-bold text-[#4b077c] mb-10">
                Reviews
                <center>
                  {" "}
                  <hr className="h-px my-3  w-[50%] bg-gray-200 border-0 rounded dark:bg-gray-300" />
                </center>
              </h1>
            )}

            {product && (
              <div className="grid grid-cols-3 max-lg:grid-cols-4 gap-4">
                {product.reviews && product.reviews[0] ? (
                  product.reviews.map((review) => (
                    <div
                      key={review._id}
                      className="shadow-xl col-span-1 max-lg:col-span-2 max-md:col-span-4 rounded-lg p-6 max-md:w-full max-lg:w-[100%] mb-5"
                    >
                      <div className="flex gap-5 justify-start items-center mb-5">
                        <Image
                          src={review.user.avatar}
                          alt="reviewer image"
                          width={40}
                          height={10}
                          className="rounded-full object-cover h-10"
                        ></Image>
                        <h1 className="font-satoshi text-[#4b077c] font-semibold">
                          {review.user.name}
                        </h1>
                      </div>
                      <Rating value={review.rating} size="small" readOnly />
                      <p className="text-slate-500 my-3">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className=" col-start-2 col-span-1 max-lg:col-span-4">
                    <h1 className="text-lg text-center font-semibold">
                      No reviews yet ! Add a review
                    </h1>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default ProductDetails;
