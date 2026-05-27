"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CalendarDays,
  CheckSquare,
  Sparkles,
  Users,
  BarChart2,
  ArrowLeft,
} from "lucide-react";
import { loggedInUser } from "@/data/family";

const navItems = [
  {
    label: "Dashboard",
    href: "/demo",
    Icon: Home,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    iconBgInactive: "bg-slate-100",
    iconColorInactive: "text-slate-400",
  },
  {
    label: "Calendar",
    href: "/demo/calendar",
    Icon: CalendarDays,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    iconBgInactive: "bg-slate-100",
    iconColorInactive: "text-slate-400",
  },
  {
    label: "Tasks",
    href: "/demo/tasks",
    Icon: CheckSquare,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    iconBgInactive: "bg-slate-100",
    iconColorInactive: "text-slate-400",
  },
  {
    label: "Elle",
    href: "/demo/elle",
    Icon: Sparkles,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    iconBgInactive: "bg-slate-100",
    iconColorInactive: "text-slate-400",
    badge: "1",
  },
  {
    label: "Caregivers",
    href: "/demo/caregivers",
    Icon: Users,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
    iconBgInactive: "bg-slate-100",
    iconColorInactive: "text-slate-400",
  },
  {
    label: "Recap",
    href: "/demo/recap",
    Icon: BarChart2,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    iconBgInactive: "bg-slate-100",
    iconColorInactive: "text-slate-400",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex h-full w-[260px] flex-shrink-0 flex-col border-r border-slate-100 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-slate-100">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-momentality-primary">
          <span className="text-xs font-bold text-white">M</span>
        </div>
        <span className="text-base font-semibold text-momentality-navy tracking-tight">
          Momentality
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {navItems.map(
          ({
            label,
            href,
            Icon,
            iconBg,
            iconColor,
            iconBgInactive,
            iconColorInactive,
            badge,
          }) => {
            const isActive =
              href === "/demo"
                ? pathname === "/demo"
                : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-slate-50 text-momentality-navy"
                    : "text-slate-500 hover:bg-slate-50 hover:text-momentality-navy"
                }`}
              >
                {/* Icon container */}
                <div
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors
                  ${isActive ? iconBg : iconBgInactive}`}
                >
                  <Icon
                    className={`h-4 w-4 transition-colors ${isActive ? iconColor : iconColorInactive}`}
                  />
                </div>

                <span
                  className={
                    isActive ? "font-semibold text-momentality-navy" : ""
                  }
                >
                  {label}
                </span>

                {/* Badge */}
                {badge && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-momentality-secondary text-[10px] font-bold text-white">
                    {badge}
                  </span>
                )}
              </Link>
            );
          },
        )}
      </nav>

      {/* User + back to home */}
      <div className="border-t border-slate-100 px-3 py-4 space-y-1">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-semibold text-white">
            {loggedInUser.initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-momentality-navy">
              {loggedInUser.name}
            </p>
            <p className="text-xs text-slate-400">{loggedInUser.role}</p>
          </div>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-400 hover:bg-slate-50 hover:text-momentality-navy transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to home
        </Link>
      </div>
    </aside>
  );
}
