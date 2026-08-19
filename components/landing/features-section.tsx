"use client";

import { useEffect, useRef, useState } from "react";
import { Compass, Layers, ShieldCheck, MessageSquareText } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Define",
    description:
      "Stakeholder interviews, objective setting, and hypothesis shaping before we field anything.",
    icon: <Compass className="w-6 h-6" />,
  },
  {
    number: "02",
    title: "Design",
    description:
      "Quant, qual, or hybrid study design matched to speed, confidence level, and budget.",
    icon: <Layers className="w-6 h-6" />,
  },
  {
    number: "03",
    title: "Validate",
    description:
      "Recruitment control, quality checks, and clear fieldwork governance across every market.",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    number: "04",
    title: "Translate",
    description:
      "Executive summaries, segment stories, and action plans teams can use immediately.",
    icon: <MessageSquareText className="w-6 h-6" />,
  },
];

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-black"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-amber-500/[0.025] rounded-full blur-[80px]" />
<div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-amber-600/[0.025] rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center space-y-6 mb-24">
        <div className="inline-flex items-center gap-3 px-9 py-4 rounded-full border border-[#f0b95c]/40 bg-[#f0b95c]/10 text-[#f0b95c] text-3xl md:text-4xl font-bold uppercase tracking-widest rotate-[-1deg] mb-6">
  Approach
</div>
          <div className="relative">
            <h2
              className={`text-4xl md:text-5xl font-bold font-handwritten text-amber-100 rotate-[-1deg] max-w-3xl mx-auto leading-tight transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              A horizontal research rail that shows progress at a glance.
            </h2>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-44 h-3 bg-amber-500/20 rotate-[-1deg] rounded-full blur-sm" />
          </div>
          <p
            className={`font-handwritten text-xl text-zinc-400 rotate-[-1deg] transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            This section now reads like a journey map rather than stacked process cards.
          </p>
        </div>

        {/* Horizontal research rail */}
        <div className="relative">
          {/* Connecting glowing dashed line across the rail (desktop only) */}
          <div className="hidden md:block absolute top-6 left-6 right-6 h-px z-0">
            <div className="w-full h-full border-t-2 border-dashed border-amber-500/30" />
            <div className="w-full h-full bg-gradient-to-r from-transparent via-amber-400/40 to-transparent blur-sm -mt-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={cn(
                  "relative group transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
                  index === 0 && "rotate-[-1deg]",
                  index === 1 && "rotate-[1deg]",
                  index === 2 && "rotate-[-2deg]",
                  index === 3 && "rotate-[1deg]"
                )}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {/* Glowing bulb node marking this step on the rail */}
                <div className="hidden md:flex absolute -top-[38px] left-6 w-3 h-3 z-10 items-center justify-center">
                  <span className="absolute w-8 h-8 rounded-full bg-amber-400/30 blur-md group-hover:bg-amber-300/50 transition-colors duration-500" />
                  <span className="relative w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_8px_2px_rgba(251,191,36,0.8)]" />
                </div>

                {/* Offset hand-drawn shadow block, now glowing amber instead of flat black */}
                <div
                  className={cn(
                    "absolute inset-0 bg-zinc-950",
                    "border-2 border-amber-500/60",
                    "rounded-lg",
                    "shadow-[4px_4px_0px_0px] shadow-amber-500/40",
                    "transition-all duration-300",
                    "group-hover:shadow-[8px_8px_0px_0px] group-hover:shadow-amber-400/60",
                    "group-hover:translate-x-[-4px]",
                    "group-hover:translate-y-[-4px]"
                  )}
                />

                <div className="relative p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center
                      border-2 border-amber-500/60 text-amber-400"
                    >
                      {step.icon}
                    </div>
                    <span className="font-handwritten text-3xl text-amber-500/30">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-handwritten text-2xl text-amber-100 mb-2">
                    {step.title}
                  </h3>
                  <p className="font-handwritten text-lg text-zinc-400 leading-snug">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute -z-10 inset-0 overflow-hidden">
          <div className="absolute top-40 left-20 text-4xl rotate-12 text-amber-500/40">✎</div>
          <div className="absolute bottom-40 right-20 text-4xl -rotate-12 text-amber-500/40">✏️</div>
        </div>
      </div>
    </section>
  );
}