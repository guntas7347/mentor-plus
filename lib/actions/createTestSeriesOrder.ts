"use server";

import Razorpay from "razorpay";
import { getSessionUser } from "../auth";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";

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

  // Prevent duplicate purchase
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

  // FIX: Ensure amount is a strict integer to prevent Razorpay crashes
  const amountInPaisa = Math.round(testSeries.discountedPrice * 100);

  try {
    const order = await razorpay.orders.create({
      amount: amountInPaisa,
      currency: "INR",
      receipt: `ts_${randomUUID()}}`,
    });

    // Upsert pending purchase
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

    revalidatePath("/dashboard/my-purchases");

    return { orderId: order.id, amount: Number(order.amount) };
  } catch (error) {
    console.error("Razorpay Order Creation Failed:", error);
    return { error: "Failed to initialize payment. Please try again." };
  }
};
