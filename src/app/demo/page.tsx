// "use client";

// import { useState } from "react";
// import {
//   CalendarDays,
//   CheckSquare,
//   Cloud,
//   Sun,
//   AlertTriangle,
//   Sparkles,
//   Info,
//   ChevronRight,
//   MapPin,
// } from "lucide-react";
// import { morningBrief } from "@/data/morning-brief";
// import { tasks } from "@/data/tasks";
// import { calendarEvents } from "@/data/calendar-events";
// import { familyMembers } from "@/data/family";

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// const priorityStyles = {
//   High: "bg-red-50 text-red-700 border border-red-100",
//   Medium: "bg-yellow-50 text-yellow-700 border border-yellow-100",
//   Low: "bg-green-50 text-green-700 border border-green-100",
// };

// function getMemberColor(id: string) {
//   return familyMembers.find((m) => m.id === id)?.hexColor ?? "#94A3B8";
// }
// function getMemberName(id: string) {
//   return familyMembers.find((m) => m.id === id)?.firstName ?? id;
// }

// // ─── Stat Cards ───────────────────────────────────────────────────────────────

// function StatCards({ todayStr }: { todayStr: string }) {
//   const todayEvents = calendarEvents.filter((e) => e.date === todayStr);
//   const sarahEvents = todayEvents.length;
//   const completedTasks = tasks.filter((t) => t.completed).length;
//   const totalTasks = tasks.length;

//   const pendingTasks = tasks.filter((t) => !t.completed).length;

//   const stats = [
//     {
//       icon: CalendarDays,
//       iconBg: "bg-momentality-primary/5",
//       iconColor: "text-momentality-primary",
//       value: sarahEvents.toString(),
//       label: "Events today",
//     },
//     {
//       icon: CheckSquare,
//       iconBg: "bg-orange-50",
//       iconColor: "text-orange-500",
//       value: `${completedTasks}/${totalTasks}`,
//       label: "Tasks done",
//     },
//     {
//       icon: CheckSquare,
//       iconBg: "bg-purple-50",
//       iconColor: "text-purple-500",
//       value: pendingTasks.toString(),
//       label: "Tasks pending",
//     },
//   ];

//   return (
//     <div className="grid grid-cols-3 gap-3">
//       {stats.map((s) => (
//         <div
//           key={s.label}
//           className="flex items-center justify-center gap-4 rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-sm"
//         >
//           <div
//             className={`flex h-7 w-5 md:h-10 md:w-10 flex-shrink-0 items-center justify-center rounded-xl ${s.iconBg}`}
//           >
//             <s.icon className={`h-5 w-5 ${s.iconColor}`} />
//           </div>
//           <div>
//             <p className="text-xl font-bold text-momentality-navy leading-tight">
//               {s.value}
//             </p>
//             <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// // ─── Conflict Alert ───────────────────────────────────────────────────────────

// function ConflictAlert() {
//   const { conflictAlert } = morningBrief;
//   return (
//     <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-4">
//       <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
//       <div className="flex-1 min-w-0">
//         <p className="text-sm font-bold text-red-700">{conflictAlert.title}</p>
//         <p className="mt-0.5 text-xs leading-relaxed text-red-600">
//           {conflictAlert.description}
//           <br />
//           <span className="font-semibold">{conflictAlert.suggestion}</span>
//         </p>
//       </div>
//       <button className="flex-shrink-0 text-xs font-semibold text-momentality-secondary hover:underline">
//         Resolve
//       </button>
//     </div>
//   );
// }

// // ─── Schedule Overview ────────────────────────────────────────────────────────

// function ScheduleOverview() {
//   const todayStr = "2025-05-22";
//   const todayEvents = calendarEvents
//     .filter((e) => e.date === todayStr)
//     .sort((a, b) => a.startTime.localeCompare(b.startTime));

