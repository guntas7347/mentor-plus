"use server";

import crypto from "crypto";
import prisma from "./prisma";
import { redirect } from "next/navigation";
import { requireUser } from "./auth";
import { revalidatePaths } from "./revalidatePath";

export const verifyPayment = async (body: any) => {
  await requireUser();
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    return { error: "Invalid payment" };
  }

  // 1. Get purchase FIRST
  const purchase = await prisma.purchase.findFirst({
    where: { paymentId: razorpay_order_id },
    select: {
      id: true,
      testSeriesId: true,
      userId: true,
    },
  });

  if (!purchase) {
    return { error: "Purchase not found" };
  }

  // 2. Update purchase
  await prisma.purchase.update({
    where: { id: purchase.id },
    data: {
      status: "SUCCESS",
      paymentId: razorpay_payment_id,
    },
  });

  // 3. Attach TestSeries to User
  if (purchase.testSeriesId) {
    await prisma.user.update({
      where: { id: purchase.userId },
      data: {
        testSeries: {
          connect: {
            id: purchase.testSeriesId,
          },
        },
      },
    });
  }

  await revalidatePaths(["/dashboard/my-purchases"]);

  redirect("/dashboard/my-purchases");
};

// sample visa card number : 4100280000001007
