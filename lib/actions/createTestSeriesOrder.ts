"use server";

import Razorpay from "razorpay";
import { getSessionUser } from "../auth";
import prisma from "../prisma";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const createTestSeriesOrder = async (testSeriesId: string) => {
  const user = await getSessionUser();
  if (!user) return { error: "Login Required" };

  const testSeries = await prisma.testSeries.findUnique({
    where: { id: testSeriesId },
  });

  if (!testSeries) return { error: "Not found" };

  // prevent duplicate purchase (only SUCCESS)
  const existing = await prisma.purchase.findUnique({
    where: {
      userId_testSeriesId: {
        userId: user.id,
        testSeriesId: testSeries.id,
      },
    },
  });

  if (existing && existing.status === "SUCCESS") {
    return { error: "Already purchased" };
  }

  const order = await razorpay.orders.create({
    amount: testSeries.discountedPrice * 100,
    currency: "INR",
    receipt: `ts_${testSeries.id}`,
  });

  // create or update pending purchase
  await prisma.purchase.upsert({
    where: {
      userId_testSeriesId: {
        userId: user.id,
        testSeriesId: testSeries.id,
      },
    },
    update: {
      paymentId: order.id,
      amount: testSeries.discountedPrice,
      status: "PENDING",
    },
    create: {
      userId: user.id,
      testSeriesId: testSeries.id,
      amount: testSeries.discountedPrice,
      paymentMethod: "RAZORPAY",
      paymentId: order.id,
      status: "PENDING",
    },
  });

  return { orderId: order.id, amount: order.amount };
};
