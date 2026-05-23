"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { verifyPayment } from "@/lib/razorpay";
import { useRouter } from "next/navigation";
import { createTestSeriesOrder } from "@/lib/actions/createTestSeriesOrder";
import { getMyEnrolledTestSeries } from "@/lib/actions/test-series";
import { notify } from "@/lib/toast";
import { useAuthModal } from "@/components/authModalContext";

export default function BuyTestSeries({
  testSeriesId,
  slug,
}: {
  testSeriesId: string;
  slug: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const { openLoginModal, session } = useAuthModal();

  useEffect(() => {
    (async () => {
      try {
        const data: any = await getMyEnrolledTestSeries();
        const alreadyPurchased = data.some(
          (item: any) =>
            item.testSeriesId === testSeriesId && item.status === "SUCCESS",
        );
        setPurchased(alreadyPurchased);
      } catch (error) {
        console.error("Failed to fetch enrollment status", error);
      }
    })();
  }, [testSeriesId]);

  const handleBuy = async () => {
    if (purchased) return;

    if (!session) {
      openLoginModal();
      return;
    }

    setLoading(true);

    try {
      const res = await createTestSeriesOrder(testSeriesId);

      if (res?.error === "Login Required") {
        router.push(`/login?callback=test-series/${slug}`);
        return;
      }
      if (res?.error) {
        notify.error(res.error);
        return;
      }

      if (!(window as any).Razorpay) {
        notify.error(
          "Payment system is loading. Please try again in a moment.",
        );
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: res.amount, // FIX: Removed the * 100 here.
        currency: "INR",
        order_id: res.orderId,
        name: "Mentor Plus",
        description: `Test Series: ${slug}`,
        handler: async function (response: any) {
          setIsVerifying(true);
          try {
            const res = await verifyPayment(response);
            if (res?.error) {
              notify.error(res.error);
              return;
            }

            notify.success("Payment successful!");
            setPurchased(true);
            router.push(`/dashboard/my-purchases`);
          } catch (err) {
            notify.error(
              "Payment verification failed. If money was deducted, contact support.",
            );
          } finally {
            setIsVerifying(false);
          }
        },
      };

      const rzp = new (window as any).Razorpay(options);

      // Handle potential checkout creation errors
      rzp.on("payment.failed", function (response: any) {
        notify.error(`Payment failed: ${response.error.description}`);
      });

      rzp.open();
    } catch (error: any) {
      notify.error("Something went wrong. Please try again.");
    } finally {
      // Turn off initial loading state because the Razorpay modal takes over the UI
      setLoading(false);
    }
  };

  const isWorking = loading || isVerifying;

  console.log("Test Card: 4100280000001007, Exp: 03/33, CVV: 333");

  return (
    <button
      onClick={() => {
        if (purchased) {
          router.push(`/dashboard/my-purchases`);
        } else {
          handleBuy();
        }
      }}
      disabled={isWorking}
      className="w-full py-4 flex justify-center rounded-xl font-bold bg-primary dark:bg-[#1a56db] text-white shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isWorking ? (
        <Loader2 className="animate-spin" />
      ) : purchased ? (
        "Continue to Test Series"
      ) : (
        "Buy Test Series"
      )}
    </button>
  );
}
