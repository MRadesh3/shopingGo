"use client";

import MetaData from "@components/MetaData";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="md:mt-[110px] mt-[100px] mb-20 my-[100px] mx-8">
      <MetaData title="Page Not Found" />
      <div className="flex flex-col justify-center items-center">
        <Image
          src="/assets/icons/notfound.png"
          width={150}
          height={150}
          alt="Error"
        ></Image>

        <h1 className="text-2xl font-satoshi text-[#4b077c] font-semibold mt-10 mb-3">
          404 :{" "}
          <span className="text-xl font-satoshi font-semibold text-[#fe7f07]">
            {" "}
            Page Not Found{" "}
          </span>
        </h1>

        <p className="text-slate-500 mb-5">
          We're sorry, The requested URL was not found on this server
        </p>
        <Link href="/">
          <button className="bg-[#fe7f07] text-md w-full font-semibold text-white px-6 py-2 rounded-lg">
            Go to Homepage
          </button>
        </Link>
      </div>
    </section>
  );
}
