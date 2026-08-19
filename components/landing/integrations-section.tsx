"use client";

import { useEffect, useState, useRef } from "react";

export function IntegrationsSection() {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section id="cta" ref={sectionRef} className="relative overflow-hidden bg-black">
      {/* Header — unchanged */}
      <div className="relative z-10 pt-32 lg:pt-40 text-center">
        <span
          className={`inline-flex items-center gap-4 text-sm font-mono text-white/40 mb-8 transition-all duration-700 justify-center ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="w-12 h-px bg-white/20" />
          Integrations
          <span className="w-12 h-px bg-white/20" />
        </span>

        <h2
          className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] text-white transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Connect
          <br />
          <span className="text-white/30">everything.</span>
        </h2>

        <p
          className={`mt-8 text-xl text-white/50 leading-relaxed max-w-lg mx-auto transition-all duration-1000 delay-100 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Bring audiences, research, data, and insights together in one connected workflow—from the first question to the final business decision.
        </p>
      </div>

      {/* Full-width image — unchanged */}
      <div
        className={`relative left-1/2 -translate-x-1/2 w-screen -mt-16 transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src="https://res.cloudinary.com/drvug594q/image/upload/v1787106669/image.png_202608190758_erasio_wkejtp.png"
          alt=""
          aria-hidden="true"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Decision support CTA — replaces the integrations grid */}
      <div className="relative z-10 mt-0 lg:-mt-24 max-w-[1400px] mx-auto px-6 lg:px-12 pb-32 lg:pb-40">
        <div
          className={`relative border border-[#f0b95c]/25 bg-[#f0b95c]/[0.03] overflow-hidden p-10 lg:p-16 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#f0b95c]/15 blur-[100px] pointer-events-none" />
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(240,185,92,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(240,185,92,0.08) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse 80% 60% at 100% 0%, black 40%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 60% at 100% 0%, black 40%, transparent 100%)",
            }}
          />

          <div className="relative grid lg:grid-cols-[1.4fr_auto] gap-10 items-end">
            <div>
              <span className="inline-flex items-center gap-3 text-sm font-mono text-white/40 mb-6">
                <span className="w-8 h-px bg-white/20" />
                Decision support
              </span>

              <h3 className="text-3xl md:text-4xl lg:text-5xl font-display tracking-tight leading-[1.05] text-white mb-6 max-w-2xl">
                Need research outputs your leadership team will actually use?
              </h3>

              <p className="text-white/50 leading-relaxed max-w-xl mb-8">
                From segmentation blueprints to opportunity maps, we shape
                deliverables so they support prioritization, investment, and
                action.
              </p>

              <div className="flex flex-wrap gap-2">
                {["Segment", "Prioritize", "Act"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#f0b95c]/30 px-4 py-1.5 text-xs font-mono text-[#f0b95c]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            
             <a href="https://sapientainsights.com/#contact"
              className="group relative -top-30 inline-flex items-center justify-center gap-2 bg-[#f0b95c] hover:bg-[#f0b95c]/90 text-black px-8 h-14 text-base font-medium rounded-full transition-colors whitespace-nowrap"
            >
              {"Start your brief"}
              <span className="transition-transform group-hover:translate-x-1">{"\u2192"}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}