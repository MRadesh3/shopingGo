import * as Yup from "yup";

const passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
);
const phoneRegex = new RegExp(
  "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
);
const pinCodeRegex = new RegExp("^[0-9]{6}$");
const emailRegex =
  /^[a-z0-9]([.+]?[a-z0-9]){0,}@(g(oogle)?mail\.com|\w+(\.[a-z]{2,})?\.ac\.in)$/;

export const signUpSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be atleast 3 characters long")
    .required("Please enter your name."),
  email: Yup.string()
    .matches(emailRegex, "Invallid email format, Please check it again")
    .email("Please enter a valid email")
    .required("Please enter your email."),
  password: Yup.string()
    .matches(
      passwordRegex,
      "Password must contain at least 6 characters, one uppercase, one lowercase, one number and one special case character"
    )
    .required("Please enter your password."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your new password"),
});

export const signInSchema = Yup.object({
  email: Yup.string()
    .matches(emailRegex, "Invallid email format, Please check it again")
    .email("Please enter a valid email")
    .required("Please enter your email."),
  password: Yup.string().required("Please enter your password."),
});

export const updateUserSchema = Yup.object({
  avatar: Yup.mixed(),
  name: Yup.string()
    .min(3, "Name must be atleast 3 characters long")
    .required("Please enter your name."),
  email: Yup.string()
    .matches(emailRegex, "Invallid email format, Please check it again")
    .email("Please enter a valid email")
    .required("Please enter your email."),
  phone: Yup.string().matches(phoneRegex, "Invalid phone number"),
  address: Yup.string().min(4, "Enter your corresponding address"),
  city: Yup.string().min(4, "Enter your corresponding city"),
  state: Yup.string().min(4, "Enter your corresponding state"),
  postalCode: Yup.string()
    .max(6, "Enter your corresponding pin code")
    .matches(pinCodeRegex, "Invalid pin code"),
  country: Yup.string().min(4, "Enter your corresponding country"),
});

export const updatePasswordSchema = Yup.object({
  oldPassword: Yup.string().required("Please enter your old password"),
  newPassword: Yup.string()
    .matches(
      passwordRegex,
      "Password must contain at least 6 characters, one uppercase, one lowercase, one number and one special case character"
    )
    .required("Please enter your new password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your new password"),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .matches(emailRegex, "Invallid email format, Please check it again")
    .email("Please enter a valid email")
    .required("Please enter your email."),
});

export const resetPasswordSchema = Yup.object({
  newPassword: Yup.string()
    .matches(
      passwordRegex,
      "Password must contain at least 6 characters, one uppercase, one lowercase, one number and one special case character"
    )
    .required("Please enter your new password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your new password"),
});

export const shippingAddressSchema = Yup.object({
  address: Yup.string().required("Please enter your address"),
  city: Yup.string().required("Please enter your city"),
  state: Yup.string().required("Please enter your state"),
  postalCode: Yup.string().required("Please enter your pin code"),
  country: Yup.string().required("Please enter your country"),
  phone: Yup.string()
    .matches(phoneRegex, "Invalid phone number")
    .required("Please enter your phone number"),
});

export const createProductSchema = Yup.object({
  name: Yup.string().required("Please enter your product name"),
  price: Yup.string().required("Please enter your product price"),
  category: Yup.string().required("Please select your product category"),
  stock: Yup.string().required("Please enter your product stock"),
  description: Yup.string().required("Please enter product description"),
  avatar: Yup.mixed(),
});

export const updateUserAdSchema = Yup.object({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .matches(emailRegex, "Invallid email format, Please check it again")
    .email("Please enter a valid email")
    .required("Please enter your email."),
});

export const subscriberSchema = Yup.object({
  email: Yup.string()
    .matches(emailRegex, "Invallid email format, Please check it again")
    .email("Please enter a valid email")
    .required("Please enter your email."),
});
