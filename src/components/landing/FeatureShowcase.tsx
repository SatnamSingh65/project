"use client";

import Image from "next/image";
import FadeInUp from "./FadeInUp";
import {
  Sun,
  Calendar,
  CheckSquare,
  Sparkles,
  Users,
  BarChart2,
  ArrowRight,
  Mail,
  Mic,
  Brain,
  ShieldCheck,
  Bell,
  TrendingUp,
  CalendarCheck,
  Clock,
  Smartphone,
  RefreshCw,
} from "lucide-react";

// ─── Feature data ─────────────────────────────────────────────────────────────

const features = [
  {
    num: "01",
    accent: "teal" as const,
    Icon: Sun,
    title: "Morning brief",
    description:
      "Start every day with a single, calm summary — what's on the calendar, what tasks are due, and where the conflicts are. No app-switching required.",
    tags: [
      { Icon: Clock, label: "Delivered at 7am" },
      { Icon: Smartphone, label: "Voice-ready" },
    ],
    src: "/images/dashboard.png",
  },
  {
    num: "02",
    accent: "coral" as const,
    Icon: Calendar,
    title: "Smart family calendar",
    description:
      "One calendar with every family member's events color-coded. Syncs with Google Calendar and Outlook. Spots conflicts before they happen.",
    tags: [
      { Icon: RefreshCw, label: "Google & Outlook sync" },
      { Icon: RefreshCw, label: "Real-time updates" },
    ],
    src: "/images/calendar.png",
  },
  {
    num: "03",
    accent: "teal" as const,
    Icon: CheckSquare,
    title: "Task management",
    description:
      "Family-oriented tasks with assignees, due dates, and priority levels. Tasks auto-created from school emails — no manual entry needed.",
    tags: [
      { Icon: Mail, label: "Email-to-task" },
      { Icon: Users, label: "Assignable to anyone" },
    ],
    src: "/images/tasks.png",
  },
  {
    num: "04",
    accent: "coral" as const,
    Icon: Sparkles,
    title: "Elle, your AI assistant",
    description:
      "Ask Elle anything about your family's schedule. She reschedules, sets reminders, and flags conflicts — by voice or text, completely hands-free.",
    tags: [
      { Icon: Mic, label: "Voice input" },
      { Icon: Brain, label: "Learns your rhythm" },
    ],
    src: "/images/elle.png",
  },
  {
    num: "05",
    accent: "teal" as const,
    Icon: Users,
    title: "Caregiver hub",
    description:
      "Give nannies and family helpers their own secure view — schedules, care notes, allergies, and routines. They confirm shifts; you stay in control.",
    tags: [
      { Icon: ShieldCheck, label: "Secure sharing" },
      { Icon: Bell, label: "Shift confirmation" },
    ],
    src: "/images/caregiver.png",
  },
  {
    num: "06",
    accent: "coral" as const,
    Icon: BarChart2,
    title: "Evening recap",
    description:
      "End the day knowing exactly what got done, what's still pending, and what's coming tomorrow. A daily habit loop that keeps your family on track.",
    tags: [
      { Icon: TrendingUp, label: "Weekly insights" },
      { Icon: CalendarCheck, label: "Tomorrow preview" },
    ],
    src: "/images/recap.png",
  },
];

// ─── Section ──────────────────────────────────────────────────────────────────

export default function FeatureShowcase() {
  return (
    <section
      id="features"
      className="bg-momentality-bg px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <FadeInUp>
          <div className="mb-16 text-center">
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-momentality-navy">
              Everything your family needs,
              <br className="hidden sm:block" /> finally in one place
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-momentality-navy/60">
              Six pillars built around how working families actually live — not
              how productivity apps think they do.
            </p>
          </div>
        </FadeInUp>

        {/* Feature rows */}
        <div className="flex flex-col divide-y divide-slate-100">
          {features.map((feature, index) => {
            const isEven = index % 2 === 0;
            const pillBase =
              feature.accent === "teal"
                ? "bg-momentality-primary/5 text-teal-700"
                : "bg-momentality-secondary/5 text-orange-600";

            return (
              <FadeInUp key={feature.num} delay={0.05}>
                <div
                  className={`flex flex-col items-center gap-10 py-14 lg:flex-row ${
                    !isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Text side */}
                  <div className="flex flex-1 flex-col">
                    <span
                      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${pillBase}`}
                    >
                      <feature.Icon className="h-3 w-3" />
                      {feature.num}
                    </span>

                    <h3 className="mt-4 text-2xl font-bold text-momentality-navy">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-base leading-7 text-momentality-navy/60">
                      {feature.description}
                    </p>

                    {/* Tags */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {feature.tags.map((tag) => (
                        <span
                          key={tag.label}
                          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-momentality-navy/60"
                        >
                          <tag.Icon className="h-3 w-3" />
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Image side */}
                  <div
                    className={`flex w-full flex-1 ${
                      !isEven ? "lg:justify-start" : "lg:justify-end"
                    }`}
                  >
                    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                      <Image
                        src={feature.src}
                        alt={`${feature.title} screenshot`}
                        width={900}
                        height={600}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </FadeInUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
