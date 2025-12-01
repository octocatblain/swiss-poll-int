"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Twitter, Facebook } from "react-feather";
import Image from "next/image";

interface NavItem {
  label: string;
  href: string;
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const pathname = usePathname();

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
      { label: "Services", href: "/services" },
      { label: "Methodology", href: "/methodology" },
      { label: "Contact", href: "/contact" },
      {label: "Polls", href: "/livepolls"},
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

  const handleSocialClick = (platform: string) => {
    // Add your social media URLs here
    const urls = {
      twitter: "https://twitter.com/yourusername",
      facebook: "https://facebook.com/yourpagename",
    };
    window.open(urls[platform as keyof typeof urls], "_blank");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm supports-backdrop-filter:bg-white/80"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] focus-visible:ring-offset-2 rounded-sm transition-transform hover:scale-105"
            aria-label="Swiss Poll International - Home"
            onMouseEnter={() => setIsHovering("logo")}
            onMouseLeave={() => setIsHovering(null)}
          >
            <div className="flex items-center">
              {isScrolled ? (
                <Image
                  src={"/assets/swiss_poll_logo.png"}
                  alt="Swiss Poll International"
                  width={500}
                  height={500}
                  className="h-20 w-auto object-contain"
                />
              ) : (
                <Image
                  src={"/assets/swiss_poll_logo_alt.jpg"}
                  alt="Swiss Poll International"
                  width={500}
                  height={500}
                  className="h-20 w-auto rounded-full object-contain"
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
                className={`text-sm font-medium transition-all duration-300 relative py-2 group ${
                  isActiveLink(item.href)
                    ? "text-[#059669] font-semibold"
                    : "text-foreground/80 hover:text-[#059669]"
                }`}
                onMouseEnter={() => setIsHovering(item.href)}
                onMouseLeave={() => setIsHovering(null)}
              >
                <span className="relative">
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[#059669] transition-all duration-300 ${
                      isActiveLink(item.href) || isHovering === item.href
                        ? "w-full"
                        : "w-0"
                    }`}
                  />
                </span>
              </Link>
            ))}

            {/* Social Media Icons */}
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
              <button
                onClick={() => handleSocialClick("twitter")}
                className="p-2 rounded-full transition-all duration-300 hover:bg-[#059669]/10 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669]"
                aria-label="Follow us on Twitter"
                onMouseEnter={() => setIsHovering("twitter")}
                onMouseLeave={() => setIsHovering(null)}
              >
                <Twitter
                  size={18}
                  className={`transition-colors duration-300 ${
                    isHovering === "twitter"
                      ? "text-[#059669]"
                      : "text-gray-600"
                  }`}
                />
              </button>
              <button
                onClick={() => handleSocialClick("facebook")}
                className="p-2 rounded-full transition-all duration-300 hover:bg-[#059669]/10 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669]"
                aria-label="Follow us on Facebook"
                onMouseEnter={() => setIsHovering("facebook")}
                onMouseLeave={() => setIsHovering(null)}
              >
                <Facebook
                  size={18}
                  className={`transition-colors duration-300 ${
                    isHovering === "facebook"
                      ? "text-[#059669]"
                      : "text-gray-600"
                  }`}
                />
              </button>
            </div>

            <Link
              href="/Admin/Login"
              className="p-2 rounded-md text-white cursor-pointer bg-slate-700 transition-all duration-300 hover:bg-green-600/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669]"
              aria-label="Toggle dark mode"
              
            >Login</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-md transition-all duration-300 hover:bg-[#059669]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] ${
              isMobileMenuOpen ? "bg-[#059669]/10" : ""
            }`}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? (
              <X size={20} className="text-[#059669]" />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-navigation"
          className={`lg:hidden rounded transition-all z-50 bg-white duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 border-t border-[#059669]/20"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
          aria-hidden={!isMobileMenuOpen}
        >
          <nav className="p-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-3 text-sm font-medium transition-all duration-300 border-l-2 pl-4 my-1 rounded-r-lg ${
                  isActiveLink(item.href)
                    ? "text-[#059669] border-[#059669] bg-[#059669]/10 font-semibold"
                    : "text-foreground/80 hover:text-[#059669] border-transparent hover:border-[#059669] hover:bg-[#059669]/5"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Social Media Icons */}
            <div className="pt-4 mt-4 border-t border-gray-200 flex justify-center space-x-6">
              <button
                onClick={() => {
                  handleSocialClick("twitter");
                  setIsMobileMenuOpen(false);
                }}
                className="p-3 rounded-full transition-all duration-300 hover:bg-[#059669]/10 active:scale-95"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={20} className="text-gray-600" />
              </button>
              <button
                onClick={() => {
                  handleSocialClick("facebook");
                  setIsMobileMenuOpen(false);
                }}
                className="p-3 rounded-full transition-all duration-300 hover:bg-[#059669]/10 active:scale-95"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={20} className="text-gray-600" />
              </button>
            </div>
             <Link
              className="p-2 rounded-md text-white bg-slate-700 transition-all duration-300 hover:bg-green-600/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669]"
              aria-label="Toggle dark mode"
                    href="/Admin/Login"
            >Login</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
