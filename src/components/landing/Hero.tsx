import Image from "next/image";
import { Play, Zap } from "lucide-react";
import FadeInUp from "./FadeInUp";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  const handleWatchDemo = () => {
    router.push("/demo");
  };

  const handleStartFreeTrial = () => {
    const element = document.getElementById("pricing");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen flex-col justify-center bg-momentality-bg px-4 text-momentality-navy sm:px-6 lg:px-8">
      <div className="mx-auto flex flex-col md:flex-row max-w-6xl items-center gap-10 w-full">
        <FadeInUp
          delay={0}
          className="flex basis-[60%] flex-col items-center text-center md:items-start md:text-left"
        >
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-momentality-navy sm:text-5xl lg:text-6xl space-y-2">
            <span className="block">Your Family's</span>
            <span className="block">AI-Powered</span>
            <span className="block">Command Center</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-momentality-navy/75 sm:text-lg md:mx-0">
            Stop juggling 7 apps. Momentality brings your calendars, tasks, and
            caregivers into one intelligent hub.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <button
              onClick={handleWatchDemo}
              className="flex items-center justify-center gap-2 rounded-full bg-momentality-primary px-6 py-3 text-sm font-semibold text-momentality-bg transition hover:bg-momentality-primary/90 hover:shadow-lg hover:shadow-momentality-primary/15 active:scale-[0.98]"
            >
              <Play className="h-3.5 w-3.5 fill-momentality-bg stroke-none" />
              Watch Demo
            </button>
            <button
              onClick={handleStartFreeTrial}
              className="flex items-center justify-center gap-2 rounded-full border-2 border-momentality-primary bg-momentality-bg px-6 py-3 text-sm font-semibold text-momentality-primary transition hover:bg-momentality-primary/10 active:scale-[0.98]"
            >
              <Zap className="h-3.5 w-3.5" />
              Start Free Trial
            </button>
          </div>
        </FadeInUp>

        <FadeInUp
          delay={0.2}
          className="flex basis-[60%] items-center justify-center"
        >
          <div className="absolute inset-0 -z-10 rounded-xs bg-linear-to-br from-momentality-primary/10 via-white to-momentality-secondary/10 blur-2xl" />
          <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-white/70 bg-white shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5 md:max-w-4xl lg:max-w-6xl">
            <Image
              src="/images/demo.png"
              alt="Momentality dashboard"
              width={1280}
              height={900}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
