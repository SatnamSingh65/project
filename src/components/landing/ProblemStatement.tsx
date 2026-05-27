import React from "react";
import { CalendarDays, CircleSlash, MessagesSquare } from "lucide-react";
import FadeInUp from "./FadeInUp";

const problems = [
  {
    icon: CalendarDays,
    title: "Scattered calendars",
    subtitle: "Everyone's schedule lives in a different app",
  },
  {
    icon: CircleSlash,
    title: "Dropped balls",
    subtitle: "Tasks fall through the cracks daily",
  },
  {
    icon: MessagesSquare,
    title: "Communication gaps",
    subtitle: "Critical info never reaches the right person",
  },
];

export default function ProblemStatement() {
  return (
    <section className="mx-auto max-w-6xl bg-momentality-bg px-4 py-16 sm:py-30 text-center sm:px-6 lg:px-8">
      <FadeInUp>
        <h2 className="mb-10 text-3xl font-bold tracking-tight text-momentality-navy sm:text-4xl">
          Working parents shouldn't need 7 apps
          <br className="hidden sm:block" /> to run their family
        </h2>
      </FadeInUp>

      <div className="grid gap-4 sm:grid-cols-3">
        {problems.map(({ icon: Icon, title, subtitle }, i) => (
          <FadeInUp key={title} delay={i * 0.1}>
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-6 h-full">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-momentality-primary/10 text-momentality-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="text-sm font-semibold text-momentality-navy">
                {title}
              </p>
              <p className="text-xs leading-relaxed text-slate-400">
                {subtitle}
              </p>
            </div>
          </FadeInUp>
        ))}
      </div>
    </section>
  );
}
