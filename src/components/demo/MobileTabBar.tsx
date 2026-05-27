"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  MessageCircle,
  MoreHorizontal,
  Users,
  RotateCcw,
} from "lucide-react";

const tabs = [
  { label: "Home", href: "/demo", Icon: LayoutDashboard },
  { label: "Calendar", href: "/demo/calendar", Icon: Calendar },
  { label: "Tasks", href: "/demo/tasks", Icon: CheckSquare },
  { label: "Elle", href: "/demo/elle", Icon: MessageCircle },
];

const moreMenuItems = [
  { label: "Caregivers", href: "/demo/caregivers", Icon: Users },
  { label: "Evening Recap", href: "/demo/recap", Icon: RotateCcw },
];

export default function MobileTabBar() {
  const pathname = usePathname();
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-stretch border-t border-slate-100 bg-white">
        {tabs.map(({ label, href, Icon }) => {
          const isActive =
            href === "/demo" ? pathname === "/demo" : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`relative flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors
                ${isActive ? "text-momentality-primary" : "text-slate-400 hover:text-slate-600"}`}
            >
              <Icon
                className={`h-5 w-5 ${isActive ? "text-momentality-primary" : "text-slate-400"}`}
              />
              {label}
              {/* Active indicator dot */}
              {isActive && (
                <span className="absolute top-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-momentality-primary" />
              )}
              {/* Elle notification badge */}
              {label === "Elle" && !isActive && (
                <span className="absolute right-[calc(50%-14px)] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-momentality-secondary text-[9px] font-bold text-white">
                  1
                </span>
              )}
            </Link>
          );
        })}

        {/* More button */}
        <button
          onClick={() => setMoreMenuOpen(!moreMenuOpen)}
          className={`relative flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors
            ${
              moreMenuOpen
                ? "text-momentality-primary"
                : "text-slate-400 hover:text-slate-600"
            }`}
        >
          <MoreHorizontal
            className={`h-5 w-5 ${
              moreMenuOpen ? "text-momentality-primary" : "text-slate-400"
            }`}
          />
          More
          {/* Active indicator dot */}
          {moreMenuOpen && (
            <span className="absolute top-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-momentality-primary" />
          )}
        </button>
      </nav>

      {/* More menu modal */}
      {moreMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-30 bg-black/20 md:hidden"
            onClick={() => setMoreMenuOpen(false)}
          />

          {/* Menu */}
          <div className="fixed bottom-20 left-0 right-0 z-40 mx-4 rounded-2xl border border-slate-100 bg-white shadow-lg md:hidden">
            <div className="flex flex-col divide-y divide-slate-50">
              {moreMenuItems.map(({ label, href, Icon }) => {
                const isActive = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMoreMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 transition-colors ${
                      isActive
                        ? "bg-momentality-primary/5 text-momentality-primary"
                        : "text-momentality-navy hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
