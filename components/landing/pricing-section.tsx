"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ArrowRight, Zap } from "lucide-react";

const plans = [
  {
    name:      "Free Trial",
    desc:      "Try before you buy",
    price:     "$0",
    period:    "30 days",
    features:  [
      "All 6 courses unlocked",
      "Demo exam papers",
      "Course content preview",
      "No credit card required",
    ],
    cta:       "Start Free Trial",
    highlight: false,
  },
  {
    name:      "Single Course",
    desc:      "One course, full access",
    price:     "$49",
    period:    "AUD / 12 months",
    features:  [
      "1 course of your choice",
      "Full exam paper library",
      "Google Drive access",
      "12 months access",
    ],
    cta:       "Get Started",
    highlight: false,
  },
  {
    name:      "3-Course Bundle",
    desc:      "Best value for most families",
    price:     "$99",
    period:    "AUD / 12 months",
    features:  [
      "3 courses of your choice",
      "Full exam paper library",
      "Google Drive access",
      "12 months access",
      "Save $48 vs single",
    ],
    cta:       "Get Bundle",
    highlight: true,
  },
  {
    name:      "All Access",
    desc:      "Every course, maximum prep",
    price:     "$149",
    period:    "AUD / 12 months",
    features:  [
      "All 6 courses",
      "Full exam paper library",
      "Google Drive access",
      "12 months access",
      "Save $145 vs single",
      "Priority support",
    ],
    cta:       "Get All Access",
    highlight: false,
  },
];

export function PricingSection() {
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
    <section id="pricing" ref={sectionRef} className="relative py-32 lg:py-40 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8">
              <span className="w-12 h-px bg-foreground/30" />
              Pricing
            </span>
            <h2
              className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Invest in
              <br />
              <span className="text-stroke">results.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:flex lg:items-end">
            <p
              className={`text-xl text-muted-foreground leading-relaxed transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Straightforward annual pricing. Start free, upgrade when ready. All paid plans include 12 months of access.
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="relative">
          <div className="grid lg:grid-cols-4 gap-4 lg:gap-0">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative bg-background border transition-all duration-700 ${
                  plan.highlight
                    ? "border-foreground lg:-mx-2 lg:z-10 lg:scale-105"
                    : "border-foreground/10 lg:first:-mr-2 lg:last:-ml-2"
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-8 right-8 flex justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-xs font-mono uppercase tracking-widest">
                      <Zap className="w-3 h-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8 lg:p-10">
                  <div className="mb-8 pb-8 border-b border-foreground/10">
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-display mt-2">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{plan.desc}</p>
                  </div>

                  <div className="mb-8">
                    <span className="text-5xl lg:text-6xl font-display">{plan.price}</span>
                    <p className="text-xs text-muted-foreground mt-2 font-mono">{plan.period}</p>
                  </div>

                  <ul className="space-y-3 mb-10">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[#eca8d6] mt-0.5 shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group ${
                      plan.highlight
                        ? "bg-foreground text-background hover:bg-foreground/90"
                        : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust signals */}
        <div
          className={`mt-20 flex flex-wrap gap-6 text-sm text-muted-foreground pt-12 border-t border-foreground/10 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {[
            "No hidden fees",
            "Google Drive delivery",
            "Australian curriculum aligned",
            "No credit card for free trial",
          ].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#eca8d6]" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .text-stroke {
          -webkit-text-stroke: 1.5px currentColor;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </section>
  );
}
