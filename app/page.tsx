"use client";

import { useState, useEffect } from "react";
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
  Star,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";
import Image from "next/image";
import {
  Line,
  Bar,
  Pie,
  LineChart as RechartsLine,
  BarChart as RechartsBar,
  PieChart as RechartsPie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Color constants
const ACCENT_COLOR = "#f9a524";
const ACCENT_COLOR_LIGHT = "#f9a52433"; // 20% opacity
const SECTION_BG_LIGHT = "#FBF0B9";
const SECTION_BG_DARK = "#303133";
const SECTION_BG_NEUTRAL = "#f8f9fa";

// Fake data for charts
const trendData = [
  { month: "Jan", approval: 45, disapproval: 35 },
  { month: "Feb", approval: 48, disapproval: 32 },
  { month: "Mar", approval: 52, disapproval: 30 },
  { month: "Apr", approval: 55, disapproval: 28 },
  { month: "May", approval: 58, disapproval: 25 },
  { month: "Jun", approval: 62, disapproval: 22 },
];

const segmentData = [
  { name: "Millennials", value: 35, color: ACCENT_COLOR },
  { name: "Gen X", value: 28, color: "#D64541" },
  { name: "Boomers", value: 22, color: "#003366" },
  { name: "Gen Z", value: 15, color: "#95a5a6" },
];

const brandData = [
  { metric: "Awareness", score: 85 },
  { metric: "Trust", score: 78 },
  { metric: "Quality", score: 82 },
  { metric: "Value", score: 75 },
  { metric: "Loyalty", score: 80 },
];

const TRUST_METRICS = [
  { value: "99.7%", label: "Completion Rate" },
  { value: "25+", label: "Years Experience" },
  { value: "500+", label: "Projects Delivered" },
];

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
];

const SERVICES = [
  {
    icon: TrendingUp,
    title: "Public Opinion & Political Polling",
    description:
      "Measure public sentiment, track campaign efficacy, and understand policy impact with our gold-standard electoral research.",
    chartType: "line",
  },
  {
    icon: PieChart,
    title: "Consumer Insight & Market Segmentation",
    description:
      "Identify emerging trends, define your target audiences, and optimize your product positioning to drive growth.",
    chartType: "pie",
  },
  {
    icon: Target,
    title: "Brand Health & Communication Tracking",
    description:
      "Quantify your brand's equity, measure advertising recall, and refine your messaging for maximum impact.",
    chartType: "bar",
  },
  {
    icon: Users,
    title: "Customer Experience & Satisfaction",
    description:
      "Pinpoint critical moments in the customer journey to enhance loyalty, reduce churn, and improve operational excellence.",
    chartType: "image",
  },
];

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
];

