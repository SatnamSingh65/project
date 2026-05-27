"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  LayoutGrid,
  Tag,
  HelpCircle,
  ChevronRight,
  Zap,
  Rocket,
} from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (!(e.target as Element).closest("nav")) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFeatureClick = () => {
    setMenuOpen(false);
    const element = document.getElementById("features");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePricingClick = () => {
    setMenuOpen(false);
    const element = document.getElementById("pricing");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFaqClick = () => {
    setMenuOpen(false);
    const element = document.getElementById("faq");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCTAClick = () => {
    setMenuOpen(false);
    const element = document.getElementById("pricing");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    {
      href: "/#features",
      label: "Features",
      subtitle: "Explore what's possible",
      icon: <LayoutGrid className="h-4 w-4" />,
      onClick: handleFeatureClick,
    },
    {
      href: "/#pricing",
      label: "Pricing",
      subtitle: "Simple, transparent plans",
      icon: <Tag className="h-4 w-4" />,
      onClick: handlePricingClick,
    },
    {
      href: "/#faq",
      label: "FAQ",
      subtitle: "Answers to common questions",
      icon: <HelpCircle className="h-4 w-4" />,
      onClick: handleFaqClick,
    },
  ];

  return (
    <nav className="fixed left-0 top-0 z-50 w-full bg-momentality-primary text-white shadow-lg shadow-slate-900/10">
      {/* Desktop + Mobile top bar */}
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 hover:opacity-80 transition"
        >
          <span className="text-xl font-semibold tracking-tight text-white">
            Momentality
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.onClick}
              className="text-sm font-medium text-white/90 transition hover:text-white"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={handleCTAClick}
            className="flex items-center gap-1.5 rounded-full bg-momentality-secondary px-4 py-2 text-sm font-semibold text-white transition hover:bg-momentality-secondary/90"
          >
            Start Free Trial
          </button>
        </div>

        {/* Hamburger */}
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* Divider */}
        <div className="mx-4 border-t border-white/10" />

        <div className="flex flex-col gap-0.5 px-3 py-3">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.onClick}
              className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-white/10 text-left w-full"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white/15 text-white">
                {link.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{link.label}</p>
                <p className="text-xs text-white/60">{link.subtitle}</p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-white/40" />
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="px-3 pb-4 pt-1">
          <button
            onClick={handleCTAClick}
            className="flex items-center justify-center gap-2 rounded-[13px] bg-momentality-secondary py-3.5 text-sm font-semibold text-white transition hover:bg-momentality-secondary/90 active:scale-[0.98] w-full"
          >
            Start Free Trial
          </button>
        </div>
      </div>
    </nav>
  );
}
