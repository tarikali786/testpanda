"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const courses = [
  {
    slug:     "naplan-year-3",
    name:     "NAPLAN",
    year:     "Year 3",
    color:    "#a78bfa",
    price:    10,
    subjects: ["Reading", "Writing", "Language Conventions", "Numeracy"],
    desc:     "Foundation exam preparation for Year 3 NAPLAN.",
  },
  {
    slug:     "oc-year-4",
    name:     "OC",
    year:     "Year 4",
    color:    "#f472b6",
    price:    15,
    subjects: ["Mathematical Reasoning", "Thinking Skills", "Reading"],
    desc:     "Opportunity Class placement test preparation.",
  },
  {
    slug:     "naplan-year-5",
    name:     "NAPLAN",
    year:     "Year 5",
    color:    "#34d399",
    price:    20,
    subjects: ["Reading", "Writing", "Language Conventions", "Numeracy"],
    desc:     "Comprehensive NAPLAN preparation for Year 5.",
  },
  {
    slug:     "selective-year-6",
    name:     "Selective",
    year:     "Year 6",
    color:    "#60a5fa",
    price:    25,
    subjects: ["Mathematical Reasoning", "Thinking Skills", "Reading", "Writing"],
    desc:     "Selective High School placement exam preparation.",
  },
  {
    slug:     "naplan-year-7",
    name:     "NAPLAN",
    year:     "Year 7",
    color:    "#fbbf24",
    price:    30,
    subjects: ["Reading", "Writing", "Language Conventions", "Numeracy"],
    desc:     "Advanced NAPLAN preparation for Year 7.",
  },
  {
    slug:     "naplan-year-9",
    name:     "NAPLAN",
    year:     "Year 9",
    color:    "#818cf8",
    price:    35,
    subjects: ["Reading", "Writing", "Language Conventions", "Numeracy"],
    desc:     "Senior NAPLAN preparation for Year 9 students.",
  },
];

export function CoursesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [loadingCourse, setLoadingCourse] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  async function handleBuy(slug: string) {
    if (!isSignedIn) { router.push("/sign-in"); return; }
    setLoadingCourse(slug);
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ course: slug }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else setLoadingCourse(null);
  }

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
            <span style={{background: "linear-gradient(135deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}}>6 Courses.</span>
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
              className={`group relative flex flex-col p-8 border transition-all duration-500 hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 80}ms`,
                background: `linear-gradient(135deg, ${course.color}10 0%, white 55%)`,
                borderColor: `${course.color}35`,
              }}
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
              <p className="text-sm text-muted-foreground mb-4">{course.desc}</p>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-5">
                <span className="text-3xl font-display font-semibold" style={{ color: course.color }}>
                  ${course.price}
                </span>
                <span className="text-xs text-muted-foreground">AUD / mo</span>
              </div>

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
              <div className="mt-auto flex items-center justify-end">
                <button
                  onClick={() => handleBuy(course.slug)}
                  disabled={loadingCourse === course.slug}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 text-white disabled:opacity-60 disabled:cursor-not-allowed transition-opacity hover:opacity-90"
                  style={{ backgroundColor: course.color }}
                >
                  {loadingCourse === course.slug ? "..." : `Buy $${course.price}`}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

