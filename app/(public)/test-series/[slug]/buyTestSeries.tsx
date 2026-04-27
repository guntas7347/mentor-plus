"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { verifyPayment } from "@/lib/razorpay";
import { useRouter } from "next/navigation";
import { createTestSeriesOrder } from "@/lib/actions/createTestSeriesOrder";
import { getMyEnrolledTestSeries } from "@/lib/actions/test-series";

const BuyTestSeries = ({
  testSeriesId,
  slug,
}: {
  testSeriesId: string;
  slug: string;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getMyEnrolledTestSeries();

      const alreadyPurchased = data.some(
        (item: any) =>
          item.testSeriesId === testSeriesId && item.status === "SUCCESS",
      );

      setPurchased(alreadyPurchased);
    })();
  }, [testSeriesId]);

  const handleBuy = async () => {
    if (purchased) return;

    try {
      const res = await createTestSeriesOrder(testSeriesId);
      if (res?.error === "Login Required") {
        router.push(`/login?callback=test-series/${slug}`);
        return;
      }
      if (res?.error) return alert(res.error);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: res.amount,
        currency: "INR",
        order_id: res.orderId,
        handler: async function (response: any) {
          await verifyPayment(response);
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={() => {
        setLoading(true);
        purchased ? router.push(`/dashboard/my-purchases`) : handleBuy();
      }}
      className="w-full py-4 flex justify-center rounded-xl font-bold bg-primary dark:bg-[#1a56db] text-white shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : purchased ? (
        "Continue to Test Series"
      ) : (
        "Buy Test Series"
      )}
    </button>
  );
};

export default BuyTestSeries;
