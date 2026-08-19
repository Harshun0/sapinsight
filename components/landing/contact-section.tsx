"use client";

import { useEffect, useRef, useState } from "react";

const focusAreas = [
  { number: "01", label: "Brand tracking and awareness" },
  { number: "02", label: "Concept testing and validation" },
  { number: "03", label: "Segmentation and market entry" },
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

export function ContactSection() {
  const { ref: sectionRef, inView } = useInView(0.1);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = (name: string) =>
    `w-full bg-transparent border-b px-1 py-3 text-white placeholder:text-white/30 outline-none transition-colors duration-300 ${
      focusedField === name ? "border-[#f0b95c]" : "border-white/15"
    }`;

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden bg-black">
      {/* ambient golden glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#f0b95c]/[0.06] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#f0b95c]/[0.05] blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* ── Left column: heading, focus areas, contact info ── */}
          <div>
            <span
              className={`inline-flex items-center gap-3 text-sm font-mono text-white/40 mb-6 transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="w-8 h-px bg-white/20" />
              Contact
            </span>

            <h2
              className={`text-5xl md:text-6xl font-display tracking-tight leading-[0.95] text-white mb-6 transition-all duration-700 delay-75 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Tell us what
              <br />
              <span className="text-[#f0b95c]">you need to learn.</span>
            </h2>

            {/* Numbered focus areas */}
            <div
              className={`mt-10 border-t border-white/10 transition-all duration-700 delay-150 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {focusAreas.map((item) => (
                <div
                  key={item.number}
                  className="group flex items-center gap-6 py-5 border-b border-white/10 hover:pl-2 transition-all duration-300"
                >
                  <span className="font-display text-2xl text-white/25 group-hover:text-[#f0b95c] transition-colors duration-300">
                    {item.number}
                  </span>
                  <span className="text-white/80 group-hover:text-white transition-colors duration-300">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div
              className={`mt-12 grid sm:grid-cols-2 gap-8 transition-all duration-700 delay-200 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <div>
                <h3 className="text-white font-display text-lg mb-2">Sapienta Insights</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  H.no 392 Indira colony no.1 sec 52
                  <br />
                  near shiv mandir
                  <br />
                  Gurugram, Haryana 122003
                  <br />
                  India
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-white/40 uppercase tracking-wider mb-2">
                  General Enquiries
                </h4>
                <a
                  href="mailto:info@sapientainsights.com"
                  className="text-sm text-[#f0b95c] hover:text-[#ffd68a] transition-colors"
                >
                  info@sapientainsights.com
                </a>

                <h4 className="text-xs font-mono text-white/40 uppercase tracking-wider mt-6 mb-2">
                  Operation Hours
                </h4>
                <p className="text-sm text-white/50">Mon–Fri, 11 am to 8 pm EST</p>
              </div>
            </div>
          </div>

          {/* ── Right column: form ── */}
          <div
            className={`relative border border-[#f0b95c]/20 bg-[#f0b95c]/[0.03] p-8 lg:p-10 overflow-hidden transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#f0b95c]/15 blur-[90px] pointer-events-none" />
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(240,185,92,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(240,185,92,0.08) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                maskImage:
                  "radial-gradient(ellipse 90% 70% at 100% 0%, black 30%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 90% 70% at 100% 0%, black 30%, transparent 100%)",
              }}
            />

            {submitted ? (
              <div className="relative z-10 flex flex-col items-center justify-center text-center py-20">
                <div className="w-14 h-14 rounded-full border border-[#f0b95c] flex items-center justify-center mb-6">
                  <span className="text-[#f0b95c] text-2xl">&#10003;</span>
                </div>
                <h3 className="text-2xl font-display text-white mb-2">Brief received.</h3>
                <p className="text-white/50 max-w-xs">
                  Our team will get back to you shortly to shape the next step.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10">
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5 mb-5">
                  <div>
                    <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      className={inputClass("name")}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Company name"
                      className={inputClass("company")}
                      onFocus={() => setFocusedField("company")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    className={inputClass("email")}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5 mb-5">
                  <div>
                    <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">
                      Target market
                    </label>
                    <input
                      type="text"
                      placeholder="India, GCC, SEA, Global"
                      className={inputClass("market")}
                      onFocus={() => setFocusedField("market")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">
                      Research type
                    </label>
                    <input
                      type="text"
                      placeholder="Segmentation, tracking, pricing"
                      className={inputClass("type")}
                      onFocus={() => setFocusedField("type")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">
                    Timeline
                  </label>
                  <input
                    type="text"
                    placeholder="Launch in 2 weeks, Q3, flexible"
                    className={inputClass("timeline")}
                    onFocus={() => setFocusedField("timeline")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-xs font-mono text-white/40 uppercase tracking-wider mb-2">
                    Project brief
                  </label>
                  <textarea
                    rows={3}
                    placeholder="What decision are you trying to make, and what do you need to understand first?"
                    className={`${inputClass("brief")} resize-none`}
                    onFocus={() => setFocusedField("brief")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full inline-flex items-center justify-center gap-2 bg-[#f0b95c] hover:bg-[#ffd68a] text-black h-14 text-base font-medium rounded-full transition-colors"
                >
                  Request Research Consultation
                  <span className="transition-transform group-hover:translate-x-1">&#8594;</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
