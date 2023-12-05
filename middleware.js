import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(NextRequest) {
  const path = NextRequest.nextUrl.pathname;
  const isPublicPaths = path === "/login" || path === "/register";
  const isAdminPaths =
    path === "/admin/dashboard" ||
    path === "/admin/users" ||
    path === "/admin/products" ||
    path === "/admin/product/:id" ||
    path === "/admin/order/:id" ||
    path === "/admin/orders" ||
    path === "/admin/product" ||
    path === "/admin/user/:id" ||
    path === "/admin/user";

  const token = NextRequest.cookies.get("token")?.value || null;

  const decode = jwt.decode(token);

  console.log(decode && decode.role);

  if (isAdminPaths && decode && decode.role !== "Admin" && token) {
    return NextResponse.redirect(new URL("/", NextRequest.nextUrl));
  }

  if (isPublicPaths && token) {
    return NextResponse.redirect(new URL("/", NextRequest.nextUrl));
  }
  if (!isPublicPaths && !token) {
    return NextResponse.redirect(new URL("/login", NextRequest.nextUrl));
  }
}

export const config = {
  matcher: [
    "/login/",
    "/register",
    "/profile/:path*",
    "/checkout/:path*",
    "/admin/:path*",
  ],
};
