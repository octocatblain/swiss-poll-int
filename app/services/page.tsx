import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  TrendingUp,
  PieChart,
  Target,
  Users,
  CheckCircle,
  ArrowRight,
  Globe,
  MessageCircle,
} from "react-feather";
import Image from "next/image";
import { BarChart3 } from "lucide-react";

// Static data for better maintainability
const PAGE_DATA = {
  hero: {
    title: "Our Services",
    description:
      "Comprehensive research solutions tailored to your strategic needs, delivered with Swiss precision and global expertise.",
  },
  services: [
    {
      id: "political-polling",
      icon: TrendingUp,
      title: "Public Opinion & Political Polling",
      description:
        "Our political polling services provide accurate, timely insights into voter sentiment, campaign performance, and policy reception.",
      features: [
        "Pre-election and exit polling",
        "Policy impact assessment",
        "Campaign tracking and messaging optimization",
        "Constituency analysis",
        "Media and debate response measurement",
      ],
      image: {
        src: "/political-polling-data-visualization.jpg",
        alt: "Political polling data visualization and analysis",
      },
      reverse: false,
      stats: [
        { value: "95%", label: "Prediction Accuracy" },
        { value: "24h", label: "Rapid Turnaround" },
        { value: "50+", label: "Elections Monitored" },
      ],
    },
    {
      id: "consumer-insights",
      icon: PieChart,
      title: "Consumer Insight & Market Segmentation",
      description:
        "Understand your customers deeply with our advanced segmentation and behavioral analysis methodologies.",
      features: [
        "Psychographic and demographic segmentation",
        "Purchase behavior analysis",
        "Trend identification and forecasting",
        "Product positioning studies",
        "Competitive landscape mapping",
      ],
      image: {
        src: "/market-segmentation-analysis.jpg",
        alt: "Market segmentation analysis and consumer insights",
      },
      reverse: true,
      stats: [
        { value: "360°", label: "Customer View" },
        { value: "15+", label: "Segmentation Models" },
        { value: "10k+", label: "Consumer Profiles" },
      ],
    },
    {
      id: "brand-health",
      icon: Target,
      title: "Brand Health & Communication Tracking",
      description:
        "Monitor and optimize your brand's performance with continuous tracking and in-depth equity measurement.",
      features: [
        "Brand awareness and perception studies",
        "Advertising effectiveness measurement",
        "Message testing and optimization",
        "Competitive brand positioning",
        "Brand equity valuation",
      ],
      image: {
        src: "/brand-tracking-dashboard.jpg",
        alt: "Brand health tracking dashboard and analytics",
      },
      reverse: false,
      stats: [
        { value: "Real-time", label: "Tracking" },
        { value: "40%", label: "ROI Improvement" },
        { value: "100+", label: "Metrics Tracked" },
      ],
    },
    {
      id: "customer-experience",
      icon: Users,
      title: "Customer Experience & Satisfaction",
      description:
        "Enhance customer loyalty and operational excellence through comprehensive experience measurement and journey mapping.",
      features: [
        "Net Promoter Score (NPS) tracking",
        "Customer journey mapping",
        "Touchpoint satisfaction analysis",
        "Churn prediction and prevention",
        "Service quality benchmarking",
      ],
      image: {
        src: "/customer-satisfaction-survey.png",
        alt: "Customer experience and satisfaction survey analysis",
      },
      reverse: true,
      stats: [
        { value: "30%", label: "Churn Reduction" },
        { value: "4.8/5", label: "Client Satisfaction" },
        { value: "360°", label: "Journey Mapping" },
      ],
    },
  ],
  additionalServices: [
    {
      icon: BarChart3,
      title: "Market Entry Studies",
      description:
        "Comprehensive analysis for successful market expansion and entry strategy development.",
    },
    {
      icon: Globe,
      title: "International Research",
      description:
        "Multi-country studies with consistent methodology across global markets.",
    },
    {
      icon: MessageCircle,
      title: "Focus Groups & Qualitative Research",
      description:
        "In-depth qualitative insights to complement quantitative data and uncover deeper motivations.",
    },
  ],
} as const;

// Reusable components
const ServiceCard = ({ service }: any) => {
  const Icon = service.icon;

  return (
    <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/30">
      <div
        className={`grid lg:grid-cols-2 ${
          service.reverse ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Content Section */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Icon className="text-primary" size={32} />
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4 leading-tight">
            {service.title}
          </h2>

          <p className="text-foreground/80 leading-relaxed mb-6 text-base lg:text-lg">
            {service.description}
          </p>

          {/* Stats */}
          <div className="flex gap-6 mb-6">
            {service.stats.map((stat: any, index: any) => (
              <div key={index} className="text-center">
                <div className="text-xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <ul className="space-y-3 mb-8">
            {service.features.map((feature: any, index: any) => (
              <li
                key={index}
                className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300"
              >
                <CheckCircle
                  className="text-primary flex-shrink-0 mt-1"
                  size={20}
                />
                <span className="text-foreground/80 text-sm lg:text-base">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <Button className="w-fit group-hover:scale-105 transition-transform duration-300">
            Request Information{" "}
            <ArrowRight
              size={16}
              className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
            />
          </Button>
        </div>

        {/* Image Section */}
        <div
          className={`bg-gradient-to-br from-secondary/30 to-primary/5 p-8 lg:p-12 flex items-center justify-center ${
            service.reverse ? "order-first lg:order-last" : ""
          }`}
        >
          <div className="relative w-full max-w-md aspect-[4/3]">
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              className="object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Overlay gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

const AdditionalServiceCard = ({ service }: any) => {
  const Icon = service.icon;

  return (
    <Card className="p-6 text-center group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="text-primary" size={24} />
      </div>
      <h3 className="font-bold text-lg text-primary mb-3">{service.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {service.description}
      </p>
    </Card>
  );
};

export default function ServicesPage() {
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

        {/* Main Services */}
        <section className="container mx-auto px-4 lg:px-8 mb-20 lg:mb-24">
          <div className="space-y-16 lg:space-y-20 max-w-6xl mx-auto">
            {PAGE_DATA.services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        {/* Additional Services */}
        <section className="container mx-auto px-4 lg:px-8 mb-20 lg:mb-24">
          <div className="max-w-4xl mx-auto text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Specialized Research Solutions
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Beyond our core services, we offer specialized research
              methodologies to address unique business challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {PAGE_DATA.additionalServices.map((service, index) => (
              <AdditionalServiceCard key={index} service={service} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Ready to Transform Your Insights?
              </h2>
              <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
                Let's discuss how our research services can provide the clarity
                and confidence you need for your most critical decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Schedule a Consultation
                  <ArrowRight size={16} className="ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  Download Service Catalog
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
