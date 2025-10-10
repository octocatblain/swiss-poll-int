"use client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Users,
  Calendar,
  ArrowRight,
  MessageCircle,
  ExternalLink,
} from "react-feather";
import { useState } from "react";

// Static data for better maintainability
const PAGE_DATA = {
  hero: {
    title: "Contact Us",
    description:
      "Ready to base your strategy on unshakeable data? Let's discuss how our research can provide the clarity and confidence you need.",
  },
  contactInfo: [
    {
      icon: MapPin,
      title: "Our Offices",
      items: [
        {
          location: "Zürich Headquarters",
          address: "Bahnhofstrasse 123, 8001 Zürich, Switzerland",
        },

        {
          location: "Nairobi Office",
          address: "Kenyatta Avenue 78, 1003 Nairobi, Kenya",
        },
      ],
    },
    {
      icon: Phone,
      title: "Phone & Fax",
      items: [
        {
          label: "Main Office",
          value: "+41 44 123 45 67",
          href: "tel:+41441234567",
        },
        {
          label: "Nairobi Office",
          value: "+254 732 333 133",
          href: "tel:+254732333133",
        },
        // {
        //   label: "Fax",
        //   value: "+41 44 123 45 69",
        //   href: "fax:+41441234569",
        // },
      ],
    },
    {
      icon: Mail,
      title: "Email",
      items: [
        {
          label: "General Inquiries",
          value: "info@swisspoll.com",
          href: "mailto:info@swisspoll.com",
        },
        {
          label: "Research Department",
          value: "research@swisspoll.com",
          href: "mailto:research@swisspoll.com",
        },
        {
          label: "Client Services",
          value: "clients@swisspoll.com",
          href: "mailto:clients@swisspoll.com",
        },
      ],
    },
  ],
  businessHours: {
    title: "Business Hours",
    hours: [
      { days: "Monday - Thursday", time: "8:00 AM - 6:00 PM CET" },
      { days: "Friday", time: "8:00 AM - 5:00 PM CET" },
      { days: "Saturday - Sunday", time: "Closed" },
      { days: "Emergency Support", time: "24/7 for active projects" },
    ],
  },
  nextSteps: [
    {
      icon: MessageCircle,
      title: "Request a Proposal",
      description:
        "Get a detailed project proposal tailored to your research objectives and budget.",
      action: "Request Proposal",
      href: "mailto:proposals@swisspoll.com?subject=Project Proposal Request",
    },
  ],
} as const;

