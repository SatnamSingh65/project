import React from "react";
import { Star } from "lucide-react";
import FadeInUp from "./FadeInUp";

export default function SocialProof() {
  const stars = Array.from({ length: 5 });
  const logos = ["TechCrunch", "Forbes", "Parents Magazine"];

  return (
    <section className="mx-auto max-w-6xl bg-momentality-bg px-4 py-16 sm:py-30 text-center sm:px-6 lg:px-8">
      <FadeInUp>
        <h2 className="text-3xl font-bold tracking-tight text-momentality-navy pb-4 sm:text-4xl">
          Trusted by <span className="text-momentality-primary">2,000+</span>{" "}
          working families
        </h2>
        <p className="mb-6 text-sm text-slate-400">
          Join thousands who've already simplified family life
        </p>
      </FadeInUp>

      <FadeInUp delay={0.1}>
        <div className="mt-6 flex items-center justify-center gap-1 text-momentality-secondary">
          {stars.map((_, index) => (
            <Star
              key={index}
              className="h-6 w-6 fill-current"
              aria-hidden="true"
            />
          ))}
        </div>
      </FadeInUp>

      <FadeInUp delay={0.2}>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {logos.map((logo) => (
            <div
              key={logo}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm"
            >
              <span className="h-2 w-2 rounded-full bg-momentality-primary"></span>
              <span className="text-sm font-semibold text-momentality-navy tracking-wide">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </FadeInUp>
    </section>
  );
}
