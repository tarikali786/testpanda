"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, TrendingUp, Timer, Smartphone, Gift, FolderOpen } from "lucide-react";

const features = [
  {
    number: "01",
    icon:   FileText,
    title:  "Exam-Style Practice Papers",
    desc:   "Full-length practice exams modelled on real NAPLAN, OC, and Selective test formats — exactly what your child will face on exam day.",
    stat:   { value: "500+", label: "practice questions" },
    large:  true,
  },
  {
    number: "02",
    icon:   Timer,
    title:  "Timed Test Conditions",
    desc:   "Build speed and confidence with timed exams that replicate authentic test pressure.",
    stat:   null,
    large:  false,
  },
  {
    number: "03",
    icon:   TrendingUp,
    title:  "Track Your Progress",
    desc:   "Monitor scores and improvement over time to identify strengths and focus areas.",
    stat:   null,
    large:  false,
  },
  {
    number: "04",
    icon:   Gift,
    title:  "30-Day Free Trial",
    desc:   "Start with a full month of free access — no credit card, no commitment. Cancel anytime.",
    stat:   null,
    large:  false,
  },
  {
    number: "05",
    icon:   Smartphone,
    title:  "Any Device, Any Time",
    desc:   "Study at home or on the go. TestPanda works seamlessly on desktop, tablet, and mobile.",
    stat:   null,
    large:  false,
  },
  {
    number: "06",
    icon:   FolderOpen,
    title:  "Full Materials via Google Drive",
    desc:   "After subscribing, receive complete course materials directly in your Google Drive — ready to use offline.",
    stat:   { value: "24hrs", label: "delivery after purchase" },
    large:  true,
  },
];

// Floating particles — same as original template
function ParticleVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const COUNT = 70;
    const particles = Array.from({ length: COUNT }, (_, i) => {
      const seed = i * 1.618;
      return {
        bx:     ((seed * 127.1) % 1),
        by:     ((seed * 311.7) % 1),
        phase:  seed * Math.PI * 2,
        speed:  0.4 + (seed % 0.4),
        radius: 1.2 + (seed % 2.2),
      };
    });

    let time = 0;
    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p) => {
        const flowX = Math.sin(time * p.speed * 0.4 + p.phase) * 38;
        const flowY = Math.cos(time * p.speed * 0.3 + p.phase * 0.7) * 24;
        const bx = p.bx * w;
        const by = p.by * h;
        const dx = p.bx - mx;
        const dy = p.by - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist * 2.8);
        const x = bx + flowX + influence * Math.cos(time + p.phase) * 36;
        const y = by + flowY + influence * Math.sin(time + p.phase) * 36;
        const pulse = Math.sin(time * p.speed + p.phase) * 0.5 + 0.5;
        const alpha = 0.08 + pulse * 0.18 + influence * 0.3;

        ctx.beginPath();
        ctx.arc(x, y, p.radius + pulse * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
        ctx.fill();
      });

      time += 0.016;
      frameRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export function FeaturesSection() {
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

  return (
    <section id="features" ref={sectionRef} className="relative py-10 overflow-hidden bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="relative mb-24 lg:mb-32">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
                <span className="w-12 h-px bg-foreground/30" />
                Features
              </span>
              <h2
                className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Everything
                <br />
                <span className="text-muted-foreground">they need.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-4">
              <p
                className={`text-xl text-muted-foreground leading-relaxed transition-all duration-1000 delay-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Built specifically for Australian students preparing for the most competitive school entry exams in NSW.
              </p>
            </div>
          </div>
        </div>

        {/* Large feature card — particles + image */}
        <div
          className={`lg:col-span-12 relative  border border-foreground/10 min-h-[500px] overflow-hidden group transition-all duration-700 flex mb-4 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Left: text */}
          <div className="relative flex-1 p-8 lg:p-12 ">
            <ParticleVisualization />
            <div className="relative z-10">
              <span className="font-mono text-sm text-muted-foreground">{features[0].number}</span>
              <h3 className="text-3xl lg:text-4xl font-display mt-4 mb-6 group-hover:translate-x-2 transition-transform duration-500">
                {features[0].title}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md mb-8">
                {features[0].desc}
              </p>
              {features[0].stat && (
                <div>
                  <span className="text-5xl lg:text-6xl font-display">{features[0].stat.value}</span>
                  <span className="block text-sm text-muted-foreground font-mono mt-2">{features[0].stat.label}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: image */}
          <div className="hidden lg:block relative w-[42%] shrink-0 overflow-hidden">
            <img
              src="/images/feature.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
          </div>
        </div>

        {/* Remaining feature cards — 2-column grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.slice(1, 5).map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group p-8 bg-background border border-foreground/10 hover:border-foreground/30 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${(index + 1) * 80}ms` }}
              >
                <span className="font-mono text-sm text-muted-foreground">{feature.number}</span>
                <div className="mt-4 mb-4">
                  <Icon className="w-5 h-5 text-[#eca8d6]" />
                </div>
                <h3 className="text-xl font-display mb-3 group-hover:translate-x-1 transition-transform duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Last large card */}
        <div
          className={`mt-4 relative  border border-foreground/10 min-h-[300px] overflow-hidden group transition-all duration-700 flex ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <div className="relative flex-1 p-8 lg:p-12">
            <span className="font-mono text-sm text-muted-foreground">{features[5].number}</span>
            <h3 className="text-3xl lg:text-4xl font-display mt-4 mb-6 group-hover:translate-x-2 transition-transform duration-500">
              {features[5].title}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md mb-8">
              {features[5].desc}
            </p>
            {features[5].stat && (
              <div>
                <span className="text-5xl lg:text-6xl font-display">{features[5].stat.value}</span>
                <span className="block text-sm text-muted-foreground font-mono mt-2">{features[5].stat.label}</span>
              </div>
            )}
          </div>

          <div className="hidden lg:block relative w-[42%] shrink-0 overflow-hidden">
            <img
              src="/images/feature.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
