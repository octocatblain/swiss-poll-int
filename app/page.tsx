"use client";
import Marquee from "react-fast-marquee";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  PieChart,
  Target,
  Users,
  Globe,
  Lock,
  CheckCircle,
  ArrowRight,
  Download,
  Star,
  X,
} from "react-feather";
import Image from "next/image";
import React from "react";

// Static data declarations for better maintainability
const TRUST_METRICS = [
  { value: "99.7%", label: "Completion Rate" },
  { value: "25+", label: "Years Experience" },
  { value: "500+", label: "Projects Delivered" },
] as const;

const PROMISE_FEATURES = [
  {
    icon: Target,
    title: "Precision Sampling",
    description: "Statistically robust methodologies for projectable results.",
  },
  {
    icon: TrendingUp,
    title: "Depth of Analysis",
    description: "Moving beyond the 'what' to uncover the 'why'.",
  },
  {
    icon: Globe,
    title: "Global Standards",
    description: "International protocols tailored to your market.",
  },
  {
    icon: Lock,
    title: "Strict Confidentiality",
    description: "Your strategic interests protected with utmost security.",
  },
] as const;

const METHODOLOGY_STEPS = [
  {
    number: "1",
    title: "Consultative Scoping",
    description: "We begin by deeply understanding your strategic challenge.",
  },
  {
    number: "2",
    title: "Methodology Design",
    description: "Tailoring the optimal quantitative or qualitative approach.",
  },
  {
    number: "3",
    title: "Rigorous Data Collection",
    description:
      "Utilizing multi-mode platforms for maximum reach and accuracy.",
  },
  {
    number: "4",
    title: "Advanced Statistical Analysis",
    description: "Employing predictive modeling and cross-tabulation.",
  },
  {
    number: "5",
    title: "Strategic Synthesis",
    description:
      "Translating complex data into a clear, executive-level narrative.",
  },
] as const;

const SERVICES = [
  {
    icon: TrendingUp,
    title: "Public Opinion & Political Polling",
    description:
      "Measure public sentiment, track campaign efficacy, and understand policy impact with our gold-standard electoral research.",
    graphic: "line-chart",
    reverse: false,
  },
  {
    icon: PieChart,
    title: "Consumer Insight & Market Segmentation",
    description:
      "Identify emerging trends, define your target audiences, and optimize your product positioning to drive growth.",
    graphic: "pie-chart",
    reverse: true,
  },
  {
    icon: Target,
    title: "Brand Health & Communication Tracking",
    description:
      "Quantify your brand's equity, measure advertising recall, and refine your messaging for maximum impact.",
    graphic: "radar",
    reverse: false,
  },
  {
    icon: Users,
    title: "Customer Experience & Satisfaction",
    description:
      "Pinpoint critical moments in the customer journey to enhance loyalty, reduce churn, and improve operational excellence.",
    graphic: "image",
    reverse: true,
  },
] as const;

const INSIGHTS = [
  {
    title: "Swiss Consumer Confidence Index: Q3 2024 Report",
    description:
      "An in-depth analysis of shifting economic sentiments and their impact on market dynamics.",
    image: "/professional-report-cover-with-charts.jpg",
    action: "download",
    buttonText: "Download the Full Report (PDF)",
  },
  {
    title:
      "The Rise of the Conscious Consumer: Sustainability as a Key Purchase Driver",
    description:
      "How values-based consumption is reshaping brand loyalties and creating new opportunities.",
    image: "/sustainable-shopping-concept.jpg",
    action: "read",
    buttonText: "Read More",
  },
] as const;

// PDF Modal Component
const PdfModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4 bg-white rounded-lg shadow-2xl">
        <Button
          onClick={onClose}
          className="absolute -top-12 right-0 z-10 text-white hover:text-gray-300 transition-colors"
          variant="ghost"
          size="icon"
        >
          <X size={24} />
        </Button>

        <div className="w-full h-full rounded-lg overflow-hidden">
          <iframe
            src="/assets/THE 2025 PERFORMANCE INDEX.pdf"
            className="w-full h-full border-0"
            title="Sample Report PDF"
          />
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <Button
            onClick={onClose}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Close Report
          </Button>
        </div>
      </div>
    </div>
  );
};

// Reusable components
const TrustMetric = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
      {value}
    </div>
    <div className="text-sm text-white/80 uppercase tracking-wide">{label}</div>
  </div>
);

const PromiseCard = ({ icon: Icon, title, description }: any) => (
  <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
    <CardContent className="pt-8 pb-6 text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="text-primary" size={32} />
      </div>
      <h3 className="font-bold text-lg mb-3">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </CardContent>
  </Card>
);

