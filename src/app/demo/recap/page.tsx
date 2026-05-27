"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { CheckCircle2, CalendarDays, Sparkles, Clock } from "lucide-react";
import { eveningRecap } from "@/data/evening-recap";
import { familyMembers } from "@/data/family";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getMember(id: string) {
  return familyMembers.find((m) => m.id === id);
}

function getFormattedDate(date: Date): string {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const month = date.toLocaleString("default", { month: "short" });
  return `${days[date.getDay()]}, ${month} ${date.getDate()}`;
}

function getTodayFormatted() {
  return getFormattedDate(new Date());
}
function getTomorrowFormatted() {
  const t = new Date();
  t.setDate(t.getDate() + 1);
  return getFormattedDate(t);
}

const PRIORITY_STYLES: Record<string, string> = {
  High: "bg-red-50 text-red-600 border border-red-100",
  Medium: "bg-yellow-50 text-yellow-600 border border-yellow-100",
  Low: "bg-green-50 text-green-600 border border-green-100",
};

// ─── Custom tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const { completed, total } = payload[0].payload;
  return (
    <div className="rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold text-momentality-navy mb-1">{label}</p>
      <p className="text-momentality-primary">{completed} completed</p>
      <p className="text-slate-400">{total} total</p>
    </div>
  );
}

// ─── Stats row ────────────────────────────────────────────────────────────────

function StatsRow() {
  const { tasksCompleted, tasksTotal, eventsAttended, eventsTotal } =
    eveningRecap;

  const stats = [
    {
      icon: CheckCircle2,
      iconBg: "bg-teal-50",
      iconColor: "text-momentality-primary",
      barColor: "bg-teal-400",
      label: "Tasks completed",
      value: tasksCompleted,
      total: tasksTotal,
      color: "text-momentality-primary",
    },
    {
      icon: CalendarDays,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
      barColor: "bg-blue-400",
      label: "Events attended",
      value: eventsAttended,
      total: eventsTotal,
      color: "text-blue-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm"
        >
          <div
            className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${s.iconBg}`}
          >
            <s.icon className={`h-5 w-5 ${s.iconColor}`} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium mb-0.5">
              {s.label}
            </p>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-bold ${s.color}`}>{s.value}</span>
              <span className="text-sm text-slate-400">/ {s.total}</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full md:w-24 rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full ${s.barColor}`}
                style={{ width: `${(s.value / s.total) * 100}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Bar chart ────────────────────────────────────────────────────────────────

function WeeklyChart() {
  const { weeklyBars } = eveningRecap;

  // Track which bar type the mouse is over
  const [hoveredBar, setHoveredBar] = useState<"total" | "completed" | null>(
    null,
  );

  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-momentality-navy">
            Weekly task completion
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Mon – Fri this week</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-momentality-primary" />
            Completed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-slate-300" />
            Total
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart
          data={weeklyBars}
          margin={{ top: 4, right: 4, left: -28, bottom: 0 }}
          barCategoryGap="30%"
          barGap={3}
        >
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#94A3B8", fontWeight: 500 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#CBD5E1" }}
            allowDecimals={false}
          />

          <Tooltip content={<CustomTooltip />} cursor={false} />

          {/*
           * Total bar:
           * - When hovering THIS bar → darken to #94A3B8
           * - When hovering completed bar → activeBar matches normal fill (no change)
           */}
          <Bar
            dataKey="total"
            fill="#CBD5E1"
            radius={[6, 6, 4, 4]}
            onMouseEnter={() => setHoveredBar("total")}
            onMouseLeave={() => setHoveredBar(null)}
            activeBar={
              hoveredBar === "total"
                ? { fill: "#94A3B8", stroke: "none" }
                : { fill: "#CBD5E1", stroke: "none" } // ← looks identical to normal, no highlight
            }
          />

          {/*
           * Completed bar:
           * - When hovering THIS bar → dim to 75% opacity
           * - When hovering total bar → activeBar matches Cell fill (no change)
           */}
          <Bar
            dataKey="completed"
            radius={[6, 6, 4, 4]}
            onMouseEnter={() => setHoveredBar("completed")}
            onMouseLeave={() => setHoveredBar(null)}
            activeBar={
              hoveredBar === "completed"
                ? { opacity: 0.72, stroke: "none" }
                : { opacity: 1, stroke: "none" } // ← no change when total is hovered
            }
          >
            {weeklyBars.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.completed === 0 ? "#E2E8F0" : "#0D9488"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Tomorrow preview ─────────────────────────────────────────────────────────

function TomorrowPreview() {
  const { tomorrowEvents, tomorrowTasks } = eveningRecap;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-slate-50 px-5 py-3.5">
        <h3 className="text-sm font-semibold text-momentality-navy">
          Tomorrow's preview
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          {getTomorrowFormatted()}
        </p>
      </div>

      <div className="grid grid-cols-1 divide-y divide-slate-50 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        {/* Events column */}
        <div className="p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Top events
          </p>
          <ul className="flex flex-col gap-2.5">
            {tomorrowEvents.map((event, i) => {
              const member = getMember(event.memberId);
              return (
                <li key={i} className="flex items-start gap-2.5">
                  <div
                    className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
                    style={{ backgroundColor: member?.hexColor }}
                  >
                    {member?.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-momentality-navy truncate">
                      {event.title}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="h-2.5 w-2.5" />
                      {event.time}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Tasks column */}
        <div className="p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Top tasks
          </p>
          <ul className="flex flex-col gap-2.5">
            {tomorrowTasks.map((task, i) => {
              const member = getMember(task.assigneeId);
              return (
                <li key={i} className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-md border-2 border-slate-200" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-momentality-navy truncate">
                      {task.title}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${PRIORITY_STYLES[task.priority]}`}
                      >
                        {task.priority}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {member?.firstName}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─── AI summary card ──────────────────────────────────────────────────────────

function AiSummary() {
  return (
    <div className="flex gap-4 rounded-2xl border-2 border-teal-100 bg-teal-50/60 p-5">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-momentality-primary shadow-md">
        <Sparkles className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="text-xs font-semibold text-teal-700 mb-1">
          Elle's daily summary
        </p>
        <p className="text-sm leading-relaxed text-teal-900">
          {eveningRecap.aiSummary}
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RecapPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-momentality-navy">
          Evening Recap
        </h2>
        <p className="mt-0.5 text-sm text-slate-400">
          {getTodayFormatted()} · Here's how your day went
        </p>
      </div>

      <StatsRow />
      <WeeklyChart />
      <TomorrowPreview />
      <AiSummary />
    </div>
  );
}
