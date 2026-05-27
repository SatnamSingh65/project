"use client";

import React from "react";
import { Check, X } from "lucide-react";
import FadeInUp from "./FadeInUp";

const plans = [
  {
    name: "Free",
    price: "$0",
    tagline: "Perfect to get started",
    popular: false,
    features: [
      { text: "1 calendar", included: true },
      { text: "Basic task management", included: true },
      { text: "Limited morning brief", included: true },
      { text: "Full AI assistant", included: false },
      { text: "Caregiver hub", included: false },
    ],
  },
  {
    name: "Family",
    price: "$12",
    tagline: "For the whole family",
    popular: true,
    features: [
      { text: "Unlimited calendars", included: true },
      { text: "Full AI assistant (Elle)", included: true },
      { text: "2 caregivers", included: true },
      { text: "Email-to-task", included: true },
      { text: "Full morning brief", included: true },
    ],
  },
  {
    name: "Family Pro",
    price: "$24",
    tagline: "For power users",
    popular: false,
    features: [
      { text: "Everything in Family", included: true },
      { text: "Unlimited caregivers", included: true },
      { text: "Priority support", included: true },
      { text: "Conflict detection", included: true },
      { text: "Advanced analytics", included: true },
    ],
  },
];

export default function Pricing() {
  const handleStartFreeTrial = () => {
    const element = document.getElementById("pricing");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="pricing"
      className="bg-momentality-bg px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl text-center">
        <FadeInUp>
          <h2 className="text-3xl font-bold tracking-tight text-momentality-navy sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-2 mb-10 text-sm text-slate-400">
            Start free. Upgrade when you're ready.
          </p>
        </FadeInUp>

        {/* Cards */}
        <div className="flex flex-col md:flex-row items-stretch">
          {plans.map((plan, i) => (
            <FadeInUp
              key={plan.name}
              delay={i * 0.1}
              className={`relative flex flex-1 flex-col ${
                plan.popular ? "z-10 -my-0.5 md:-mx-0.5" : ""
              }`}
            >
              <div
                className={`relative flex flex-1 flex-col px-6 py-8 h-full ${
                  plan.popular
                    ? "rounded-2xl bg-momentality-primary shadow-2xl shadow-momentality-primary/25"
                    : plan.name === "Free"
                      ? "rounded-l-2xl rounded-r-none border border-slate-200 bg-white"
                      : "rounded-r-2xl rounded-l-none border border-slate-200 bg-white"
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-momentality-secondary px-4 py-1">
                    <span className="text-[11px] font-bold text-white tracking-wide">
                      ⭐ MOST POPULAR
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="mb-6 mt-3">
                  <p
                    className={`mb-2 text-xs font-semibold uppercase tracking-widest ${plan.popular ? "text-white/60" : "text-slate-400"}`}
                  >
                    {plan.name}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-4xl font-extrabold tracking-tight ${plan.popular ? "text-white" : "text-momentality-navy"}`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-sm ${plan.popular ? "text-white/60" : "text-slate-400"}`}
                    >
                      /mo
                    </span>
                  </div>
                  <p
                    className={`mt-1.5 text-xs ${plan.popular ? "text-white/60" : "text-slate-400"}`}
                  >
                    {plan.tagline}
                  </p>
                </div>

                {/* Features */}
                <div className="flex flex-1 flex-col gap-3">
                  {plan.features.map((f) => (
                    <div key={f.text} className="flex items-center gap-2.5">
                      <div
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                          f.included
                            ? plan.popular
                              ? "bg-white/20"
                              : "bg-momentality-primary/10"
                            : "bg-slate-100"
                        }`}
                      >
                        {f.included ? (
                          <Check
                            className={`h-2.5 w-2.5 ${plan.popular ? "text-white" : "text-momentality-primary"}`}
                            strokeWidth={3}
                          />
                        ) : (
                          <X
                            className="h-2.5 w-2.5 text-slate-300"
                            strokeWidth={3}
                          />
                        )}
                      </div>
                      <span
                        className={`text-[13px] ${
                          f.included
                            ? plan.popular
                              ? "text-white"
                              : "text-momentality-navy"
                            : "text-slate-300"
                        }`}
                      >
                        {f.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={handleStartFreeTrial}
                  className={`mt-8 w-full rounded-xl py-3 text-[13px] font-semibold transition active:scale-[0.98] ${
                    plan.popular
                      ? "bg-white text-momentality-primary hover:bg-white/90"
                      : "border-[1.5px] border-momentality-primary bg-transparent text-momentality-primary hover:bg-momentality-primary/5"
                  }`}
                >
                  Start 14-Day Free Trial
                </button>
              </div>
            </FadeInUp>
          ))}
        </div>

        <FadeInUp delay={0.3}>
          <p className="mt-5 text-xs text-slate-400">
            No credit card required · Cancel anytime
          </p>
        </FadeInUp>
      </div>
    </section>
  );
}
