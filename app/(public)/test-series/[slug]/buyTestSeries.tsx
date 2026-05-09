"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { verifyPayment } from "@/lib/razorpay";
import { useRouter } from "next/navigation";
import { createTestSeriesOrder } from "@/lib/actions/createTestSeriesOrder";
import { getMyEnrolledTestSeries } from "@/lib/actions/test-series";
import { notify } from "@/lib/toast";
import { useAuthModal } from "@/components/authModalContext";

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

  const { openLoginModal, session } = useAuthModal();

  useEffect(() => {
    (async () => {
      const data: any = await getMyEnrolledTestSeries();

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
      if (!session) return openLoginModal();
      const res = await createTestSeriesOrder(testSeriesId);

      if (res?.error === "Login Required") {
        router.push(`/login?callback=test-series/${slug}`);
        return;
      }
      if (res?.error) return notify.error(res.error);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: Number(res.amount) * 100,
        currency: "INR",
        order_id: res.orderId,
        handler: async function (response: any) {
          await verifyPayment(response);
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
    } finally {
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