const INSIGHTS = [
  {
    title: "The 2025 Performance Index",
    description:
      "A comprehensive national survey by Swiss Poll International and Politrack Africa, provides a data-driven assessment of Kenya's public officials based on citizen perception. The report aims to cut through political rhetoric by evaluating leaders on key metrics like service delivery, transparency, and economic development.",
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
];

// Enhanced testimonials data
const TESTIMONIALS = [
  {
    id: 1,
    name: "Dr. Anna Weber",
    position: "Chief Strategy Officer, Global Pharma Corp",
    content:
      "SWISS POLL INTERNATIONAL provided the clarity we needed to enter a new market. Their data was not just accurate; it was profoundly insightful.",
    rating: 5,
    avatar: "/placeholder-avatar1.jpg",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    position: "Marketing Director, Tech Innovations Ltd",
    content:
      "The depth of analysis from Swiss Poll helped us identify a completely new customer segment we hadn't considered. Our product positioning is now 40% more effective.",
    rating: 5,
    avatar: "/placeholder-avatar2.jpg",
  },
  {
    id: 3,
    name: "Sarah Chen",
    position: "Policy Advisor, Government Agency",
    content:
      "In political polling, accuracy is everything. Swiss Poll's methodology delivered results within a 1% margin of error in our last election cycle.",
    rating: 5,
    avatar: "/placeholder-avatar3.jpg",
  },
  {
    id: 4,
    name: "James Okafor",
    position: "CEO, Retail Chain Africa",
    content:
      "Their customer satisfaction research transformed our service delivery. We've seen a 25% increase in customer retention since implementing their recommendations.",
    rating: 5,
    avatar: "/placeholder-avatar4.jpg",
  },
  {
    id: 5,
    name: "Elena Petrova",
    position: "Brand Manager, Luxury Cosmetics",
    content:
      "The brand tracking study revealed insights about our messaging that we'd completely missed. Our campaign ROI improved by 60% after the adjustments.",
    rating: 5,
    avatar: "/placeholder-avatar5.jpg",
  },
];

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
            className="text-white hover:bg-accent/90"
            style={{ backgroundColor: ACCENT_COLOR }}
          >
            Close Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [activeService, setActiveService] = useState(0);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, TESTIMONIALS.length]);

  const handleOpenPdfModal = () => {
    setIsPdfModalOpen(true);
  };

  const handleClosePdfModal = () => {
    setIsPdfModalOpen(false);
  };

  const handleDownloadPdf = () => {
    const link = document.createElement("a");
    link.href = "/assets/THE 2025 PERFORMANCE INDEX.pdf";
    link.download = "THE 2025 PERFORMANCE INDEX.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  return (
    <div className="min-h-screen">
      <Header />

      <PdfModal isOpen={isPdfModalOpen} onClose={handleClosePdfModal} />

      {/* Hero Section with Background Image and Gradient */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/professional-business-team-analyzing-data.jpg"
            alt="Professional research team analyzing data"
            fill
            className="object-cover"
            priority
          />
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40" />
          {/* Additional gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/70" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-6 inline-block animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div
                className="text-sm font-semibold tracking-wider text-white/90 uppercase px-4 py-2 rounded-full border border-white/30 backdrop-blur-sm"
                style={{ backgroundColor: ACCENT_COLOR }}
              >
                Swiss Precision in Market Research
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">
              The Signal in the Noise.
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-12 leading-relaxed max-w-4xl mx-auto font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              Precision Opinion Research and Consumer Insight to Guide Your Most
              Critical Decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
              <Button
                size="lg"
                className="text-white text-lg px-8 py-6 h-auto shadow-2xl transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: ACCENT_COLOR }}
              >
                Request a Proposal
                <ArrowRight size={20} className="ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 h-auto bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white shadow-xl transition-all duration-300"
              >
                View Our Research
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 pt-12 border-t border-white/20 animate-in fade-in duration-1000 delay-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                {TRUST_METRICS.map((metric, index) => (
                  <div
                    key={index}
                    className="text-center group hover:scale-105 transition-transform"
                  >
                    <div className="text-3xl md:text-4xl font-bold mb-2">
                      {metric.value}
                    </div>
                    <div className="text-sm opacity-80 uppercase tracking-wide">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise Section with Light Background */}
      <section
        className="py-20 lg:py-32"
        style={{ backgroundColor: SECTION_BG_LIGHT }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
              Methodological Rigor, Uncompromising Integrity.
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              In a world of overwhelming data, clarity is power. We engineer
              understanding with Swiss precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {PROMISE_FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="border border-gray-200 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                >
                  <CardContent className="pt-8 pb-6 text-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300"
                      style={{ backgroundColor: ACCENT_COLOR_LIGHT }}
                    >
                      <Icon size={32} style={{ color: ACCENT_COLOR }} />
                    </div>
                    <h3 className="font-bold text-lg mb-3 text-black">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section with Neutral Background */}
      <section
        className="py-20 lg:py-32"
        style={{ backgroundColor: SECTION_BG_NEUTRAL }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
              Actionable Intelligence Across Sectors.
            </h2>
            <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
              We partner with leading organizations to illuminate the path
              forward.
            </p>
          </div>

          <div className="space-y-16 lg:space-y-24 max-w-7xl mx-auto">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              const isReverse = index % 2 !== 0;

              return (
                <div
                  key={index}
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                    isReverse ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={isReverse ? "lg:order-2" : ""}>
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 hover:scale-110 transition-transform cursor-pointer"
                      style={{ backgroundColor: ACCENT_COLOR_LIGHT }}
                    >
                      <Icon size={24} style={{ color: ACCENT_COLOR }} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <Button
                      variant="outline"
                      className="transition-all duration-300 hover:scale-105 bg-white border-gray-300 text-black hover:border-accent hover:text-accent"
                      onClick={handleOpenPdfModal}
                    >
                      See Sample Report{" "}
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>

                  <Card
                    className={`p-6 lg:p-8 bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 ${
                      isReverse ? "lg:order-1" : ""
                    }`}
                  >
                    <CardContent className="p-0">
                      {service.chartType === "line" && (
                        <ResponsiveContainer width="100%" height={300}>
                          <RechartsLine data={trendData}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#e0e0e0"
                            />
                            <XAxis dataKey="month" stroke="#666" />
                            <YAxis stroke="#666" />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="approval"
                              stroke={ACCENT_COLOR}
                              strokeWidth={3}
                              dot={{ r: 5 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="disapproval"
                              stroke="#D64541"
                              strokeWidth={3}
                              dot={{ r: 5 }}
                            />
                          </RechartsLine>
                        </ResponsiveContainer>
                      )}

                      {service.chartType === "pie" && (
                        <ResponsiveContainer width="100%" height={300}>
                          <RechartsPie>
                            <Pie
                              data={segmentData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) =>
                                `${name} ${(percent * 100).toFixed(0)}%`
                              }
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {segmentData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ))}
                            </Pie>
                            <Tooltip />
                          </RechartsPie>
                        </ResponsiveContainer>
                      )}

                      {service.chartType === "bar" && (
                        <ResponsiveContainer width="100%" height={300}>
                          <RechartsBar data={brandData}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#e0e0e0"
                            />
                            <XAxis dataKey="metric" stroke="#666" />
                            <YAxis stroke="#666" />
                            <Tooltip />
                            <Bar
                              dataKey="score"
                              fill={ACCENT_COLOR}
                              radius={[8, 8, 0, 0]}
                            />
                          </RechartsBar>
                        </ResponsiveContainer>
                      )}

                      {service.chartType === "image" && (
                        <div className="relative w-full h-[300px]">
                          <Image
                            src="/customer-satisfaction-dashboard.png"
                            alt="Customer Experience"
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology Section with Dark Background */}
      <section
        className="py-20 lg:py-32 text-white"
        style={{ backgroundColor: SECTION_BG_DARK }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              The Science of Certainty.
            </h2>
            <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
              Our process is engineered for one outcome: delivering unshakeable
              truth.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 lg:gap-8 mb-16">
              {METHODOLOGY_STEPS.map((step, index) => (
                <div key={index} className="relative group">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className="w-16 h-16 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg cursor-pointer"
                      style={{ backgroundColor: ACCENT_COLOR }}
                    >
                      {step.number}
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-white">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {index < 4 && (
                    <div
                      className="hidden md:block absolute top-8 left-full w-full h-0.5 transition-colors"
                      style={{ backgroundColor: ACCENT_COLOR_LIGHT }}
                    />
                  )}
                </div>
              ))}
            </div>

            <Card
              className="hover:shadow-xl transition-all duration-300 border-0"
              style={{
                backgroundColor: ACCENT_COLOR_LIGHT,
                borderColor: ACCENT_COLOR,
              }}
            >
              <CardContent className="py-8">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="text-center md:text-left">
                    <div className="text-4xl lg:text-5xl font-bold mb-2 text-white">
                      99.7%
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      Average survey completion rate, reflecting unparalleled
                      data integrity.
                    </p>
                  </div>
                  <CheckCircle
                    style={{ color: ACCENT_COLOR }}
                    className="flex-shrink-0"
                    size={48}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Insights Section with Light Background */}
      <section
        className="py-20 lg:py-32"
        style={{ backgroundColor: SECTION_BG_LIGHT }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
              From Our Research Desk.
            </h2>
            <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
              Explore the trends and narratives shaping public opinion and
              consumer behavior.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {INSIGHTS.map((insight, index) => (
              <Card
                key={index}
                className="overflow-hidden bg-white hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 cursor-pointer border border-gray-200"
              >
                <div className="relative h-48 lg:h-64">
                  <Image
                    src={insight.image || "/placeholder.svg"}
                    alt={insight.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl lg:text-2xl font-bold text-black mb-3">
                    {insight.title}
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {insight.description}
                  </p>
                  <Button
                    className={`w-full transition-all duration-300 hover:scale-105 ${
                      insight.action === "download"
                        ? "text-white hover:bg-accent/90"
                        : "bg-white border-gray-300 text-black hover:border-accent hover:text-accent"
                    }`}
                    variant={
                      insight.action === "download" ? "default" : "outline"
                    }
                    onClick={() => {
                      if (insight.action === "download") {
                        handleDownloadPdf();
                      }
                    }}
                    style={
                      insight.action === "download"
                        ? {
                            backgroundColor: ACCENT_COLOR,
                          }
                        : {}
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

      {/* Enhanced Testimonials Section with Neutral Background */}
      <section
        className="py-20 lg:py-32"
        style={{ backgroundColor: SECTION_BG_NEUTRAL }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
              Trusted by Decision-Makers.
            </h2>
            <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
              Hear from leaders who have transformed their strategies with our
              insights
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Testimonial Navigation */}
              <div className="flex justify-between items-center mb-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="rounded-full border-gray-300 hover:border-accent"
                  style={{ color: ACCENT_COLOR }}
                >
                  <ChevronLeft size={20} />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setAutoPlay(!autoPlay)}
                  className="rounded-full border-gray-300 hover:border-accent"
                  style={{ color: ACCENT_COLOR }}
                >
                  {autoPlay ? <Pause size={20} /> : <Play size={20} />}
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="rounded-full border-gray-300 hover:border-accent"
                  style={{ color: ACCENT_COLOR }}
                >
                  <ChevronRight size={20} />
                </Button>
              </div>

              {/* Testimonial Display */}
              <Card className="bg-white border border-gray-200 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 lg:p-12">
                  <div className="flex flex-col lg:flex-row gap-8 items-center">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                        style={{ backgroundColor: ACCENT_COLOR }}
                      >
                        {TESTIMONIALS[currentTestimonial].name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex mb-4">
                        {[
                          ...Array(TESTIMONIALS[currentTestimonial].rating),
                        ].map((_, i) => (
                          <Star
                            key={i}
                            className="text-yellow-400 fill-current"
                            size={20}
                          />
                        ))}
                      </div>
                      <blockquote className="text-lg md:text-xl text-gray-800 italic mb-6 leading-relaxed">
                        "{TESTIMONIALS[currentTestimonial].content}"
                      </blockquote>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-black">
                            {TESTIMONIALS[currentTestimonial].name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {TESTIMONIALS[currentTestimonial].position}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {currentTestimonial + 1} / {TESTIMONIALS.length}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {TESTIMONIALS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? "scale-125" : "scale-100"
                    }`}
                    style={{
                      backgroundColor:
                        index === currentTestimonial
                          ? ACCENT_COLOR
                          : ACCENT_COLOR_LIGHT,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Additional Testimonial Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {TESTIMONIALS.slice(0, 3).map((testimonial, index) => (
                <Card
                  key={testimonial.id}
                  className="p-6 bg-white hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 border border-gray-200"
                  onClick={() => goToTestimonial(index)}
                >
                  <CardContent className="p-0">
                    <div className="flex mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="text-yellow-400 fill-current"
                          size={16}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 italic mb-4 line-clamp-3">
                      "{testimonial.content}"
                    </p>
                    <div className="font-medium text-sm text-black">
                      {testimonial.name}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section with Dark Background */}
      <section
        className="py-20 lg:py-32 text-white"
        style={{ backgroundColor: SECTION_BG_DARK }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Base Your Strategy on Unshakeable Data?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-gray-300">
              Let's discuss how our research can provide the clarity and
              confidence you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-white text-lg px-10 py-6 transition-all duration-300 hover:scale-105 hover:bg-accent/90"
                style={{ backgroundColor: ACCENT_COLOR }}
              >
                Contact Our Research Team
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-6 bg-transparent border-white text-white hover:bg-white/10 transition-all duration-300"
              >
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
