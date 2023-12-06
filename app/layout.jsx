import "@styles/globals.css";

import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import { Providers } from "./redux/Providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const metadata = {
  title: "ShopingGo",
  description:
    "ShopingGo is a simple e-commerce website built for your shopping needs.",
  icons: {
    icon: ["/favicon.ico?v=4"],
  },
};

const RootLayout = ({ children }) => {
  axios.defaults.withCredentials = true;

  return (
    <html lang="en">
      <body>
        <Providers>
          <main>
            <ToastContainer />
            <Navbar />
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
