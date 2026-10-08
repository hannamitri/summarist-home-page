"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChoosePlanPage() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const router = useRouter();

  return (
    <main className="choose-plan">
      <h1>Choose Your Plan</h1>

      <p>Unlock unlimited access to premium books.</p>

      <div className="plans">
        <button
          type="button"
          className={
            selectedPlan === "monthly" ? "plan plan--selected" : "plan"
          }
          onClick={() => setSelectedPlan("monthly")}
        >
          <h2>Monthly</h2>
          <p>$9.99 / month</p>
        </button>

        <button
          type="button"
          className={selectedPlan === "yearly" ? "plan plan--selected" : "plan"}
          onClick={() => setSelectedPlan("yearly")}
        >
          <h2 className="yearly-title">
            Yearly
            <span>7-day free trial</span>
          </h2>
          <p>$79.99 / year</p>
        </button>
      </div>

      <button
        type="button"
        className="choose-plan__button"
        onClick={() => {
          router.push(`/checkout?plan=${selectedPlan}`);
        }}
      >
        Continue
      </button>

      <section className="faq">
        <h2>Frequently Asked Questions</h2>

        <div className="faq__item">
          <button
            type="button"
            onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
          >
            What is included with my subscription?
          </button>

          {openFaq === 0 && (
            <p>
              Your subscription gives you access to premium books and their
              summaries.
            </p>
          )}
        </div>

        <div className="faq__item">
          <button
            type="button"
            onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
          >
            Can I cancel my subscription?
          </button>

          {openFaq === 1 && (
            <p>Yes. You can cancel your subscription at any time.</p>
          )}
        </div>

        <div className="faq__item">
          <button
            type="button"
            onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
          >
            What&apos;s the difference between monthly and yearly?
          </button>

          {openFaq === 2 && (
            <p>
              The monthly plan is billed every month, while the yearly plan is
              billed once per year.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
