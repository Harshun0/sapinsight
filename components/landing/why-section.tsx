"use client";

import { useEffect, useRef, useState } from "react";

const numberedItems = [
  {
    number: "01",
    title: "Affordable",
    description:
      "Research solutions designed to create value without unnecessary cost burden.",
  },
  {
    number: "02",
    title: "Progressive Growth",
    description:
      "Research frameworks that support long-term learning, optimization, and market expansion.",
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
    tags: ["Insight", "Priority", "Action"],
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
  const { ref: headingRef, inView: headingVisible } = useInView(0.2);
  const { ref: bannerRef, inView: bannerVisible } = useInView(0.15);
  const { ref: listRef, inView: listVisible } = useInView(0.05);
  const [activeRow, setActiveRow] = useState<number | null>(null);

  return (
    <section className="relative py-24 lg:py-32 bg-black overflow-hidden">
      {/* ambient golden glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[#f0b95c]/[0.05] blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          ref={headingRef}
          className={`mb-12 lg:mb-16 max-w-2xl transition-all duration-700 ${
            headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-white/40 mb-6">
            <span className="w-8 h-px bg-white/20" />
            Why Sapienta Insights
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight leading-[0.92] text-white">
            Built around a real partnership.
          </h2>
        </div>

        {/* Featured partnership banner — full width golden glass panel */}
        <div
          ref={bannerRef}
          className={`relative rounded-2xl border border-[#f0b95c]/25 bg-[#f0b95c]/[0.03] overflow-hidden p-8 lg:p-12 mb-4 transition-all duration-700 ${
            bannerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(240,185,92,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(240,185,92,0.08) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse 80% 60% at 0% 0%, black 40%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 60% at 0% 0%, black 40%, transparent 100%)",
            }}
          />
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#f0b95c]/20 blur-[90px] pointer-events-none" />

          <div className="relative max-w-2xl">
            <h3 className="text-2xl lg:text-3xl font-display mb-4 text-white">
              Collaboration and partnership
            </h3>
            <p className="text-white/60 leading-relaxed mb-6">
              We believe in building strong and collaborative relationships with
              our clients. Open communication, transparency, and mutual trust —
              our team works closely with you, keeping your goals at the
              forefront of every strategy.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Partnerships", "Aligned client goals", "Research action"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#f0b95c]/30 px-3 py-1 text-xs font-mono text-[#f0b95c]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Numbered ledger / rail list */}
        <div
          ref={listRef}
          className={`border-t border-white/10 transition-all duration-700 delay-100 ${
            listVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {numberedItems.map((item, idx) => {
            const active = activeRow === idx;
            return (
              <div
                key={item.number}
                onMouseEnter={() => setActiveRow(idx)}
                onMouseLeave={() => setActiveRow(null)}
                className="relative border-b border-white/10 group cursor-default"
              >
                {/* left edge glow bar */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[2px] bg-[#f0b95c] transition-all duration-300 ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div
                  className={`grid grid-cols-[64px_1fr] md:grid-cols-[96px_260px_1fr_auto] gap-4 md:gap-8 items-center py-6 lg:py-8 pl-6 pr-2 transition-all duration-300 ${
                    active ? "bg-[#f0b95c]/[0.04]" : ""
                  }`}
                >
                  {/* number */}
                  <span
                    className={`font-display text-3xl lg:text-4xl transition-colors duration-300 ${
                      active ? "text-[#f0b95c]" : "text-white/25"
                    }`}
                  >
                    {item.number}
                  </span>

                  {/* title */}
                  <h3 className="text-lg lg:text-xl font-display text-white">
                    {item.title}
                  </h3>

                  {/* description */}
                  <p className="hidden md:block text-sm text-white/50 leading-relaxed max-w-md">
                    {item.description}
                  </p>

                  {/* tags */}
                  <div className="hidden md:flex flex-wrap gap-2 justify-end">
                    {item.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 px-3 py-1 text-xs font-mono text-white/50 whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* mobile description (spans full row below) */}
                  <p className="md:hidden col-span-2 text-sm text-white/50 leading-relaxed -mt-2">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}