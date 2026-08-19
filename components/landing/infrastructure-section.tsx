"use client";

import { useEffect, useState, useRef } from "react";

const insightRows = [
  {
    output: "Segmentation blueprint",
    outputSub: "Distinct customer groups with real-world value signals.",
    bestFor: "Positioning, messaging, portfolio focus",
    value: "Clear audience prioritization",
  },
  {
    output: "Opportunity maps",
    outputSub: "Where to launch, invest, or reposition next.",
    bestFor: "Expansion planning, whitespace, prioritization",
    value: "Fast market comparison",
  },
  {
    output: "Executive narratives",
    outputSub: "Findings translated into leadership-ready decisions.",
    bestFor: "Board updates, investor storytelling, strategy",
    value: "Sharper stakeholder alignment",
  },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeRow, setActiveRow] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRow((prev) => (prev + 1) % insightRows.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="insights" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden bg-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20">
          <span
            className={`inline-flex items-center gap-4 text-sm font-mono text-white/40 mb-8 transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="w-12 h-px bg-white/20" />
            Insights
          </span>

          <div className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-stretch">
            {/* Image — left column, full height, unchanged */}
            <div
              className={`w-48 lg:w-72 xl:w-80 shrink-0 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <img
                src="https://res.cloudinary.com/drvug594q/image/upload/v1787096618/golden_glow_output_exvikp.png"
                alt="Golden glow"
                className="w-full h-full object-contain object-center"
              />
            </div>

            {/* Title + description stacked — same heading font/size as before */}
            <div className="flex flex-col justify-center">
              <h2
                className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] text-white transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                A comparison
                <br />
                <span className="text-white/30">of outputs.</span>
              </h2>

              <p
                className={`mt-8 text-xl text-white/50 leading-relaxed max-w-lg transition-all duration-1000 delay-100 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                Instead of another card stack, this section behaves like an
                insight menu showing what each output is best for.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Column headers */}
          <div className="hidden md:grid grid-cols-[1.3fr_1fr_1fr] gap-6 lg:gap-12 pb-4 border-b border-white/15">
            <span className="text-xs font-mono text-white/40 uppercase tracking-wider">Output</span>
            <span className="text-xs font-mono text-white/40 uppercase tracking-wider">Best for</span>
            <span className="text-xs font-mono text-white/40 uppercase tracking-wider">Value</span>
          </div>

          {insightRows.map((row, index) => {
            const active = activeRow === index;
            return (
              <div
                key={row.output}
                onMouseEnter={() => setActiveRow(index)}
                className="relative border-b border-white/10 cursor-default"
              >
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[2px] bg-[#f0b95c] transition-opacity duration-300 ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div
                  className={`grid md:grid-cols-[1.3fr_1fr_1fr] gap-2 md:gap-6 lg:gap-12 py-8 pl-6 pr-2 transition-colors duration-300 ${
                    active ? "bg-[#f0b95c]/[0.04]" : ""
                  }`}
                >
                  <div>
                    <h3
                      className={`text-xl lg:text-2xl font-display mb-2 transition-colors duration-300 ${
                        active ? "text-[#f0b95c]" : "text-white"
                      }`}
                    >
                      {row.output}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed max-w-xs">{row.outputSub}</p>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed self-center">{row.bestFor}</p>
                  <p className="text-sm text-white/60 leading-relaxed self-center">{row.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}