import Link from "next/link";
import { X } from "lucide-react";

export default function DemoBanner() {
  return (
    <div className="flex items-center justify-between bg-amber-50 border-b border-amber-200 px-4 py-2 text-amber-800">
      <p className="flex-1 text-center text-xs font-medium">
        🚀 This is a demo with sample data.{" "}
        <a
          href="/#pricing"
          className="font-semibold underline underline-offset-2 hover:text-amber-900 transition-colors"
        >
          Sign up for the full experience →
        </a>
      </p>
      {/* Spacer to keep text centered */}
      <span className="w-6" aria-hidden="true" />
    </div>
  );
}
