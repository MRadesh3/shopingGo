"use client";

import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallorders } from "@app/redux/features/admin/orders/orderSliceAd";
import Loading from "@app/loading";
import MetaData from "@components/MetaData";
import Sidebar from "@components/Sidebar";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import Image from "next/image";

const Page = () => {
  const dispatch = useDispatch();

  const { orders, isLoading } = useSelector((state) => state.orderAd);

  useEffect(() => {
    dispatch(getallorders());
  }, [dispatch]);

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
      field: "actions",
      headerName: <strong>Actions</strong>,
      minWidth: 150,
      sortable: false,
      flex: 0.3,
      headerAlign: "center",
      align: "right",
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center gap-4 mr-6">
            <Link href={`/admin/orders/${params.id}`}>
              <EditIcon
                fontSize="small"
                className="text-green-500 hover:text-green-800"
              />
            </Link>
          </div>
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

  return (
    <section className="md:mt-[110px] mt-[100px] mb-20 my-[100px]">
      <MetaData title="Admin Orders" />

      <div className="grid grid-cols-6 gap-2">
        <div className="col-span-1 max-md:col-span-6 h-full border-r-2">
          <Sidebar />
        </div>
        <div className="col-span-5 max-md:col-span-6 mx-4">
          <div className="flex flex-col justify-center items-center mb-4">
            <h1 className="text-xl font-satosh font-bold text-[#4b077c]">
              Admin - Orders List
            </h1>
            <hr className="h-[1.5px] my-3  w-[30%] bg-gray-200 border-0 rounded dark:bg-gray-300" />
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {orders && orders.length > 0 ? (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={20}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 20,
                      },
                    },
                  }}
                  pageSizeOptions={[10]}
                  autoHeight
                  className="font-satoshi text-lg"
                />
              ) : (
                <div className="flex justify-center items-center flex-col my-20">
                  <Image
                    src="/assets/icons/emptycart.png"
                    width={100}
                    height={100}
                    alt="No Orders Found"
                  ></Image>
                  <h1 className="text-lg my-4 text-red-500 font-satoshi font-semibold text-center">
                    No Orders found !
                  </h1>
                </div>
              )}
            </>
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
        </div>
      </div>
    </section>
  );
};

export default Page;
