"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Shield,
  FileText,
  Globe,
  Github,
} from "lucide-react";
import { Facebook, GitHub, Twitter } from "react-feather";

// Static data for better maintainability
const FOOTER_DATA = {
  company: {
    name: "Swiss Poll International",
    description:
      "Precision Opinion Research and Consumer Insight to Guide Your Most Critical Decisions.",
    logo: "/assets/swiss_poll_logo.png",
  },
  contact: {
    locations: [
      { city: "Zürich", country: "Switzerland", flag: "🇨🇭" },
      { city: "Nairobi", country: "Kenya", flag: "🇰🇪" },
    ],
    phones: ["+41 44 123 45 67", "+254 732 333 133"],
    emails: ["research@swisspoll.com", "info@swisspoll.com"],
  },
  quickLinks: [
    { href: "/services", label: "Services" },
    { href: "/methodology", label: "Methodology" },
    { href: "/contact", label: "Contact" },
  ],
  memberships: [
    { name: "ESOMAR Member", url: "https://esomar.org" },
    { name: "WAPOR Member", url: "https://wapor.org" },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy Policy", icon: Shield },
    { href: "/cookie-policy", label: "Cookie Policy", icon: FileText },
    { href: "/terms-of-service", label: "Terms of Service", icon: FileText },
    { href: "/impressum", label: "Impressum", icon: Globe },
  ],
  social: [
    {
      name: "Twitter",
      url: "https://twitter.com/swisspoll",
      icon: Twitter,
    },
    {
      name: "Facebook",
      url: "https://facebook.com/swisspoll",
      icon: Facebook,
    },
  ],
} as const;

// Reusable components
const ContactItem = ({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<any>;
  children: React.ReactNode;
}) => (
  <div className="flex items-start gap-3 group cursor-pointer">
    <Icon
      size={16}
      className="mt-0.5 flex-shrink-0 text-primary-foreground/60 group-hover:text-[#f9a524] transition-all duration-300 group-hover:scale-110"
    />
    <div className="text-sm text-primary-foreground/80 group-hover:text-[#f9a524] transition-colors duration-300">
      {children}
    </div>
  </div>
);