//   return (
//     <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
//       <div className="flex items-center justify-between px-4 py-3 border-b border-slate-50">
//         <h2 className="text-sm font-semibold text-momentality-navy">
//           Today's schedule
//         </h2>
//         <a
//           href="/demo/calendar"
//           className="flex items-center gap-0.5 text-xs font-medium text-momentality-primary hover:underline"
//         >
//           View calendar <ChevronRight className="h-3 w-3" />
//         </a>
//       </div>
//       <ul className="divide-y divide-slate-50">
//         {todayEvents.map((event) => (
//           <li
//             key={event.id}
//             className={`flex items-center gap-3 px-4 py-3 ${event.conflict ? "bg-red-50/50" : ""}`}
//           >
//             <span
//               className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
//               style={{ backgroundColor: getMemberColor(event.memberId) }}
//             />
//             <div className="flex-1 min-w-0">
//               <p
//                 className={`text-sm font-medium truncate ${event.conflict ? "text-red-700" : "text-momentality-navy"}`}
//               >
//                 {event.title}
//               </p>
//               {event.location && (
//                 <p className="flex items-center gap-1 text-xs text-slate-400">
//                   <MapPin className="h-2.5 w-2.5" />
//                   {event.location}
//                 </p>
//               )}
//             </div>
//             <div className="flex-shrink-0 text-right">
//               <p className="text-xs font-medium text-slate-500">
//                 {event.startTime}
//               </p>
//               <p className="text-xs text-slate-400">
//                 {getMemberName(event.memberId)}
//               </p>
//             </div>
//             {event.conflict && (
//               <AlertTriangle className="h-4 w-4 flex-shrink-0 text-red-400" />
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// // ─── Priority Tasks ───────────────────────────────────────────────────────────

// function PriorityTasks() {
//   const [completed, setCompleted] = useState<string[]>([]);

//   const topTasks = tasks
//     .filter((t) => !t.completed)
//     .sort((a, b) => {
//       const order = { High: 0, Medium: 1, Low: 2 };
//       return order[a.priority] - order[b.priority];
//     })
//     .slice(0, 3);

//   function toggle(id: string) {
//     setCompleted((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
//     );
//   }

//   return (
//     <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
//       <div className="flex items-center justify-between px-4 py-3 border-b border-slate-50">
//         <h2 className="text-sm font-semibold text-momentality-navy">
//           Priority tasks
//         </h2>
//         <a
//           href="/demo/tasks"
//           className="flex items-center gap-0.5 text-xs font-medium text-momentality-primary hover:underline"
//         >
//           All tasks <ChevronRight className="h-3 w-3" />
//         </a>
//       </div>
//       <ul className="divide-y divide-slate-50">
//         {topTasks.map((task) => {
//           const done = completed.includes(task.id);
//           return (
//             <li key={task.id} className="flex items-center gap-3 px-4 py-3">
//               <button
//                 onClick={() => toggle(task.id)}
//                 aria-label={done ? "Mark incomplete" : "Mark complete"}
//                 className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-colors
//                   ${done ? "border-momentality-primary bg-momentality-primary" : "border-slate-300 hover:border-momentality-primary"}`}
//               >
//                 {done && (
//                   <svg
//                     className="h-3 w-3 text-white"
//                     viewBox="0 0 12 12"
//                     fill="none"
//                   >
//                     <path
//                       d="M2 6l3 3 5-5"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 )}
//               </button>
//               <div className="flex-1 min-w-0">
//                 <p
//                   className={`text-sm truncate ${done ? "text-slate-400 line-through" : "text-momentality-navy"}`}
//                 >
//                   {task.title}
//                 </p>
//                 <p className="text-xs text-slate-400">
//                   {getMemberName(task.assigneeId)} · Due {task.dueDate}
//                 </p>
//               </div>
//               <span
//                 className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${priorityStyles[task.priority]}`}
//               >
//                 {task.priority}
//               </span>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// // ─── Alerts ───────────────────────────────────────────────────────────────────

// function Alerts() {
//   return (
//     <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
//       <div className="px-4 py-3 border-b border-slate-50">
//         <h2 className="text-sm font-semibold text-momentality-navy">Alerts</h2>
//       </div>
//       <div className="divide-y divide-slate-50">
//         {morningBrief.alerts.map((alert) => {
//           const isWarning = alert.type === "warning";
//           return (
//             <div key={alert.id} className="flex items-start gap-3 px-4 py-3.5">
//               {/* Left accent border + icon */}
//               <div
//                 className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full
//                   ${isWarning ? "bg-orange-50" : "bg-momentality-primary/5"}`}
//               >
//                 {isWarning ? (
//                   <AlertTriangle className="h-3.5 w-3.5 text-orange-400" />
//                 ) : (
//                   <Info className="h-3.5 w-3.5 text-momentality-primary" />
//                 )}
//               </div>
//               {/* Text — bold the key word */}
//               <p className="text-sm leading-relaxed text-slate-600">
//                 {formatAlertText(alert.text)}
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// // Bold keywords like "tomorrow", "2pm", time references
// function formatAlertText(text: string) {
//   const boldWords = ["tomorrow", "2pm", "today", "tonight", "this week"];
//   const parts = text.split(new RegExp(`(${boldWords.join("|")})`, "gi"));
//   return parts.map((part, i) =>
//     boldWords.some((w) => w.toLowerCase() === part.toLowerCase()) ? (
//       <strong key={i} className="font-semibold text-slate-800">
//         {part}
//       </strong>
//     ) : (
//       part
//     ),
//   );
// }

