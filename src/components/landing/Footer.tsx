"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const links = {
  Product: ["Features", "Pricing", "FAQ", "Try the Demo"],
  Legal: ["Privacy Policy", "Terms of Service", "Contact"],
};

export default function Footer() {
  const router = useRouter();

  const handleScroll = (anchor: string) => {
    const element = document.getElementById(anchor);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const getLinkHref = (item: string) => {
    switch (item) {
      case "Features":
        return () => handleScroll("features");
      case "Pricing":
        return () => handleScroll("pricing");
      case "FAQ":
        return () => handleScroll("faq");
      case "Try the Demo":
        return () => router.push("/demo");
      default:
        return undefined;
    }
  };

  return (
    <footer className="bg-momentality-navy px-4 pt-12 pb-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 md:flex-row md:gap-16 mb-10">
          {/* Brand */}
          <div className="flex-2">
            <div className="mb-3 flex items-center gap-2">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-[15px] font-bold text-momentality-bg hover:opacity-80 transition"
              >
                Momentality
              </button>
            </div>
            <p className="mb-4 max-w-[200px] text-[13px] leading-relaxed text-slate-500">
              Your family's AI-powered command center. Calm the chaos.
            </p>
            {/* Social icons */}
            <div className="flex gap-2">
              {["twitter", "instagram", "linkedin"].map((s) => (
                <Link
                  key={s}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700 text-slate-400 transition hover:bg-slate-600 hover:text-momentality-bg"
                >
                  <span className="sr-only">{s}</span>
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    {s === "twitter" && (
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    )}
                    {s === "instagram" && (
                      <>
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <line
                          x1="17.5"
                          y1="6.5"
                          x2="17.51"
                          y2="6.5"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </>
                    )}
                    {s === "linkedin" && (
                      <>
                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </>
                    )}
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading} className="flex-1">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                {heading}
              </p>
              <div className="flex flex-col gap-2">
                {items.map((item) => {
                  const onClick = getLinkHref(item);
                  return onClick ? (
                    <button
                      key={item}
                      onClick={onClick}
                      className="text-left text-[13px] text-slate-500 transition hover:text-momentality-bg"
                    >
                      {item}
                    </button>
                  ) : (
                    <Link
                      key={item}
                      href="#"
                      className="text-[13px] text-slate-500 transition hover:text-momentality-bg"
                    >
                      {item}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-2 border-t border-slate-700 pt-5 sm:flex-row">
          <p className="text-xs text-slate-500">
            © 2026 Momentality. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-momentality-primary" />
            <span className="text-xs text-slate-500">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
