"use client";

import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  Platform: [
    { name: "Courses", href: "#courses" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ],
  Courses: [
    { name: "NAPLAN Year 3", href: "#courses" },
    { name: "OC Year 4", href: "#courses" },
    { name: "NAPLAN Year 5", href: "#courses" },
    { name: "Selective Year 6", href: "#courses" },
    { name: "NAPLAN Year 7", href: "#courses" },
    { name: "NAPLAN Year 9", href: "#courses" },
  ],
  Company: [
    { name: "About", href: "#" },
    { name: "Contact", href: "mailto:hello@testpanda.com.au" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
};

const socialLinks = [
  { name: "Facebook", href: "#" },
  { name: "Instagram", href: "#" },
];

export function FooterSection() {
  return (
    <footer className="relative bg-secondary">
      {/* Colorful gradient top bar */}
      <div className="h-1 w-full" style={{background: "linear-gradient(90deg, #a78bfa, #eca8d6, #60a5fa, #34d399, #fbbf24, #f472b6, #a78bfa)"}} />

      {/* Footer content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <a href="#" className="inline-flex items-center gap-2 mb-6">
                <img src="/logo.png" alt="TestPanda" className={`  h-auto
              w-auto `} />
              </a>

              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs text-sm">
                Australia's smartest exam prep platform for NAPLAN, OC &amp; Selective High School. Trusted by 1,000+ families across NSW.
              </p>

              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium text-foreground mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; 2024 TestPanda. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#eca8d6]" />
              Platform operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
