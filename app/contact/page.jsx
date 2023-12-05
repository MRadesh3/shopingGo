"use client";

import Image from "next/image";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PinDropIcon from "@mui/icons-material/PinDrop";
import MetaData from "@components/MetaData";

const Login = () => {
  return (
    <>
      <section className="md:mt-[130px] mt-[100px] mb-20 my-[100px] lg:mx-20 ">
        <MetaData title="Contact" />
        <div className="flex justify-center items-start gap-10 max-lg:flex-col">
          <div className="flex flex-col justify-center items-center w-full px-10 mt-10">
            <Image
              src="/assets/icons/communicate.png"
              alt="Register Logo"
              width={150}
              height={100}
              className="object-contain"
            ></Image>
            <h3 className="mt-4 text-center">
              <span className="text-lg text-[#fe7f07] font-satoshi font-semibold">
                Welcome To{" "}
              </span>
              <span className="text-2xl text-[#4b077c] font-bold font-inter">
                Shoping<span className="text-2xl text-[#92c340]">Go</span>
              </span>
            </h3>
            <p className="mt-2 text-center text-slate-500 lg:max-w-xl">
              We're here to help! Our dedicated support team is ready to assist
              you with any questions you may have. Whether it's tracking your
              package, sizing advice, or general inquiries, don't hesitate to
              reach out. You can contact us via email or phone, and we'll get
              back to you promptly. Your satisfaction is our priority, and we
              look forward to providing you with the best shopping experience.
              Thank you for choosing <b>ShopingGo</b>
            </p>
          </div>
          <div className="flex flex-col justify-center items-center  w-full max-md:px-7">
            <h1 className="text-xl text-slate-500">
              <span className="text-2xl text-[#4b077c] font-bold font-inter">
                Contact{" "}
                <span className="text-2xl text-[#92c340]"> Details</span>
              </span>
            </h1>
            <div className="w-full px-10 py-10 shadow-xl flex-col mt-10 rounded-lg">
              <div className="mb-8">
                <span className="flex text-red-500 font-semibold mb-1">
                  <EmailIcon className="text-red-500" /> &nbsp; Email
                </span>
                <p className="text-slate-500 text-lg font-semibold drop-shadow-lg">
                  <a href="mailto:shopinggocustomers@gmail.com">
                    shopinggocustomers@gmail.com
                  </a>
                </p>
              </div>

              <div className="mb-8">
                <span className="flex text-red-500 font-semibold mb-1">
                  <LocalPhoneIcon className="text-red-500" /> &nbsp; Phone
                </span>
                <p className="text-slate-500 text-lg font-semibold drop-shadow-lg">
                  <a href="tel:8080120538">+91 8080120538</a>,{" "}
                  <a href="tel:8857020538">+91 8857020538</a>
                </p>
              </div>

              <div className="mb-8">
                <span className="flex text-red-500 font-semibold mb-1">
                  <PinDropIcon className="text-red-500" /> &nbsp; Address
                </span>
                <p className="text-slate-500 text-lg font-semibold drop-shadow-lg">
                  Aura City, Block D-4, Shop No. 1, Near D-Mart, Shikhrapur,
                  Maharashtra - 412108
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="mt-20">
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3779.5427364629554!2d74.1351223!3d18.684504399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2d9f77013d5c7%3A0x813e42dd41403c94!2sAura%20City!5e0!3m2!1sen!2sin!4v1701628305949!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
};

export default Login;
