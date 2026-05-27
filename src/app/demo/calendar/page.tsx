"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, AlertTriangle } from "lucide-react";
import { calendarEvents } from "@/data/calendar-events";
import { familyMembers } from "@/data/family";

// ─── Types & helpers ──────────────────────────────────────────────────────────

const MONTH = 4; // May (0-indexed)
const YEAR = 2025;

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function padDate(n: number) {
  return n.toString().padStart(2, "0");
}

function toDateStr(year: number, month: number, day: number) {
  return `${year}-${padDate(month + 1)}-${padDate(day)}`;
}

function getMember(id: string) {
  return familyMembers.find((m) => m.id === id);
}

const categoryLabel: Record<string, string> = {
  work: "Work",
  school: "School",
  health: "Health",
  sport: "Sport",
  family: "Family",
  caregiver: "Caregiver",
};

const categoryColor: Record<string, string> = {
  work: "bg-blue-50 text-blue-700",
  school: "bg-yellow-50 text-yellow-700",
  health: "bg-green-50 text-green-700",
  sport: "bg-pink-50 text-pink-700",
  family: "bg-purple-50 text-purple-700",
  caregiver: "bg-orange-50 text-orange-700",
};

// ─── Filter bar ───────────────────────────────────────────────────────────────

function FilterBar({
  active,
  toggle,
}: {
  active: string[];
  toggle: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {familyMembers.map((m) => {
        const on = active.includes(m.id);
        return (
          <button
            key={m.id}
            onClick={() => toggle(m.id)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all
              ${
                on
                  ? "border-transparent text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-400 hover:border-slate-300"
              }`}
            style={
              on ? { backgroundColor: m.hexColor, borderColor: m.hexColor } : {}
            }
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: on ? "rgba(255,255,255,0.7)" : m.hexColor,
              }}
            />
            {m.firstName}
          </button>
        );
      })}
    </div>
  );
}

// ─── Day cell ─────────────────────────────────────────────────────────────────

function DayCell({
  day,
  year,
  month,
  visibleMembers,
  isSelected,
  isToday,
  onClick,
}: {
  day: number;
  year: number;
  month: number;
  visibleMembers: string[];
  isSelected: boolean;
  isToday: boolean;
  onClick: () => void;
}) {
  const dateStr = toDateStr(year, month, day);
  const dayEvents = calendarEvents.filter(
    (e) => e.date === dateStr && visibleMembers.includes(e.memberId),
  );
  const hasConflict = dayEvents.some((e) => e.conflict);

  // Unique members with events today
  const memberIds = [...new Set(dayEvents.map((e) => e.memberId))];

  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center rounded-xl p-1.5 transition-all min-h-[52px] w-full
        ${
          isSelected
            ? "bg-momentality-primary/10 border-2 border-momentality-primary"
            : hasConflict
              ? "border-2 border-red-400 bg-red-50 shadow-sm shadow-red-100 hover:bg-red-100"
              : "border border-transparent hover:bg-slate-50"
        }
      `}
    >
      {/* Day number */}
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium leading-none
          ${
            isToday
              ? "bg-momentality-primary text-white font-bold"
              : isSelected
                ? "text-momentality-primary font-semibold"
                : hasConflict
                  ? "text-red-600 font-semibold"
                  : "text-slate-600"
          }`}
      >
        {day}
      </span>

      {/* Dots */}
      {memberIds.length > 0 && (
        <div className="mt-1 flex flex-wrap justify-center gap-0.5">
          {memberIds.slice(0, 4).map((id) => {
            const member = getMember(id);
            return (
              <span
                key={id}
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: member?.hexColor }}
              />
            );
          })}
        </div>
      )}
    </button>
  );
}

// ─── Event card in side panel ─────────────────────────────────────────────────

function EventCard({ event }: { event: (typeof calendarEvents)[0] }) {
  const member = getMember(event.memberId);
  return (
    <div
      className={`rounded-xl border p-3 transition-all
        ${
          event.conflict
            ? "border-red-200 bg-red-50"
            : "border-slate-100 bg-white"
        }`}
    >
      <div className="flex items-start gap-2.5">
        {/* Member avatar */}
        <div
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
          style={{ backgroundColor: member?.hexColor }}
        >
          {member?.initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <p
              className={`text-sm font-semibold truncate ${event.conflict ? "text-red-700" : "text-momentality-navy"}`}
            >
              {event.title}
            </p>
            {event.conflict && (
              <span className="flex items-center gap-0.5 rounded-full bg-red-100 px-1.5 py-0.5 text-[10px] font-medium text-red-600">
                <AlertTriangle className="h-2.5 w-2.5" />
                Conflict
              </span>
            )}
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5">
            <span className="text-xs text-slate-400 font-medium">
              {event.startTime} – {event.endTime}
            </span>
            {event.location && (
              <span className="flex items-center gap-0.5 text-xs text-slate-400">
                <MapPin className="h-2.5 w-2.5" />
                {event.location}
              </span>
            )}
          </div>

          <div className="mt-1.5 flex items-center gap-1.5">
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{
                backgroundColor: member?.hexColor + "20",
                color: member?.hexColor,
              }}
            >
              {member?.firstName}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${categoryColor[event.category]}`}
            >
              {categoryLabel[event.category]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CalendarPage() {
  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === MONTH && today.getFullYear() === YEAR;
  const todayDay = isCurrentMonth ? today.getDate() : -1;

  const [selectedDay, setSelectedDay] = useState<number | null>(
    isCurrentMonth ? todayDay : 1,
  );
  const [visibleMembers, setVisibleMembers] = useState<string[]>(
    familyMembers.map((m) => m.id),
  );

  function toggleMember(id: string) {
    setVisibleMembers((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((x) => x !== id)
          : prev
        : [...prev, id],
    );
  }

  const daysInMonth = getDaysInMonth(YEAR, MONTH);
  const firstDay = getFirstDayOfMonth(YEAR, MONTH);
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  // Selected day events
  const selectedDateStr = selectedDay
    ? toDateStr(YEAR, MONTH, selectedDay)
    : null;

  const selectedEvents = selectedDateStr
    ? calendarEvents
        .filter(
          (e) =>
            e.date === selectedDateStr && visibleMembers.includes(e.memberId),
        )
        .sort((a, b) => a.startTime.localeCompare(b.startTime))
    : [];

  const totalThisMonth = calendarEvents.filter(
    (e) =>
      e.date.startsWith(`${YEAR}-${padDate(MONTH + 1)}`) &&
      visibleMembers.includes(e.memberId),
  ).length;

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-momentality-navy">
            {MONTH_NAMES[MONTH]} {YEAR}
          </h2>
          <p className="mt-0.5 text-sm text-slate-400">
            {totalThisMonth} event{totalThisMonth !== 1 ? "s" : ""} this month
          </p>
        </div>
        {/* Month nav (visual only) */}
        <div className="flex items-center gap-1">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 transition-colors">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Filter toggles */}
      <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
        <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-slate-400">
          Show events for
        </p>
        <FilterBar active={visibleMembers} toggle={toggleMember} />
      </div>

      {/* Calendar + Side panel */}
      <div className="flex gap-4 items-start">
        {/* Calendar grid */}
        <div className="flex-1 min-w-0 rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-slate-100">
            {DAYS_OF_WEEK.map((d) => (
              <div
                key={d}
                className="py-2.5 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-400"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1 p-2">
            {Array.from({ length: totalCells }).map((_, i) => {
              const day = i - firstDay + 1;
              const inMonth = day >= 1 && day <= daysInMonth;

              if (!inMonth) {
                return (
                  <div
                    key={i}
                    className="min-h-[52px] border border-transparent"
                  />
                );
              }

              return (
                <DayCell
                  key={i}
                  day={day}
                  year={YEAR}
                  month={MONTH}
                  visibleMembers={visibleMembers}
                  isSelected={selectedDay === day}
                  isToday={todayDay === day}
                  onClick={() =>
                    setSelectedDay((prev) => (prev === day ? null : day))
                  }
                />
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 border-t border-slate-50 px-4 py-3">
            {familyMembers.map((m) => (
              <span
                key={m.id}
                className="flex items-center gap-1.5 text-xs text-slate-500"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: m.hexColor }}
                />
                {m.firstName}
              </span>
            ))}
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              Conflict
            </span>
          </div>
        </div>

        {/* Side panel — desktop */}
        <div className="hidden lg:flex w-72 flex-shrink-0 flex-col rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-50 px-4 py-3">
            <p className="text-sm font-semibold text-momentality-navy">
              {selectedDay
                ? `${MONTH_NAMES[MONTH]} ${selectedDay}`
                : "Select a day"}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              {selectedEvents.length > 0
                ? `${selectedEvents.length} event${selectedEvents.length !== 1 ? "s" : ""}`
                : "No events"}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {selectedEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="mb-2 text-3xl">📅</div>
                <p className="text-sm font-medium text-slate-500">
                  {selectedDay
                    ? "No events this day"
                    : "Tap a day to see events"}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {selectedDay ? "Enjoy the free time!" : ""}
                </p>
              </div>
            ) : (
              selectedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Mobile event panel — shown below calendar on small screens */}
      {selectedDay && (
        <div className="lg:hidden rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-50 px-4 py-3">
            <p className="text-sm font-semibold text-momentality-navy">
              {MONTH_NAMES[MONTH]} {selectedDay}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              {selectedEvents.length > 0
                ? `${selectedEvents.length} event${selectedEvents.length !== 1 ? "s" : ""}`
                : "No events"}
            </p>
          </div>
          <div className="p-3 space-y-2">
            {selectedEvents.length === 0 ? (
              <p className="py-6 text-center text-sm text-slate-400">
                No events this day 🎉
              </p>
            ) : (
              selectedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