const MethodologyStep = ({ step, index }: any) => (
  <div className="relative">
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mb-4 transition-all duration-300 hover:scale-110">
        {step.number}
      </div>
      <h3 className="font-bold text-lg mb-2">{step.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {step.description}
      </p>
    </div>
    {index < 4 && (
      <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-primary/20" />
    )}
  </div>
);

// Graphic components for better SVG management
const LineChartGraphic = () => (
  <svg
    viewBox="0 0 400 300"
    className="w-full h-auto"
    aria-label="Trend analysis chart"
  >
    <line x1="50" y1="250" x2="350" y2="250" stroke="#003366" strokeWidth="2" />
    <line x1="50" y1="50" x2="50" y2="250" stroke="#003366" strokeWidth="2" />
    <polyline
      points="50,200 100,180 150,160 200,140 250,100 300,80 350,60"
      fill="none"
      stroke="#D64541"
      strokeWidth="3"
    />
    {[50, 100, 150, 200, 250, 300, 350].map((x, i) => (
      <circle key={i} cx={x} cy={200 - i * 20} r="4" fill="#D64541" />
    ))}
    <text x="200" y="280" textAnchor="middle" fontSize="14" fill="#003366">
      Time Period
    </text>
    <text
      x="20"
      y="150"
      textAnchor="middle"
      fontSize="14"
      fill="#003366"
      transform="rotate(-90 20 150)"
    >
      Support %
    </text>
  </svg>
);

const PieChartGraphic = () => (
  <svg
    viewBox="0 0 400 300"
    className="w-full h-auto"
    aria-label="Market segmentation pie chart"
  >
    <circle cx="200" cy="150" r="100" fill="#003366" />
    <path d="M 200 150 L 200 50 A 100 100 0 0 1 283 183 Z" fill="#D64541" />
    <path d="M 200 150 L 283 183 A 100 100 0 0 1 117 183 Z" fill="#C0C0C0" />
    <path d="M 200 150 L 117 183 A 100 100 0 0 1 200 50 Z" fill="#95a5a6" />
    <text x="200" y="280" textAnchor="middle" fontSize="14" fill="#003366">
      Market Segments
    </text>
  </svg>
);

const getFlagEmoji = (countryCode: string) => {
  // Special cases for organizations
  const specialFlags: { [key: string]: string } = {
    EU: "🇪🇺",
    UN: "🇺🇳",
    WHO: "🏥",
  };

  if (specialFlags[countryCode]) {
    return specialFlags[countryCode];
  }

  // Convert country code to flag emoji
  return countryCode
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
};

const RadarChartGraphic = () => (
  <svg
    viewBox="0 0 400 300"
    className="w-full h-auto"
    aria-label="Brand performance radar chart"
  >
    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
      const x1 = 200 + 100 * Math.cos((angle * Math.PI) / 180);
      const y1 = 150 + 100 * Math.sin((angle * Math.PI) / 180);
      return (
        <line
          key={i}
          x1="200"
          y1="150"
          x2={x1}
          y2={y1}
          stroke="#e0e0e0"
          strokeWidth="1"
        />
      );
    })}
    {[25, 50, 75, 100].map((r) => (
      <circle
        key={r}
        cx="200"
        cy="150"
        r={r}
        fill="none"
        stroke="#e0e0e0"
        strokeWidth="1"
      />
    ))}
    <polygon
      points="200,70 260,110 250,180 150,180 140,110"
      fill="#D64541"
      fillOpacity="0.3"
      stroke="#D64541"
      strokeWidth="2"
    />
  </svg>
);

