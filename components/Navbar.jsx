"use client";

import Link from "next/link";
import Image from "next/image";
import { BsCartCheckFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET_AUTH,
  getuser,
  getloginstatus,
} from "@app/redux/features/auth/authSlice";
import { useEffect } from "react";
import UserOptions from "./UserOptions";

const Navbar = () => {
  const dispatch = useDispatch();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const { isLoggedIn, user, isSuccess } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const activeLinkHandler = (index) => {
    setActiveLink(index);
  };

  useEffect(() => {
    dispatch(getloginstatus());
  }, [dispatch]);

  const toggleDropdownHandler = () => {
    setToggleDropdown(!toggleDropdown);
  };

  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      dispatch(getuser());
    }
  }, [dispatch, isLoggedIn, isSuccess]);

  return (
    <header className="w-full fixed top-0 left-0 z-20 right-0 shadow-md ">
      <nav className="w-full flex-between py-1 px-5 bg-gradient-to-r pb-2 from-gray-100 to-gray-200">
        <div className="flex gap-3 md:gap-10">
          <Link
            href="/"
            className={`nav_text ${activeLink === -1 ? "active_link" : ""}`}
            onClick={() => activeLinkHandler(11)}
          >
            <Image
              src="/assets/icons/shopingologo.png"
              width={180}
              height={50}
              alt="ShopingGo Logo"
              className="object-contain max-md:w-[170px]"
            ></Image>
          </Link>
        </div>
        <div className="max-md:hidden flex gap-1 md:gap-10 lg:gap-20 ">
          <Link
            href="/products"
            className={`nav_text ${activeLink === 0 ? "active_link" : ""}`}
            onClick={() => activeLinkHandler(0)}
          >
            Shop
          </Link>
          <Link
            href="/about"
            className={`nav_text ${activeLink === 1 ? "active_link" : ""}`}
            onClick={() => activeLinkHandler(1)}
          >
            About
          </Link>

          <Link
            href="/contact"
            className={`nav_text ${activeLink === 2 ? "active_link" : ""}`}
            onClick={() => activeLinkHandler(2)}
          >
            Contact
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:pr-20 gap-4 md:gap-10">
          <Link
            href="/cart"
            className={`flex gap-3 items-center nav_text ${
              activeLink === 5 ? "active_link" : ""
            }`}
            onClick={() => activeLinkHandler(5)}
          >
            <BsCartCheckFill className="h-8 w-8" />
            <span className="max-md:hidden">Cart</span>
            {cartItems.length > 0 ? (
              <span className="cart_count">{cartItems.length}</span>
            ) : (
              <span className="cart_count">0</span>
            )}
          </Link>
          {isLoggedIn ? (
            <div className="absolute max-lg:right-[65px]  right-20 top-4">
              {user && <UserOptions user={user} />}
            </div>
          ) : (
            <Link
              href="/login"
              className={`flex gap-2 justify-center items-center nav_text ${
                activeLink === 3 ? "active_link" : ""
              }`}
              onClick={() => activeLinkHandler(3)}
            >
              <span className="max-md:hidden">Login</span>
              <Image
                src="/assets/icons/user.png"
                width={45}
                height={45}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden max-sm:flex relative">
          <div onClick={toggleDropdownHandler}>
            {toggleDropdown ? (
              <AiOutlineClose className="h-8 w-8" />
            ) : (
              <GiHamburgerMenu className="h-8 w-8" />
            )}
          </div>

          {toggleDropdown && (
            <div className="dropdown bg-gradient-to-r from-gray-100 to-gray-200">
              {isLoggedIn ? (
                <>
                  <p className="text-[#4b077c] font-satoshi font-semibold">
                    Hi {user && user.user.name}
                  </p>
                  <Link
                    href="/myorders"
                    className="nav_text"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Orders
                  </Link>
                </>
              ) : (
                <Link
                  href="/login"
                  className="nav_text"
                  onClick={() => setToggleDropdown(false)}
                >
                  Login
                </Link>
              )}
              <Link
                href="/products"
                className="nav_text"
                onClick={() => setToggleDropdown(false)}
              >
                Shop
              </Link>

              <Link
                href="/about"
                className="nav_text"
                onClick={() => setToggleDropdown(false)}
              >
                About
              </Link>

              <Link
                href="/contact"
                className="nav_text"
                onClick={() => setToggleDropdown(false)}
              >
                Contact
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
