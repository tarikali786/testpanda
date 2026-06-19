"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const courses = [
  { name: "NAPLAN", year: "Year 3", color: "#a78bfa", price: 10 },
  { name: "OC",     year: "Year 4", color: "#f472b6", price: 15 },
  { name: "NAPLAN", year: "Year 5", color: "#34d399", price: 20 },
  { name: "Selective", year: "Year 6", color: "#60a5fa", price: 25 },
  { name: "NAPLAN", year: "Year 7", color: "#fbbf24", price: 30 },
  { name: "NAPLAN", year: "Year 9", color: "#818cf8", price: 35 },
];

const stats = [
  { value: "6", label: "courses available" },
  { value: "500+", label: "practice questions" },
  { value: "30-Day", label: "free trial" },
  { value: "1,000+", label: "families trust us" },
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

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
        {/* Colorful gradient blobs */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none" style={{background: "radial-gradient(circle, rgba(167,139,250,0.45) 0%, rgba(236,168,214,0.25) 45%, transparent 70%)"}} />
        <div className="absolute bottom-[-5%] left-[10%] w-[500px] h-[500px] rounded-full pointer-events-none" style={{background: "radial-gradient(circle, rgba(103,232,249,0.35) 0%, rgba(96,165,250,0.2) 45%, transparent 70%)"}} />
        <div className="absolute top-[35%] right-[25%] w-[350px] h-[350px] rounded-full pointer-events-none" style={{background: "radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)"}} />
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
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
        <div className="lg:max-w-[55%] lg:flex-1">
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
              className={`text-left text-[clamp(2rem,6vw,7rem)] font-display leading-[1.05] tracking-tight text-black transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
              style={{background: "linear-gradient(135deg, #a78bfa 0%, #eca8d6 50%, #f472b6 100%)"}}
            >
              Start Free Trial — 30 Days Free
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#courses"
              className="inline-flex items-center gap-2 px-8 py-4 border border-black/30 text-black rounded-full font-medium hover:border-black/60 transition-colors"
            >
              View Courses
            </a>
          </div>
        </div>

          {/* Course price cards */}
          <div
            className={`grid grid-cols-2 gap-3 w-full mt-8 lg:mt-0 lg:w-[360px] shrink-0 transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {courses.map((course) => (
              <a
                key={course.year}
                href="#courses"
                className="group flex flex-col p-4 border border-black/10 bg-white/70 backdrop-blur-sm hover:-translate-y-1 transition-all duration-300"
                style={{ borderLeftColor: course.color, borderLeftWidth: 3 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: course.color }}>
                    {course.name}
                  </span>
                  <span className="text-[10px] font-mono text-black/40">{course.year}</span>
                </div>
                <span className="text-2xl font-display font-semibold" style={{ color: course.color }}>
                  ${course.price}
                  <span className="text-xs font-sans font-normal text-black/40 ml-1">AUD/mo</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="pt-10 mx-auto flex flex-wrap items-start gap-10 lg:gap-20">
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
