import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  cookies().set("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
  });

  return NextResponse.json({ user, token }, { status: statusCode });

  // const options = {
  //   expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 1000 * 86400),
  //   httpOnly: true,
  // };
  // return NextResponse.json(
  //   { success: true, token, user },
  //   {
  //     status: statusCode,
  //     headers: { "Set-Cookie": `token=${token}; ${options}` },
  //   }
  // );
};
