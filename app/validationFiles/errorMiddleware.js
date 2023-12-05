const { NextResponse } = require("next/server");

const errorHandler = (err, req, res, next) => {
  const statusCode = NextResponse.statusCode ? NextResponse.statusCode : 500;
  NextResponse.status(statusCode);

  NextResponse.json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};
export default errorHandler;