// Reusable components
const ContactCard = ({ contact }: any) => {
  const Icon = contact.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="group hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#f9a524]/30 bg-gradient-to-br from-white to-gray-50/50 hover:from-[#f9a524]/5 hover:to-[#f9a524]/2 hover:-translate-y-2 cursor-pointer relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background element */}
      <div
        className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#f9a524] to-transparent transition-all duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      <CardContent className="p-6 lg:p-8 relative z-10">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-[#f9a524]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-[#f9a524]/20 transition-all duration-300 group-hover:shadow-lg">
            <Icon className="text-[#f9a524]" size={24} />
          </div>
          <h3 className="text-xl font-bold text-primary pt-2 group-hover:text-[#f9a524] transition-colors duration-300">
            {contact.title}
          </h3>
        </div>

        <div className="space-y-4">
          {contact.items.map((item: any, index: any) => (
            <div
              key={index}
              className="group/item hover:translate-x-2 transition-all duration-300 p-3 rounded-lg hover:bg-[#f9a524]/5 cursor-pointer border border-transparent hover:border-[#f9a524]/20"
            >
              {"location" in item ? (
                <div>
                  <p className="font-semibold text-foreground mb-1 group-hover/item:text-[#f9a524] transition-colors duration-300">
                    {item.location}
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed group-hover/item:text-foreground transition-colors duration-300">
                    {item.address}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-semibold text-foreground mb-1 group-hover/item:text-[#f9a524] transition-colors duration-300">
                    {item.label}
                  </p>
                  <a
                    href={item.href}
                    className="text-sm text-[#f9a524] hover:underline underline-offset-4 transition-all duration-300 group-hover/item:font-medium flex items-center gap-1"
                  >
                    {item.value}
                    <ExternalLink
                      size={12}
                      className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
                    />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const NextStepCard = ({ step }: { step: (typeof PAGE_DATA.nextSteps)[0] }) => {
  const Icon = step.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="group hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#f9a524]/30 bg-gradient-to-br from-white to-[#f9a524]/5 hover:from-[#f9a524]/10 hover:to-[#f9a524]/5 hover:-translate-y-2 cursor-pointer relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f9a524_1px,transparent_1px)] bg-[length:20px_20px] animate-pulse-slow" />
      </div>

      <CardContent className="p-6 lg:p-8 text-center relative z-10">
        <div className="w-16 h-16 bg-[#f9a524]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-[#f9a524]/20 transition-all duration-300 group-hover:shadow-lg">
          <Icon className="text-[#f9a524]" size={28} />
        </div>

        <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-[#f9a524] transition-colors duration-300">
          {step.title}
        </h3>

        <p className="text-foreground/80 leading-relaxed mb-6 text-sm lg:text-base group-hover:text-foreground/90 transition-colors duration-300">
          {step.description}
        </p>

        <Button
          asChild
          className="w-full group-hover:scale-105 transition-all duration-300 bg-[#f9a524] hover:bg-[#f9a524]/90 border-2 border-transparent hover:border-[#f9a524] hover:shadow-lg group/btn"
        >
          <a
            href={step.href}
            target={step.href.startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            {step.action}
            <ArrowRight
              size={16}
              className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
            />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

const BusinessHoursCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="bg-gradient-to-br from-[#f9a524]/5 to-[#f9a524]/10 border-[#f9a524]/20 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated border */}
      <div
        className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#f9a524] to-transparent transition-all duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      <CardContent className="p-8 relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-[#f9a524]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-[#f9a524]/20 transition-all duration-300 group-hover:shadow-lg">
            <Clock className="text-[#f9a524]" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-primary group-hover:text-[#f9a524] transition-colors duration-300">
            {PAGE_DATA.businessHours.title}
          </h2>
        </div>

        <div className="space-y-4">
          {PAGE_DATA.businessHours.hours.map((schedule, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-3 px-4 border-b border-[#f9a524]/10 last:border-b-0 group/item hover:bg-[#f9a524]/5 hover:translate-x-2 transition-all duration-300 rounded-lg cursor-pointer"
            >
              <span className="text-foreground/80 font-medium group-hover/item:text-foreground transition-colors duration-300">
                {schedule.days}
              </span>
              <span className="text-[#f9a524] font-semibold group-hover/item:scale-110 transition-transform duration-300">
                {schedule.time}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default function ContactPage() {
  const [heroHovered, setHeroHovered] = useState(false);
  const [nextStepsHovered, setNextStepsHovered] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 lg:px-8 mb-16 lg:mb-20">
          <div
            className="max-w-4xl mx-auto text-center group"
            onMouseEnter={() => setHeroHovered(true)}
            onMouseLeave={() => setHeroHovered(false)}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 tracking-tight group-hover:text-[#f9a524] transition-colors duration-500">
              {PAGE_DATA.hero.title}
              <span
                className={`block h-1 w-0 group-hover:w-64 bg-gradient-to-r from-[#f9a524] to-transparent transition-all duration-1000 mx-auto mt-4 ${
                  heroHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto group-hover:text-foreground/90 transition-colors duration-300">
              {PAGE_DATA.hero.description}
            </p>
          </div>
        </section>

        {/* Contact Information Grid */}
        <section className="container mx-auto px-4 lg:px-8 mb-16 lg:mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {PAGE_DATA.contactInfo.map((contact, index) => (
                <ContactCard key={index} contact={contact} />
              ))}
            </div>
          </div>
        </section>

        {/* Business Hours & Next Steps */}
        <section className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Business Hours */}
              <BusinessHoursCard />

              {/* Next Steps */}
              <div className="space-y-6">
                <h2
                  className="text-2xl font-bold text-primary mb-6 text-center lg:text-left group hover:text-[#f9a524] transition-colors duration-300 cursor-pointer"
                  onMouseEnter={() => setNextStepsHovered(true)}
                  onMouseLeave={() => setNextStepsHovered(false)}
                >
                  Ready to Get Started?
                  <span
                    className={`block h-0.5 w-0 group-hover:w-48 bg-gradient-to-r from-[#f9a524] to-transparent transition-all duration-500 mt-2 ${
                      nextStepsHovered ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </h2>
                <div className="space-y-4">
                  {PAGE_DATA.nextSteps.map((step, index) => (
                    <NextStepCard key={index} step={step} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Map Placeholder */}
        {/* <section className="container mx-auto px-4 lg:px-8 mt-20">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-[#f9a524]/5 to-[#f9a524]/10 border-[#f9a524]/20 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
              <CardContent className="p-0">
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-[#f9a524] transition-colors duration-300">
                    Visit Our Headquarters
                  </h3>
                  <p className="text-foreground/80 mb-6 group-hover:text-foreground/90 transition-colors duration-300">
                    Experience Swiss precision firsthand at our Zürich
                    headquarters
                  </p>
                </div>
                <div className="relative h-64 bg-gradient-to-br from-[#f9a524]/10 to-[#f9a524]/5 flex items-center justify-center group/map">
                  <div className="w-32 h-32 border-4 border-[#f9a524] rounded-full flex items-center justify-center group-hover/map:scale-110 transition-transform duration-500">
                    <div className="w-24 h-24 bg-[#f9a524] rounded-full flex items-center justify-center text-white font-bold text-lg group-hover/map:scale-110 transition-transform duration-300">
                      ZRH
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f9a524_1px,transparent_1px)] bg-[length:40px_40px] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section> */}
      </main>

      <Footer />

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
