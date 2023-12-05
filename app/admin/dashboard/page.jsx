"use client";

import Sidebar from "@components/Sidebar";
import MetaData from "@components/MetaData";
import Link from "next/link";
import LineChart from "@components/LineChart";
import DoughnutChart from "@components/DoughnutChart";
import {
  getadminproducts,
  RESET_PRODUCT_STATE,
} from "@app/redux/features/admin/products/productSliceAd";
import {
  getallorders,
  RESET_ORDER,
} from "@app/redux/features/admin/orders/orderSliceAd";
import {
  getallusers,
  RESET_USER,
} from "@app/redux/features/admin/users/usersSliceAd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@app/loading";

const Page = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.productAd);
  const { orders, totalAmount } = useSelector((state) => state.orderAd);
  const { users } = useSelector((state) => state.userAd);

  let outOfStock = 0;

  products &&
    products.forEach((product) => {
      if (product.stock === 0) {
        outOfStock += 1;
      }
    });

  const inStock = products && products.length - outOfStock;

  useEffect(() => {
    try {
      dispatch(getadminproducts());
      dispatch(getallorders());
      dispatch(getallusers());
    } catch (error) {
      console.log(error);
      dispatch(RESET_ORDER());
      dispatch(RESET_PRODUCT_STATE());
      dispatch(RESET_USER());
    }
  }, [dispatch]);

  return (
    <section className="md:mt-[110px] mt-[100px] mb-20 my-[100px]">
      <MetaData title="Admin Dashboard" />
      <div className="grid grid-cols-6 gap-2">
        <div className="col-span-1 max-md:col-span-6 h-full border-r-2">
          <Sidebar />
        </div>
        <div className="col-span-5 max-md:col-span-6 mx-4">
          <div className="flex flex-col justify-center items-center mb-4">
            <h1 className="text-xl font-satoshi font-bold text-[#4b077c]">
              Admin Dashboard
            </h1>
            <hr className="h-[1.5px] my-3  w-[30%] bg-gray-200 border-0 rounded dark:bg-gray-300" />
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className="grid grid-cols-4 gap-4 mb-20">
                <div className="bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white max-md:col-span-4 p-4 rounded-xl flex justify-center items-center gap-5 text-center">
                  <Link href="/admin/dashboard">
                    <p className="font-satoshi font-semibold text-lg tracking-wide mb-2">
                      Total Amount
                    </p>
                    <p className="font-satoshi font-semibold text-base tracking-wider">
                      ₹{" "}
                      {new Intl.NumberFormat("en-In").format(
                        totalAmount && totalAmount.toFixed(2)
                      )}
                    </p>
                  </Link>
                </div>
                <div className="bg-[#fe7f07] shadow-lg shadow-[#fe7f07] text-white max-md:col-span-4 p-4 rounded-xl flex justify-center items-center gap-5 text-center">
                  <Link href="/admin/products">
                    <p className="font-satoshi font-semibold text-lg tracking-wide mb-2">
                      Products
                    </p>
                    <p className="font-satoshi font-semibold text-base tracking-wider">
                      {products && products.length}
                    </p>
                  </Link>
                </div>
                <div className="bg-[#8bc13d] shadow-lg shadow-[#8bc13d] text-white max-md:col-span-4 p-4 rounded-xl flex justify-center items-center gap-5 text-center">
                  <Link href="/admin/orders">
                    <p className="font-satoshi font-semibold text-lg tracking-wide mb-2">
                      Orders
                    </p>
                    <p className="font-satoshi font-semibold text-base tracking-wider">
                      {orders && orders.length}
                    </p>
                  </Link>
                </div>
                <div className="bg-[#4b077c] shadow-lg shadow-[#4b077c] text-white max-md:col-span-4 p-4 rounded-xl flex justify-center items-center gap-5 text-center">
                  <Link href="/admin/users">
                    <p className="font-satoshi font-semibold text-lg tracking-wide mb-2">
                      Users
                    </p>
                    <p className="font-satoshi font-semibold text-base tracking-wider">
                      {users && users.length}
                    </p>
                  </Link>
                </div>
              </div>
              <div className="mb-5 mx-auto w-[80%] max-lg:w-full">
                <div className="mb-20">
                  <LineChart totalAmount={totalAmount && totalAmount} />
                </div>
                <div className="grid grid-cols-3 gap-5">
                  <div className="col-span-1 max-md:col-span-3 flex justify-center flex-col items-center gap-5">
                    <p className="text-lg font-semibold text-center text-[#4b077c]">
                      Products Details
                    </p>
                    <p className="text-base font-semibold text-center text-[#4b077c]">
                      In Stock : {inStock}
                    </p>
                    <p className="text-base font-semibold text-center text-[#4b077c]">
                      Out of Stock : {outOfStock}
                    </p>
                  </div>
                  <div className="col-span-2 max-md:col-span-3 max-md:w-full w-[60%] mx-auto">
                    <DoughnutChart outOfStock={outOfStock} inStock={inStock} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
