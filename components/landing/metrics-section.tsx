"use client";

import { useEffect, useState, useRef } from "react";

const metrics = [
  {
    value: 42,
    suffix: "",
    prefix: "",
    label: "Markets covered",
    sublabel:
      "Cross-region studies across APAC, MENA, Europe, and North America.",
  },
  {
    value: 380,
    suffix: "",
    prefix: "",
    label: "Studies launched",
    sublabel:
      "Brand tracking, pricing research, concept tests, and CX measurement.",
  },
  {
    value: 12,
    suffix: "",
    prefix: "",
    label: "Median turnaround",
    sublabel: "Business days from brief to decision-ready reporting.",
  },
];

const strengths = [
  {
    number: "01",
    title: "Customer Experience",
    description: "Interactions throughout the customer journey.",
    items: ["Personalization", "Consistency", "Customer support"],
    badge: "Live · 24/7",
    featured: true,
  },
  {
    number: "02",
    title: "Client-Centric Focus",
    description: "Every engagement matched to what you actually need.",
    items: [],
    badge: null,
    featured: false,
  },
  {
    number: "03",
    title: "Custom Research",
    description: "Designed to meet the unique needs of a specific client.",
    items: [],
    badge: null,
    featured: false,
  },
  {
    number: "04",
    title: "Advanced Analytics",
    description: "Deeper insights, and make more informed decisions.",
    items: ["Predictive analytics", "Prescriptive analytics", "Data mining"],
    badge: null,
    featured: false,
  },
];

function AnimatedNumber({
  end,
  suffix = "",
  prefix = "",
}: {
  end: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const [isScrambling, setIsScrambling] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 2500;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);

            setCount(Math.floor(eased * end));
            setIsScrambling(progress < 0.8);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [end, hasAnimated]);

  const displayValue = count.toLocaleString();

  return (
    <div ref={ref} className="inline-flex items-baseline">
      <span className="text-muted-foreground mr-1">{prefix}</span>

      <span className="tabular-nums">
        {displayValue.split("").map((char, i) => (
          <span
            key={i}
            className={`inline-block transition-all duration-150 ${
              isScrambling && char !== "," ? "blur-[1px]" : ""
            }`}
          >
            {char}
          </span>
        ))}
      </span>

      <span className="text-muted-foreground">{suffix}</span>
    </div>
  );
}

function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const gridSize = 60;
      const time = timeRef.current;

      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          const wave =
            Math.sin(x * 0.01 + y * 0.01 + time) * 0.5 + 0.5;

          const size = 1 + wave * 2;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);

          ctx.fillStyle = "rgba(240, 185, 92, 0.05)";
          ctx.fill();
        }
      }

      const pulseY = (time * 30) % height;

      ctx.strokeStyle = "rgba(240, 185, 92, 0.04)";
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.moveTo(0, pulseY);
      ctx.lineTo(width, pulseY);
      ctx.stroke();

      timeRef.current += 0.02;
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

function DotGraph({
  accent = false,
  height = 32,
  freq1 = 0.35,
  freq2 = 0.12,
  freqT = 0.7,
  speed = 0.025,
  baseline = 0.3,
  amplitude = 0.5,
}: {
  accent?: boolean;
  height?: number;
  freq1?: number;
  freq2?: number;
  freqT?: number;
  speed?: number;
  baseline?: number;
  amplitude?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const timeRef = useRef(Math.random() * 100);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.offsetWidth || 300;
    const H = height;

    canvas.width = W * dpr;
    canvas.height = H * dpr;

    ctx.scale(dpr, dpr);

    const render = () => {
      ctx.clearRect(0, 0, W, H);

      const t = timeRef.current;
      const cols = Math.floor(W / 8);

      for (let i = 0; i < cols; i++) {
        const raw =
          baseline +
          amplitude *
            Math.sin(i * freq1 + t) *
            Math.cos(i * freq2 + t * freqT);

        const v = Math.max(0, Math.min(1, raw));

        const dotY = H - 4 - v * (H - 8);
        const x = i * 8 + 4;

        const alpha = 0.15 + v * 0.55;
        const r = 1.5 + v * 1.2;

        ctx.beginPath();
        ctx.arc(x, dotY, r, 0, Math.PI * 2);

        ctx.fillStyle = accent
          ? `rgba(240, 185, 92, ${alpha})`
          : `rgba(255, 255, 255, ${alpha})`;

        ctx.fill();
      }

      timeRef.current += speed;
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(frameRef.current);
  }, [accent, height, freq1, freq2, freqT, speed, baseline, amplitude]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: `${height}px`,
        display: "block",
      }}
    />
  );
}