// // ─── AI Insight ───────────────────────────────────────────────────────────────

// function AiInsight() {
//   return (
//     <div className="flex gap-3 rounded-2xl border border-momentality-primary/10 bg-momentality-primary/5 px-4 py-4">
//       <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-momentality-primary shadow-sm">
//         <Sparkles className="h-4 w-4 text-white" />
//       </div>
//       <div>
//         <p className="text-xs font-semibold text-momentality-primary">
//           Elle's insight
//         </p>
//         <p className="mt-1 text-sm leading-relaxed text-momentality-primary/80">
//           {morningBrief.aiInsight.text}
//         </p>
//       </div>
//     </div>
//   );
// }

// // ─── Page ─────────────────────────────────────────────────────────────────────

// export default function DashboardPage() {
//   const { greeting } = morningBrief;

//   // Get today's date
//   const today = new Date();
//   const date = today.toLocaleDateString("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   // Get today's date in YYYY-MM-DD format for filtering
//   const todayStr = today.toISOString().split("T")[0];

//   return (
//     <div className="mx-auto max-w-3xl space-y-4">
//       {/* Greeting + Weather */}
//       <div className="flex items-center justify-between gap-4">
//         <div>
//           <h2 className="text-2xl font-bold text-momentality-navy">
//             {greeting} 👋
//           </h2>
//           <p className="mt-0.5 text-sm text-slate-400">{date}</p>
//         </div>

//         {/* Weather widget */}
//         <div className="flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-white px-4 py-2.5 shadow-sm flex-shrink-0">
//           <div className="relative">
//             <Sun className="h-7 w-7 text-yellow-400" />
//             <Cloud className="absolute -bottom-1 -right-1 h-3.5 w-3.5 text-slate-300" />
//           </div>
//           <div className="text-right">
//             <p className="text-base font-bold text-momentality-navy leading-tight">
//               {morningBrief.weather.temp}
//             </p>
//             <p className="text-[11px] text-slate-400 leading-tight">
//               {morningBrief.weather.condition}
//             </p>
//             <p className="text-[11px] text-slate-400 leading-tight flex items-center justify-end gap-0.5">
//               <MapPin className="h-2.5 w-2.5" />
//               {morningBrief.weather.location}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Stat cards — matches image 2 layout */}
//       <StatCards todayStr={todayStr} />

//       {/* Conflict alert — matches image 2 with Resolve button */}
//       <ConflictAlert />

//       {/* Today's schedule */}
//       <ScheduleOverview />

//       {/* Priority tasks */}
//       <PriorityTasks />

//       {/* Misc alerts */}
//       <Alerts />

//       {/* AI Insight */}
//       <AiInsight />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import {
  CalendarDays,
  CheckSquare,
  Cloud,
  Sun,
  AlertTriangle,
  Sparkles,
  Info,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { morningBrief } from "@/data/morning-brief";
import { tasks } from "@/data/tasks";
import { calendarEvents } from "@/data/calendar-events";
import { familyMembers } from "@/data/family";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const priorityStyles = {
  High: "bg-red-50 text-red-700 border border-red-100",
  Medium: "bg-yellow-50 text-yellow-700 border border-yellow-100",
  Low: "bg-green-50 text-green-700 border border-green-100",
};

function getMemberColor(id: string) {
  return familyMembers.find((m) => m.id === id)?.hexColor ?? "#94A3B8";
}
function getMemberName(id: string) {
  return familyMembers.find((m) => m.id === id)?.firstName ?? id;
}

// ─── Stat Cards ───────────────────────────────────────────────────────────────

