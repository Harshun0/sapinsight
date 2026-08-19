"use client";

import * as React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    id: "1",
    question: "What kinds of studies do you support?",
    answer:
      "We support online sampling, data collection, data processing, segmentation, brand tracking, pricing studies, concept testing, customer experience work, and broader custom research programs.",
  },
  {
    id: "2",
    question: "Do you work with both B2B and consumer audiences?",
    answer:
      "Yes. Our work spans both consumer and B2B audiences, with recruitment and screening approaches adjusted to the complexity of each target group.",
  },
  {
    id: "3",
    question: "Can you help if our brief is still evolving?",
    answer:
      "Yes. Many engagements start with a rough business question. We help shape the research objective, method, audience definition, and reporting approach before fieldwork begins.",
  },
  {
    id: "4",
    question: "How quickly can a project get started?",
    answer:
      "Timing depends on the audience and scope, but rapid-turnaround projects can often begin shortly after the brief, sample criteria, and reporting requirements are aligned.",
  },
  {
    id: "5",
    question: "How do we get started with Compute?",
    answer:
      "Share your target market, timeline, and the decision you need to support through the contact form below. We can then recommend the best research path and next steps.",
  },
];

export function FaqSection() {
  const [openItem, setOpenItem] = React.useState<string | null>(null);
  const [headerVisible, setHeaderVisible] = React.useState(false);
  const headerRef = React.useRef<HTMLDivElement>(null);

  // Header entrance animation
  React.useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-open each item as it scrolls into view
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    faqs.forEach((faq, i) => {
      const el = itemRefs.current[i];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setOpenItem(faq.id);
        },
        { threshold: 0.6 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="faq" className="relative py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-16 lg:mb-20 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            FAQ
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[0.92]">
              Frequently asked
              <br />
              questions
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-sm">
              A few of the questions teams usually ask before they begin a
              market research program with us.
            </p>
          </div>
        </div>

        {/* Accordion */}
        <Accordion.Root
          type="single"
          collapsible
          value={openItem ?? ""}
          onValueChange={(val) => setOpenItem(val || null)}
        >
          {faqs.map((faq, i) => (
            <div
              key={faq.id}
              ref={(el) => { itemRefs.current[i] = el; }}
            >
              <Accordion.Item
                value={faq.id}
                className="border-t border-foreground/10 last:border-b last:border-foreground/10"
              >
                <Accordion.Header>
                  <Accordion.Trigger
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    onClick={() =>
                      setOpenItem(openItem === faq.id ? null : faq.id)
                    }
                  >
                    {/* Number + question */}
                    <div className="flex items-start gap-6">
                      <span className="font-mono text-xs text-muted-foreground tracking-widest pt-1 shrink-0">
                        0{i + 1}
                      </span>
                      <span className="text-xl lg:text-2xl font-display tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                        {faq.question}
                      </span>
                    </div>

                    {/* Icon */}
                    <span className="shrink-0 text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                      {openItem === faq.id ? (
                        <Minus className="w-5 h-5" />
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content asChild forceMount>
                  <motion.div
                    initial={false}
                    animate={
                      openItem === faq.id
                        ? { height: "auto", opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    {/* Chat bubble — answer floats right like a reply message */}
                    <div className="flex justify-end pb-6 pl-12 pr-2">
                      <div className="relative max-w-md rounded-2xl px-5 py-3 text-white text-base leading-relaxed" style={{ backgroundColor: "#B8863C" }}>
                        {faq.answer}
                        {/* Bubble tail */}
                        <span className="absolute -bottom-1.5 right-4 w-3 h-3 rotate-45 rounded-br-sm" style={{ backgroundColor: "#B8863C" }} />
                      </div>
                    </div>
                  </motion.div>
                </Accordion.Content>
              </Accordion.Item>
            </div>
          ))}
        </Accordion.Root>

      </div>
    </section>
  );
}
