"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";

const stats = [
  { value: "6", label: "courses available" },
  { value: "500+", label: "practice questions" },
  { value: "30-Day", label: "free trial" },
  { value: "1,000+", label: "families trust us" },
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const { user, signIn } = useAuth();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative  flex flex-col justify-center items-start overflow-hidden bg-white">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/70" />
      </div>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-black/10"
            style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-black/10"
            style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 pb-10">
        <div className="lg:max-w-[55%]">
          {/* Eyebrow */}
          <div
            className={`mb-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-black/60">
              <span className="w-8 h-px bg-black/30" />
              Australia's Smartest Exam Prep Platform
            </span>
          </div>

          {/* Main headline */}
          <div className="mb-8">
            <h1
              className={`text-left text-[clamp(2rem,6vw,7rem)] font-display leading-[0.92] tracking-tight text-black transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              <span className="block">Prepare for</span>
              <span className="block">NAPLAN, OC &amp;</span>
              <span className="block">
                <span className="word-gradient">Selective Exams.</span>
              </span>
            </h1>
          </div>

          {/* Subtext */}
          <p
            className={`text-lg lg:text-xl text-black/60 leading-relaxed max-w-lg mb-10 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            Give your child the edge with expert practice papers, timed test conditions, and comprehensive study materials for Years 3–9.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            {user ? (
              <a
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-colors"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </a>
            ) : (
              <button
                onClick={() => signIn("/dashboard")}
                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-colors"
              >
                Start Free Trial — 30 Days Free
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <a
              href="#courses"
              className="inline-flex items-center gap-2 px-8 py-4 border border-black/30 text-black rounded-full font-medium hover:border-black/60 transition-colors"
            >
              View Courses
            </a>
          </div>
        </div>
        <div className=" pt-10 mx-auto flex flex-wrap items-start gap-10 lg:gap-20">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="text-3xl lg:text-4xl font-display text-black">{stat.value}</span>
              <span className="text-xs text-black/50 leading-tight">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

     
    </section>
  );
}
