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
  ChevronLeft,
  ChevronRight,
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

// Primary color constant
const PRIMARY_COLOR = "#f9a524";
const PRIMARY_COLOR_LIGHT = "#f9a52420"; // 12% opacity
const PRIMARY_COLOR_DARK = "#d1871a";

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
  { name: "Millennials", value: 35, color: PRIMARY_COLOR },
  { name: "Gen X", value: 28, color: "#003366" },
  { name: "Boomers", value: 22, color: "#D64541" },
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

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "SWISS POLL INTERNATIONAL provided the clarity we needed to enter a new market. Their data was not just accurate; it was profoundly insightful.",
    author: "Dr. Anna Weber",
    position: "Chief Strategy Officer, Global Pharma Corp",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "The depth of analysis and actionable insights transformed our marketing strategy. We saw a 35% increase in customer engagement.",
    author: "Michael Rodriguez",
    position: "Marketing Director, Tech Innovations Inc",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Working with SWISS POLL gave us the competitive edge we needed. Their research methodology is truly world-class.",
    author: "Sarah Chen",
    position: "Product Manager, Consumer Goods Ltd",
    rating: 5,
  },
];

export default function HomePage() {
  const [activeService, setActiveService] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/professional-business-team-analyzing-data.jpg"
            alt="Professional research team"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-primary/75" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-6 inline-block animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div
                className="text-sm font-semibold tracking-wider text-white/90 uppercase px-4 py-2 rounded-full border border-white/30"
                style={{ backgroundColor: PRIMARY_COLOR_LIGHT }}
              >
                Swiss Precision in Market Research
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">
              The Signal in the{" "}
              <span style={{ color: PRIMARY_COLOR }}>Noise</span>.
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-12 leading-relaxed max-w-4xl mx-auto font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              Precision Opinion Research and Consumer Insight to Guide Your Most
              Critical Decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
              <Button
                size="lg"
                style={{ backgroundColor: PRIMARY_COLOR }}
                className="hover:bg-primary/90 text-white text-lg px-8 py-6 h-auto shadow-2xl transition-all duration-300 hover:scale-105 border-0"
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
                    className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    <div
                      className="text-3xl md:text-4xl font-bold mb-2 transition-colors duration-300 group-hover:text-primary"
                      style={{ color: PRIMARY_COLOR }}
                    >
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

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Methodological Rigor,{" "}
              <span style={{ color: PRIMARY_COLOR }}>
                Uncompromising Integrity
              </span>
              .
            </h2>
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
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
                  className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group cursor-pointer"
                  style={{
                    borderColor: isVisible
                      ? PRIMARY_COLOR_LIGHT
                      : "transparent",
                  }}
                >
                  <CardContent className="pt-8 pb-6 text-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300"
                      style={{ backgroundColor: PRIMARY_COLOR_LIGHT }}
                    >
                      <Icon style={{ color: PRIMARY_COLOR }} size={32} />
                    </div>
                    <h3 className="font-bold text-lg mb-3">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section with Interactive Charts */}
      <section className="py-20 lg:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Actionable Intelligence{" "}
              <span style={{ color: PRIMARY_COLOR }}>Across Sectors</span>.
            </h2>
            <p className="text-base md:text-lg text-foreground/80 max-w-3xl mx-auto">
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
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer"
                      style={{ backgroundColor: PRIMARY_COLOR_LIGHT }}
                    >
                      <Icon style={{ color: PRIMARY_COLOR }} size={24} />
                    </div>
                    <h3
                      className="text-2xl md:text-3xl font-bold mb-4"
                      style={{ color: PRIMARY_COLOR }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-foreground/80 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <Button
                      variant="outline"
                      className="transition-all duration-300 hover:scale-105 bg-transparent border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      Learn More <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>

                  <Card
                    className={`p-6 lg:p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1 ${
                      isReverse ? "lg:order-1" : ""
                    }`}
                    style={{ borderColor: PRIMARY_COLOR_LIGHT }}
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
                              stroke={PRIMARY_COLOR}
                              strokeWidth={3}
                              dot={{ r: 5 }}
                              activeDot={{ r: 8, fill: PRIMARY_COLOR }}
                            />
                            <Line
                              type="monotone"
                              dataKey="disapproval"
                              stroke="#003366"
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
                              fill={PRIMARY_COLOR}
                              radius={[8, 8, 0, 0]}
                              activeBar={{ fill: PRIMARY_COLOR_DARK }}
                            />
                          </RechartsBar>
                        </ResponsiveContainer>
                      )}

                      {service.chartType === "image" && (
                        <div className="relative w-full h-[300px] group overflow-hidden rounded-lg">
                          <Image
                            src="/customer-satisfaction-dashboard.jpg"
                            alt="Customer Experience"
                            fill
                            className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
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

      {/* Methodology Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              The Science of{" "}
              <span style={{ color: PRIMARY_COLOR }}>Certainty</span>.
            </h2>
            <p className="text-base md:text-lg text-foreground/80 max-w-3xl mx-auto">
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
                      className="w-16 h-16 text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg cursor-pointer"
                      style={{ backgroundColor: PRIMARY_COLOR }}
                    >
                      {step.number}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {index < 4 && (
                    <div
                      className="hidden md:block absolute top-8 left-full w-full h-0.5 transition-colors duration-300 group-hover:bg-primary"
                      style={{ backgroundColor: PRIMARY_COLOR_LIGHT }}
                    />
                  )}
                </div>
              ))}
            </div>

            <Card
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${PRIMARY_COLOR_LIGHT} 0%, rgba(249, 165, 36, 0.05) 100%)`,
                borderColor: PRIMARY_COLOR_LIGHT,
              }}
            >
              <CardContent className="py-8">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="text-center md:text-left">
                    <div
                      className="text-4xl lg:text-5xl font-bold mb-2"
                      style={{ color: PRIMARY_COLOR }}
                    >
                      99.7%
                    </div>
                    <p className="text-foreground/80 leading-relaxed">
                      Average survey completion rate, reflecting unparalleled
                      data integrity.
                    </p>
                  </div>
                  <CheckCircle
                    style={{ color: PRIMARY_COLOR }}
                    className="flex-shrink-0"
                    size={48}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Trusted by{" "}
              <span style={{ color: PRIMARY_COLOR }}>Decision-Makers</span>.
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <Card
              className="border-2 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              style={{ borderColor: PRIMARY_COLOR_LIGHT }}
            >
              <CardContent className="p-8 lg:p-12">
                <div className="flex mb-4">
                  {[...Array(TESTIMONIALS[activeTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        style={{ color: PRIMARY_COLOR }}
                        className="fill-current"
                        size={20}
                      />
                    )
                  )}
                </div>
                <blockquote className="text-lg md:text-xl text-foreground/90 italic mb-8 leading-relaxed min-h-[120px]">
                  "{TESTIMONIALS[activeTestimonial].quote}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="font-bold" style={{ color: PRIMARY_COLOR }}>
                      {TESTIMONIALS[activeTestimonial].author}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {TESTIMONIALS[activeTestimonial].position}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prevTestimonial}
                      className="rounded-full"
                      style={{
                        borderColor: PRIMARY_COLOR,
                        color: PRIMARY_COLOR,
                      }}
                    >
                      <ChevronLeft size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={nextTestimonial}
                      className="rounded-full"
                      style={{
                        borderColor: PRIMARY_COLOR,
                        color: PRIMARY_COLOR,
                      }}
                    >
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial ? "scale-125" : "scale-100"
                  }`}
                  style={{
                    backgroundColor:
                      index === activeTestimonial
                        ? PRIMARY_COLOR
                        : PRIMARY_COLOR_LIGHT,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        className="py-20 lg:py-32 text-primary-foreground relative overflow-hidden"
        style={{ backgroundColor: PRIMARY_COLOR }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              Ready to Base Your Strategy on Unshakeable Data?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-95 text-white">
              Let's discuss how our research can provide the clarity and
              confidence you need.
            </p>
            <Button
              size="lg"
              className="bg-white hover:bg-white/90 text-primary text-lg px-10 py-6 transition-all duration-300 hover:scale-105 border-0 font-bold shadow-2xl"
              style={{ color: PRIMARY_COLOR }}
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
