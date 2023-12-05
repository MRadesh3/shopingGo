"use client";

import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getallreviews,
  deletereview,
} from "@app/redux/features/admin/reviews/reviewsSliceAd";
import Loading from "@app/loading";
import MetaData from "@components/MetaData";
import { useRouter } from "next/navigation";
import Sidebar from "@components/Sidebar";
import Image from "next/image";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import DeleteIcon from "@mui/icons-material/Delete";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import mongoose from "mongoose";
import AlertDialogBox from "@components/Alert";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [productIdGetReviews, setProductIdGetReviews] = useState("");
  const { reviews, isLoading } = useSelector((state) => state.reviewAd);

  const initialValues = {
    productId: "",
  };

  console.log(productIdGetReviews);

  const deleteReviewHandler = async (reviewId) => {
    const productId = productIdGetReviews;
    await dispatch(deletereview({ reviewId, productId }));
    await dispatch(getallreviews(productId));
  };

  const onSubmit = async (values, action) => {
    setProductIdGetReviews(values.productId);
    const productId = values.productId;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      toast.error("Please Enter a Valid Product Id");
      return;
    } else {
      await dispatch(getallreviews(productId));
    }
  };

  const columns = [
    {
      field: "id",
      headerName: <strong>Review ID</strong>,
      minWidth: 250,
      flex: 0.6,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: <strong>Name</strong>,
      minWidth: 250,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "comment",
      headerName: <strong>Comment</strong>,
      minWidth: 300,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "rating",
      headerName: <strong>Rating</strong>,
      type: "number",
      minWidth: 50,
      flex: 0.3,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-center">
            <span
              className={` px-3 rounded-full font-normal ${
                params.value >= 3
                  ? " bg-green-500 text-white rounded-full font-satoshi"
                  : params.value < 3
                  ? " bg-red-500 text-white rounded-full font-satoshi"
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
      field: "actions",
      headerName: <strong>Actions</strong>,
      minWidth: 80,
      sortable: false,
      flex: 0.3,
      headerAlign: "center",
      align: "right",
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center gap-4 mr-2">
            <AlertDialogBox
              deleteHandler={() => deleteReviewHandler(params.id)}
              type="Review"
              btnName={
                <DeleteIcon
                  fontSize="medium"
                  className="text-red-500 hover:text-red-800"
                />
              }
            />
          </div>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.length > 0 &&
    reviews.forEach((review) => {
      rows.push({
        id: review._id,
        name: review.name,
        comment: review.comment,
        rating: review.rating,
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
              Admin - Reviews List
            </h1>
            <hr className="h-[1.5px] my-3  w-[30%] bg-gray-200 border-0 rounded dark:bg-gray-300" />
          </div>
          <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {({ values, handleChange, isSubmitting }) => (
                <Form>
                  <div className="grid grid-cols-4 gap-10 max-md:5 ">
                    <div className="col-start-2 col-end-4 max-lg:col-span-4 shadow-lg p-8 rounded-xl">
                      <label
                        htmlFor="productId"
                        className=" text-gray-700 text-md flex flex-col mb-5 relative"
                      >
                        <span className="flex text-slate-500 font-semibold mb-3">
                          <FormatListNumberedIcon className="text-slate-500" />{" "}
                          &nbsp; Product Id
                        </span>
                        <Field
                          type="text"
                          name="productId"
                          id="productId"
                          placeholder="Enter Your Product Id"
                          value={values.productId}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline-lg focus:outline-none focus:ring-1 focus:ring-[#4b077c]"
                        />
                      </label>

                      <div className="">
                        <center>
                          <input
                            type="submit"
                            value="Get Product Reviews"
                            name="submit"
                            disabled={
                              isSubmitting || !values.productId ? true : false
                            }
                            className={
                              isSubmitting || !values.productId
                                ? "bg-gray-400 mt-6 max-xl:mb-4 text-md font-semibold text-white px-6 py-2 rounded-lg cursor-not-allowed"
                                : "bg-[#fe7f07] mt-6 max-xl:mb-4 text-md font-semibold text-white px-6 py-2 rounded-lg cursor-pointer"
                            }
                          />{" "}
                        </center>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {reviews && reviews.length > 0 ? (
                <div className="my-10">
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
                </div>
              ) : (
                <div className="flex justify-center items-center flex-col my-10">
                  <Image
                    src="/assets/icons/noreview.png"
                    width={50}
                    height={50}
                    alt="No Reviews"
                  ></Image>
                  <h1 className="text-lg my-4 text-red-500 font-satoshi font-semibold text-center">
                    No reviews found for this Product Id
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
