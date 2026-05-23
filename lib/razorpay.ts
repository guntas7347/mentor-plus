"use server";

import crypto from "crypto";
import prisma from "./prisma";
import { requireUser } from "./auth";
import { revalidatePaths } from "./revalidatePath";

export const verifyPayment = async (body: any) => {
  // 1. Get the current user to enforce ownership
  const user = await requireUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  // 2. Verify Signature
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    return { error: "Invalid payment signature" };
  }

  // 3. Find the purchase AND ensure it belongs to the logged-in user
  const purchase = await prisma.purchase.findFirst({
    where: {
      paymentId: razorpay_order_id, // Your DB stores the order_id here initially
      userId: user.id,
    },
    select: {
      id: true,
      testSeriesId: true,
      userId: true,
      status: true,
    },
  });

  if (!purchase) {
    return { error: "Purchase not found or unauthorized" };
  }

  // 4. Idempotency: If already successful, just return safely
  if (purchase.status === "SUCCESS") {
    return { success: true };
  }

  // 5. Update purchase to SUCCESS
  // Note: If you have a separate column for Razorpay Payment ID, store it there.
  // Otherwise, overwriting the order_id with payment_id is okay as long as you don't need the order_id again.
  await prisma.purchase.update({
    where: { id: purchase.id },
    data: {
      status: "SUCCESS",
      paymentId: razorpay_payment_id,
    },
  });

  // 6. Attach TestSeries to User
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

  // 7. Return success INSTEAD of redirecting.
  // Let the client component's router.push() handle the navigation.
  return { success: true };
};
