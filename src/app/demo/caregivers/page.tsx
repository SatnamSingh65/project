"use client";

import {
  UserPlus,
  Calendar,
  AlertTriangle,
  Phone,
  Moon,
  TvMinimalPlay,
  Backpack,
  Car,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { caregivers } from "@/data/caregivers";

// ─── Icon map for care note icons ─────────────────────────────────────────────

const NOTE_ICONS: Record<string, React.ReactNode> = {
  alert: (
    <AlertTriangle className="h-3.5 w-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
  ),
  backpack: (
    <Backpack className="h-3.5 w-3.5 text-blue-500  flex-shrink-0 mt-0.5" />
  ),
  moon: <Moon className="h-3.5 w-3.5 text-indigo-400 flex-shrink-0 mt-0.5" />,
  "tv-off": (
    <TvMinimalPlay className="h-3.5 w-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
  ),
  car: <Car className="h-3.5 w-3.5 text-teal-500  flex-shrink-0 mt-0.5" />,
  clock: <Clock className="h-3.5 w-3.5 text-orange-400 flex-shrink-0 mt-0.5" />,
  heart: (
    <ShieldCheck className="h-3.5 w-3.5 text-pink-400  flex-shrink-0 mt-0.5" />
  ),
};

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Active: "bg-green-50 text-green-700 border border-green-100",
    Inactive: "bg-slate-100 text-slate-500",
  };
  const dots: Record<string, string> = {
    Active: "bg-green-500",
    Inactive: "bg-slate-400",
  };
  return (
    <span
      className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dots[status]}`} />
      {status}
    </span>
  );
}

// ─── Caregiver card ───────────────────────────────────────────────────────────

function CaregiverCard({ caregiver }: { caregiver: (typeof caregivers)[0] }) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
      {/* ── Card header ── */}
      <div className="flex items-start gap-4 border-b border-slate-50 p-5">
        {/* Avatar */}
        <div
          className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold ${caregiver.avatarBg}`}
        >
          {caregiver.initials}
        </div>

        {/* Name + role + badge */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-semibold text-momentality-navy">
              {caregiver.name}
            </h3>
            <StatusBadge status={caregiver.status} />
          </div>
          <p className="mt-0.5 text-xs text-slate-400 font-medium">
            {caregiver.role}
          </p>
        </div>
      </div>

      {/* ── Schedule ── */}
      <div className="flex items-start gap-3 border-b border-slate-50 px-5 py-4">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-teal-50">
          <Calendar className="h-4 w-4 text-momentality-primary" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
            Schedule
          </p>
          <p className="text-sm font-medium text-momentality-navy">
            {caregiver.schedule}
          </p>
        </div>
      </div>

      {/* ── Care notes ── */}
      <div className="border-b border-slate-50 px-5 py-4 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Care notes
        </p>
        <ul className="flex flex-col gap-2.5">
          {caregiver.notes.map((note, i) => (
            <li key={i} className="flex items-start gap-2.5">
              {NOTE_ICONS[note.icon] ?? (
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-300" />
              )}
              <span className="text-sm leading-relaxed text-slate-600">
                {note.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Emergency contact ── */}
      <div className="flex items-start gap-3 px-5 py-4">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-red-50">
          <Phone className="h-4 w-4 text-red-500" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
            Emergency contact
          </p>
          <p className="text-sm font-medium text-momentality-navy">
            {caregiver.emergencyContact.name}
          </p>
          <p className="text-xs text-slate-400">
            {caregiver.emergencyContact.relation} ·{" "}
            {caregiver.emergencyContact.phone}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CaregiversPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-momentality-navy">
            Caregivers
          </h2>
          <p className="mt-0.5 text-sm text-slate-400">
            {caregivers.length} caregiver{caregivers.length !== 1 ? "s" : ""}{" "}
            connected
          </p>
        </div>

        {/* Add caregiver — non-functional */}
        <button className="flex items-center gap-2 rounded-xl bg-momentality-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 transition-colors">
          <UserPlus className="h-4 w-4" />
          Add Caregiver
        </button>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {caregivers.map((c) => (
          <CaregiverCard key={c.id} caregiver={c} />
        ))}
      </div>
    </div>
  );
}
