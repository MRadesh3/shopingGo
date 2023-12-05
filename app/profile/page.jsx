"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, getuser } from "../redux/features/auth/authSlice";
import Image from "next/image";
import MetaData from "@components/MetaData";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Loading from "@app/loading";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getuser());
    } else {
      dispatch(RESET_AUTH());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <section className="md:mt-20 mt-[80px] mb-20">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-col justify-center items-center  ">
            <h1 className="text-xl font-satoshi text-[#4b077c] font-bold mt-8">
              My Profile
            </h1>
            <hr className="h-[1.5px] my-3  w-[30%] bg-gray-200 border-0 rounded dark:bg-gray-300" />
          </div>
          <div className="grid grid-cols-4 gap-10 mt-10 mx-[120px] max-lg:mx-10 max-md:mx-5">
            {user && (
              <>
                <MetaData title={`${user.user.name}'s Profile`} />
                <div className="col-span-2 max-lg:col-start-2 max-lg:col-end-4 max-md:col-span-4 flex flex-col justify-center items-center p-10 rounded-2xl shadow-xl">
                  <Image
                    src={
                      user.user.avatar
                        ? user.user.avatar.url
                        : "/assets/icons/user.png"
                    }
                    width={300}
                    height={300}
                    alt={user.user.name}
                    className="h-[300px] w-[300px] rounded-lg object-cover"
                  ></Image>{" "}
                  <br />
                  <Link href="/profile/updateprofile">
                    <button className="col-span-2 max-md:col-span-4 border-[1px] bg-[#fe7f07] text-white w-full text-md font-semibold px-6 py-2 rounded-lg">
                      Update Profile
                    </button>
                  </Link>
                </div>
                <div className="col-span-2 max-lg:col-span-4 max-md:col-span-4">
                  <div className=" p-6  mb-6">
                    <div className="grid grid-cols-5 gap-10 mx-2">
                      <div className="col-span-3 max-md:col-span-5">
                        <p className="text-slate-500 text-sm mb-2">Name</p>
                        <h1 className="text-base font-medium mb-2 tracking-wide">
                          {user.user.name}
                        </h1>
                      </div>
                      <div className="col-span-2 max-md:col-span-5">
                        <p className="text-slate-500 text-sm mb-2">Role</p>
                        <h1 className="text-base font-medium mb-2">
                          {user.user.role === "admin" ? (
                            <AdminPanelSettingsIcon className="text-red-500" />
                          ) : (
                            <PersonIcon className="text-green-500" />
                          )}
                          {"  "}
                          {user.user.role}
                        </h1>
                      </div>
                    </div>
                    <hr className="h-[1px] my-6 bg-gray-200 border-0 rounded dark:bg-gray-300" />

                    <div className="grid grid-cols-5 gap-10 mx-2">
                      <div className="col-span-3 max-md:col-span-5">
                        <p className="text-slate-500 text-sm mb-2">
                          <EmailIcon /> &nbsp; Email
                        </p>
                        <h1 className="text-base font-medium mb-2 tracking-wide break-words">
                          {user.user.email}
                        </h1>
                      </div>
                      <div className="col-span-2 max-md:col-span-5">
                        <p className="text-slate-500 text-sm mb-2">
                          <LocalPhoneIcon /> &nbsp; Phone No.
                        </p>
                        <h1 className="text-base font-medium mb-2">
                          {user.user.phone}
                        </h1>
                      </div>
                    </div>

                    <hr className="h-[1.5px] my-6 bg-gray-200 border-0 rounded dark:bg-gray-300" />

                    <div className="grid grid-cols-5 gap-10 mx-2">
                      <div className="col-span-3 max-md:col-span-5">
                        <p className="text-slate-500 text-sm mb-2">
                          <LocationOnIcon /> &nbsp; Address
                        </p>
                        <h1 className="text-base font-medium mb-2">
                          {user.user.address ? (
                            <>
                              {user.user.address.address && (
                                <>{user.user.address.address}, </>
                              )}
                              {user.user.address.city && (
                                <>{user.user.address.city} - </>
                              )}
                              {user.user.address.postalCode && (
                                <>{user.user.address.postalCode} </>
                              )}
                              {user.user.address.state && (
                                <>{user.user.address.state} </>
                              )}
                              {user.user.address.country && (
                                <>{user.user.address.country}</>
                              )}
                            </>
                          ) : (
                            "No Address Available"
                          )}
                        </h1>
                      </div>
                      <div className="col-span-2 max-md:col-span-5">
                        <p className="text-slate-500 text-sm mb-2">
                          <CalendarMonthIcon /> &nbsp; Joined On
                        </p>
                        <h1 className="text-base font-medium mb-2">
                          {user.user.createdAt.substring(0, 10)}
                        </h1>
                      </div>
                    </div>

                    <hr className="h-[1.5px] my-8 bg-[#fe7f07]  border-0 rounded dark:bg-gray-300" />

                    <div className="grid grid-cols-4 gap-8 mx-2">
                      <Link
                        href="/profile/myorders"
                        className="col-span-2  max-md:col-span-4"
                      >
                        <button className=" border-[1px] hover:bg-[#4b077c] hover:text-white border-[#4b077c] text-[#4b077c] w-full text-md font-semibold px-6 py-2 rounded-lg">
                          My Orders
                        </button>
                      </Link>
                      <Link
                        href="/profile/updatepassword"
                        className="col-span-2  max-md:col-span-4"
                      >
                        <button className=" border-[1px] hover:bg-[#4b077c] hover:text-white border-[#4b077c] text-[#4b077c] w-full text-md font-semibold px-6 py-2 rounded-lg">
                          Change Password
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Page;
