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
} from "react-feather";

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
          location: "Geneva Office",
          address: "Rue du Rhône 45, 1204 Geneva, Switzerland",
        },
        {
          location: "Lausanne Office",
          address: "Avenue de la Gare 78, 1003 Lausanne, Switzerland",
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
          label: "Geneva Office",
          value: "+41 22 123 45 68",
          href: "tel:+41221234568",
        },
        {
          label: "Fax",
          value: "+41 44 123 45 69",
          href: "fax:+41441234569",
        },
      ],
    },
    {
      icon: Mail,
      title: "Email",
      items: [
        {
          label: "General Inquiries",
          value: "info@swisspollinternational.ch",
          href: "mailto:info@swisspollinternational.ch",
        },
        {
          label: "Research Department",
          value: "research@swisspollinternational.ch",
          href: "mailto:research@swisspollinternational.ch",
        },
        {
          label: "Client Services",
          value: "clients@swisspollinternational.ch",
          href: "mailto:clients@swisspollinternational.ch",
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
    // {
    //   icon: Calendar,
    //   title: "Schedule a Consultation",
    //   description:
    //     "Book a 30-minute discovery call with our research directors to discuss your specific needs.",
    //   action: "Book a Meeting",
    //   href: "https://calendly.com/swisspoll/consultation",
    // },
    {
      icon: MessageCircle,
      title: "Request a Proposal",
      description:
        "Get a detailed project proposal tailored to your research objectives and budget.",
      action: "Request Proposal",
      href: "mailto:proposals@swisspollinternational.ch?subject=Project Proposal Request",
    },
    // {
    //   icon: Users,
    //   title: "Join Our Network",
    //   description:
    //     "Participate in our research panels and stay informed about industry insights.",
    //   action: "Learn More",
    //   href: "/insights",
    // },
  ],
} as const;

// Reusable components
const ContactCard = ({ contact }: any) => {
  const Icon = contact.icon;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
      <CardContent className="p-6 lg:p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Icon className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-bold text-primary pt-2">
            {contact.title}
          </h3>
        </div>

        <div className="space-y-4">
          {contact.items.map((item: any, index: any) => (
            <div
              key={index}
              className="group/item hover:translate-x-1 transition-transform duration-200"
            >
              {"location" in item ? (
                <div>
                  <p className="font-semibold text-foreground mb-1">
                    {item.location}
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {item.address}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-semibold text-foreground mb-1">
                    {item.label}
                  </p>
                  <a
                    href={item.href}
                    className="text-sm text-primary hover:underline underline-offset-4 transition-colors"
                  >
                    {item.value}
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

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 bg-gradient-to-br from-white to-primary/5">
      <CardContent className="p-6 lg:p-8 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="text-primary" size={28} />
        </div>

        <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-primary/90 transition-colors">
          {step.title}
        </h3>

        <p className="text-foreground/80 leading-relaxed mb-6 text-sm lg:text-base">
          {step.description}
        </p>

        <Button
          asChild
          className="w-full group-hover:scale-105 transition-transform duration-300"
        >
          <a
            href={step.href}
            target={step.href.startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
          >
            {step.action}
            <ArrowRight
              size={16}
              className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
            />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 lg:px-8 mb-16 lg:mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 tracking-tight">
              {PAGE_DATA.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto">
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
              <Card className="bg-secondary/30 border-primary/20 group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Clock className="text-primary" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">
                      {PAGE_DATA.businessHours.title}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {PAGE_DATA.businessHours.hours.map((schedule, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-primary/10 last:border-b-0"
                      >
                        <span className="text-foreground/80 font-medium">
                          {schedule.days}
                        </span>
                        <span className="text-primary font-semibold">
                          {schedule.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-primary mb-6 text-center lg:text-left">
                  Ready to Get Started?
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

        {/* Emergency Contact Banner */}
        {/* <section className="container mx-auto px-4 lg:px-8 mt-16 lg:mt-20">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground border-none">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Urgent Research Inquiry?
                </h3>
                <p className="mb-6 opacity-90 max-w-2xl mx-auto">
                  For time-sensitive projects and emergency research needs,
                  contact our 24/7 project coordination team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button size="lg" variant="secondary" asChild>
                    <a href="tel:+41441234567">
                      <Phone size={16} className="mr-2" />
                      Call Emergency Line
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10"
                    asChild
                  >
                    <a href="mailto:emergency@swisspollinternational.ch">
                      <Mail size={16} className="mr-2" />
                      Email Emergency Team
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section> */}
      </main>

      <Footer />
    </div>
  );
}