const LinkItem = ({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon?: React.ComponentType<any>;
}) => (
  <li>
    <Link
      href={href}
      className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-[#f9a524] transition-all duration-300 group py-1 hover:translate-x-1"
    >
      {Icon && (
        <Icon
          size={14}
          className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:text-[#f9a524]"
        />
      )}
      <span className="hover:underline underline-offset-4 transition-all duration-300 group-hover:font-medium">
        {label}
      </span>
    </Link>
  </li>
);

const MembershipItem = ({ name, url }: { name: string; url: string }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="block text-sm text-primary-foreground/80 hover:text-[#f9a524] transition-all duration-300 hover:underline underline-offset-4 py-1 group hover:translate-x-1"
  >
    <span className="transition-all duration-300 group-hover:font-medium">
      {name}
    </span>
  </a>
);

// Enhanced Location item component with interactive elements
const LocationItem = ({
  city,
  country,
  flag,
}: {
  city: string;
  country: string;
  flag: string;
}) => (
  <div className="flex items-center gap-3 py-1 group hover:translate-x-1 transition-all duration-300 cursor-pointer">
    <span className="text-2xl flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
      {flag}
    </span>
    <div className="flex flex-col">
      <div className="font-medium text-primary-foreground group-hover:text-[#f9a524] transition-colors duration-300">
        {city}
      </div>
      <div className="text-primary-foreground/60 text-xs group-hover:text-[#f9a524]/80 transition-colors duration-300">
        {country}
      </div>
    </div>
  </div>
);

// Enhanced Social link component
const SocialLink = ({
  name,
  url,
  icon: Icon,
}: {
  name: string;
  url: string;
  icon: React.ComponentType<any>;
}) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-primary-foreground/80 hover:text-[#f9a524] transition-all duration-300 hover:scale-110 group p-3 rounded-full hover:bg-[#f9a524]/10 border border-transparent hover:border-[#f9a524]/20"
    title={name}
  >
    <Icon
      size={18}
      className="flex-shrink-0 transition-transform duration-300 group-hover:rotate-12"
    />
    <span className="text-sm sr-only">{name}</span>
  </a>
);

// Enhanced Trust Badge component
const TrustBadge = ({ text }: { text: string }) => (
  <span className="bg-primary-foreground/10 px-3 py-1.5 rounded-full text-xs text-primary-foreground/80 border border-primary-foreground/20 hover:bg-[#f9a524]/10 hover:text-[#f9a524] hover:border-[#f9a524]/30 transition-all duration-300 hover:scale-105 cursor-pointer group">
    <span className="transition-all duration-300 group-hover:font-medium">
      {text}
    </span>
  </span>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-primary text-primary-foreground relative overflow-hidden"
      role="contentinfo"
    >
      {/* Enhanced Background pattern with accent color */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, #f9a524 2%, transparent 0%), radial-gradient(circle at 75px 75px, #f9a524 2%, transparent 0%)`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#f9a524]/5 to-transparent opacity-30 animate-pulse-slow" />

      <div className="container mx-auto px-4 lg:px-8 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Logo and Company Info - Left aligned like Opinary */}
          <div className="lg:col-span-4">
            <div className="mb-6 group">
              <div className="flex items-center transition-transform duration-300 hover:scale-105 cursor-pointer">
                <Image
                  src={"/assets/swiss_poll_logo_alt.jpg"}
                  alt="Swiss Poll International"
                  width={500}
                  height={500}
                  className="h-20 w-auto rounded-full object-contain transition-all duration-500 group-hover:brightness-110"
                />
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed max-w-md mb-6 transition-colors duration-300 hover:text-primary-foreground">
              {FOOTER_DATA.company.description}
            </p>

            {/* Interactive Trust badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <TrustBadge text="ISO 20252 Certified" />
              <TrustBadge text="GDPR Compliant" />
              <TrustBadge text="Data Secure" />
            </div>

            {/* Enhanced Social Links */}
            <div className="flex items-center gap-2">
              {FOOTER_DATA.social.map((social) => (
                <SocialLink key={social.name} {...social} />
              ))}
            </div>
          </div>

          {/* Links and Contact - Right aligned like Opinary */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4 tracking-tight text-white group hover:text-[#f9a524] transition-colors duration-300 cursor-pointer">
                Company
                <span className="block h-0.5 bg-gradient-to-r from-[#f9a524] to-transparent w-0 group-hover:w-full transition-all duration-500 mt-1" />
              </h4>
              <ul className="space-y-3">
                {FOOTER_DATA.quickLinks.map((link) => (
                  <LinkItem key={link.href} {...link} />
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="font-semibold text-lg mb-4 tracking-tight text-white group hover:text-[#f9a524] transition-colors duration-300 cursor-pointer">
                Contact
                <span className="block h-0.5 bg-gradient-to-r from-[#f9a524] to-transparent w-0 group-hover:w-full transition-all duration-500 mt-1" />
              </h4>
              <div className="space-y-4">
                {/* Locations with enhanced flags */}
                <div className="space-y-2">
                  {FOOTER_DATA.contact.locations.map((location, index) => (
                    <LocationItem key={index} {...location} />
                  ))}
                </div>

                {/* Interactive Phone numbers */}
                <ContactItem icon={Phone}>
                  <div className="space-y-1">
                    {FOOTER_DATA.contact.phones.map((phone, index) => (
                      <a
                        key={index}
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="block hover:underline underline-offset-4 transition-all duration-300 hover:translate-x-1 hover:text-[#f9a524] group"
                      >
                        <span className="transition-all duration-300 group-hover:font-medium">
                          {phone}
                        </span>
                      </a>
                    ))}
                  </div>
                </ContactItem>

                {/* Interactive Email addresses */}
                <ContactItem icon={Mail}>
                  <div className="space-y-1">
                    {FOOTER_DATA.contact.emails.map((email, index) => (
                      <a
                        key={index}
                        href={`mailto:${email}`}
                        className="block hover:underline underline-offset-4 transition-all duration-300 hover:translate-x-1 hover:text-[#f9a524] group break-all"
                      >
                        <span className="transition-all duration-300 group-hover:font-medium">
                          {email}
                        </span>
                      </a>
                    ))}
                  </div>
                </ContactItem>
              </div>
            </div>

            {/* Memberships & Legal */}
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-3 tracking-tight text-white group hover:text-[#f9a524] transition-colors duration-300 cursor-pointer">
                  Memberships
                  <span className="block h-0.5 bg-gradient-to-r from-[#f9a524] to-transparent w-0 group-hover:w-full transition-all duration-500 mt-1" />
                </h4>
                <div className="space-y-3">
                  {FOOTER_DATA.memberships.map((membership) => (
                    <MembershipItem key={membership.name} {...membership} />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3 tracking-tight text-white group hover:text-[#f9a524] transition-colors duration-300 cursor-pointer">
                  Legal
                  <span className="block h-0.5 bg-gradient-to-r from-[#f9a524] to-transparent w-0 group-hover:w-full transition-all duration-500 mt-1" />
                </h4>
                <ul className="space-y-3">
                  {FOOTER_DATA.legal.map((item) => (
                    <LinkItem key={item.href} {...item} icon={item.icon} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 group">
          <div className="text-sm text-primary-foreground/60 text-center md:text-left transition-colors duration-300 group-hover:text-primary-foreground/80">
            © {currentYear} {FOOTER_DATA.company.name}. All Rights Reserved.
          </div>

          {/* Enhanced Social proof indicators */}
          <div className="flex items-center gap-6 text-xs text-primary-foreground/60">
            <span className="flex items-center gap-1 transition-all duration-300 hover:text-[#f9a524] group cursor-pointer">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse group-hover:bg-[#f9a524] transition-colors duration-300"></div>
              Trusted Research Partner
            </span>
            <span className="flex items-center gap-1 transition-all duration-300 hover:text-[#f9a524] group cursor-pointer">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse group-hover:bg-[#f9a524] transition-colors duration-300"></div>
              Global Insights
            </span>
            <span className="opacity-0">
              <Link
                href="https://github.com/octocatblain"
                className="flex rounded-full p-1 items-center gap-1 border border-[#f9a524] transition-all duration-300 hover:text-[#f9a524] group cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHub className="h-4 w-4 " />
              </Link>
            </span>
          </div>
        </div>
      </div>

      {/* Custom CSS for slow pulse animation */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </footer>
  );
}
