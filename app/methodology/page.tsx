"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Target,
  Database,
  BarChart2,
  FileText,
  Shield,
  Clock,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useState, useRef, useEffect } from "react";

// Fake data for quality metrics visualization
const qualityData = [
  { metric: "Accuracy", value: 98 },
  { metric: "Speed", value: 95 },
  { metric: "Coverage", value: 92 },
  { metric: "Reliability", value: 99 },
  { metric: "Innovation", value: 90 },
];

const PROCESS = [
  {
    number: "1",
    icon: Target,
    title: "Consultative Scoping",
    description:
      "We begin every engagement with a deep-dive consultation to understand your strategic objectives, competitive landscape, and decision-making needs.",
    details: [
      "Stakeholder interviews",
      "Objective definition",
      "Success criteria establishment",
      "Timeline and budget planning",
    ],
    duration: "1-3 days",
  },
  {
    number: "2",
    icon: FileText,
    title: "Methodology Design",
    description:
      "Our expert methodologists craft a custom research approach, selecting the optimal combination of quantitative and qualitative techniques.",
    details: [
      "Sample design and size calculation",
      "Questionnaire development",
      "Mode selection (online, phone, face-to-face)",
      "Quality control protocols",
    ],
    duration: "2-5 days",
  },
  {
    number: "3",
    icon: Database,
    title: "Rigorous Data Collection",
    description:
      "Utilizing state-of-the-art multi-mode platforms and our extensive panel networks, we execute fieldwork with meticulous attention to data quality.",
    details: [
      "Multi-channel deployment",
      "Real-time monitoring",
      "Quality assurance checks",
      "Respondent verification",
    ],
    duration: "7-21 days",
  },
  {
    number: "4",
    icon: BarChart2,
    title: "Advanced Statistical Analysis",
    description:
      "Our team of statisticians and data scientists employ sophisticated analytical techniques including predictive modeling and segmentation analysis.",
    details: [
      "Statistical significance testing",
      "Regression and correlation analysis",
      "Segmentation and clustering",
      "Predictive modeling",
    ],
    duration: "3-7 days",
  },
  {
    number: "5",
    icon: Shield,
    title: "Strategic Synthesis",
    description:
      "We transform complex data into clear, actionable narratives tailored for executive decision-making, complete with strategic recommendations.",
    details: [
      "Executive summary preparation",
      "Data visualization",
      "Strategic recommendations",
      "Presentation and workshop delivery",
    ],
    duration: "2-5 days",
  },
];

const QUALITY_METRICS = [
  { value: "99.7%", label: "Average completion rate", icon: CheckCircle },
  { value: "±2.5%", label: "Typical margin of error", icon: Target },
  { value: "95%", label: "Confidence level standard", icon: Shield },
  { value: "24/7", label: "Real-time monitoring", icon: Clock },
];

const METHODOLOGIES = [
  {
    title: "Quantitative Research",
    description:
      "Structured data collection for statistical analysis and projectable insights.",
    techniques: [
      "Online Surveys",
      "Telephone Interviews",
      "Face-to-Face",
      "Mobile Research",
    ],
  },
  {
    title: "Qualitative Research",
    description:
      "In-depth exploration of attitudes, behaviors, and motivations.",
    techniques: [
      "Focus Groups",
      "In-depth Interviews",
      "Ethnographic Studies",
      "Online Communities",
    ],
  },
  {
    title: "Mixed Methods",
    description:
      "Integrated approaches combining quantitative and qualitative insights.",
    techniques: [
      "Sequential Design",
      "Concurrent Triangulation",
      "Embedded Design",
      "Transformative Design",
    ],
  },
];

const CERTIFICATIONS = {
  title: "Certifications & Memberships",
  description:
    "Swiss Poll International adheres to the strictest international standards for market research and opinion polling.",
  items: [
    "ESOMAR (European Society for Opinion and Marketing Research)",
    "WAPOR (World Association for Public Opinion Research)",
    "ISO 20252:2019 Certified (Market, opinion and social research)",
    "Swiss Marketing Association",
    "GDPR Compliant & Data Secure",
  ],
};

