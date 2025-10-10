"use client";

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
  Download,
  Calendar,
} from "react-feather";
import Image from "next/image";
import { BarChart3 } from "lucide-react";
import { useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#f9a524]/30 bg-gradient-to-br from-white to-gray-50/50 hover:from-[#f9a524]/5 hover:to-[#f9a524]/2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`grid lg:grid-cols-2 ${
          service.reverse ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Content Section */}
        <div className="p-8 lg:p-12 flex flex-col justify-center relative">
          {/* Animated background element */}
          <div
            className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#f9a524] to-transparent transition-all duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          <div className="w-16 h-16 bg-[#f9a524]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#f9a524]/20 transition-all duration-300 group-hover:shadow-lg">
            <Icon className="text-[#f9a524]" size={32} />
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4 leading-tight group-hover:text-[#f9a524] transition-colors duration-300">
            {service.title}
          </h2>

          <p className="text-foreground/80 leading-relaxed mb-6 text-base lg:text-lg group-hover:text-foreground/90 transition-colors duration-300">
            {service.description}
          </p>

          {/* Stats */}
          <div className="flex gap-6 mb-6">
            {service.stats.map((stat: any, index: any) => (
              <div
                key={index}
                className="text-center group/stat hover:scale-110 transition-all duration-300 p-3 rounded-lg hover:bg-[#f9a524]/5 cursor-pointer"
              >
                <div className="text-xl font-bold text-[#f9a524] group-hover/stat:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1 group-hover/stat:text-foreground/80 transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <ul className="space-y-3 mb-8">
            {service.features.map((feature: any, index: any) => (
              <li
                key={index}
                className="flex items-start gap-3 group-hover:translate-x-2 transition-all duration-300 hover:bg-[#f9a524]/5 p-2 rounded-lg cursor-pointer"
              >
                <CheckCircle
                  className="text-[#f9a524] flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300"
                  size={20}
                />
                <span className="text-foreground/80 text-sm lg:text-base group-hover:text-foreground transition-colors">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <Button className="w-fit group-hover:scale-105 transition-all duration-300 bg-[#f9a524] hover:bg-[#f9a524]/90 border-2 border-transparent hover:border-[#f9a524] hover:shadow-lg group/btn">
            Request Information{" "}
            <ArrowRight
              size={16}
              className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
            />
          </Button>
        </div>

        {/* Image Section */}
        <div
          className={`bg-gradient-to-br from-secondary/30 to-[#f9a524]/5 p-8 lg:p-12 flex items-center justify-center relative overflow-hidden group/image ${
            service.reverse ? "order-first lg:order-last" : ""
          }`}
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f9a524_1px,transparent_1px)] bg-[length:20px_20px] animate-pulse-slow" />
          </div>

          <div className="relative w-full max-w-md aspect-[4/3] z-10">
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              className="object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-700 group-hover/image:rotate-1"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Interactive overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />
            {/* Hover effect border */}
            <div className="absolute inset-0 border-2 border-transparent rounded-xl group-hover:border-[#f9a524]/30 transition-all duration-500" />
          </div>
        </div>
      </div>
    </Card>
  );
};

const AdditionalServiceCard = ({ service }: any) => {
  const Icon = service.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="p-6 text-center group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#f9a524]/20 bg-gradient-to-b from-white to-gray-50/50 hover:from-[#f9a524]/5 hover:to-[#f9a524]/2 hover:-translate-y-2 cursor-pointer relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-[#f9a524]/0 to-[#f9a524]/0 group-hover:from-[#f9a524]/5 group-hover:to-[#f9a524]/10 transition-all duration-500 ${
          isHovered ? "scale-100" : "scale-0"
        }`}
      />

      <div className="relative z-10">
        <div className="w-12 h-12 bg-[#f9a524]/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-[#f9a524]/20 transition-all duration-300 group-hover:shadow-lg">
          <Icon className="text-[#f9a524]" size={24} />
        </div>
        <h3 className="font-bold text-lg text-primary mb-3 group-hover:text-[#f9a524] transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
          {service.description}
        </p>
      </div>
    </Card>
  );
};

export default function ServicesPage() {
  const [isHovered, setIsHovered] = useState(false);

  const handleDownloadCatalog = () => {
    // Simulate download action
    console.log("Downloading service catalog...");
  };

  const handleScheduleConsultation = () => {
    // Simulate scheduling action
    console.log("Scheduling consultation...");
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 lg:px-8 mb-16 lg:mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 tracking-tight group">
              {PAGE_DATA.hero.title}
              <span className="block h-1 w-0 group-hover:w-48 bg-gradient-to-r from-[#f9a524] to-transparent transition-all duration-1000 mx-auto mt-4" />
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto group-hover:text-foreground/90 transition-colors duration-300">
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
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 group hover:text-[#f9a524] transition-colors duration-300 cursor-pointer">
              Specialized Research Solutions
              <span className="block h-0.5 w-0 group-hover:w-32 bg-gradient-to-r from-[#f9a524] to-transparent transition-all duration-500 mx-auto mt-2" />
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
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
            <Card
              className="bg-gradient-to-br from-[#f9a524]/5 to-[#f9a524]/10 border-[#f9a524]/20 p-12 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group relative overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Animated background elements */}
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#f9a524] to-transparent transition-all duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#f9a524_1px,transparent_1px)] bg-[length:20px_20px] opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 group-hover:text-[#f9a524] transition-colors duration-300">
                Ready to Transform Your Insights?
              </h2>
              <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto group-hover:text-foreground/90 transition-colors duration-300">
                Let's discuss how our research services can provide the clarity
                and confidence you need for your most critical decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-[#f9a524] hover:bg-[#f9a524]/90 transition-all duration-300 hover:scale-105 hover:shadow-lg group/consult"
                  onClick={handleScheduleConsultation}
                >
                  <Calendar
                    size={16}
                    className="mr-2 transition-transform duration-300 group-hover/consult:scale-110"
                  />
                  Schedule a Consultation
                  <ArrowRight
                    size={16}
                    className="ml-2 transition-transform duration-300 group-hover/consult:translate-x-1"
                  />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#f9a524] text-[#f9a524] hover:bg-[#f9a524] hover:text-white transition-all duration-300 hover:scale-105 group/download"
                  onClick={handleDownloadCatalog}
                >
                  <Download
                    size={16}
                    className="mr-2 transition-transform duration-300 group-hover/download:-translate-y-1"
                  />
                  Download Service Catalog
                </Button>
              </div>
            </Card>
          </div>
        </section>
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
