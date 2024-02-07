"use client";

import Image from "next/image";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MetaData from "@components/MetaData";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import PersonIcon from "@mui/icons-material/Person";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const Login = () => {
  return (
    <>
      <section className="md:mt-[130px] mt-[100px] mb-20 my-[100px] lg:mx-20 ">
        <MetaData title="About" />
        <div className="flex justify-center items-start gap-10 max-lg:flex-col">
          <div className="flex flex-col justify-center items-center w-full px-10 mt-10">
            <Image
              src="/assets/icons/shopingologo.png"
              alt="Register Logo"
              width={250}
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

            <ul className="mt-2 text-justify text-slate-500 lg:max-w-xl flex flex-col gap-5">
              <li>
                <b>Personalized Recommendations :</b> ShoppingGo employs
                advanced AI algorithms to provide users with personalized
                product recommendations based on their preferences and browsing
                history.
              </li>
              <li>
                <b>User-Friendly Interface :</b> The platform features an
                intuitive and easy-to-navigate interface, ensuring a seamless
                and enjoyable shopping experience for users.
              </li>
              <li>
                <b>Diverse Product Range :</b> ShoppingGo offers a wide array of
                products across various categories, catering to the diverse
                needs and interests of its customer base.
              </li>
              <li>
                <b>Secure Payment Options :</b> Customers can choose from a
                variety of secure payment options, including credit cards,
                digital wallets, and other popular methods, ensuring a safe and
                convenient transaction process.
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-center items-center  w-full max-md:px-7">
            <h1 className="text-xl text-slate-500">
              <span className="text-2xl text-[#4b077c] font-bold font-inter">
                About <span className="text-2xl text-[#92c340]"> Us</span>
              </span>
            </h1>
            <div className="w-full px-2 py-10  flex-col ">
              <p className=" text-justify text-slate-500 lg:max-w-xl">
                <b>ShoppingGo</b> is a leading-edge e-commerce website that has
                redefined the online shopping experience with its innovative
                features and customer-centric approach. ShoppingGo stands out
                for its commitment to providing a seamless and personalized
                journey for users. The user-friendly interface ensures
                effortless navigation through a diverse product range, spanning
                electronics, fashion, home goods, and beauty products.
                ShoppingGo prioritizes security and convenience by offering a
                variety of secure payment options. Responsive customer support
                adds another layer of reliability, promptly addressing customer
                inquiries and concerns. The platform's commitment to
                sustainability is evident through its promotion of eco-friendly
                products and practices. Additionally, strategic collaborations
                with renowned brands and suppliers enhance the authenticity of
                the product offerings. With a mobile-responsive design and
                dedicated apps for iOS and Android, ShoppingGo provides a
                consistent and optimized experience across devices. The
                incorporation of subscription services further promotes customer
                loyalty, allowing users to enjoy regular shipments at discounted
                rates. Overall, ShoppingGo exemplifies a perfect blend of
                technology, user experience, and social responsibility, making
                it a standout player in the competitive e-commerce landscape.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-start gap-10 max-lg:flex-col mt-10">
          <div className="flex flex-col justify-center items-center w-full px-10 mt-10">
            <h1 className="text-xl text-slate-500 mb-5">
              <span className="text-2xl text-[#4b077c] font-bold font-inter">
                Developers -{" "}
                <span className="text-2xl text-[#92c340]"> ShopingGo</span>
              </span>
            </h1>

            <ul className="mt-2 text-justify text-slate-500 lg:max-w-xl flex flex-col gap-5">
              <li>
                <b>Next.js for Frontend : </b>
                Developers at ShoppingGo might leverage Next.js for building the
                frontend of the website. Next.js is a React framework that
                facilitates server-side rendering, ensuring faster page loads
                and improved SEO. Its ease of use and support for both
                client-side and server-side rendering make it a popular choice
                for modern web applications.
              </li>
              <li>
                <b>React for User Interface : </b> React is the fundamental
                JavaScript library for building user interfaces. ShoppingGo
                developers would use React to create reusable UI components,
                ensuring a modular and maintainable codebase. React's virtual
                DOM and component-based architecture contribute to a smooth and
                interactive user experience
              </li>
              <li>
                <b>Redux Toolkit for State Management : </b> Redux Toolkit is
                employed for efficient state management in complex applications.
                ShoppingGo's developers likely utilize Redux Toolkit to manage
                the application's state, ensuring a single source of truth and
                predictable data flow. This is crucial for handling the dynamic
                and interactive nature of an e-commerce platform.
              </li>
              <li>
                <b>Tailwind CSS for Styling : </b>
                Tailwind CSS is a utility-first CSS framework that streamlines
                the styling process. ShoppingGo developers may adopt Tailwind
                CSS for its simplicity and flexibility in crafting a visually
                appealing and responsive user interface. The utility-first
                approach allows for quick and consistent styling across the
                entire application.
              </li>
              <li>
                <b>MongoDB for Database : </b>
                ShoppingGo relies on MongoDB as its database solution, taking
                advantage of its NoSQL, document-oriented architecture. MongoDB
                is suitable for handling large amounts of data typical in
                e-commerce applications. It provides scalability and
                flexibility, allowing developers to adapt to evolving data
                requirements.
              </li>
              <li>
                <b>Cloudinary for Image Management : </b> Cloudinary is used for
                efficient image management, storage, and optimization.
                ShoppingGo developers would integrate Cloudinary to handle the
                vast array of product images and ensure fast loading times.
                Cloudinary's cloud-based solution simplifies image
                transformation and delivery, enhancing the overall performance
                of the website.
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-center items-center  w-full max-md:px-7">
            <div className="">
              <Image
                src="/assets/images/adesh-1.jpg"
                alt="Register Logo"
                width={300}
                height={100}
                className="object-cover h-80 rounded-full w-80 shadow-2xl"
              />
            </div>

            <h3 className="mt-7 text-center">
              <span className="text-2xl text-[#fe7f07] font-satoshi font-semibold">
                Mr. Adesh Santosh Salsundar{" "}
              </span>
            </h3>
            <div className="w-full px-10 py-10  flex-col ">
              <div className="mb-8">
                <span className="flex text-red-500 font-semibold mb-1">
                  <EmailIcon className="text-red-500" /> &nbsp; Email
                </span>

                <a
                  className="text-slate-500 text-lg font-semibold drop-shadow-lg"
                  href="mailto:adeshsalsundar1713@gmail.com"
                >
                  adeshsalsundar1713@gmail.com
                </a>
              </div>
              <div className="mb-8">
                <span className="flex text-red-500 font-semibold mb-1">
                  <LocalPhoneIcon className="text-red-500" /> &nbsp; Phone
                </span>
                <a
                  className="text-slate-500 text-lg font-semibold drop-shadow-lg"
                  href="tel:8080120538"
                >
                  +91 8080120538
                </a>{" "}
                ,
                <a
                  className="text-slate-500 text-lg font-semibold drop-shadow-lg"
                  href="tel:8857020538"
                >
                  +91 8857020538
                </a>
              </div>
              <div className="mb-8">
                <span className="flex text-red-500 font-semibold mb-1">
                  <LinkedInIcon className="text-red-500" /> &nbsp; LinkedIn
                </span>

                <a
                  className="text-slate-500 text-lg font-semibold drop-shadow-lg"
                  href="https://www.linkedin.com/in/adesh-salsundar-a73b4121a/"
                >
                  Go to LinkedIn Profile
                </a>
              </div>
              <div className="mb-8">
                <span className="flex text-red-500 font-semibold mb-1">
                  <GitHubIcon className="text-red-500" /> &nbsp; GitHub
                </span>

                <a
                  className="text-slate-500 text-lg font-semibold drop-shadow-lg"
                  href="https://github.com/MRadesh3"
                >
                  Go to GitHub Profile
                </a>
              </div>
              <div className="mb-8">
                <span className="flex text-red-500 font-semibold mb-1">
                  <PersonIcon className="text-red-500" /> &nbsp; Portfolio
                </span>

                <a
                  className="text-slate-500 text-lg font-semibold drop-shadow-lg"
                  href="https://adeshsalsundar.online/"
                >
                  Go to Portfolio
                </a>
              </div>
              <div className="mb-8">
                <span className="flex text-red-500 font-semibold mb-1">
                  <WhatsAppIcon className="text-red-500" /> &nbsp; WhatsApp
                </span>
                <div className="flex justify-between items-center">
                  <a
                    className="text-slate-500 text-lg font-semibold drop-shadow-lg"
                    href="https://wa.me/8080120538?text=Welocme%20to%20ShopingGo"
                  >
                    Go to WhatsApp
                  </a>
                  <Image
                    width={200}
                    height={200}
                    alt="qr code"
                    src="https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fwa.me%2F918080120538%3Ftext%3DWelocme%2520to%2520ShopingGo&chs=180x180&choe=UTF-8&chld=L|2"
                  ></Image>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
