"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";

const benefits = [
  "30-day free trial",
  "No credit card required",
  "All 6 courses included",
  "Cancel anytime",
];

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { user, signIn } = useAuth();

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
      className="relative py-32 lg:py-40 bg-[oklch(0.09_0.01_260)] overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#eca8d6]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-white/40 mb-8">
            <span className="w-10 h-px bg-white/20" />
            Get Started Today
            <span className="w-10 h-px bg-white/20" />
          </span>

          <h2 className="text-5xl md:text-6xl lg:text-[96px] font-display tracking-tight leading-[0.92] mb-6">
            Start your 30-day
            <br />
            <span className="text-white/30">free trial today.</span>
          </h2>

          <p className="text-lg text-white/50 leading-relaxed mb-10 max-w-xl mx-auto">
            Join over 1,000 Australian families already preparing their children for NAPLAN, OC &amp; Selective exams.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap items-center justify-center gap-5 mb-12">
            {benefits.map((b) => (
              <span key={b} className="flex items-center gap-2 text-sm text-white/50">
                <Check className="w-4 h-4 text-[#eca8d6] shrink-0" />
                {b}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {user ? (
              <a
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </a>
            ) : (
              <button
                onClick={() => signIn("/dashboard")}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors"
              >
                Start Free Trial — No Credit Card
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white rounded-full font-medium hover:border-white/40 transition-colors"
            >
              View Pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
