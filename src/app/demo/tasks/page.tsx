"use client";

import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, Mail } from "lucide-react";
import { tasks, type Task } from "@/data/tasks";
import { familyMembers } from "@/data/family";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PRIORITY_ORDER = { High: 0, Medium: 1, Low: 2 };

const PRIORITY_STYLES = {
  High: "bg-red-50 text-red-600 border border-red-100",
  Medium: "bg-yellow-50 text-yellow-600 border border-yellow-100",
  Low: "bg-green-50 text-green-600 border border-green-100",
};

const CATEGORY_STYLES: Record<string, string> = {
  household: "bg-blue-50 text-blue-600",
  kids: "bg-pink-50 text-pink-600",
  health: "bg-emerald-50 text-emerald-600",
  finance: "bg-purple-50 text-purple-600",
  errands: "bg-orange-50 text-orange-600",
};

const CATEGORY_LABEL: Record<string, string> = {
  household: "Household",
  kids: "Kids",
  health: "Health",
  finance: "Finance",
  errands: "Errands",
};

const TODAY = "2025-05-22";

function getWeekEnd() {
  // May 22 is Thursday, week ends Sunday May 25
  return "2025-05-25";
}

function getMember(id: string) {
  return familyMembers.find((m) => m.id === id);
}

function sortTasks(list: Task[]) {
  return [...list].sort((a, b) => {
    const pDiff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    if (pDiff !== 0) return pDiff;
    return a.dueDate.localeCompare(b.dueDate);
  });
}

// ─── Filter tabs ──────────────────────────────────────────────────────────────

type Tab = "All" | "Today" | "This Week" | "Overdue";
const TABS: Tab[] = ["All", "Today", "This Week", "Overdue"];

function filterTasks(list: Task[], tab: Tab): Task[] {
  switch (tab) {
    case "Today":
      return list.filter((t) => t.dueDate === TODAY);
    case "This Week":
      return list.filter(
        (t) => t.dueDate >= TODAY && t.dueDate <= getWeekEnd(),
      );
    case "Overdue":
      return list.filter((t) => t.dueDate < TODAY);
    default:
      return list;
  }
}

// ─── Task row ─────────────────────────────────────────────────────────────────