export function MetricsSection() {
  const [time, setTime] = useState<Date | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setTime(new Date());

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-40 overflow-hidden bg-black"
    >
      <GridBackground />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-20 lg:mb-32">
          <div className="lg:col-span-8 lg:col-start-1">
            <div className="flex items-center gap-4 mb-6">
              <span className="flex items-center gap-2 px-3 py-1 bg-[#f0b95c]/10 text-[#f0b95c] text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#f0b95c] animate-pulse" />
                LIVE
              </span>

              <span className="text-sm font-mono text-white/40">
                {time ? `${time.toLocaleTimeString("en-GB")} UTC` : ""}
              </span>
            </div>

            <h2
              className={`text-6xl md:text-7xl lg:text-[140px] font-display tracking-tight leading-[0.95] text-white transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Trusted
              <br />
              <span className="text-white/30">Workflow</span>
            </h2>

            <p
              className={`mt-8 text-lg text-white/50 leading-relaxed max-w-xl transition-all duration-1000 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              From questionnaire design to reporting, every stage is built to
              support strategy teams under real deadlines.
            </p>
          </div>
        </div>

        {/* Organic graph image */}
        <div
          className={`w-full mb-0 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src="https://res.cloudinary.com/drvug594q/image/upload/v1787104839/image.png_202608190730_xrqui4.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Metrics grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`bg-white/[0.02] border border-white/10 p-10 lg:p-14 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Number */}
              <div className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight mb-4 whitespace-nowrap overflow-hidden text-white">
                <AnimatedNumber
                  end={metric.value}
                  suffix={metric.suffix}
                  prefix={metric.prefix}
                />
              </div>

              {/* Graph */}
              <div className="mb-6">
                <DotGraph
                  accent={index === 0}
                  height={36}
                  freq1={index === 0 ? 0.45 : index === 1 ? 0.28 : 0.22}
                  freq2={index === 0 ? 0.18 : index === 1 ? 0.09 : 0.07}
                  freqT={index === 0 ? 1.1 : index === 1 ? 0.5 : 0.4}
                  speed={index === 0 ? 0.032 : index === 1 ? 0.018 : 0.015}
                  baseline={index === 0 ? 0.4 : index === 1 ? 0.35 : 0.25}
                  amplitude={index === 0 ? 0.45 : index === 1 ? 0.55 : 0.6}
                />
              </div>

              {/* Label */}
              <div className="text-lg text-white mb-2">{metric.label}</div>

              {/* Sublabel */}
              <div className="text-sm text-white/40 font-mono">
                {metric.sublabel}
              </div>
            </div>
          ))}
        </div>

        {/* Sector ticker */}
        <div
          className={`mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center gap-x-12 gap-y-4 text-sm font-mono text-white/40 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span>FMCG & RETAIL</span>
          <span>TECHNOLOGY</span>
          <span>HEALTHCARE</span>
          <span>FINANCIAL SERVICES</span>
        </div>

        {/* ─────────────────────────────────────────── */}
        {/* Our Areas Of Strength */}
        {/* ─────────────────────────────────────────── */}
        <div className="mt-32 lg:mt-40">
          <div className="mb-12 max-w-2xl">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-white/40 mb-6">
              <span className="w-8 h-px bg-white/20" />
              Our areas of strength
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight leading-[0.92] text-white">
              Focus on the key capabilities that set you apart from competitors and deliver significant value to your clients.
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {strengths.map((strength, index) => (
              <div
                key={strength.number}
                className={`relative p-8 lg:p-10 border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {strength.featured && (
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[#f0b95c]/15 blur-[70px] pointer-events-none" />
                )}

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-3xl font-display text-[#f0b95c]">
                      {strength.number}
                    </span>
                    {strength.badge && (
                      <span className="text-xs font-mono text-white/40 border border-white/10 rounded-full px-3 py-1">
                        {strength.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-display mb-2 text-white">
                    {strength.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed mb-6 max-w-sm">
                    {strength.description}
                  </p>

                  {strength.items.length > 0 && (
                    <ul className="flex flex-col gap-2">
                      {strength.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 text-sm text-white/70"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#f0b95c]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MetricsSection;