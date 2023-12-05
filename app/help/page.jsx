"use client";

import FAQS from "@components/FAQS";
import MetaData from "@components/MetaData";
import { privacys, payments } from "@constants";
import Image from "next/image";

const Page = () => {
  return (
    <section className="md:mt-[130px] mt-[100px] mb-20 my-[100px] lg:mx-20 mx-8 ">
      <MetaData title="Help" />
      <div id="privacy" className="my-5">
        <div className="flex justify-center items-center gap-5 mb-10">
          <Image
            src="/assets/icons/privacy.png"
            width={50}
            height={50}
            alt="privacy"
          ></Image>
          <h1 className="text-xl text-[#4b077c] font-satoshi font-semibold">
            Privacy Policy
          </h1>
        </div>
        <div className="mb-4">
          <p className="text-slate-500 mb-3">
            [ Last Updated : 4 December 2023 ]
          </p>
          <h1 className="text-lg font-semibold text-[#4b077c] mb-2">
            Introduction
          </h1>
          <p className="text-slate-500 text-justify">
            Welcome to ShopingGo, your trusted destination for an unparalleled
            online shopping experience. At ShopingGo, we prioritize the privacy
            and security of our users. This Privacy Policy is designed to inform
            you about how we collect, use, and safeguard your personal
            information when you access or use our website and services. By
            choosing to engage with ShopingGo, you are acknowledging your
            understanding and acceptance of the practices outlined in this
            Privacy Policy. We are committed to ensuring that your personal data
            is handled with the utmost care, in compliance with applicable data
            protection laws. Please take the time to read through this Privacy
            Policy to make informed decisions about your privacy and to
            understand how your information contributes to enhancing your
            shopping experience on ShopingGo. If you have any questions or
            concerns, our dedicated team is here to assist you—simply reach out
            to us using the contact information provided at the end of this
            policy. Thank you for choosing ShopingGo!
          </p>
        </div>

        <div className="mb-4">
          <h1 className="text-lg font-semibold text-[#4b077c] mb-2">
            Information we collect
          </h1>
          {privacys &&
            privacys.map((item) => (
              <div key={item.title} className="mb-3">
                <h1 className="text-base text-[#4b077c] mb-2">
                  <span className="font-medium">{item.title}</span> :{" "}
                  <span className="text-slate-500 text-base text-justify">
                    {item.desc}
                  </span>
                </h1>
              </div>
            ))}
          <p className="text-slate-500 text-justify"></p>
        </div>
      </div>

      <div id="payment" className="mt-20 mb-5">
        <div className="flex justify-center items-center gap-5 mb-10">
          <Image
            src="/assets/icons/paymentsmethods.png"
            width={50}
            height={50}
            alt="payment methods"
          ></Image>
          <h1 className="text-xl text-[#4b077c] font-satoshi font-semibold">
            Payment Policy
          </h1>
        </div>
        <div className="mb-4">
          <p className="text-slate-500 mb-3">
            [ Last Updated : 5 December 2023 ]
          </p>
          <h1 className="text-lg font-semibold text-[#4b077c] mb-2">
            Introduction
          </h1>
          <p className="text-slate-500 text-justify">
            At ShopingGo, we are committed to providing you with a seamless and
            secure online shopping experience. Our Payment Policy has been
            crafted to ensure clarity and transparency in all financial
            transactions conducted on our platform. Whether you are making a
            purchase, returning a product, or seeking a refund, this policy
            outlines the key details you need to know about our payment
            processes. We prioritize the security of your financial information
            and have implemented stringent measures to safeguard your
            transactions. By engaging with ShopingGo, you agree to adhere to the
            terms outlined in this Payment Policy. We encourage you to read
            through the following details to understand how payments are
            processed, the accepted methods, and the steps involved in ensuring
            a smooth and secure payment experience. If you have any questions or
            concerns, our dedicated customer support team is ready to assist
            you. Thank you for choosing ShopingGo for your online shopping
            needs.
          </p>
        </div>

        <div className="mb-4">
          <h1 className="text-lg font-semibold text-[#4b077c] mb-2">
            Payment Related Information We Collect
          </h1>
          {payments &&
            payments.map((item) => (
              <div key={item.title} className="mb-3">
                <h1 className="text-base text-[#4b077c] mb-2">
                  <span className="font-medium">{item.title}</span> :{" "}
                  <span className="text-slate-500 text-base text-justify">
                    {item.desc}
                  </span>
                </h1>
              </div>
            ))}
          <p className="text-slate-500 text-justify"></p>
        </div>
      </div>

      <div id="faqs" className="mt-20 mb-5">
        <div className="flex justify-center items-center gap-5 mb-10">
          <Image
            src="/assets/icons/faq.png"
            width={50}
            height={50}
            alt="FAQS"
          ></Image>
          <h1 className="text-xl text-[#4b077c] font-satoshi font-semibold">
            Frequently Asked Questions
          </h1>
        </div>
        <div className="mb-5">
          <p className="text-slate-500 mb-10">
            [ Last Updated : 7 December 2023 ]
          </p>

          <FAQS />
        </div>
      </div>
    </section>
  );
};

export default Page;
