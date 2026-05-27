"use client";
import { PlugZap, Brain, Sun, Sparkles } from "lucide-react";
import FadeInUp from "@/components/landing/FadeInUp";

const steps = [
  {
    number: "1",
    icon: PlugZap,
    title: "Connect your calendars and emails",
    description:
      "Link Google Calendar, Outlook, and your inbox in one tap. Momentality pulls everything in automatically.",
    tags: ["Google Calendar", "Outlook", "Gmail"],
    color: "teal" as const,
  },
  {
    number: "2",
    icon: Brain,
    title: "Elle learns your family's rhythm",
    description:
      "Elle maps every family member's schedule, spots conflicts, and builds a picture of how your household runs.",
    tags: ["Conflict detection", "Smart suggestions"],
    color: "teal" as const,
  },
  {
    number: "3",
    icon: Sun,
    title: "Get daily briefs, reminders, and peace of mind",
    description:
      "Every morning, Elle delivers a crisp summary of your day. Every evening, a recap of what got done — and what's next.",
    tags: ["Morning brief", "Evening recap"],
    color: "coral" as const,
  },
];

const colorMap = {
  teal: {
    iconBg: "bg-momentality-primary",
    numBg: "bg-[#E1F5EE] border border-[#9FE1CB] text-[#085041]",
    tagBg: "bg-[#E1F5EE] text-[#085041]",
  },
  coral: {
    iconBg: "bg-momentality-secondary",
    numBg: "bg-[#FEF3E2] border border-momentality-secondary text-[#633806]",
    tagBg: "bg-[#FEF3E2] text-[#633806]",
  },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-white text-center">
      <FadeInUp>
        <h2 className="text-3xl font-bold text-momentality-navy mt-4 mb-3">
          Up and running in minutes
        </h2>
        <p className="text-slate-400 max-w-md mx-auto mb-16 leading-relaxed">
          No complicated setup. No 7-app juggling act. Just connect, learn, and
          breathe.
        </p>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
          {/* Connector line — desktop only */}
          <div className="hidden md:block absolute top-7 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-[#9FE1CB]" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            const c = colorMap[step.color];
            return (
              <FadeInUp key={step.number} delay={i * 0.1}>
                <div className="flex flex-col items-center px-4">
                  <div
                    className={`w-14 h-14 rounded-full ${c.iconBg} flex items-center justify-center mb-5 relative z-10`}
                  >
                    <Icon className="text-white w-6 h-6" />
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full text-xs font-medium flex items-center justify-center mb-4 ${c.numBg}`}
                  >
                    {step.number}
                  </div>

                  <h3 className="text-base font-semibold text-momentality-navy mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">
                    {step.description}
                  </p>

                  <div className="flex flex-wrap justify-center gap-2">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs px-3 py-1 rounded-full ${c.tagBg}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeInUp>
            );
          })}
        </div>
      </FadeInUp>
    </section>
  );
}
