"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name:   "Sarah M.",
    role:   "Parent of Year 5 student",
    avatar: "SM",
    color:  "#34d399",
    quote:  "My daughter's NAPLAN scores improved dramatically after just two months with TestPanda. The practice papers are spot-on — exactly the style and difficulty of the real exam. I couldn't be happier.",
    course: "NAPLAN Year 5",
  },
  {
    name:   "Michael T.",
    role:   "Parent of Year 6 student",
    avatar: "MT",
    color:  "#60a5fa",
    quote:  "The Selective exam prep materials are exceptional. My son went from feeling completely overwhelmed to genuinely confident on exam day. The thinking skills section especially made a huge difference.",
    course: "Selective Year 6",
  },
  {
    name:   "Jennifer L.",
    role:   "Parent of Year 4 student",
    avatar: "JL",
    color:  "#f472b6",
    quote:  "The OC Year 4 course was exactly what we needed. The materials are well-structured and the practice papers helped my daughter understand what to expect. She got into her first-choice Opportunity Class!",
    course: "OC Year 4",
  },
];

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-10 overflow-hidden">
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-12 h-px bg-foreground/30" />
            Testimonials
          </span>
          <h2
            className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Trusted by
            <br />
            <span className="text-muted-foreground">families.</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t, index) => (
            <div
              key={t.name}
              className={`flex flex-col p-8 bg-background border border-foreground/10 hover:border-foreground/25 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#eca8d6] text-[#eca8d6]" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground/70 leading-relaxed text-sm flex-1 mb-8">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-6 border-t border-foreground/10">
                <div
                  className="w-9 h-9 flex items-center justify-center text-xs font-medium text-background shrink-0"
                  style={{ backgroundColor: t.color }}
                >
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{t.role}</div>
                </div>
                <span
                  className="text-xs font-mono shrink-0"
                  style={{ color: t.color }}
                >
                  {t.course}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
