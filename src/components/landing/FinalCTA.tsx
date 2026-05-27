"use client";
import React, { useState } from "react";
import FadeInUp from "./FadeInUp";

export default function FinalCTA() {
  const [email, setEmail] = useState("");

  const handleStartFreeTrial = () => {
    const element = document.getElementById("pricing");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="start-free-trial"
      className="bg-momentality-primary px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-xl text-center">
        <FadeInUp>
          <h2 className="text-3xl font-extrabold tracking-tight text-momentality-bg sm:text-4xl">
            Ready to bring calm to
            <br className="hidden sm:block" /> your family's chaos?
          </h2>
          <p className="mt-3 mb-8 text-sm text-momentality-bg/70">
            Join 2,000+ families already using Momentality.
          </p>
        </FadeInUp>

        <FadeInUp delay={0.15}>
          <div className="flex flex-col gap-3 sm:flex-row sm:max-w-md sm:mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-xl border-0 px-4 py-3 text-sm text-momentality-navy bg-momentality-bg placeholder:text-slate-400 outline-none"
            />
            <button
              onClick={handleStartFreeTrial}
              className="flex items-center justify-center gap-2 rounded-xl bg-momentality-secondary px-5 py-3 text-sm font-bold text-momentality-bg transition hover:bg-momentality-secondary/90 active:scale-[0.98] whitespace-nowrap"
            >
              Start Free Trial
            </button>
          </div>
          <p className="mt-4 text-xs text-momentality-bg/50">
            No credit card required · 14-day free trial
          </p>
        </FadeInUp>
      </div>
    </section>
  );
}
