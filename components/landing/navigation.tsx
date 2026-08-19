"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const solutionsItems = [
  { name: "Online Sampling",  href: "#" },
  { name: "Data Collection",  href: "#" },
  { name: "Data Processing",  href: "#" },
];

const industriesItems = [
  { name: "Automotive",                     href: "#" },
  { name: "B2B And Professional Services",  href: "#" },
  { name: "Consumer Goods And Retail",      href: "#" },
  { name: "Energy And Utilities",           href: "#" },
  { name: "Financial Services",             href: "#" },
  { name: "Healthcare And Pharmaceuticals", href: "#" },
  { name: "Technology And Electronics",     href: "#" },
  { name: "Travel And Hospitality",         href: "#" },
];

const simpleLinks = [
  { name: "Home",     href: "#" },
  { name: "About Us", href: "#" },
  { name: "Why Us",   href: "#" },
  { name: "Contact",  href: "#" },
];

// Reusable dropdown for desktop
function DropdownMenu({
  label,
  items,
  isScrolled,
}: {
  label: string;
  items: { name: string; href: string }[];
  isScrolled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1 text-sm transition-colors duration-300 group ${
          isScrolled ? "text-foreground/70 hover:text-foreground" : "text-white/70 hover:text-white"
        }`}
      >
        {label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
        <span
          className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
            isScrolled ? "bg-foreground" : "bg-white"
          }`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-black/[0.06] overflow-hidden z-50">
          {items.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-5 py-3.5 text-sm text-gray-800 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled ? "top-4 left-4 right-4" : "top-0 left-0 right-0"
      }`}
    >
      <nav
        className={`mx-auto transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]"
            : "bg-transparent max-w-[1400px]"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${
            isScrolled ? "h-14" : "h-20"
          }`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span
              className={`font-display tracking-tight transition-all duration-500 ${
                isScrolled ? "text-xl text-foreground" : "text-2xl text-white"
              }`}
            >
              SAPIENTA
            </span>
            <span
              className={`font-mono transition-all duration-500 ${
                isScrolled ? "text-[10px] mt-0.5 text-muted-foreground" : "text-xs mt-1 text-white/60"
              }`}
            >
              Insights
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {/* Simple links before Solutions */}
            {["Home", "About Us", "Why Us"].map((name) => (
              <a
                key={name}
                href="#"
                className={`text-sm transition-colors duration-300 relative group ${
                  isScrolled ? "text-foreground/70 hover:text-foreground" : "text-white/70 hover:text-white"
                }`}
              >
                {name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                    isScrolled ? "bg-foreground" : "bg-white"
                  }`}
                />
              </a>
            ))}

            {/* Solutions dropdown */}
            <DropdownMenu label="Solutions" items={solutionsItems} isScrolled={isScrolled} />

            {/* Industries dropdown */}
            <DropdownMenu label="Industries" items={industriesItems} isScrolled={isScrolled} />

            {/* Contact */}
            <a
              href="#"
              className={`text-sm transition-colors duration-300 relative group ${
                isScrolled ? "text-foreground/70 hover:text-foreground" : "text-white/70 hover:text-white"
              }`}
            >
              Contact
              <span
                className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                  isScrolled ? "bg-foreground" : "bg-white"
                }`}
              />
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              size="sm"
              className={`rounded-full transition-all duration-500 ${
                isScrolled
                  ? "bg-foreground hover:bg-foreground/90 text-background px-4 h-8 text-xs"
                  : "bg-white hover:bg-white/90 text-black px-6"
              }`}
            >
              Get In Touch
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors duration-500 ${
              isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 overflow-y-auto ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col px-8 pt-28 pb-12 gap-6">

          {/* Simple links */}
          {["Home", "About Us", "Why Us", "Contact"].map((name, i) => (
            <a
              key={name}
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-4xl font-display text-foreground hover:text-muted-foreground transition-all duration-500 ${
                isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: isMobileMenuOpen ? `${i * 60}ms` : "0ms" }}
            >
              {name}
            </a>
          ))}

          {/* Solutions accordion */}
          <div>
            <button
              onClick={() =>
                setMobileExpanded(mobileExpanded === "solutions" ? null : "solutions")
              }
              className="flex items-center gap-2 text-4xl font-display text-foreground"
            >
              Solutions
              <ChevronDown
                className={`w-6 h-6 transition-transform duration-200 ${
                  mobileExpanded === "solutions" ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileExpanded === "solutions" && (
              <div className="mt-3 ml-2 flex flex-col gap-3 border-l border-foreground/10 pl-5">
                {solutionsItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-base text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Industries accordion */}
          <div>
            <button
              onClick={() =>
                setMobileExpanded(mobileExpanded === "industries" ? null : "industries")
              }
              className="flex items-center gap-2 text-4xl font-display text-foreground"
            >
              Industries
              <ChevronDown
                className={`w-6 h-6 transition-transform duration-200 ${
                  mobileExpanded === "industries" ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileExpanded === "industries" && (
              <div className="mt-3 ml-2 flex flex-col gap-3 border-l border-foreground/10 pl-5">
                {industriesItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-base text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="pt-6 border-t border-foreground/10 mt-4">
            <Button
              className="w-full bg-foreground text-background rounded-full h-14 text-base"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
