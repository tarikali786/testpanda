"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";

const navLinks = [
  { name: "Courses", href: "#courses" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${isScrolled ? "top-4 left-4 right-4" : "top-0 left-0 right-0"
        }`}
    >
      <nav
        className={`mx-auto transition-all duration-500 ${isScrolled || isMobileMenuOpen
          ? "bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]"
          : "bg-transparent max-w-[1400px]"
          }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 h-16`}
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">

            <img src="/logo.png" alt="TestPanda" className={`h-auto w-40 `} />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm transition-colors duration-300 relative group ${isScrolled ? "text-foreground/70 hover:text-foreground" : "text-foreground/70 hover:text-foreground"
                  }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full bg-foreground" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {isSignedIn ? (
              <>
                <a href="/dashboard" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Dashboard
                </a>
                <UserButton />
              </>
            ) : (
              <>
                <a href="/sign-in" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Sign In
                </a>
                <Button
                  size="sm"
                  asChild
                  className={`rounded-full transition-all duration-500 text-white ${isScrolled ? "px-4 h-8 text-xs" : "px-6"}`}
                  style={{ background: "linear-gradient(135deg, #a78bfa 0%, #eca8d6 50%, #f472b6 100%)" }}
                >
                  <a href="#pricing">Get Started</a>
                </Button>
              </>
            )}
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 transition-colors duration-500 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex flex-col h-full px-8 pt-28 pb-8">
          <div className="flex-1 flex flex-col justify-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-5xl font-display text-foreground hover:text-muted-foreground transition-all duration-500 ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms" }}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div
            className={`flex gap-4 pt-8 border-t border-foreground/10 transition-all duration-500 ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }}
          >
            {isSignedIn ? (
              <Button
                className="flex-1 rounded-full h-14 text-base text-white"
                style={{ background: "linear-gradient(135deg, #a78bfa 0%, #eca8d6 50%, #f472b6 100%)" }}
                asChild
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <a href="/dashboard">Go to Dashboard</a>
              </Button>
            ) : (
              <>
                <Button
                  className="flex-1 rounded-full h-14 text-base border border-foreground/20 bg-transparent text-foreground hover:bg-foreground/5"
                  asChild
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <a href="/sign-in">Sign In</a>
                </Button>
                <Button
                  className="flex-1 rounded-full h-14 text-base text-white"
                  style={{ background: "linear-gradient(135deg, #a78bfa 0%, #eca8d6 50%, #f472b6 100%)" }}
                  asChild
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <a href="#pricing">Get Started</a>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
