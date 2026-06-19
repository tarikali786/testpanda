"use client";

import { useEffect, useRef, useState } from "react";

const stepColors = ["#a78bfa", "#60a5fa", "#34d399"];

const steps = [
  {
    number:    "01",
    title:     "Sign In",
    subtitle:  "with Google",
    description:
      "Create your account in seconds using Google Sign-In. Your 30-day free trial starts automatically — no credit card required.",
    highlight: "Trial starts instantly",
  },
  {
    number:    "02",
    title:     "Practice",
    subtitle:  "with demo papers",
    description:
      "Access all 6 courses with free demo exam papers. Experience real exam conditions with timed tests and instant feedback.",
    highlight: "All 6 courses unlocked during trial",
  },
  {
    number:    "03",
    title:     "Subscribe",
    subtitle:  "for full access",
    description:
      "Unlock complete course materials delivered via Google Drive. One-time annual payment, 12 months of unlimited access.",
    highlight: "Full materials shared within 24hrs",
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-10 text-foreground overflow-hidden"
      style={{background: "linear-gradient(135deg, #f5f3ff 0%, #ffffff 40%, #f0f9ff 100%)"}}
    >

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header + tree image */}
        <div className="relative mb-0 lg:mb-0 grid lg:grid-cols-2 gap-4 lg:gap-12 items-end">
          {/* Left: title */}
          <div className="overflow-hidden pb-0 lg:pb-32">
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
            >
              <span className="inline-flex items-center gap-3 text-sm font-mono text-foreground/70 mb-8">
                <span className="w-12 h-px bg-foreground/40" />
                How It Works
              </span>
            </div>

            <h2
              className={`text-6xl md:text-7xl mb-10 lg:text-[128px] font-display tracking-tight leading-[0.85] transition-all duration-1000 delay-100 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
              }`}
            >
              <span className="block" style={{color: stepColors[0]}}>Simple.</span>
              <span className="block" style={{color: stepColors[1]}}>Fast.</span>
              <span className="block" style={{color: stepColors[2]}}>Effective.</span>
            </h2>
          </div>

          
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <button
              key={step.number}
              type="button"
              onClick={() => setActiveStep(index)}
              className="relative text-left p-8 lg:p-12 border transition-all duration-500"
              style={{
                backgroundColor: activeStep === index ? `${stepColors[index]}12` : "white",
                borderColor: activeStep === index ? `${stepColors[index]}80` : "rgba(0,0,0,0.12)",
              }}
            >
              {/* Step number with progress line */}
              <div className="flex items-center gap-4 mb-8">
                <span
                  className="text-4xl font-display transition-colors duration-300"
                  style={{ color: activeStep === index ? stepColors[index] : "rgba(0,0,0,0.15)" }}
                >
                  {step.number}
                </span>
                <div className="flex-1 h-px bg-foreground/10 overflow-hidden">
                  {activeStep === index && (
                    <div className="h-full animate-progress" style={{backgroundColor: `${stepColors[index]}70`}} />
                  )}
                </div>
              </div>

              <h3 className="text-3xl lg:text-4xl font-display mb-2">{step.title}</h3>
              <span className="text-xl text-foreground/40 font-display block mb-6">{step.subtitle}</span>

              <p
                className={`text-foreground/60 leading-relaxed transition-opacity duration-300 ${
                  activeStep === index ? "opacity-100" : "opacity-60"
                }`}
              >
                {step.description}
              </p>

              <div
                className={`mt-6 inline-flex items-center gap-2 text-xs font-mono transition-all duration-300 ${
                  activeStep === index ? "opacity-100" : "opacity-0"
                }`}
                style={{ color: stepColors[index] }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: stepColors[index]}} />
                {step.highlight}
              </div>

              {/* Active bottom bar */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 transition-transform duration-500 origin-left ${
                  activeStep === index ? "scale-x-100" : "scale-x-0"
                }`}
                style={{backgroundColor: stepColors[index]}}
              />
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 6s linear forwards;
        }
      `}</style>
    </section>
  );
}
