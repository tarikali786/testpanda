"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const benefits = [
  "30-day free trial",
  "No credit card required",
  "All 6 courses included",
  "Cancel anytime",
];

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
      style={{background: "linear-gradient(135deg, #6d28d9 0%, #7c3aed 30%, #a855f7 60%, #ec4899 100%)"}}
    >
      {/* Decorative glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px]" style={{backgroundColor: "rgba(167,139,250,0.3)"}} />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px]" style={{backgroundColor: "rgba(244,114,182,0.3)"}} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-white/60 mb-8">
            <span className="w-10 h-px bg-white/30" />
            Get Started Today
            <span className="w-10 h-px bg-white/30" />
          </span>

          <h2 className="text-5xl md:text-6xl lg:text-[96px] font-display tracking-tight leading-[0.92] mb-6 text-white">
            Start your 30-day
            <br />
            <span className="text-white/70">free trial today.</span>
          </h2>

          <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
            Join over 1,000 Australian families already preparing their children for NAPLAN, OC &amp; Selective exams.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap items-center justify-center gap-5 mb-12">
            {benefits.map((b) => (
              <span key={b} className="flex items-center gap-2 text-sm text-white/80">
                <Check className="w-4 h-4 text-white shrink-0" />
                {b}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 rounded-full font-semibold hover:bg-white/90 transition-colors"
            >
              Start Free Trial — No Credit Card
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#courses"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white rounded-full font-medium hover:border-white/60 hover:bg-white/10 transition-colors"
            >
              View Courses
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
