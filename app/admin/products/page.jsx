"use client";

import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getadminproducts } from "@app/redux/features/admin/products/productSliceAd";
import Loading from "@app/loading";
import MetaData from "@components/MetaData";
import { useRouter } from "next/navigation";
import Sidebar from "@components/Sidebar";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import Image from "next/image";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { products, isLoading } = useSelector((state) => state.productAd);

  useEffect(() => {
    dispatch(getadminproducts());
  }, [dispatch, router.asPath]);

  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      minWidth: 250,
      flex: 0.6,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 330,
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 60,
      flex: 0.3,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 150,
      flex: 0.4,
      headerAlign: "right",
      align: "right",
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      flex: 0.3,
      headerAlign: "right",
      align: "right",
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center gap-4 mr-6">
            <Link href={`/admin/products/${params.id}`}>
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

  products &&
    products.length > 0 &&
    products.forEach((product) => {
      rows.push({
        id: product._id,
        name: product.name,
        stock: product.stock,
        price: `₹ ${product.price}`,
      });
    });

  return (
    <section className="md:mt-[110px] mt-[100px] mb-20 my-[100px]">
      <MetaData title="Admin Products" />

      <div className="grid grid-cols-6 gap-2">
        <div className="col-span-1 max-md:col-span-6 h-full border-r-2">
          <Sidebar />
        </div>
        <div className="col-span-5 max-md:col-span-6 mx-4">
          <div className="flex flex-col justify-center items-center mb-4">
            <h1 className="text-xl font-satosh font-bold text-[#4b077c]">
              Admin - Products List
            </h1>
            <hr className="h-[1.5px] my-3  w-[30%] bg-gray-200 border-0 rounded dark:bg-gray-300" />
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {products && products.length > 0 ? (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10,
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
                    src="/assets/icons/noproduct.png"
                    width={100}
                    height={100}
                    alt="No Products Found"
                  ></Image>
                  <h1 className="text-lg my-4 text-red-500 font-satoshi font-semibold text-center">
                    No Products found !
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
