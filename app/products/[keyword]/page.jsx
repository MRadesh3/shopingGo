"use client";

import Image from "next/image";
import Link from "next/link";
import ReactStars from "react-rating-stars-component";
import { shortenText } from "@functions";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET_PRODUCT_STATE,
  getproducts,
} from "../../redux/features/product/productSlice";
import { useEffect } from "react";
import Loading from "@app/loading";
import Pagination from "react-js-pagination";
import { useState } from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { FcFilledFilter } from "react-icons/fc";
import MetaData from "@components/MetaData";
import { BsCartCheckFill } from "react-icons/bs";

const categories = [
  "Fashion",
  "Electronics",
  "Mobiles",
  "Petroleum",
  "Cricket",
  "Laptop",
  "Music",
];

const Page = (req, { params }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 100000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const {
    isLoading,
    isError,
    isSuccess,
    products,
    productCount,
    resultPerPage,
  } = useSelector((state) => state.product);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
    setCurrentPage(1);
  };

  const keyword = req.params.keyword;

  const resetFilters = () => {
    req.params.keyword = "";
    setPrice([0, 100000]);
    setCategory("");
    setRatings(0);
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(getproducts({ keyword, currentPage, price, category, ratings }));
  }, [dispatch, keyword, currentPage, price, category, ratings]);

  return (
    <section className="md:mt-20 mt-[80px]">
      <div className="flex flex-col justify-center items-center ">
        <h1 className="mt-10 text-xl font-satoshi font-bold text-[#4b077c]">
          Products
        </h1>
        <hr className="h-[1.5px] my-3  w-[30%] bg-gray-200 border-0 rounded dark:bg-gray-300" />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="grid grid-cols-4 gap-3 mt-6">
          <MetaData title="Products" />
          <div className="col-span-1 max-md:col-span-4 border-r-2 max-md:border-none my-6 lg:px-10 p-7">
            <div className="flex justify-center items-center gap-5">
              <h1 className="  text-xl font-bold font-satoshi text-[#4b077c]">
                Filters
              </h1>
              <FcFilledFilter />
              <button
                className="text-sm border-[1px] px-2 py-1 rounded-xl text-[#4b077c] border-[#4b077c] hover:bg-[#4b077c] hover:text-white transition duration-300 ease-in-out "
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
            <hr className="h-px my-3 bg-gray-200 border-0 rounded dark:bg-gray-300" />
            <div className="grid grid-cols-4 gap-4 content-center ">
              <div className="col-span-4 mt-4">
                <Typography className="mb-3 font-satoshi text-lg font-bold">
                  Price
                </Typography>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={100000}
                />
              </div>
              <div className="col-span-4 ">
                <Typography className="mb-3 font-satoshi text-lg font-bold">
                  Categories
                </Typography>
                <ul>
                  {categories.map((category) => (
                    <li
                      className="text-slate-500 font-satoshi font-medium my-1 cursor-pointer ml-auto mr-auto hover:text-[#4b077c]"
                      key={category}
                      onClick={() => {
                        setCategory(category);
                        setCurrentPage(1);
                      }}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-4 shadow-xl px-4 py-5 rounded-xl">
                <fieldset>
                  <Typography className="mb-3 font-satoshi text-lg font-bold">
                    Ratings Above
                  </Typography>
                  <Slider
                    value={ratings}
                    onChange={(e, newRating) => {
                      setRatings(newRating);
                      setCurrentPage(1);
                    }}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                  ></Slider>
                </fieldset>
              </div>
            </div>
          </div>
          {products &&
            (products.length > 0 ? (
              <section className="col-span-3 max-md:col-span-4">
                <div className="grid grid-cols-3 max-lg:grid-cols-4 gap-3 p-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="shadow-xl px-5 py-10 max-lg:col-span-2 max-md:col-span-4 max-md:mb-10 mb-10 rounded-xl"
                    >
                      <Link href={`/products/Id/${product._id}`}>
                        <Image
                          src={product.images[0].url}
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
                        <h4 className="text-xl max-md:hidden text-center text-[#4b077c] font-semibold ">
                          {shortenText(product.name, 16)}
                        </h4>
                        <h4 className="text-xl md:hidden text-center text-[#4b077c] font-semibold ">
                          {shortenText(product.name, 25)}
                        </h4>
                        <p className="mt-2 text-center max-md:hidden text-slate-500">
                          {shortenText(product.description, 24)}
                        </p>
                        <p className="mt-2 text-center md:hidden text-slate-500">
                          {shortenText(product.description, 35)}
                        </p>
                        <div className="flex justify-center items-center gap-3">
                          <ReactStars
                            edit={false}
                            isHalf={true}
                            size={22}
                            activeColor="#fe7f07"
                            value={product.ratings}
                            count={5}
                          />
                          <span className="text-sm text-slate-500">
                            {`(${product.numOfReviews} Reviews)`}
                          </span>
                        </div>
                      </Link>
                      <button className="bg-[#fe7f07] mt-5 text-md font-semibold text-white px-6 py-2 rounded-lg w-full">
                        Add to cart
                      </button>
                    </div>
                  ))}
                </div>
                {resultPerPage < productCount && (
                  <center>
                    <div className=" mb-20">
                      <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productCount}
                        onChange={setCurrentPageNo}
                        nextPageText={"Next"}
                        prevPageText={"Prev"}
                        firstPageText={"First"}
                        lastPageText={"Last"}
                        itemClass="custom-pagination-item"
                        linkClass="custom-pagination-link"
                        activeClass="custom-pagination-active"
                        activeLinkClass="custom-pagination-active-link"
                      />
                      <style>
                        {`
                    .pagination{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        text-align: center;
                    }
                    .custom-pagination-item{
                        border:1px solid #fe7f07;
                        border-color:#fe7f07;
                        color: #fe7f07;
                        text-align: center;
                        line-height: 40px;
                        width: 60px;
                        height: 40px;
                        margin: 0 ;
                        cursor: pointer;
                    }
                    .custom-pagination-item:first-child{
                        border-radius: 5px 0 0 5px;
                    }
                    .custom-pagination-item:last-child{
                        border-radius: 0 5px 5px 0;
                    }
                    .custom-pagination-active{
                        background-color: #fe7f07;
                        color: white;
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        margin: 0 5px;
                        cursor: pointer;
                    }
                    `}
                      </style>
                    </div>
                  </center>
                )}
              </section>
            ) : (
              <div className="col-span-3 max-md:col-span-4 flex flex-col justify-items-start items-center my-10">
                <Image
                  src="/assets/icons/emptycart.png"
                  alt="empty"
                  width={100}
                  height={100}
                  className="object-contain"
                />
                <h1 className="text-center text-lg font-semibold font-satoshi text-[#4b077c] my-6">
                  No Products Found 😥 ! Explore more products
                </h1>

                <button
                  onClick={resetFilters}
                  className="bg-[#fe7f07] text-lg font-semibold text-white px-6 py-2 rounded-lg"
                >
                  Shop Now
                  <BsCartCheckFill className="inline-block ml-1" />
                </button>
              </div>
            ))}
        </section>
      )}
    </section>
  );
};

export default Page;
