"use client";

import MetaData from "../../../components/MetaData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ArticleIcon from "@mui/icons-material/Article";

const Page = () => {
  const router = useRouter();

  return (
    <section className="md:mt-[140px] mt-[130px] mb-20 my-[100px] lg:mx-20">
      <MetaData title="Payment Success" />
      <div className="flex flex-col items-center mt-10 w-full px-20 max-md:px-5">
        <Image
          src="/assets/icons/order.png"
          width={150}
          height={100}
          alt="PAyment Logo"
          className="object-contain"
        ></Image>
        <h3 className="mt-4 text-center">
          <span className="text-lg text-[#fe7f07] font-satoshi font-semibold">
            Congratulations !{" "}
          </span>
          <span className="text-lg text-[#4b077c] font-bold font-inter">
            Order placed{" "}
            <span className="text-xl text-[#92c340]"> successfully</span>
          </span>
        </h3>
        <p className="mt-2 text-center text-slate-500 lg:max-w-xl">
          Congratulations ! Your order has been placed successfully. Thank you
          for choosing <b>ShopingGo</b>. Our team is already hard at work
          processing your order.
        </p>

        <button
          onClick={() => router.push("/profile/myorders")}
          className="bg-[#fe7f07] text-lg mb-10 font-semibold mt-10 text-white px-6 py-2 rounded-lg"
        >
          View Orders
          <ArticleIcon className="inline-block ml-1 max-md:hidden" />
        </button>
      </div>
    </section>
  );
};

export default Page;
