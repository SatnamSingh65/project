import React from "react";
import FadeInUp from "./FadeInUp";

const testimonials = [
  {
    quote:
      "Momentality changed our mornings completely. I used to spend the first 20 minutes of every day just figuring out who needed to be where. Now Elle has it all ready for me before my coffee is done.",
    name: "Jessica L.",
    role: "Working mother, Austin TX",
    initials: "JL",
    gradient: "from-momentality-primary to-emerald-400",
    featured: false,
  },
  {
    quote:
      "As a dad who travels for work, I always felt out of the loop. Now I can see exactly what the kids have going on, check in with Maria, and stay involved even when I'm not home. Game changer.",
    name: "David K.",
    role: "Father of two, Chicago IL",
    initials: "DK",
    gradient: "",
    featured: true,
  },
  {
    quote:
      "The caregiver hub is brilliant. I can see my whole week at a glance, the family can message me about changes, and the care notes for the kids mean I never miss anything important.",
    name: "Maria R.",
    role: "Nanny, Seattle WA",
    initials: "MR",
    gradient: "from-momentality-secondary to-amber-400",
    featured: false,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-momentality-bg px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <FadeInUp>
          <h2 className="text-3xl font-bold tracking-tight text-momentality-navy sm:text-4xl">
            Families love Momentality
          </h2>
          <p className="mt-2 mb-10 text-sm text-slate-400">
            Real stories from real families.
          </p>
        </FadeInUp>

        <div className="flex flex-col items-center gap-4 md:flex-row md:items-stretch md:justify-center">
          {testimonials.map((t, i) => (
            <FadeInUp
              key={t.name}
              delay={i * 0.1}
              className="w-[75%] sm:w-full sm:max-w-sm md:max-w-70 flex flex-col"
            >
              <div
                className={`flex flex-1 flex-col rounded-2xl p-6 text-left h-full ${
                  t.featured
                    ? "bg-momentality-primary"
                    : "border border-slate-200 bg-white"
                }`}
              >
                {/* Stars */}
                <div className="mb-4 flex gap-0.5 text-momentality-secondary text-sm">
                  {"★★★★★"}
                </div>

                {/* Quote */}
                <p
                  className={`flex-1 text-[13px] leading-7 ${t.featured ? "text-white/90" : "text-momentality-navy"}`}
                >
                  "{t.quote}"
                </p>

                {/* Author */}
                <div
                  className={`mt-5 flex items-center gap-3 border-t pt-4 ${t.featured ? "border-white/15" : "border-slate-100"}`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                      t.featured
                        ? "bg-white/20"
                        : `bg-gradient-to-br ${t.gradient}`
                    }`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p
                      className={`text-[13px] font-semibold ${t.featured ? "text-white" : "text-momentality-navy"}`}
                    >
                      {t.name}
                    </p>
                    <p
                      className={`text-[11px] ${t.featured ? "text-white/60" : "text-slate-400"}`}
                    >
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
