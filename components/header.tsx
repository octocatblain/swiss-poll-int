"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "react-feather";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface NavItem {
  label: string;
  href: string;
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Throttled scroll handler for better performance
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navItems: NavItem[] = useMemo(
    () => [
      { label: "Home", href: "/" },
      // { label: "About Us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Methodology", href: "/methodology" },
      // { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
    []
  );

  const isActiveLink = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname.startsWith(href);
    },
    [pathname]
  );

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm supports-[backdrop-filter]:bg-white/80"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
            aria-label="SWISS POLL INTERNATIONAL - Home"
          >
            <div className="flex items-center">
              {isScrolled ? (
                <Image
                  src={"/assets/swiss_poll_logo.png"}
                  alt="Swiss Poll International"
                  width={200}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <Image
                  src={"/assets/swiss_poll_logo_alt.jpg"}
                  alt="Swiss Poll International"
                  width={60}
                  height={60}
                  className="h-12 w-auto rounded object-contain"
                />
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center space-x-8"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors relative py-2 ${
                  isActiveLink(item.href)
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {item.label}
                {isActiveLink(item.href) && (
                  <span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                    aria-hidden="true"
                  />
                )}
              </Link>
            ))}
            <Button
              size="sm"
              className="bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive"
            >
              Request a Proposal
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-navigation"
          className={`lg:hidden rounded transition-all z-50 bg-white  duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 border-t"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
          aria-hidden={!isMobileMenuOpen}
        >
          <nav className="p-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-3 text-sm font-medium transition-colors border-l-2 pl-4 ${
                  isActiveLink(item.href)
                    ? "text-primary border-primary bg-primary/5"
                    : "text-foreground/80 hover:text-primary border-transparent hover:border-primary hover:bg-primary/5"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t">
              <Button
                size="sm"
                className="w-full bg-destructive hover:bg-destructive/90"
              >
                Request a Proposal
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
