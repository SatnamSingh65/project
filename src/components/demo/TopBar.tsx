"use client";

import { usePathname } from "next/navigation";
import { Bell, Settings } from "lucide-react";

const routeTitles: Record<string, string> = {
  "/demo": "Morning Brief",
  "/demo/calendar": "Family Calendar",
  "/demo/tasks": "Tasks",
  "/demo/elle": "Elle — AI Assistant",
  "/demo/caregivers": "Caregivers",
  "/demo/recap": "Evening Recap",
};

export default function TopBar() {
  const pathname = usePathname();
  const title = routeTitles[pathname] ?? "Momentality";

  return (
    <header className="flex items-center justify-between border-b border-slate-100 bg-white px-4 py-3 md:px-6">
      {/* Page title */}
      <h1 className="text-base font-semibold text-momentality-navy">{title}</h1>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {/* Notification bell */}
        <button
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-50 transition-colors"
        >
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-momentality-secondary text-[9px] font-bold text-white">
            3
          </span>
        </button>

        {/* Settings */}
        <button
          aria-label="Settings"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-50 transition-colors"
        >
          <Settings className="h-4.5 w-4.5" />
        </button>
      </div>
    </header>
  );
}
