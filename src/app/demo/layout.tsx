import type { ReactNode } from "react";
import DemoBanner from "@/components/demo/DemoBanner";
import Sidebar from "@/components/demo/Sidebar";
import TopBar from "@/components/demo/TopBar";
import MobileTabBar from "@/components/demo/MobileTabBar";

export const metadata = {
  title: "Momentality — Demo",
  description:
    "Interactive demo of Momentality — AI-powered family command centre.",
};

export default function DemoLayout({ children }: { children: ReactNode }) {
  return (
    /*
     * Full-screen flex column:
     *   row 1 → DemoBanner  (amber strip, fixed height)
     *   row 2 → flex row:
     *             col 1 → Sidebar (fixed 260px, desktop only)
     *             col 2 → flex column:
     *                       TopBar
     *                       <main> (scrollable)
     *   row 3 → MobileTabBar (fixed bottom, mobile only)
     */
    <div
      className="flex flex-col overflow-hidden bg-momentality-bg"
      style={{ height: "100dvh" }}
    >
      {/* ── Amber demo banner ─────────────────────────────────────────── */}
      <DemoBanner />

      {/* ── Body row (sidebar + content) ──────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Sidebar — hidden on mobile, shown md+ */}
        <Sidebar />

        {/* Right column: topbar + scrollable page content */}
        <div className="flex flex-1 flex-col overflow-hidden min-h-0">
          <TopBar />

          <main
            className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-6 md:px-6 md:py-8 min-h-0
                       /* extra bottom padding on mobile so content clears the tab bar */
                       pb-24 md:pb-8"
          >
            {children}
          </main>
        </div>
      </div>

      {/* ── Mobile bottom tab bar ──────────────────────────────────────── */}
      <MobileTabBar />
    </div>
  );
}
