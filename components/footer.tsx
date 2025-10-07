import Link from "next/link";
import { Mail, Phone, MapPin, Shield, FileText, Globe } from "react-feather";

// Static data for better maintainability
const FOOTER_DATA = {
  company: {
    name: "SWISS POLL INTERNATIONAL",
    description:
      "Precision Opinion Research and Consumer Insight to Guide Your Most Critical Decisions.",
  },
  contact: {
    locations: ["Zürich", "Geneva", "Lausanne"],
    phone: "+41 44 123 45 67",
    email: "research@swisspollinternational.ch",
  },
  quickLinks: [
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/methodology", label: "Methodology" },
    // { href: "/insights", label: "Insights" },
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
} as const;

// Reusable components
const ContactItem = ({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<any>;
  children: React.ReactNode;
}) => (
  <div className="flex items-start gap-3 group">
    <Icon
      size={16}
      className="mt-0.5 flex-shrink-0 text-primary-foreground/60 group-hover:text-primary-foreground transition-colors"
    />
    <div className="text-sm text-primary-foreground/80 group-hover:text-primary-foreground transition-colors">
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
      className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors group py-1"
    >
      {Icon && <Icon size={14} className="flex-shrink-0" />}
      <span className="hover:underline underline-offset-4">{label}</span>
    </Link>
  </li>
);

const MembershipItem = ({ name, url }: { name: string; url: string }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors hover:underline underline-offset-4 py-1"
  >
    {name}
  </a>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground" role="contentinfo">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-xl mb-4 tracking-tight">
              {FOOTER_DATA.company.name}
            </h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed max-w-xs">
              {FOOTER_DATA.company.description}
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold text-lg mb-4 tracking-tight">
              Contact
            </h4>
            <div className="space-y-4">
              <ContactItem icon={MapPin}>
                <div className="space-y-1">
                  {FOOTER_DATA.contact.locations.map((location) => (
                    <div key={location}>{location}</div>
                  ))}
                </div>
              </ContactItem>

              <ContactItem icon={Phone}>
                <a
                  href={`tel:${FOOTER_DATA.contact.phone.replace(/\s/g, "")}`}
                  className="hover:underline underline-offset-4"
                >
                  {FOOTER_DATA.contact.phone}
                </a>
              </ContactItem>

              <ContactItem icon={Mail}>
                <a
                  href={`mailto:${FOOTER_DATA.contact.email}`}
                  className="hover:underline underline-offset-4 break-all"
                >
                  {FOOTER_DATA.contact.email}
                </a>
              </ContactItem>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 tracking-tight">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {FOOTER_DATA.quickLinks.map((link) => (
                <LinkItem key={link.href} {...link} />
              ))}
            </ul>
          </div>

          {/* Memberships & Legal */}
          <div>
            <div className="mb-6">
              <h4 className="font-semibold text-lg mb-3 tracking-tight">
                Memberships
              </h4>
              <div className="space-y-2">
                {FOOTER_DATA.memberships.map((membership) => (
                  <MembershipItem key={membership.name} {...membership} />
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-3 tracking-tight">
                Legal
              </h4>
              <ul className="space-y-2">
                {FOOTER_DATA.legal.map((item) => (
                  <LinkItem key={item.href} {...item} />
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-primary-foreground/60 text-center md:text-left">
            © {currentYear} {FOOTER_DATA.company.name}. All Rights Reserved.
          </div>

          {/* Additional trust indicators */}
          <div className="flex items-center gap-6 text-xs text-primary-foreground/60">
            <span>ISO 20252 Certified</span>
            <span>GDPR Compliant</span>
            <span>Data Secure</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
