import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Momentality — Your Family's AI-Powered Command Center",
  description:
    "Stop juggling 7 apps. Momentality brings your calendars, tasks, and caregivers into one intelligent hub powered by Elle, your AI family assistant.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-momentality-bg text-momentality-navy antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
