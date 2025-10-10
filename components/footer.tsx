import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Shield, FileText, Globe } from "react-feather";

// Static data for better maintainability
const FOOTER_DATA = {
  company: {
    name: "SWISS POLL INTERNATIONAL",
    description:
      "Precision Opinion Research and Consumer Insight to Guide Your Most Critical Decisions.",
    logo: "/assets/swiss_poll_logo.png",
  },
  contact: {
    locations: [
      { city: "Zürich", country: "Switzerland" },
      // { city: "Geneva", country: "Switzerland" },
      // { city: "Lausanne", country: "Switzerland" },
      { city: "Nairobi", country: "Kenya" },
    ],
    phones: ["+41 44 123 45 67", "+254 732 333 133"],
    emails: ["research@swisspoll.com", "info@swisspoll.com"],
  },
  quickLinks: [
    // { href: "/about", label: "About Us" },
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
      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Logo and Company Info - Left aligned like Opinary */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <Image
                src={FOOTER_DATA.company.logo}
                alt="Swiss Poll International"
                width={200}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed max-w-md mb-6">
              {FOOTER_DATA.company.description}
            </p>

            {/* Trust badges - similar to Opinary */}
            <div className="flex flex-wrap gap-4 text-xs text-primary-foreground/60">
              <span className="bg-primary-foreground/10 px-3 py-1 rounded-full">
                ISO 20252 Certified
              </span>
              <span className="bg-primary-foreground/10 px-3 py-1 rounded-full">
                GDPR Compliant
              </span>
              <span className="bg-primary-foreground/10 px-3 py-1 rounded-full">
                Data Secure
              </span>
            </div>
          </div>

          {/* Links and Contact - Right aligned like Opinary */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4 tracking-tight">
                Company
              </h4>
              <ul className="space-y-3">
                {FOOTER_DATA.quickLinks.map((link) => (
                  <LinkItem key={link.href} {...link} />
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="font-semibold text-lg mb-4 tracking-tight">
                Contact
              </h4>
              <div className="space-y-4">
                <ContactItem icon={MapPin}>
                  <div className="space-y-2">
                    {FOOTER_DATA.contact.locations.map((location, index) => (
                      <div key={index} className="leading-tight">
                        <div className="font-medium">{location.city}</div>
                        <div className="text-primary-foreground/60 text-xs">
                          {location.country}
                        </div>
                      </div>
                    ))}
                  </div>
                </ContactItem>

                <ContactItem icon={Phone}>
                  <div className="space-y-1">
                    {FOOTER_DATA.contact.phones.map((phone, index) => (
                      <a
                        key={index}
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="block hover:underline underline-offset-4"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </ContactItem>

                <ContactItem icon={Mail}>
                  <div className="space-y-1">
                    {FOOTER_DATA.contact.emails.map((email, index) => (
                      <a
                        key={index}
                        href={`mailto:${email}`}
                        className="block hover:underline underline-offset-4"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </ContactItem>
              </div>
            </div>

            {/* Memberships & Legal */}
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-3 tracking-tight">
                  Memberships
                </h4>
                <div className="space-y-3">
                  {FOOTER_DATA.memberships.map((membership) => (
                    <MembershipItem key={membership.name} {...membership} />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3 tracking-tight">
                  Legal
                </h4>
                <ul className="space-y-3">
                  {FOOTER_DATA.legal.map((item) => (
                    <LinkItem key={item.href} {...item} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Clean like Opinary */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-primary-foreground/60 text-center md:text-left">
            © {currentYear} {FOOTER_DATA.company.name}. All Rights Reserved.
          </div>

          {/* Social proof indicators */}
          <div className="flex items-center gap-6 text-xs text-primary-foreground/60">
            <span>Trusted Research Partner</span>
            <span>Global Insights</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
