import { authorizeRoles, isAuthenticatedUser } from "@app/validationFiles/auth";
import Order from "@models/orderSchema";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import Product from "@models/productSchema";

export const GET = async (req, { params }, next) => {
  return await isAuthenticatedUser(req, { params }, async () => {
    return authorizeRoles("Admin")(req, { params }, async () => {
      try {
        connectToDB();
        const order = await Order.findById(params.orderId).populate(
          "user",
          "name email"
        );
        if (!order) {
          return NextResponse.json(
            { message: "Order not Found" },
            { status: 404 }
          );
        }

        return NextResponse.json({ order }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    });
  });
};

export const PUT = async (req, { params }, next) => {
  return await isAuthenticatedUser(req, { params }, async () => {
    return authorizeRoles("Admin")(req, { params }, async () => {
      const { orderStatus } = await req.json();
      try {
        await connectToDB();
        const order = await Order.findById(params.orderId);

        if (!order) {
          return NextResponse.json(
            { message: `Order not found with orderId : ${params.orderId}` },
            { status: 404 }
          );
        }

        if (order.orderStatus === "Delivered") {
          return NextResponse.json(
            { message: "You have already delivered this order" },
            { status: 400 }
          );
        }

        if (orderStatus === "Shipped") {
          order.orderItems.forEach(async (order) => {
            await updateStock(order._id, order.quantity);
          });
        }

        order.orderStatus = orderStatus;

        if (orderStatus === "Delivered") {
          order.deliveredAt = Date.now();
        }

        await order.save({ validateBeforeSave: false });

        return NextResponse.json({ order }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    });
  });
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  if (product.stock === 0) {
    return;
  } else {
    product.stock = product.stock - quantity;
  }

  // product.stock = product.stock - quantity;

  // if (product.stock === 0) {
  //   product.stock = 0;
  //   return NextResponse.json(
  //     { message: "Product is out of stock" },
  //     { status: 400 }
  //   );
  // }

  await product.save({ validateBeforeSave: false });
}

export const DELETE = async (req, { params }, next) => {
  return isAuthenticatedUser(req, { params }, async () => {
    return authorizeRoles("Admin")(req, { params }, async () => {
      try {
        await connectToDB();
        const order = await Order.findByIdAndRemove(params.orderId);

        if (!order) {
          return NextResponse.json(
            { message: `Order not found with orderId : ${params.orderId}` },
            { status: 404 }
          );
        }

        return NextResponse.json(
          { message: "Order deleted successfully" },
          { status: 200 }
        );
      } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    });
  });
};
