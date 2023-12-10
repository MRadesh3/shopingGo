"use client";

import { Backdrop, SpeedDial, SpeedDialAction } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, logout } from "../app/redux/features/auth/authSlice";

const UserOptions = ({ user }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const dashboard = () => {
    router.push("/admin/dashboard");
    setOpen(false);
  };
  const orders = () => {
    router.push("/profile/myorders");
    setOpen(false);
  };
  const account = () => {
    router.push("/profile");
    setOpen(false);
  };
  const logoutuser = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    router.push("/");
  };

  const options = [
    { icon: <ListAltIcon />, name: "My Orders", function: orders },
    { icon: <PersonIcon />, name: "My Profile", function: account },
    { icon: <ExitToAppIcon />, name: "Logout", function: logoutuser },
  ];

  if (user.user.role === "Admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      function: dashboard,
    });
  }

  return (
    <section>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        open={open}
        sx={{
          "& .MuiFab-primary": {
            width: 45,
            height: 45,
            backgroundColor: "transparent",
          },
          zIndex: "50",
        }}
        direction="down"
        icon={
          <Image
            src={
              user.user.avatar ? user.user.avatar.url : "/assets/icons/user.png"
            }
            width={50}
            height={50}
            alt="profile"
            className="rounded-full object-cover h-[45px] w-[45px] "
          />
        }
      >
        <Backdrop
          open={open}
          onClick={() => setOpen(false)}
          sx={{ zIndex: "30" }}
        />
        {options.map((option) => (
          <SpeedDialAction
            key={option.name}
            icon={option.icon}
            tooltipTitle={option.name}
            onClick={option.function}
          />
        ))}
      </SpeedDial>
    </section>
  );
};

export default UserOptions;
