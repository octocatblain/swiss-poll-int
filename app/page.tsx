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
  { name: "Millennials", value: 35, color: "#f9a524" },
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

const PdfModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4 bg-white rounded-lg shadow-2xl transform transition-all duration-300 scale-95 hover:scale-100">
        <Button
          onClick={onClose}
          className="absolute -top-12 right-0 z-10 text-white hover:text-[#f9a524] transition-all duration-300 hover:scale-110"
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
            className="bg-[#f9a524] hover:bg-[#f9a524]/90 text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Close Report
          </Button>
        </div>
      </div>
    </div>
  );
};

// Enhanced Chart Components with Interactivity
const InteractiveLineChart = ({ data }: { data: any[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLine
        data={data}
        onMouseMove={(e) => {
          if (e.activePayload) {
            setHoveredIndex(e.activePayload[0].payload.month);
          }
        }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="month" stroke="#666" />
        <YAxis stroke="#666" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: `2px solid #f9a524`,
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="approval"
          stroke="#f9a524"
          strokeWidth={3}
          dot={{
            r: 5,
            fill: "#f9a524",
            strokeWidth: 2,
            className: hoveredIndex ? "scale-150 transition-transform" : "",
          }}
          activeDot={{
            r: 8,
            fill: "#f9a524",
            stroke: "#fff",
            strokeWidth: 2,
          }}
        />
        <Line
          type="monotone"
          dataKey="disapproval"
          stroke="#003366"
          strokeWidth={3}
          dot={{ r: 5, fill: "#003366" }}
          activeDot={{ r: 8, fill: "#003366", stroke: "#fff", strokeWidth: 2 }}
        />
      </RechartsLine>
    </ResponsiveContainer>
  );
};

const InteractivePieChart = ({ data }: { data: any[] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPie>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={activeIndex !== null ? 110 : 100}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
          onMouseLeave={onPieLeave}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color}
              className={`transition-all duration-300 ${
                activeIndex === index ? "scale-110" : ""
              }`}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: `2px solid #f9a524`,
            borderRadius: "8px",
          }}
        />
      </RechartsPie>
    </ResponsiveContainer>
  );
};

const InteractiveBarChart = ({ data }: { data: any[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBar
        data={data}
        onMouseMove={(e) => {
          if (e.activePayload) {
            setHoveredIndex(e.activePayload[0].payload.metric);
          }
        }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="metric" stroke="#666" />
        <YAxis stroke="#666" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: `2px solid #f9a524`,
            borderRadius: "8px",
          }}
        />
        <Bar
          dataKey="score"
          fill="#f9a524"
          radius={[8, 8, 0, 0]}
          className="transition-all duration-300"
          maxBarSize={hoveredIndex ? 50 : 40}
        />
      </RechartsBar>
    </ResponsiveContainer>
  );
};

