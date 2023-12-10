import {
  FcAssistant,
  FcInTransit,
  FcCurrencyExchange,
  FcPaid,
} from "react-icons/fc";

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const sliderData = [
  {
    imageURL: "/assets/images/fashion.webp",
    heading: "Fashion & Styling",
    desc: "Upto 35% Off on all the premium brands and products",
  },
  {
    imageURL: "/assets/images/electronic.jpg",
    heading: "Electronics & Gadgets",
    desc: "Upto 30% Off on all the premium electronics brands and unique products",
  },
  {
    imageURL: "/assets/images/shoes.jpg",
    heading: "Shoes & Footwear",
    desc: "Upto 50% Off on all the premium shoes brands and products",
  },
  {
    imageURL: "/assets/images/cart.jpg",
    heading: "Get everything you need",
    desc: "Avail the best offers and discounts on all the products",
  },
];

export const inforBoxData = [
  {
    icon: <FcInTransit />,
    title: "Free Shipping",
    desc: "Free shipping on some important orders",
  },
  {
    icon: <FcCurrencyExchange />,
    title: "Money Back Guarantee",
    desc: "100% money back guarantee",
  },
  {
    icon: <FcAssistant />,
    title: "Online Support",
    desc: "We support online 24 hours a day",
  },
  {
    icon: <FcPaid />,
    title: "Free Gift",
    desc: "Free gift for all orders over Rs.1000",
  },
];

export const categories = [
  {
    id: 1,
    title: "Electronics",
    image: "/assets/images/electronics.jpg",
    discount: "Upto 30% Off",
  },
  {
    id: 2,
    title: "Fashion & Styling",
    image: "/assets/images/fashion.jpg",
    discount: "Upto 45% Off",
  },
  {
    id: 3,
    title: "Sports",
    image: "/assets/images/sports.jpg",
    discount: "Upto 35% Off",
  },
  {
    id: 4,
    title: "Personal Care",
    image: "/assets/images/personalcare.png",
    discount: "Upto 50% Off",
  },
];

export const privacys = [
  {
    title: "Personal Information",
    desc: "When you create an account, we collect your [Full Name], [Email Address], [Phone Number], and [Other Necessary Information].When you make a purchase, we collect billing and shipping information, including [Billing Address] and [Shipping Address]",
  },
  {
    title: " Automatically Collected Information",
    desc: "We use cookies and similar technologies to collect information about your browsing behavior, preferences, and device information. For details, please review our [Cookie Policy]",
  },
  {
    title: "Device Information ",
    desc: "We may collect information about the device you use to access ShopingGo, including [Device Type], [Operating System], and [IP Address]",
  },
  {
    title: "Order Processing",
    desc: "We use your personal information to process and fulfill your orders",
  },
  {
    title: "Account Management",
    desc: "Your account information is used for authentication and to manage your preferences ",
  },
  {
    title: "Data Security",
    desc: "We implement industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure",
  },
  {
    title: "Third-Party Service Providers",
    desc: "We may share your information with third-party service providers to facilitate our services, such as [Shipping Companies] and [Payment Processors]",
  },
];

export const payments = [
  {
    title: "Debit, Credit Cards",
    desc: "We accept major credit and debit cards, including [Visa, Mastercard, Rupay, etc.], processed securely through reputable payment gateways.",
  },
  {
    title: "Accuracy of Billing Information",
    desc: "Customers are responsible for providing accurate and up-to-date billing information during the checkout process",
  },
  {
    title: "Secure Transactions",
    desc: "ShopingGo prioritizes the security of online transactions. We utilize industry-standard encryption technologies to protect customer payment information",
  },
  {
    title: "Credit Card Information",
    desc: "ShopingGo does not store credit card details. Payment information is securely transmitted to and processed by trusted payment service providers",
  },
  {
    title: "Price Accuracy",
    desc: "ShopingGo strives to ensure accurate pricing, but in the event of an error, we reserve the right to correct the price and inform the customer before processing the order",
  },
];

export const faqs = [
  {
    question: "What products does ShopingGo offer ?",
    answer:
      "ShopingGo offers a diverse range of products, including electronics, clothing, accessories, home goods, and more. Explore our website to discover the latest offerings.",
  },
  {
    question: "What payment methods are accepted on ShopingGo ?",
    answer:
      "ShopingGo accepts various payment methods, including credit/debit cards, digital wallets, and other secure payment options. You can find the complete list of accepted payment methods during the checkout process.",
  },
  {
    question: " Is my payment information secure on ShopingGo ?",
    answer:
      "Yes, your payment information is secure on ShopingGo. We use industry-standard encryption technologies and partner with trusted payment service providers to ensure the confidentiality and security of your financial data.",
  },
  {
    question: "How can I contact ShopingGo customer support ?",
    answer:
      "If you have any questions or concerns, our customer support team is here to help. You can reach us by shopinggocustomers@gmail.com, 8080120538, or through the contact form on our website.",
  },
  {
    question: "Does ShopingGo ship internationally ?",
    answer:
      "No, initially ShopingGo does not offers international shipping. We process the orders in India, you can select your shipping destination, and shipping costs will be calculated accordingly.",
  },
];

export const footerLinks = [
  {
    title: "Products",
    links: [
      { name: "Electronics", link: "/products" },
      { name: "Mobiles", link: "/products" },
      { name: "Sports & Games", link: "/products" },
      { name: "Beauty & Care", link: "/products" },
      { name: "Sports Wears", link: "/products" },
      { name: "Fashion & Styling", link: "/products" },
    ],
  },
  {
    title: "Help",
    links: [
      { name: "About us", link: "/about" },
      { name: "FAQs", link: "/help/#faqs" },
      { name: "How it works", link: "/help" },
      { name: "Privacy policy", link: "/help/#privacy" },
      { name: "Payment policy", link: "/help/#payment" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { name: "Developers", link: "/about" },
      {
        name: "shopinggocustomers@gmail.com",
        link: "mailto:shopinggocustomers@gmail.com",
      },
      { name: "+91 8080120538", link: "tel:8080120538" },
      { name: "+91 8857020538", link: "tel:8857020538" },
      { name: "GitHub", link: "https://github.com/MRadesh3" },
    ],
  },
];
