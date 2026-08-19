"use client";

import { useEffect, useRef, useState } from "react";

const sectorData = [
  {
    title: "FMCG & Retail",
    subtitle: "Shopper shifts, category growth, and promotion response.",
    description:
      "Track household behavior, price sensitivity, and channel movement with higher-frequency consumer signals.",
    featured: true,
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Technology",
    description: "B2B buyer journeys and feature priority.",
    featured: false,
    span: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Healthcare",
    description: "Sensitive audience handling and adoption barriers.",
    featured: false,
    span: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Financial Services",
    description:
      "Trust diagnostics, product adoption, and decision triggers in regulated markets.",
    tags: ["Trust conversion", "Policy fit"],
    featured: false,
    span: "md:col-span-1 md:row-span-1",
  },
];

export function SectorsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="sectors" className="relative py-24 lg:py-32 bg-black overflow-hidden">
      {/* ambient golden glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#f0b95c]/[0.06] blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          ref={sectionRef}
          className={`max-w-2xl mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-white/40 mb-6">
            <span className="w-8 h-px bg-white/20" />
            Sectors
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight leading-[0.92] text-white">
            A mosaic layout so each sector feels like its own territory.
          </h2>
        </div>

        {/* Mosaic grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-4 md:auto-rows-[220px] gap-6 lg:gap-8 transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {sectorData.map((sector, index) => (
            <div
              key={sector.title}
              className={`${sector.span} group relative flex flex-col justify-end p-6 lg:p-8 border overflow-hidden transition-all duration-500 ${
                sector.featured
                  ? "border-[#f0b95c]/30 bg-[#f0b95c]/[0.04] hover:border-[#f0b95c]/50"
                  : "border-white/10 bg-white/[0.02] hover:border-white/25"
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* glow that intensifies on hover */}
              <div
                className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-[60px] transition-opacity duration-500 pointer-events-none ${
                  sector.featured
                    ? "bg-[#f0b95c]/25 opacity-100"
                    : "bg-[#f0b95c]/15 opacity-0 group-hover:opacity-100"
                }`}
              />

              <div className="relative z-10">
                <h3
                  className={`font-display tracking-tight mb-2 ${
                    sector.featured ? "text-3xl lg:text-4xl text-[#f0b95c]" : "text-xl lg:text-2xl text-white"
                  }`}
                >
                  {sector.title}
                </h3>

                {sector.subtitle && (
                  <p className="text-white/60 text-sm leading-relaxed mb-2 max-w-xs">
                    {sector.subtitle}
                  </p>
                )}

                <p className={`leading-relaxed ${sector.featured ? "text-white/50 text-sm max-w-sm" : "text-white/50 text-sm"}`}>
                  {sector.description}
                </p>

                {sector.tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {sector.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-3 py-1 border border-[#f0b95c]/30 text-[#f0b95c] rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}