export default function HomePage() {
  const [activeService, setActiveService] = useState(0);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
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

  const handleDownloadPdf = () => {
    const link = document.createElement("a");
    link.href = "/assets/THE 2025 PERFORMANCE INDEX.pdf";
    link.download = "THE 2025 PERFORMANCE INDEX.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen">
      <Header />

      <PdfModal isOpen={isPdfModalOpen} onClose={handleClosePdfModal} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden group">
        <div className="absolute inset-0 z-0">
          <Image
            src="/professional-business-team-analyzing-data.jpg"
            alt="Professional research team"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-primary/75" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-6 inline-block animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="text-sm font-semibold tracking-wider text-white/90 uppercase bg-[#f9a524]/20 px-4 py-2 rounded-full border border-[#f9a524]/30 backdrop-blur-sm transition-all duration-300 hover:bg-[#f9a524]/30 hover:scale-105">
                Swiss Precision in Market Research
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">
              The Signal in the{" "}
              <span className="text-[#f9a524] drop-shadow-lg">Noise</span>.
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-12 leading-relaxed max-w-4xl mx-auto font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              Precision Opinion Research and Consumer Insight to Guide Your Most
              Critical Decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
              <Button
                size="lg"
                className="bg-[#f9a524] hover:bg-[#f9a524]/90 text-white text-lg px-8 py-6 h-auto shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl group"
              >
                Request a Proposal
                <ArrowRight
                  size={20}
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 h-auto bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-[#f9a524] hover:border-[#f9a524] hover:text-white shadow-xl transition-all duration-300 group"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause size={20} className="mr-2" />
                ) : (
                  <Play size={20} className="mr-2" />
                )}
                {isPlaying ? "Pause Demo" : "Watch Demo"}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 pt-12 border-t border-white/20 animate-in fade-in duration-1000 delay-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                {TRUST_METRICS.map((metric, index) => (
                  <div
                    key={index}
                    className="text-center group hover:scale-110 transition-all duration-300 cursor-pointer p-6 rounded-2xl hover:bg-white/10 backdrop-blur-sm"
                  >
                    <div className="text-3xl md:text-4xl font-bold mb-2 text-[#f9a524] group-hover:scale-110 transition-transform">
                      {metric.value}
                    </div>
                    <div className="text-sm opacity-80 uppercase tracking-wide group-hover:opacity-100">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
              Methodological Rigor,{" "}
              <span className="text-[#f9a524]">Uncompromising Integrity</span>.
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
                  className="border-2 hover:border-[#f9a524] transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 group cursor-pointer bg-gradient-to-b from-white to-gray-50/50"
                >
                  <CardContent className="pt-8 pb-6 text-center">
                    <div className="w-16 h-16 bg-[#f9a524]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-[#f9a524]/20 transition-all duration-300 group-hover:shadow-lg">
                      <Icon className="text-[#f9a524]" size={32} />
                    </div>
                    <h3 className="font-bold text-lg mb-3 group-hover:text-[#f9a524] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
              Actionable Intelligence{" "}
              <span className="text-[#f9a524]">Across Sectors</span>.
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
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center group ${
                    isReverse ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={isReverse ? "lg:order-2" : ""}>
                    <div className="w-12 h-12 bg-[#f9a524]/10 rounded-lg flex items-center justify-center mb-4 hover:scale-110 transition-all duration-300 hover:bg-[#f9a524]/20 cursor-pointer">
                      <Icon className="text-[#f9a524]" size={24} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4 group-hover:text-[#f9a524] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-foreground/80 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <Button
                      variant="outline"
                      className="transition-all duration-300 hover:scale-105 bg-transparent border-[#f9a524] text-[#f9a524] hover:bg-[#f9a524] hover:text-white group/btn"
                      onClick={handleOpenPdfModal}
                    >
                      See Sample Report
                      <ArrowRight
                        size={16}
                        className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                    </Button>
                  </div>

                  <Card
                    className={`p-6 lg:p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-[#f9a524]/20 ${
                      isReverse ? "lg:order-1" : ""
                    }`}
                  >
                    <CardContent className="p-0">
                      {service.chartType === "line" && (
                        <InteractiveLineChart data={trendData} />
                      )}
                      {service.chartType === "pie" && (
                        <InteractivePieChart data={segmentData} />
                      )}
                      {service.chartType === "bar" && (
                        <InteractiveBarChart data={brandData} />
                      )}
                      {service.chartType === "image" && (
                        <div className="relative w-full h-[300px] group/image">
                          <Image
                            src="/customer-satisfaction-dashboard.jpg"
                            alt="Customer Experience"
                            fill
                            className="object-cover rounded-lg transition-transform duration-500 group-hover/image:scale-105"
                          />
                          <div className="absolute inset-0 bg-[#f9a524]/10 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 rounded-lg" />
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
              The Science of <span className="text-[#f9a524]">Certainty</span>.
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
                  <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gradient-to-br from-[#f9a524]/5 to-transparent transition-all duration-300 hover:shadow-lg cursor-pointer">
                    <div className="w-16 h-16 bg-[#f9a524] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:bg-[#f9a524]/90">
                      {step.number}
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-[#f9a524] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
                      {step.description}
                    </p>
                  </div>
                  {index < 4 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#f9a524]/40 to-[#f9a524]/20 group-hover:from-[#f9a524] group-hover:to-[#f9a524] transition-all duration-300" />
                  )}
                </div>
              ))}
            </div>

            <Card className="bg-gradient-to-br from-[#f9a524]/5 to-[#f9a524]/10 border-[#f9a524]/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
              <CardContent className="py-8">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="text-center md:text-left">
                    <div className="text-4xl lg:text-5xl font-bold text-[#f9a524] mb-2 group-hover:scale-110 transition-transform inline-block">
                      99.7%
                    </div>
                    <p className="text-foreground/80 leading-relaxed group-hover:text-foreground transition-colors">
                      Average survey completion rate, reflecting unparalleled
                      data integrity.
                    </p>
                  </div>
                  <CheckCircle
                    className="text-[#f9a524] flex-shrink-0 group-hover:scale-110 transition-transform"
                    size={48}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Insights Section with report cards */}
      <section className="py-20 lg:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
              From Our <span className="text-[#f9a524]">Research Desk</span>.
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
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:-translate-y-3 cursor-pointer border-2 border-transparent hover:border-[#f9a524]/20"
              >
                <div className="relative h-48 lg:h-64 overflow-hidden">
                  <Image
                    src={insight.image || "/placeholder.svg"}
                    alt={insight.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl lg:text-2xl font-bold text-primary mb-3 group-hover:text-[#f9a524] transition-colors">
                    {insight.title}
                  </h3>
                  <p className="text-foreground/80 mb-4 leading-relaxed">
                    {insight.description}
                  </p>
                  <Button
                    className={`w-full transition-all duration-300 hover:scale-105 group/btn ${
                      insight.action === "download"
                        ? "bg-[#f9a524] hover:bg-[#f9a524]/90 text-white shadow-lg hover:shadow-xl"
                        : "bg-transparent border-[#f9a524] text-[#f9a524] hover:bg-[#f9a524] hover:text-white"
                    }`}
                    variant={
                      insight.action === "download" ? "default" : "outline"
                    }
                    onClick={() => {
                      if (insight.action === "download") {
                        handleDownloadPdf();
                      }
                    }}
                  >
                    {insight.action === "download" && (
                      <Download
                        size={16}
                        className="mr-2 transition-transform duration-300 group-hover/btn:-translate-y-1"
                      />
                    )}
                    {insight.buttonText}
                    {insight.action === "read" && (
                      <ArrowRight
                        size={16}
                        className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
              Trusted by <span className="text-[#f9a524]">Decision-Makers</span>
              .
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-[#f9a524]/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
              <CardContent className="p-8 lg:p-12">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-[#f9a524] fill-current transition-transform duration-300 group-hover:scale-110"
                      size={20}
                    />
                  ))}
                </div>
                <blockquote className="text-lg md:text-xl text-foreground/90 italic mb-8 leading-relaxed group-hover:text-foreground transition-colors">
                  "Swiss Poll International provided the clarity we needed to
                  enter a new market. Their data was not just accurate; it was
                  profoundly insightful."
                </blockquote>
                <div className="flex items-center justify-end">
                  <div className="text-right group-hover:text-[#f9a524] transition-colors">
                    <div className="font-bold">Dr. Anna Weber</div>
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
      <section className="py-20 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, #f9a524 2%, transparent 0%), radial-gradient(circle at 75px 75px, #f9a524 2%, transparent 0%)`,
              backgroundSize: "100px 100px",
            }}
          />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Base Your Strategy on{" "}
              <span className="text-[#f9a524]">Unshakeable Data</span>?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Let's discuss how our research can provide the clarity and
              confidence you need.
            </p>
            <Button
              size="lg"
              className="bg-[#f9a524] hover:bg-[#f9a524]/90 text-lg px-10 py-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              Contact Our Research Team
              <ArrowRight
                size={20}
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