function TaskRow({
  task,
  done,
  onToggle,
}: {
  task: Task;
  done: boolean;
  onToggle: () => void;
}) {
  const member = getMember(task.assigneeId);

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3.5 transition-colors
        ${done ? "opacity-60" : "hover:bg-slate-50/60"}`}
    >
      {/* Checkbox */}
      <button
        onClick={onToggle}
        aria-label={done ? "Mark incomplete" : "Mark complete"}
        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-all
          ${
            done
              ? "border-momentality-primary bg-momentality-primary"
              : "border-slate-300 hover:border-momentality-primary"
          }`}
      >
        {done && (
          <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6l3 3 5-5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Title row */}
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <p
            className={`text-sm font-medium ${
              done ? "line-through text-slate-400" : "text-momentality-navy"
            }`}
          >
            {task.title}
          </p>
          {task.fromEmail && (
            <span className="flex items-center gap-1 rounded-full bg-blue-50 border border-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-600">
              <Mail className="h-2.5 w-2.5" />
              From email
            </span>
          )}
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Assignee avatar + name */}
          <div className="flex items-center gap-1.5">
            <div
              className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
              style={{ backgroundColor: member?.hexColor }}
            >
              {member?.initials}
            </div>
            <span className="text-xs text-slate-400">{member?.firstName}</span>
          </div>

          {/* Divider dot */}
          <span className="h-1 w-1 rounded-full bg-slate-200" />

          {/* Due date */}
          <span
            className={`text-xs ${
              !done && task.dueDate < TODAY
                ? "font-semibold text-red-500"
                : "text-slate-400"
            }`}
          >
            Due {task.dueDate}
          </span>

          {/* Divider dot */}
          <span className="h-1 w-1 rounded-full bg-slate-200" />

          {/* Category */}
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${CATEGORY_STYLES[task.category]}`}
          >
            {CATEGORY_LABEL[task.category]}
          </span>
        </div>
      </div>

      {/* Priority badge — right side */}
      <span
        className={`mt-0.5 flex-shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${PRIORITY_STYLES[task.priority]}`}
      >
        {task.priority}
      </span>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ tab }: { tab: Tab }) {
  const messages: Record<Tab, { emoji: string; text: string }> = {
    All: { emoji: "✅", text: "No tasks yet" },
    Today: { emoji: "🎉", text: "Nothing due today!" },
    "This Week": { emoji: "🌟", text: "You're all caught up this week" },
    Overdue: { emoji: "🙌", text: "No overdue tasks — great job!" },
  };
  const { emoji, text } = messages[tab];
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <span className="text-4xl mb-3">{emoji}</span>
      <p className="text-sm font-medium text-slate-500">{text}</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [completedIds, setCompletedIds] = useState<Set<string>>(
    () => new Set(tasks.filter((t) => t.completed).map((t) => t.id)),
  );
  const [completedOpen, setCompletedOpen] = useState(false);

  function toggleTask(id: string) {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  // Split into active vs completed based on local state
  const activeTasks = useMemo(
    () => sortTasks(tasks.filter((t) => !completedIds.has(t.id))),
    [completedIds],
  );

  const completedTasks = useMemo(
    () => sortTasks(tasks.filter((t) => completedIds.has(t.id))),
    [completedIds],
  );

  const filteredActive = useMemo(
    () => filterTasks(activeTasks, activeTab),
    [activeTasks, activeTab],
  );

  // Tab counts
  const tabCounts: Record<Tab, number> = {
    All: activeTasks.length,
    Today: filterTasks(activeTasks, "Today").length,
    "This Week": filterTasks(activeTasks, "This Week").length,
    Overdue: filterTasks(activeTasks, "Overdue").length,
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-momentality-navy">Tasks</h2>
          <p className="mt-0.5 text-sm text-slate-400">
            {activeTasks.length} active · {completedTasks.length} completed
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-sm">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all
              ${
                activeTab === tab
                  ? "bg-momentality-primary text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              }`}
          >
            {tab}
            {/* Count badge */}
            {tabCounts[tab] > 0 && (
              <span
                className={`flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold
                  ${
                    activeTab === tab
                      ? "bg-white/20 text-white"
                      : tab === "Overdue"
                        ? "bg-red-100 text-red-600"
                        : "bg-slate-100 text-slate-500"
                  }`}
              >
                {tabCounts[tab]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Active task list */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
        {filteredActive.length === 0 ? (
          <EmptyState tab={activeTab} />
        ) : (
          <ul className="divide-y divide-slate-50">
            {filteredActive.map((task) => (
              <li key={task.id}>
                <TaskRow
                  task={task}
                  done={completedIds.has(task.id)}
                  onToggle={() => toggleTask(task.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Completed section */}
      {completedTasks.length > 0 && (
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
          {/* Collapsible header */}
          <button
            onClick={() => setCompletedOpen((v) => !v)}
            className="flex w-full items-center justify-between px-4 py-3.5 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-momentality-primary">
                <svg
                  className="h-3 w-3 text-white"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M2 6l3 3 5-5"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold text-momentality-navy">
                Completed
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
                {completedTasks.length}
              </span>
            </div>
            {completedOpen ? (
              <ChevronUp className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-400" />
            )}
          </button>

          {/* Completed task list */}
          {completedOpen && (
            <ul className="divide-y divide-slate-50 border-t border-slate-50">
              {completedTasks.map((task) => (
                <li key={task.id}>
                  <TaskRow
                    task={task}
                    done
                    onToggle={() => toggleTask(task.id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
