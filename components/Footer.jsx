import Link from "next/link";
import Image from "next/image";
import { footerLinks } from "@constants";
import { BsInstagram } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { AiFillApple } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-[#37164f] text-white py-20 px-10">
      <div className="flex justify-between flex-wrap max-lg:flex-col  items-start gap-20 max-sm:flex-col">
        <div className="flex flex-col justify-center items-center">
          <Link href="/">
            <Image
              src="/assets/icons/logofooter.png"
              width={200}
              height={100}
              alt="Footer Logo"
              className="object-contain"
            ></Image>
          </Link>
          <p className="mt-6 sm:max-w-sm text-base font-inter">
            At ShopingGo, we offer an extensive range of high-quality products
            that cater to your every need, from fashion and electronics to home
            decor and more
          </p>
          <div className="flex flex-col gap-8  mt-10 text-2xl items-start justify-start">
            <h6 className="font-satoshi text-lg">Download our App</h6>
            <div className="flex gap-8 max-md:flex-col">
              <div className="flex gap-2 justify-center items-center border-[1.5px] rounded-xl px-4 py-2 cursor-pointer ">
                <Link href="/" className="">
                  <IoLogoGooglePlaystore className="w-8 h-8" />
                </Link>
                <div>
                  <p className="text-xs">GET IT ON</p>
                  <h2 className="text-lg ">Google Play</h2>
                </div>
              </div>

              <div className="flex gap-2 justify-center items-center border-[1.5px] rounded-xl px-4 py-2 cursor-pointer ">
                <Link href="/">
                  <AiFillApple className="w-8 h-8" />
                </Link>
                <div>
                  <p className="text-xs">Download on the</p>
                  <h2 className="text-lg ">App Store</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-10 max-sm:gap-4 flex-1 flex-wrap max-sm:flex-col max-lg:gap-[100px] items-start justify-between">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-xl font-satoshi font-medium mb-6 leading-normal">
                {section.title}
              </h4>
              <ul>
                {section.links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.link}
                    className="flex leading-8 text-base font-inter"
                  >
                    {link.name}
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-between mt-14 border-t-[1px] py-4 max-sm:flex-col max-md:text-center max-sm:items-center">
        {new Date().getFullYear()} &copy; ShopingGo. All rights reserved.
        <Link href="/help">
          <p>Terms & Conditions</p>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
