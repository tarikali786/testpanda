"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What's included in the 30-day free trial?",
    a: "During your free trial, you get access to all 6 courses with demo exam papers. You can explore course content, preview materials, and practice with our sample questions — completely free, no credit card required. Your trial starts the moment you sign in with Google.",
  },
  {
    q: "How do I get full course access after subscribing?",
    a: "After completing your purchase, you'll receive a confirmation email. Our team will then manually share the Google Drive folder containing your course materials to your email address within 24 hours. You'll receive a Google Drive notification once it's shared.",
  },
  {
    q: "Can I access TestPanda on mobile?",
    a: "Yes! TestPanda is fully responsive and works on any device — desktop, tablet, or smartphone. The Google Drive materials are also accessible on any device via the Google Drive app.",
  },
  {
    q: "How long is my subscription valid?",
    a: "All paid plans include 12 months of access from the date of purchase. This gives your child a full year to work through the materials at their own pace.",
  },
  {
    q: "Which exam types are covered?",
    a: "We cover NAPLAN (Years 3, 5, 7, 9), OC (Opportunity Class, Year 4), and Selective High School (Year 6). Each course includes full-length practice papers modelled on the actual exam format, including all relevant subject areas.",
  },
  {
    q: "Can I purchase multiple courses?",
    a: "Absolutely. Our 3-Course Bundle ($99) and All Access plan ($149) are designed for families who need materials for more than one course. You can also buy individual courses at $49 each and combine them as needed.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
    <section id="faq" ref={sectionRef} className="relative py-24 lg:py-32 bg-[oklch(0.09_0.008_260)] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/real-time-graph-INFmn3u0MlUwvNPynoIhwxtPaPjxM5.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.09_0.008_260)]/70 via-transparent to-[oklch(0.09_0.008_260)]/70" />
      </div>
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: Header */}
          <div className="lg:col-span-4">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8">
              <span className="w-12 h-px bg-foreground/30" />
              FAQ
            </span>
            <h2
              className={`text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[0.9] mb-8 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Common
              <br />
              <span className="text-muted-foreground">questions.</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Can&apos;t find your answer?{" "}
              <a
                href="mailto:hello@testpanda.com.au"
                className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
              >
                Email us
              </a>
            </p>
          </div>

          {/* Right: Accordion */}
          <div
            className={`lg:col-span-8 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="divide-y divide-foreground/10">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-start justify-between gap-6 py-7 text-left group"
                  >
                    <span className="font-medium text-foreground group-hover:text-muted-foreground transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground shrink-0 mt-0.5 transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? "max-h-96 pb-7" : "max-h-0"
                    }`}
                  >
                    <p className="text-muted-foreground leading-relaxed text-sm">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