export default function HomePage() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenPdfModal = () => {
    setIsPdfModalOpen(true);
  };

  const handleClosePdfModal = () => {
    setIsPdfModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* PDF Modal */}
      <PdfModal isOpen={isPdfModalOpen} onClose={handleClosePdfModal} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/professional-business-team-analyzing-data-charts-m.jpg"
            alt="Professional research team analyzing data charts"
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-primary/75" />
        </div>

        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 z-0 opacity-10" aria-hidden="true">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="hero-grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-6 inline-block">
              <div className="text-sm font-semibold tracking-wider text-white/90 uppercase mb-2">
                Swiss Precision in Market Research
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
              The Signal in the Noise.
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
              Precision Opinion Research and Consumer Insight to Guide Your Most
              Critical Decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-destructive hover:bg-destructive/90 text-white text-lg px-8 py-6 h-auto shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Request a Proposal
                <ArrowRight size={20} className="ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 h-auto bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white shadow-xl transition-all duration-300"
              >
                View Our Latest Research
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 pt-12 border-t border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                {TRUST_METRICS.map((metric, index) => (
                  <TrustMetric
                    key={index}
                    value={metric.value}
                    label={metric.label}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {!isScrolled && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10">
            <div
              className="flex flex-col items-center text-white/70 animate-bounce"
              aria-hidden="true"
            >
              <div className="text-xs uppercase tracking-wider mb-0">
                Scroll to Explore
              </div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </div>
          </div>
        )}
      </section>

      {/* Our Promise Section */}
      <section id="promise" className="py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
              Methodological Rigor, Uncompromising Integrity.
            </h2>
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
              In a world of overwhelming data, clarity is power. At SWISS POLL
              INTERNATIONAL, we don't just collect data; we engineer
              understanding. Our Swiss heritage of precision is the foundation
              of every project, ensuring the insights you receive are not only
              accurate but actionable and definitive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {PROMISE_FEATURES.map((feature, index) => (
              <PromiseCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
              Actionable Intelligence Across Sectors.
            </h2>
            <p className="text-base md:text-lg text-foreground/80 max-w-3xl mx-auto">
              We partner with leading organizations in government, finance,
              healthcare, and consumer goods to illuminate the path forward.
            </p>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {SERVICES.map((service, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  service.reverse ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={service.reverse ? "order-2 lg:order-1" : ""}>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="text-primary" size={24} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                    {service.title}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <Button
                    variant="outline"
                    className="transition-all duration-300 hover:scale-105"
                    onClick={handleOpenPdfModal}
                  >
                    See Sample Report <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
                <div
                  className={`bg-white p-6 lg:p-8 rounded-lg shadow-lg ${
                    service.reverse ? "order-1 lg:order-2" : ""
                  }`}
                >
                  {service.graphic === "line-chart" && <LineChartGraphic />}
                  {service.graphic === "pie-chart" && <PieChartGraphic />}
                  {service.graphic === "radar" && <RadarChartGraphic />}
                  {service.graphic === "image" && (
                    <Image
                      src="/professional-team-analyzing-customer-data.jpg"
                      alt="Customer Experience Analysis"
                      width={600}
                      height={400}
                      className="rounded-lg w-full h-auto"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
              The Science of Certainty.
            </h2>
            <p className="text-base md:text-lg text-foreground/80 max-w-3xl mx-auto">
              Our process is engineered for one outcome: delivering unshakeable
              truth.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 lg:gap-8 mb-16">
              {METHODOLOGY_STEPS.map((step, index) => (
                <MethodologyStep key={index} step={step} index={index} />
              ))}
            </div>

            <Card className="bg-secondary/50 border-l-4 border-primary transition-all duration-300 hover:shadow-lg">
              <CardContent className="py-8">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="text-center md:text-left">
                    <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                      99.7%
                    </div>
                    <p className="text-foreground/80 leading-relaxed">
                      Our average survey completion rate, reflecting
                      unparalleled data integrity and respondent engagement.
                    </p>
                  </div>
                  <CheckCircle
                    className="text-primary flex-shrink-0"
                    size={48}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section id="insights" className="py-20 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
              From Our Research Desk.
            </h2>
            <p className="text-base md:text-lg text-foreground/80 max-w-3xl mx-auto">
              Explore the trends and narratives shaping public opinion and
              consumer behavior.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {INSIGHTS.map((insight, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-48 lg:h-64">
                  <Image
                    src={insight.image}
                    alt={insight.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl lg:text-2xl font-bold text-primary mb-3">
                    {insight.title}
                  </h3>
                  <p className="text-foreground/80 mb-4 leading-relaxed">
                    {insight.description}
                  </p>
                  <Button
                    className={`w-full transition-all duration-300 hover:scale-105 ${
                      insight.action === "download"
                        ? "bg-primary hover:bg-primary/90"
                        : "bg-transparent"
                    }`}
                    variant={
                      insight.action === "download" ? "default" : "outline"
                    }
                  >
                    {insight.action === "download" && (
                      <Download size={16} className="mr-2" />
                    )}
                    {insight.buttonText}
                    {insight.action === "read" && (
                      <ArrowRight size={16} className="ml-2" />
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
              Trusted by Decision-Makers.
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary/20 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 lg:p-12">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-yellow-400 fill-current"
                      size={20}
                    />
                  ))}
                </div>
                <blockquote className="text-lg md:text-xl text-foreground/90 italic mb-8 leading-relaxed">
                  SWISS POLL INTERNATIONAL provided the clarity we needed to
                  enter a new market. Their data was not just accurate; it was
                  profoundly insightful, directly influencing our successful
                  launch strategy.
                </blockquote>
                <div className="flex items-center justify-end">
                  <div className="text-right">
                    <div className="font-bold text-primary">Dr. Anna Weber</div>
                    <div className="text-sm text-muted-foreground">
                      Chief Strategy Officer, Global Pharma Corp
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Base Your Strategy on Unshakeable Data?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Let's discuss how our research can provide the clarity and
              confidence you need.
            </p>
            <Button
              size="lg"
              className="bg-destructive hover:bg-destructive/90 text-lg px-10 py-6 transition-all duration-300 hover:scale-105"
            >
              Contact Our Research Team
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
