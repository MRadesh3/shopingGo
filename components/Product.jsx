import ReactStars from "react-rating-stars-component";
import Link from "next/link";
import Image from "next/image";
import { shortenText } from "@functions";
import { useSelector, useDispatch } from "react-redux";
import { getproducts } from "@app/redux/features/product/productSlice";
import { useEffect } from "react";

const Product = ({ product }) => {
  const options = {
    edit: false,
    isHalf: true,
    size: 22,
    activeColor: "#fe7f07",
    value: product.rating,
    count: 5,
  };
  return (
    <Link href="/">
      <div className="shadow-xl w-full px-5 py-10 hfull mb-20 rounded-xl hover:scale-110 transition duration-500 cursor-pointer">
        <Image
          src={product.images.url}
          alt={product.name}
          width={400}
          height={100}
          className="object-contain h-40 w-full"
        />
        <p className="text-lg text-red-500 mt-4 mb-2 text-center">
          {product.price}
        </p>
        <h4 className="text-xl text-center text-[#4b077c] font-semibold ">
          {shortenText(product.name, 18)}
        </h4>
        <p className="mt-2 text-center text-slate-500">
          {shortenText(product.description, 26)}
        </p>
        <div className="flex justify-center items-center gap-3">
          <ReactStars {...options} />
          <span className="text-sm text-slate-500">(24 Reviews)</span>
        </div>
        <button className="bg-[#fe7f07] mt-5 text-md font-semibold text-white px-6 py-2 rounded-lg w-full">
          Add to cart
        </button>
      </div>
    </Link>
  );
};

export default Product;
