"use client";

import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getallsubscribers,
  deletesubscriber,
} from "@app/redux/features/admin/subscribers/subscribersSliceAd";
import Loading from "@app/loading";
import MetaData from "@components/MetaData";
import Image from "next/image";
import Sidebar from "@components/Sidebar";
import DeleteIcon from "@mui/icons-material/Delete";
import { dateIN } from "@functions";
import AlertDialogBox from "@components/Alert";

const Page = () => {
  const dispatch = useDispatch();
  const { subscribers, isLoading } = useSelector((state) => state.subscriberAd);

  const deleteSubscriberHandler = async (subscriberId) => {
    await dispatch(deletesubscriber({ subscriberId: subscriberId }));
    await dispatch(getallsubscribers());
  };

  useEffect(() => {
    dispatch(getallsubscribers());
  }, [dispatch]);

  const columns = [
    {
      field: "id",
      headerName: <strong>Subscriber ID</strong>,
      width: 300,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: <strong>Email Id</strong>,
      width: 350,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "date",
      headerName: <strong>Date</strong>,
      width: 250,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: <strong>Actions</strong>,
      minWidth: 100,
      sortable: false,
      flex: 0.3,
      headerAlign: "right",
      align: "right",
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center gap-4 mr-2">
            <AlertDialogBox
              deleteHandler={() => deleteSubscriberHandler(params.id)}
              type="Subscriber"
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

  subscribers &&
    subscribers.length > 0 &&
    subscribers.forEach((subscriber) => {
      rows.push({
        id: subscriber._id,
        email: subscriber.email,
        date: dateIN(subscriber.createdAt),
      });
    });

  return (
    <section className="md:mt-[110px] mt-[100px] mb-20 my-[100px]">
      <MetaData title="Admin Subscribers" />

      <div className="grid grid-cols-6 gap-2">
        <div className="col-span-1 max-md:col-span-6 h-full border-r-2">
          <Sidebar />
        </div>
        <div className="col-span-5 max-md:col-span-6 mx-4">
          <div className="flex flex-col justify-center items-center mb-4">
            <h1 className="text-xl font-satosh font-bold text-[#4b077c]">
              Admin - Subscribers List
            </h1>
            <hr className="h-[1.5px] my-3  w-[30%] bg-gray-200 border-0 rounded dark:bg-gray-300" />
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {subscribers && subscribers.length > 0 ? (
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
                    src="/assets/icons/subscribe.png"
                    width={100}
                    height={100}
                    alt="No Subscribers Found"
                  ></Image>
                  <h1 className="text-lg my-4 text-red-500 font-satoshi font-semibold text-center">
                    No subscribers found !
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
