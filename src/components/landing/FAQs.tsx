"use client";
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import FadeInUp from "./FadeInUp";

const faqs = [
  {
    q: "What is Momentality?",
    a: "Momentality is an AI-powered family command center that brings your calendars, tasks, caregiver schedules, and an intelligent AI assistant into one place — so you can stop juggling apps and start enjoying your family.",
  },
  {
    q: "How does the AI Morning Brief work?",
    a: "Every morning, Elle scans all your family's calendars, pending tasks, and recent emails to generate a personalised daily briefing. It highlights conflicts, suggests optimisations, and surfaces what matters most — delivered before your day begins.",
  },
  {
    q: "Can I share access with my nanny or caregiver?",
    a: "Yes. The Family plan includes up to 2 caregivers, and Family Pro supports unlimited caregivers. Each caregiver gets their own view with their schedule, care notes, and the ability to confirm or request shift changes.",
  },
  {
    q: "Is my family's data secure?",
    a: "Absolutely. All data is encrypted in transit and at rest. We never sell your data to third parties. You can export or delete your data at any time from your account settings.",
  },
  {
    q: "What calendars does Momentality sync with?",
    a: "Momentality syncs with Google Calendar and Microsoft Outlook. Apple Calendar support is coming soon. You can connect multiple accounts per family member.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, no strings attached. Cancel from your account settings at any time. You'll keep access until the end of your billing period with no hidden fees or penalties.",
  },
];

export default function FAQs() {
  return (
    <section id="faq" className="bg-momentality-bg px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <FadeInUp>
          <h2 className="text-3xl font-bold tracking-tight text-momentality-navy sm:text-4xl">
            Got questions?
          </h2>
          <p className="mt-2 mb-8 text-sm text-slate-400">
            Everything you need to know.
          </p>
        </FadeInUp>

        <FadeInUp delay={0.15}>
          <div className="text-left">
            <Accordion
              type="single"
              collapsible
              className="flex flex-col gap-2"
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <AccordionTrigger className="px-5 py-4 text-sm font-semibold text-momentality-navy hover:text-momentality-primary hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4 text-[13px] leading-7 text-slate-500">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