// Interactive Step Component
const ProcessStep = ({ step, index, isExpanded, onToggle }: any) => {
  const Icon = step.icon;
  const contentRef: any = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isExpanded]);

  return (
    <Card
      key={index}
      className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#f9a524]/30 cursor-pointer bg-gradient-to-br from-white to-gray-50/50 hover:from-[#f9a524]/5 hover:to-[#f9a524]/2"
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f9a524_1px,transparent_1px)] bg-[length:20px_20px] animate-pulse-slow" />
      </div>

      <CardContent className="p-0 relative z-10">
        <div className="grid md:grid-cols-12 gap-4 sm:gap-6">
          {/* Number Badge */}
          <div className="md:col-span-2 bg-gradient-to-br from-[#f9a524] to-[#f9a524]/90 text-white flex flex-col items-center justify-center p-4 sm:p-6 relative group-hover:scale-105 transition-transform duration-300 group-hover:shadow-lg">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
              {step.number}
            </div>
            <div className="text-xs sm:text-sm text-white/80 text-center group-hover:text-white transition-colors">
              {step.duration}
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-10 p-4 sm:p-6 lg:p-8">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-[#f9a524]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-[#f9a524]/20 transition-all duration-300 group-hover:shadow-lg">
                <Icon className="text-[#f9a524]" size={28} />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#f9a524] mb-3 group-hover:text-[#f9a524]/90 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-foreground/80 leading-relaxed mb-4 text-sm sm:text-base lg:text-lg group-hover:text-foreground/90 transition-colors">
                      {step.description}
                    </p>
                  </div>
                  <button className="ml-4 p-2 hover:bg-[#f9a524]/10 rounded-full transition-all duration-300 hover:scale-110 group/btn">
                    {isExpanded ? (
                      <ChevronUp className="text-[#f9a524] group-hover/btn:scale-110 transition-transform" />
                    ) : (
                      <ChevronDown className="text-[#f9a524] group-hover/btn:scale-110 transition-transform" />
                    )}
                  </button>
                </div>

                <div
                  ref={contentRef}
                  className="overflow-hidden transition-all duration-500"
                  style={{
                    maxHeight: isExpanded ? `${contentHeight}px` : "0px",
                  }}
                >
                  <ul className="grid md:grid-cols-2 gap-3 pt-4 border-t border-[#f9a524]/10">
                    {step.details.map((detail: any, i: any) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 group-hover:translate-x-2 transition-all duration-300 p-2 rounded-lg hover:bg-[#f9a524]/5 cursor-pointer border border-transparent hover:border-[#f9a524]/20"
                      >
                        <CheckCircle
                          className="text-[#f9a524] flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300"
                          size={18}
                        />
                        <span className="text-sm lg:text-base text-foreground/80 group-hover:text-foreground transition-colors">
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Interactive Methodology Card
const MethodologyCard = ({ method, index }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      key={index}
      className="p-6 group hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#f9a524]/30 hover:-translate-y-3 cursor-pointer relative overflow-hidden bg-gradient-to-br from-white to-gray-50/50 hover:from-[#f9a524]/5 hover:to-[#f9a524]/2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-[#f9a524]/5 to-[#f9a524]/10 transition-all duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Animated border */}
      <div
        className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#f9a524] to-transparent transition-all duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative z-10">
        <h3 className="font-bold text-lg text-[#f9a524] mb-3 group-hover:text-[#f9a524]/90 transition-colors duration-300">
          {method.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
          {method.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {method.techniques.map((technique: any, idx: any) => (
            <span
              key={idx}
              className="inline-block px-3 py-1 text-xs bg-[#f9a524]/10 text-[#f9a524] rounded-full border border-[#f9a524]/20 group-hover:border-[#f9a524]/30 transition-all duration-300 hover:scale-110 hover:bg-[#f9a524]/20 hover:shadow-lg cursor-pointer group/tech"
            >
              {technique}
              <ArrowRight
                size={10}
                className="ml-1 inline opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300"
              />
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

// Interactive Quality Metric Card
const QualityMetricCard = ({ metric, index, animatedValue }: any) => {
  const Icon = metric.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      key={index}
      className="text-center group hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#f9a524]/30 hover:-translate-y-3 cursor-pointer bg-gradient-to-br from-white to-gray-50/50 hover:from-[#f9a524]/5 hover:to-[#f9a524]/2 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f9a524_1px,transparent_1px)] bg-[length:15px_15px] animate-pulse-slow" />
      </div>

      <CardContent className="pt-8 pb-6 relative z-10">
        <div className="w-12 h-12 bg-[#f9a524]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-[#f9a524]/20 transition-all duration-300 group-hover:shadow-lg">
          <Icon
            className="text-[#f9a524] group-hover:scale-110 transition-transform duration-300"
            size={24}
          />
        </div>
        <div className="text-3xl lg:text-4xl font-bold text-[#f9a524] mb-2 group-hover:scale-110 transition-transform duration-300">
          {index === 1
            ? `±${animatedValue?.toFixed(1)}%`
            : index === 3
            ? "24/7"
            : `${animatedValue?.toFixed(index === 0 ? 1 : 0)}%`}
        </div>
        <p className="text-sm text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300">
          {metric.label}
        </p>
      </CardContent>
    </Card>
  );
};

export default function MethodologyPage() {
  const [expandedStep, setExpandedStep] = useState(0);
  const [animatedMetrics, setAnimatedMetrics] = useState([0, 0, 0, 0]);
  const [heroHovered, setHeroHovered] = useState(false);
  const [sectionHovered, setSectionHovered] = useState({
    methodologies: false,
    quality: false,
    certifications: false,
  });

  // Animate metrics on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const finalValues = [99.7, 2.5, 95, 100];
            const duration = 2000;
            const steps = 60;
            const stepValues = finalValues.map((value) => value / steps);

            let currentStep = 0;
            const timer = setInterval(() => {
              currentStep++;
              setAnimatedMetrics(
                stepValues.map((step, index) =>
                  Math.min(step * currentStep, finalValues[index])
                )
              );

              if (currentStep === steps) {
                clearInterval(timer);
                setAnimatedMetrics(finalValues);
              }
            }, duration / steps);

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("quality-metrics");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 lg:px-8 mb-16 lg:mb-24">
          <div
            className="max-w-4xl mx-auto text-center group"
            onMouseEnter={() => setHeroHovered(true)}
            onMouseLeave={() => setHeroHovered(false)}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold  mb-6 tracking-tight group-hover:scale-105 transition-transform duration-500">
              Our Methodology
              <span
                className={`block h-1 w-0 group-hover:w-80 bg-gradient-to-r from-[#f9a524] to-transparent transition-all duration-1000 mx-auto mt-4 ${
                  heroHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
              The Science of Certainty: Our rigorous, transparent approach to
              delivering unshakeable insights.
            </p>
          </div>
        </section>

        {/* Research Methodologies */}
        <section
          className="container mx-auto px-4 lg:px-8 mb-16 lg:mb-24"
          onMouseEnter={() =>
            setSectionHovered((prev) => ({ ...prev, methodologies: true }))
          }
          onMouseLeave={() =>
            setSectionHovered((prev) => ({ ...prev, methodologies: false }))
          }
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold  text-center mb-12 lg:mb-16 group hover:text-[#f9a524]/90 transition-colors duration-300 cursor-pointer">
              Research Approaches
              <span
                className={`block h-0.5 w-0 group-hover:w-64 bg-gradient-to-r from-[#f9a524] to-transparent transition-all duration-500 mx-auto mt-2 ${
                  sectionHovered.methodologies ? "opacity-100" : "opacity-0"
                }`}
              />
            </h2>
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {METHODOLOGIES.map((method, index) => (
                <MethodologyCard key={index} method={method} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* 5-Step Process */}
        <section className="container px-4 lg:px-8 mb-16 lg:mb-24 bg-gradient-to-br from-[#f9a524]/5 to-[#f9a524]/10 -mx-4 py-20 relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f9a524_2px,transparent_2px)] bg-[length:50px_50px] animate-pulse-slower" />
          </div>

          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#f9a524] text-center mb-12 lg:mb-16 group hover:text-[#f9a524]/90 transition-colors duration-300">
              Our Research Process
              <span className="block h-0.5 w-0 group-hover:w-64 bg-gradient-to-r from-[#f9a524] to-transparent transition-all duration-500 mx-auto mt-2" />
            </h2>
            <div className="space-y-6 lg:space-y-8">
              {PROCESS.map((step, index) => (
                <ProcessStep
                  key={index}
                  step={step}
                  index={index}
                  isExpanded={expandedStep === index}
                  onToggle={() =>
                    setExpandedStep(expandedStep === index ? -1 : index)
                  }
                />
              ))}
            </div>
          </div>
        </section>

        {/* Quality Metrics with Radar Chart */}
        <section
          id="quality-metrics"
          className="container mx-auto px-4 lg:px-8 mb-16 lg:mb-24"
          onMouseEnter={() =>
            setSectionHovered((prev) => ({ ...prev, quality: true }))
          }
          onMouseLeave={() =>
            setSectionHovered((prev) => ({ ...prev, quality: false }))
          }
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold  text-center mb-12 lg:mb-16 group hover:text-[#f9a524]/90 transition-colors duration-300 cursor-pointer">
              Our Quality Standards
              <span
                className={`block h-0.5 w-0 group-hover:w-64 bg-gradient-to-r from-[#f9a524] to-transparent transition-all duration-500 mx-auto mt-2 ${
                  sectionHovered.quality ? "opacity-100" : "opacity-0"
                }`}
              />
            </h2>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-6">
                {QUALITY_METRICS.map((metric, index) => (
                  <QualityMetricCard
                    key={index}
                    metric={metric}
                    index={index}
                    animatedValue={animatedMetrics[index]}
                  />
                ))}
              </div>

              {/* Radar Chart */}
              <Card className="p-6 hover:shadow-2xl transition-all duration-500 group border-2 border-transparent hover:border-[#f9a524]/30 bg-gradient-to-br from-white to-gray-50/50 hover:from-[#f9a524]/5 hover:to-[#f9a524]/2 hover:-translate-y-2">
                <h3 className="text-xl font-bold  mb-4 text-center group-hover:text-[#f9a524]/90 transition-colors duration-300">
                  Performance Metrics
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart data={qualityData}>
                    <PolarGrid stroke="#e0e0e0" />
                    <PolarAngleAxis dataKey="metric" stroke="#666" />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      stroke="#666"
                    />
                    <Radar
                      name="Quality Score"
                      dataKey="value"
                      stroke="#f9a524"
                      fill="#f9a524"
                      fillOpacity={0.6}
                      className="group-hover:fill-[#f9a524]/80 group-hover:stroke-[#f9a524]/80 transition-all duration-300"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: `2px solid #f9a524`,
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section
          className="container mx-auto px-4 lg:px-8"
          onMouseEnter={() =>
            setSectionHovered((prev) => ({ ...prev, certifications: true }))
          }
          onMouseLeave={() =>
            setSectionHovered((prev) => ({ ...prev, certifications: false }))
          }
        >
          <div className="max-w-5xl mx-auto">
            <Card className="bg-gradient-to-br from-[#f9a524]/5 to-[#f9a524]/10 border-[#f9a524]/20 group hover:shadow-2xl transition-all duration-500 hover:border-[#f9a524]/30 cursor-pointer hover:-translate-y-2 relative overflow-hidden">
              {/* Animated top border */}
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#f9a524] to-transparent transition-all duration-500 ${
                  sectionHovered.certifications ? "opacity-100" : "opacity-0"
                }`}
              />

              <CardContent className="p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
                  <div className="w-16 h-16 bg-[#f9a524]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-[#f9a524]/20 transition-all duration-300 group-hover:shadow-lg">
                    <Shield className="text-[#f9a524]" size={32} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl lg:text-3xl font-bold text-[#f9a524] mb-4 group-hover:text-[#f9a524]/90 transition-colors duration-300">
                      {CERTIFICATIONS.title}
                    </h3>

                    <p className="text-foreground/80 leading-relaxed mb-6 text-base lg:text-lg group-hover:text-foreground/90 transition-colors duration-300">
                      {CERTIFICATIONS.description}
                    </p>

                    <ul className="space-y-3">
                      {CERTIFICATIONS.items.map((cert, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 group-hover:translate-x-2 transition-all duration-300 p-3 rounded-lg hover:bg-[#f9a524]/5 cursor-pointer border border-transparent hover:border-[#f9a524]/20"
                        >
                          <CheckCircle
                            className="text-[#f9a524] flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300"
                            size={20}
                          />
                          <span className="text-foreground/80 text-sm lg:text-base hover:text-[#f9a524] transition-colors duration-300">
                            {cert}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
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
        @keyframes pulse-slower {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
