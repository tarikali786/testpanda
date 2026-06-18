"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";

const courses = [
  {
    slug:     "naplan-year-3",
    name:     "NAPLAN",
    year:     "Year 3",
    color:    "#a78bfa",
    subjects: ["Reading", "Writing", "Language Conventions", "Numeracy"],
    desc:     "Foundation exam preparation for Year 3 NAPLAN.",
  },
  {
    slug:     "oc-year-4",
    name:     "OC",
    year:     "Year 4",
    color:    "#f472b6",
    subjects: ["Mathematical Reasoning", "Thinking Skills", "Reading"],
    desc:     "Opportunity Class placement test preparation.",
  },
  {
    slug:     "naplan-year-5",
    name:     "NAPLAN",
    year:     "Year 5",
    color:    "#34d399",
    subjects: ["Reading", "Writing", "Language Conventions", "Numeracy"],
    desc:     "Comprehensive NAPLAN preparation for Year 5.",
  },
  {
    slug:     "selective-year-6",
    name:     "Selective",
    year:     "Year 6",
    color:    "#60a5fa",
    subjects: ["Mathematical Reasoning", "Thinking Skills", "Reading", "Writing"],
    desc:     "Selective High School placement exam preparation.",
  },
  {
    slug:     "naplan-year-7",
    name:     "NAPLAN",
    year:     "Year 7",
    color:    "#fbbf24",
    subjects: ["Reading", "Writing", "Language Conventions", "Numeracy"],
    desc:     "Advanced NAPLAN preparation for Year 7.",
  },
  {
    slug:     "naplan-year-9",
    name:     "NAPLAN",
    year:     "Year 9",
    color:    "#818cf8",
    subjects: ["Reading", "Writing", "Language Conventions", "Numeracy"],
    desc:     "Senior NAPLAN preparation for Year 9 students.",
  },
];

export function CoursesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { user, signIn } = useAuth();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="courses" ref={sectionRef} className="relative bg-background">
      {/* Hero banner — image left, headline right */}
      <div
        className={`relative flex flex-col lg:flex-row items-center min-h-[480px] overflow-hidden transition-all duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Left: course image */}
        <div className="relative w-full lg:w-[45%] self-stretch min-h-[320px] shrink-0 overflow-hidden">
          <img
            src="/images/course.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/30" />
        </div>

        {/* Right: headline */}
        <div
          className={`relative z-10 flex-1 px-6 lg:px-16 pb-12 lg:pb-0 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8">
            <span className="w-12 h-px bg-foreground/30" />
            Courses
          </span>
          <h2 className="text-6xl md:text-7xl lg:text-[96px] font-display tracking-tight leading-[0.9] mb-6">
            6 Courses.
            <br />
            <span className="text-muted-foreground">Every level.</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
            From Year 3 NAPLAN to Year 9 — covering every major Australian exam your child will face.
          </p>
        </div>
      </div>

      {/* Course Cards */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-24 lg:pb-32">
        <div className="h-px bg-foreground/10 mb-12" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course, index) => (
            <div
              key={course.slug}
              className={`group relative flex flex-col p-8 bg-background border border-foreground/10 hover:border-foreground/30 transition-all duration-500 hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Color accent */}
              <div
                className="w-10 h-1 mb-6"
                style={{ backgroundColor: course.color }}
              />

              {/* Course label + year */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-xs font-mono uppercase tracking-widest"
                  style={{ color: course.color }}
                >
                  {course.name}
                </span>
                <span
                  className="text-xs font-mono border px-2 py-0.5"
                  style={{ borderColor: `${course.color}40`, color: course.color }}
                >
                  {course.year}
                </span>
              </div>

              <h3 className="text-2xl font-display text-foreground mb-2">
                {course.name} | {course.year}
              </h3>
              <p className="text-sm text-muted-foreground mb-5">{course.desc}</p>

              {/* Subjects */}
              <div className="flex flex-wrap gap-2 mb-8">
                {course.subjects.map((subject) => (
                  <span
                    key={subject}
                    className="text-xs px-2.5 py-1 border"
                    style={{ borderColor: `${course.color}25`, color: `${course.color}cc` }}
                  >
                    {subject}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-auto">
                {user ? (
                  <a
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3"
                    style={{ color: course.color }}
                  >
                    Open Course
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                ) : (
                  <button
                    onClick={() => signIn("/dashboard")}
                    className="inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3"
                    style={{ color: course.color }}
                  >
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