function StatCards({ todayStr }: { todayStr: string }) {
  const todayEvents = calendarEvents.filter((e) => e.date === todayStr);
  const sarahEvents = todayEvents.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter((t) => !t.completed).length;

  const stats = [
    {
      icon: CalendarDays,
      iconBg: "bg-momentality-primary/5",
      iconColor: "text-momentality-primary",
      value: sarahEvents.toString(),
      label: "Events today",
    },
    {
      icon: CheckSquare,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
      value: completedTasks.toString(),
      total: totalTasks.toString(),
      label: "Tasks done",
    },
    {
      icon: CheckSquare,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
      value: pendingTasks.toString(),
      label: "Tasks pending",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex items-center justify-center md:justify-start gap-4 rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-sm"
        >
          <div
            className={`flex h-6 w-6 md:h-10 md:w-10 flex-shrink-0 items-center justify-center rounded-xl ${s.iconBg}`}
          >
            <s.icon className={`h-5 w-5 ${s.iconColor}`} />
          </div>
          <div>
            <p className="text-xl font-bold text-momentality-navy leading-tight">
              {s.value}
              {s.total && (
                <span className="text-sm text-slate-400">/{s.total}</span>
              )}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Conflict Alert ───────────────────────────────────────────────────────────

function ConflictAlert() {
  const { conflictAlert } = morningBrief;
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-4">
      <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-red-700">{conflictAlert.title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-red-600">
          {conflictAlert.description}
          <br />
          <span className="font-semibold">{conflictAlert.suggestion}</span>
        </p>
      </div>
      <button className="flex-shrink-0 text-xs font-semibold text-momentality-secondary hover:underline">
        Resolve
      </button>
    </div>
  );
}

// ─── Schedule Overview ────────────────────────────────────────────────────────

function ScheduleOverview() {
  const todayStr = "2025-05-22";
  const todayEvents = calendarEvents
    .filter((e) => e.date === todayStr)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-50">
        <h2 className="text-sm font-semibold text-momentality-navy">
          Today's schedule
        </h2>
        <a
          href="/demo/calendar"
          className="flex items-center gap-0.5 text-xs font-medium text-momentality-primary hover:underline"
        >
          View calendar <ChevronRight className="h-3 w-3" />
        </a>
      </div>
      <ul className="divide-y divide-slate-50">
        {todayEvents.map((event) => (
          <li
            key={event.id}
            className={`flex items-center gap-3 px-4 py-3 ${event.conflict ? "bg-red-50/50" : ""}`}
          >
            <span
              className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
              style={{ backgroundColor: getMemberColor(event.memberId) }}
            />
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium truncate ${event.conflict ? "text-red-700" : "text-momentality-navy"}`}
              >
                {event.title}
              </p>
              {event.location && (
                <p className="flex items-center gap-1 text-xs text-slate-400">
                  <MapPin className="h-2.5 w-2.5" />
                  {event.location}
                </p>
              )}
            </div>
            <div className="flex-shrink-0 text-right">
              <p className="text-xs font-medium text-slate-500">
                {event.startTime}
              </p>
              <p className="text-xs text-slate-400">
                {getMemberName(event.memberId)}
              </p>
            </div>
            {event.conflict && (
              <AlertTriangle className="h-4 w-4 flex-shrink-0 text-red-400" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Priority Tasks ───────────────────────────────────────────────────────────

function PriorityTasks() {
  const [completed, setCompleted] = useState<string[]>([]);

  const topTasks = tasks
    .filter((t) => !t.completed)
    .sort((a, b) => {
      const order = { High: 0, Medium: 1, Low: 2 };
      return order[a.priority] - order[b.priority];
    })
    .slice(0, 3);

  function toggle(id: string) {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-50">
        <h2 className="text-sm font-semibold text-momentality-navy">
          Priority tasks
        </h2>
        <a
          href="/demo/tasks"
          className="flex items-center gap-0.5 text-xs font-medium text-momentality-primary hover:underline"
        >
          All tasks <ChevronRight className="h-3 w-3" />
        </a>
      </div>
      <ul className="divide-y divide-slate-50">
        {topTasks.map((task) => {
          const done = completed.includes(task.id);
          return (
            <li key={task.id} className="flex items-center gap-3 px-4 py-3">
              <button
                onClick={() => toggle(task.id)}
                aria-label={done ? "Mark incomplete" : "Mark complete"}
                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-colors
                  ${done ? "border-momentality-primary bg-momentality-primary" : "border-slate-300 hover:border-momentality-primary"}`}
              >
                {done && (
                  <svg
                    className="h-3 w-3 text-white"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm truncate ${done ? "text-slate-400 line-through" : "text-momentality-navy"}`}
                >
                  {task.title}
                </p>
                <p className="text-xs text-slate-400">
                  {getMemberName(task.assigneeId)} · Due {task.dueDate}
                </p>
              </div>
              <span
                className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${priorityStyles[task.priority]}`}
              >
                {task.priority}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ─── Alerts ───────────────────────────────────────────────────────────────────

function Alerts() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-50">
        <h2 className="text-sm font-semibold text-momentality-navy">Alerts</h2>
      </div>
      <div className="divide-y divide-slate-50">
        {morningBrief.alerts.map((alert) => {
          const isWarning = alert.type === "warning";
          return (
            <div key={alert.id} className="flex items-start gap-3 px-4 py-3.5">
              {/* Left accent border + icon */}
              <div
                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full
                  ${isWarning ? "bg-orange-50" : "bg-momentality-primary/5"}`}
              >
                {isWarning ? (
                  <AlertTriangle className="h-3.5 w-3.5 text-orange-400" />
                ) : (
                  <Info className="h-3.5 w-3.5 text-momentality-primary" />
                )}
              </div>
              {/* Text — bold the key word */}
              <p className="text-sm leading-relaxed text-slate-600">
                {formatAlertText(alert.text)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Bold keywords like "tomorrow", "2pm", time references
function formatAlertText(text: string) {
  const boldWords = ["tomorrow", "2pm", "today", "tonight", "this week"];
  const parts = text.split(new RegExp(`(${boldWords.join("|")})`, "gi"));
  return parts.map((part, i) =>
    boldWords.some((w) => w.toLowerCase() === part.toLowerCase()) ? (
      <strong key={i} className="font-semibold text-slate-800">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

// ─── AI Insight ───────────────────────────────────────────────────────────────

function AiInsight() {
  return (
    <div className="flex gap-3 rounded-2xl border border-momentality-primary/10 bg-momentality-primary/5 px-4 py-4">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-momentality-primary shadow-sm">
        <Sparkles className="h-4 w-4 text-white" />
      </div>
      <div>
        <p className="text-xs font-semibold text-momentality-primary">
          Elle's insight
        </p>
        <p className="mt-1 text-sm leading-relaxed text-momentality-primary/80">
          {morningBrief.aiInsight.text}
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { greeting } = morningBrief;

  // Get today's date
  const today = new Date();
  const date = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Get today's date in YYYY-MM-DD format for filtering
  const todayStr = today.toISOString().split("T")[0];

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {/* Greeting + Weather */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-momentality-navy">
            {greeting} 👋
          </h2>
          <p className="mt-0.5 text-sm text-slate-400">{date}</p>
        </div>

        {/* Weather widget */}
        <div className="flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-white px-4 py-2.5 shadow-sm flex-shrink-0">
          <div className="relative">
            <Sun className="h-7 w-7 text-yellow-400" />
            <Cloud className="absolute -bottom-1 -right-1 h-3.5 w-3.5 text-slate-300" />
          </div>
          <div className="text-right">
            <p className="text-base font-bold text-momentality-navy leading-tight">
              {morningBrief.weather.temp}
            </p>
            <p className="text-[11px] text-slate-400 leading-tight">
              {morningBrief.weather.condition}
            </p>
            <p className="text-[11px] text-slate-400 leading-tight flex items-center justify-end gap-0.5">
              <MapPin className="h-2.5 w-2.5" />
              {morningBrief.weather.location}
            </p>
          </div>
        </div>
      </div>

      {/* Stat cards — matches image 2 layout */}
      <StatCards todayStr={todayStr} />

      {/* Conflict alert — matches image 2 with Resolve button */}
      <ConflictAlert />

      {/* Today's schedule */}
      <ScheduleOverview />

      {/* Priority tasks */}
      <PriorityTasks />

      {/* Misc alerts */}
      <Alerts />

      {/* AI Insight */}
      <AiInsight />
    </div>
  );
}
