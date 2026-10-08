"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createCheckoutSession } from "@invertase/firestore-stripe-payments";
import { payments } from "@/lib/stripePayments";
import { auth } from "@/lib/firebase";

const MONTHLY_PRICE_ID = "price_1UFiAoBlbEV2wT4q5RqOgw2v";
const YEARLY_PRICE_ID = "price_1UFiKwBlbEV2wT4qJvbGQUmq";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!auth.currentUser) {
      router.push("/");
      return;
    }

    try {
      setLoading(true);

      const priceId =
        plan === "yearly" ? YEARLY_PRICE_ID : MONTHLY_PRICE_ID;

      const session = await createCheckoutSession(payments, {
        price: priceId,
        ...(plan === "yearly" && {
          trial_period_days: 7,
        }),
        success_url: `${window.location.origin}/settings`,
        cancel_url: `${window.location.origin}/payment?plan=${plan}`,
      });

      window.location.assign(session.url);
    } catch (error) {
      console.error("Checkout error:", error);
      setLoading(false);
    }
  };

  return (
    <main className="payment">
      <div className="payment__card">
        <h1>Complete your subscription</h1>

        <div className="payment__plan">
          <h2>
            {plan === "yearly" ? "Yearly Plan" : "Monthly Plan"}
          </h2>

          <p className="payment__price">
            {plan === "yearly" ? "$79.99 / year" : "$9.99 / month"}
          </p>

          {plan === "yearly" && (
            <p className="payment__trial">
              7-day free trial
            </p>
          )}
        </div>

        <button
          className="payment__button"
          onClick={handleSubscribe}
          disabled={loading}
        >
          {loading ? "Loading..." : "Subscribe"}
        </button>
      </div>
    </main>
  );
}