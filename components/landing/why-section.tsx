"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const numberedItems = [
  {
    number: "01",
    title: "Affordable",
    description:
      "Research solutions designed to create value without unnecessary cost burden.",
    tags: ["Efficiency", "Cost-effective"],
  },
  {
    number: "02",
    title: "Progressive Growth",
    description:
      "Research frameworks that support long-term learning, optimization, and market expansion.",
    tags: ["Scalability", "Optimization"],
  },
  {
    number: "03",
    title: "24/7 Dedicated Support",
    description:
      "Responsive communication and hands-on coordination throughout the study lifecycle.",
    tags: ["Always on", "Rapid replies"],
  },
  {
    number: "04",
    title: "GDPR & CCPA Compliance",
    description:
      "Privacy-aware operating practices aligned with modern data protection expectations.",
    tags: ["GDPR", "CCPA"],
  },
  {
    number: "05",
    title: "Strategy Oriented",
    description:
      "Every engagement is built to support better business choices, not just generate information.",
    tags: ["Insight", "Action"],
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function WhySection() {
  const { ref: sectionRef, inView: sectionVisible } = useInView(0.1);

  return (
    <section className="relative py-20 lg:py-28 bg-black overflow-hidden">
      {/* Ambient golden glow */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#f0b95c]/[0.06] blur-[140px] pointer-events-none" />

      <div ref={sectionRef} className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header Row: Title & Action Link */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 lg:mb-10 transition-all duration-700 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <span className="inline-flex items-center gap-2.5 text-xs font-mono tracking-wider uppercase text-[#f0b95c]/80 mb-2">
              <span className="w-5 h-px bg-[#f0b95c]/40" />
              Why Sapienta Insights
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display tracking-tight text-white">
              Built around a real partnership
            </h2>
          </div>

          <button className="group inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-[#f0b95c] transition-colors self-start sm:self-end">
            <span>Explore all pillars</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Card Carousel / Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 transition-all duration-700 delay-150 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Main Featured Card (Full height / Overlay style) */}
          <div className="relative md:col-span-2 lg:col-span-1 min-h-[380px] rounded-2xl border border-[#f0b95c]/30 bg-gradient-to-b from-[#f0b95c]/[0.12] to-[#f0b95c]/[0.02] p-6 lg:p-7 flex flex-col justify-between overflow-hidden group">
            {/* Grid Pattern Background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(240,185,92,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(240,185,92,0.12) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                maskImage: "radial-gradient(ellipse at 0% 0%, black 50%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse at 0% 0%, black 50%, transparent 100%)",
              }}
            />

            {/* Glowing orb */}
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#f0b95c]/25 blur-[60px] pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            <div className="relative z-10">
              <span className="inline-block text-xs font-mono text-[#f0b95c] px-2.5 py-1 rounded-md bg-[#f0b95c]/10 border border-[#f0b95c]/25 mb-4">
                Core Philosophy
              </span>
            </div>

            <div className="relative z-10 mt-auto">
              <h3 className="text-xl lg:text-2xl font-display text-white mb-3 group-hover:text-[#f0b95c] transition-colors duration-300">
                Collaboration and partnership
              </h3>
              <p className="text-sm text-white/65 leading-relaxed mb-5">
                We believe in building strong, collaborative relationships. Open communication, transparency, and keeping your goals at the forefront of every strategy.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Partnerships", "Aligned goals"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#f0b95c]/30 bg-[#f0b95c]/5 px-2.5 py-0.5 text-[11px] font-mono text-[#f0b95c]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Standard Split Cards */}
          {numberedItems.slice(0, 3).map((item) => (
            <div
              key={item.number}
              className="flex flex-col rounded-2xl border border-white/10 bg-[#0a0a0a] hover:border-[#f0b95c]/40 transition-all duration-300 overflow-hidden group"
            >
              {/* Top Visual Half */}
              <div className="h-44 bg-gradient-to-br from-white/[0.04] to-transparent p-5 flex flex-col justify-between relative overflow-hidden border-b border-white/5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-white/40 group-hover:text-[#f0b95c] transition-colors">
                    Report // {item.number}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#f0b95c] group-hover:shadow-[0_0_8px_#f0b95c] transition-all" />
                </div>

                {/* Big decorative number watermark */}
                <span className="absolute right-3 -bottom-4 text-7xl font-display font-bold text-white/[0.04] select-none group-hover:text-[#f0b95c]/[0.08] transition-colors duration-300">
                  {item.number}
                </span>

                <div className="relative z-10 flex flex-wrap gap-1.5 mt-auto">
                  {item.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.02] px-2 py-0.5 text-[10px] font-mono text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Content Half */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-display text-white group-hover:text-[#f0b95c] transition-colors duration-300 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/40 group-hover:text-white/80 transition-colors">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#f0b95c]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}