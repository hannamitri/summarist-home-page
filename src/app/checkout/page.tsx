"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const isYearly = plan === "yearly";

  return (
    <main className="checkout">
      <div className="checkout__card">
        <h1>Choose your plan</h1>

        <p className="checkout__subtitle">
          Get unlimited access to all of our book summaries.
        </p>

        <div className="checkout__plan">
          <h2>{isYearly ? "Yearly Plan" : "Monthly Plan"}</h2>

          <p className="checkout__price">
            {isYearly ? "$79.99 / year" : "$9.99 / month"}
          </p>

          {isYearly && <p className="checkout__trial">7-day free trial</p>}
        </div>

        <button
  className="checkout__button"
  onClick={() => router.push(`/payment?plan=${plan}`)}
>
  Continue to Payment
</button>
      </div>
    </main>
  );
}
