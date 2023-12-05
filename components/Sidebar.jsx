import { TreeView } from "@mui/x-tree-view";
import { TreeItem } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <section className="flex flex-col justify-center items-start gap-7 pl-10 max-md:pl-[20%] max-lg:pl-2 pb-10">
      <Link href="/">
        <Image
          src="/assets/icons/shopingologo.png"
          alt="logo"
          width={120}
          height={120}
          className="mx-auto cursor-pointer"
        ></Image>
      </Link>
      <Link
        href="/admin/dashboard"
        className="hover:text-slate-800 hover:scale-110 transition duration-300 ease-in-out"
      >
        <p className="text-slate-500 flex font-satoshi justify-center items-center gap-1">
          <DashboardIcon fontSize="small" /> Dashboard
        </p>
      </Link>
      <Link href="" className="font-satoshi">
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon fontSize="small" />}
          defaultExpandIcon={<KeyboardArrowRightIcon fontSize="small" />}
        >
          <TreeItem
            nodeId="1"
            label="Products"
            className="text-slate-500 font-satoshi"
          >
            <Link
              href="/admin/products"
              className="hover:text-slate-800 font-satoshi hover:scale-110 transition duration-300 ease-in-out"
            >
              <TreeItem
                nodeId="2"
                label="All"
                icon={<PostAddIcon fontSize="small" />}
                className="text-slate-500 font-satoshi flex justify-center items-center gap-1"
              />
            </Link>

            <Link href="/admin/products/createproduct">
              <TreeItem
                nodeId="3"
                label="Create"
                icon={<AddIcon fontSize="small" />}
                className="text-slate-500 font-satoshi flex justify-center items-center gap-1"
              />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link
        href="/admin/orders"
        className="hover:text-slate-800 font-satoshi hover:scale-110 transition duration-300 ease-in-out"
      >
        <p className="text-slate-500 font-satoshi flex justify-center items-center gap-1">
          <ListAltIcon fontSize="small" /> Orders
        </p>
      </Link>
      <Link
        href="/admin/users"
        className="hover:text-slate-800 hover:scale-110 transition duration-300 ease-in-out"
      >
        <p className="text-slate-500 flex font-satoshi justify-center items-center gap-1">
          <PeopleIcon fontSize="small" /> Users
        </p>
      </Link>
      <Link
        href="/admin/reviews"
        className="hover:text-slate-800 hover:scale-110 transition duration-300 ease-in-out"
      >
        <p className="text-slate-500 font-satoshi flex justify-center items-center gap-1">
          <RateReviewIcon fontSize="small" /> Reviews
        </p>
      </Link>
      <Link
        href="/admin/subscribers"
        className="hover:text-slate-800 hover:scale-110 transition duration-300 ease-in-out"
      >
        <p className="text-slate-500 font-satoshi flex justify-center items-center gap-1">
          <SubscriptionsIcon fontSize="small" /> Subscribers
        </p>
      </Link>

      <style>
        {`
        .css-1bcfi89-MuiTreeItem-content{
            padding: 0 0 5px 0 !important;
        }
        .css-1bcfi89-MuiTreeItem-content .MuiTreeItem-label{
            padding: 0 !important;
            font-family: Satoshi, sans-serif !important;
        }
        .css-1bcfi89-MuiTreeItem-content.Mui-selected{
            background-color: transparent !important;
        }
        .css-1bcfi89-MuiTreeItem-content:hover {
            background-color: transparent !important;
        }
        `}
      </style>
    </section>
  );
};

export default Sidebar;
