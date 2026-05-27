"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Mic, Sparkles } from "lucide-react";
import { elleConversation } from "@/data/elle";
import { loggedInUser } from "@/data/family";

// All messages appear simultaneously.
// The typing indicator appears immediately with messages.
const STAGGER_MS = 0;
const LAST_INDEX = elleConversation.length - 1;
const TYPING_DELAY = 0;

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ visible }: { visible: boolean }) {
  return (
    <div
      className={`pointer-events-none fixed bottom-24 left-1/2 z-50 -translate-x-1/2 transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
    >
      <div className="flex items-center gap-2 rounded-xl bg-momentality-navy px-4 py-2.5 shadow-lg">
        <Sparkles className="h-3.5 w-3.5 text-momentality-secondary" />
        <span className="text-xs font-medium text-white">
          Demo mode — Elle is not connected
        </span>
      </div>
    </div>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingIndicator({ visible }: { visible: boolean }) {
  return (
    <div
      className={`flex items-end gap-2 px-4 py-1 transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
    >
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-momentality-primary shadow-sm">
        <Sparkles className="h-4 w-4 text-white" />
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm border border-slate-100">
        <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
        <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
        <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
      </div>
      <span className="mb-1 text-[11px] text-slate-400">Elle is typing…</span>
    </div>
  );
}

// ─── Message bubble ───────────────────────────────────────────────────────────

function MessageBubble({
  msg,
  index,
}: {
  msg: (typeof elleConversation)[0];
  index: number;
}) {
  const isElle = msg.sender === "elle";

  return (
    <div
      className={`flex px-4 py-0.5 opacity-0 ${isElle ? "justify-start" : "justify-end"}`}
      style={{
        animation: `msgFadeIn 0.2s ease forwards`,
        animationDelay: `${index * STAGGER_MS}ms`,
      }}
    >
      <div
        className={`flex max-w-[78%] items-end gap-2 ${isElle ? "" : "flex-row-reverse"}`}
      >
        {/* Avatar */}
        {isElle ? (
          <div className="mb-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-momentality-primary shadow-sm">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
        ) : (
          <div
            className="mb-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-sm"
            style={{ backgroundColor: "#3B82F6" }}
          >
            {loggedInUser.initials}
          </div>
        )}

        {/* Bubble */}
        <div
          className={`rounded-2xl px-4 py-2.5 shadow-sm
            ${
              isElle
                ? "rounded-bl-sm bg-white border border-slate-100 text-momentality-navy"
                : "rounded-br-sm bg-momentality-primary text-white"
            }`}
        >
          {msg.text.split("\n").map((line, i) => (
            <p
              key={i}
              className={`text-sm leading-relaxed ${i > 0 ? "mt-0.5" : ""}`}
            >
              {line}
            </p>
          ))}
          <p
            className={`mt-1 text-right text-[10px] ${isElle ? "text-slate-400" : "text-white/60"}`}
          >
            {msg.time}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EllePage() {
  // Get today's date
  const today = new Date();
  const dateString = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [showTyping, setShowTyping] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Show typing indicator once — after last message has faded in
  useEffect(() => {
    const t = setTimeout(() => setShowTyping(true), TYPING_DELAY);
    return () => clearTimeout(t);
  }, []);

  // Scroll to bottom after mount — immediately
  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, []);

  function showToast() {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  }

  return (
    <div className="flex h-full flex-col bg-slate-50">
      {/* Keyframe injected once */}
      <style>{`
        @keyframes msgFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Chat header ───────────────────────────────────────────────── */}
      <div className="flex flex-shrink-0 items-center gap-3 border-b border-slate-100 bg-white px-5 py-3.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-momentality-primary shadow-md">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-momentality-navy">Elle</p>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            <p className="text-xs text-slate-400">AI Family Assistant · Demo</p>
          </div>
        </div>
      </div>

      {/* ── Message list ──────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto py-4 md:py-0 space-y-1">
        {/* Date divider */}
        <div className="flex items-center gap-3 px-6 py-2">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-[11px] font-medium text-slate-400">
            {dateString}
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {elleConversation.map((msg, i) => (
          <MessageBubble key={msg.id} msg={msg} index={i} />
        ))}

        <TypingIndicator visible={showTyping} />

        <div ref={bottomRef} />
      </div>

      {/* ── Input bar ─────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 border-t border-slate-100 bg-white px-4 py-3">
        <div
          onClick={showToast}
          className="flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 hover:bg-slate-100 transition-colors"
        >
          <input
            readOnly
            placeholder="Ask Elle anything…"
            className="flex-1 bg-transparent text-sm text-slate-400 placeholder:text-slate-400 outline-none cursor-pointer select-none"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              showToast();
            }}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-momentality-primary text-white hover:bg-teal-700 transition-colors"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              showToast();
            }}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 transition-colors"
          >
            <Mic className="h-3.5 w-3.5" />
          </button>
        </div>
        <p className="mt-1.5 text-center text-[10px] text-slate-400">
          Demo mode · Elle is not connected to live data
        </p>
      </div>

      <Toast visible={toastVisible} />
    </div>
  );
}
