"use client";

import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getmyorders } from "@app/redux/features/order/orderSlice";
import Loading from "@app/loading";
import MetaData from "@components/MetaData";
import LaunchIcon from "@mui/icons-material/Launch";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { orders, isLoading } = useSelector((state) => state.order);

  const columns = [
    {
      field: "id",
      headerName: <strong>Order ID</strong>,
      width: 300,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: <strong>Status</strong>,
      width: 150,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-center">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                params.value === "Delivered"
                  ? "bg-green-500 text-white"
                  : params.value === "Processing"
                  ? "bg-yellow-500 text-white"
                  : params.value === "Shipped"
                  ? "bg-blue-500 text-white"
                  : params.value === "Cancelled"
                  ? "bg-red-500 text-white"
                  : ""
              }`}
            >
              {params.value}
            </span>
          </div>
        );
      },
    },
    {
      field: "itemsQty",
      headerName: <strong>Items Quantity</strong>,
      type: "number",
      width: 150,
      flex: 0.3,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount",
      headerName: <strong>Amount</strong>,
      type: "number",
      width: 270,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: <strong>Action</strong>,
      width: 150,
      flex: 0.3,
      sortable: false,
      headerAlign: "left",
      align: "left",
      renderCell: (params) => {
        return (
          <button
            className="cursor-pointer"
            onClick={() => {
              router.push(`/profile/myorders/${params.id}`);
            }}
          >
            <LaunchIcon />
          </button>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.length > 0 &&
    orders.forEach((order) => {
      rows.push({
        id: order._id,
        status: order.orderStatus,
        itemsQty: order.orderItems.length,
        amount: `₹ ${new Intl.NumberFormat("en-In").format(order.totalPrice)}`,
      });
    });

  useEffect(() => {
    dispatch(getmyorders());
  }, [dispatch]);

  return (
    <section className="md:mt-20 mt-[80px] mb-20">
      <MetaData title="My Orders" />
      <div className="flex flex-col justify-center items-center ">
        <h1 className="mt-10 text-xl font-satoshi font-bold text-[#4b077c]">
          My Orders
        </h1>
        <hr className="h-[1.5px] my-3  w-[30%] bg-gray-200 border-0 rounded dark:bg-gray-300" />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="mx-10 max-md:mx-2 shadow-xl">
          {orders && orders.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              pageSizeOptions={false}
              autoHeight
              className="font-satoshi text-lg"
            />
          ) : (
            <div className="flex flex-col justify-center items-center my-10">
              <Image
                src="/assets/icons/emptycart.png"
                alt="Empty Order"
                width={100}
                height={200}
              ></Image>
              <h1 className="text-lg my-4 font-satoshi font-bold text-[#4b077c]">
                No Orders placed yet !
              </h1>
              <p className="text-slate-500 text-center lg:max-w-xl">
                Dear Valued Customers, Thank you for considering us for your
                shopping needs! Your journey to a delightful shopping experience
                begins here. Browse through our diverse range of high-quality
                products, carefully curated to cater to your unique tastes and
                preferences.
              </p>
              <Link href="/products">
                <button className="bg-[#fe7f07] my-6 max-xl:mb-4 text-md font-semibold text-white px-6 py-2 rounded-lg cursor-pointer">
                  Place an Order
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
      <style>
        {`
        .MuiDataGrid-root .MuiDataGrid-cell {
          font-size: 16px;
        }

        .MuiDataGrid-root .MuiDataGrid-columnHeaderTitleContainer {
          font-size: 16px;
        }

        .MuiDataGrid-root .MuiDataGrid-columnHeaders{
          background-color: #4b077c;
          color: white;
        }

        .MuiDataGrid-root .MuiDataGrid-columnHeader .MuiDataGrid-iconButtonContainer{
          color: white;
        }

        .css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root{
          color: white;
        }

        .MuiDataGrid-root .MuiDataGrid-columnHeaders .MuiDataGrid-columnSeparator{
          display: none;
        }
        `}
      </style>
    </section>
  );
};

export default Page;
