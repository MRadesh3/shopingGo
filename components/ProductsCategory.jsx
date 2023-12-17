"use client";

import Link from "next/link";
import Image from "next/image";
import { categories } from "@constants";
import { BsCartCheckFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

const ProductsCategory = () => {
  const router = useRouter();

  const handleCategoryClick = (category) => {
    router.push(`/products?category=${category.replace(/\s/g, "")}`);
  };

  return (
    <section className="mb-20 lg:mx-7 mx-3 grid grid-cols-4 gap-5">
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => handleCategoryClick(category.title)}
          className="max-md:col-span-4 max-lg:col-span-2 shadow-xl py-10 px-5 w-full rounded-xl"
        >
          <div>
            <h1 className="text-xl text-center text-[#4b077c] mb-6 font-semibold">
              {category.title}
            </h1>
            <Image
              src={category.image}
              alt={category.title}
              width={400}
              height={100}
              className="object-contain w-full h-[220px]"
            ></Image>

            <div className="mt-8">
              <center>
                <p className="bg-red-500 my-3 text-white px-3 py-1 inline-block rounded-xl">
                  Deal of the day
                </p>{" "}
                <br />
                <span className="text-green-500 text-lg font-semibold">
                  {category.discount}
                </span>{" "}
              </center>
            </div>
            <button className="bg-[#fe7f07] mt-5 max-xl:mb-4 text-md w-full font-semibold text-white px-6 py-2 rounded-lg">
              Shop Now
              <BsCartCheckFill className="inline-block ml-1 max-xl:hidden " />
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProductsCategory;
