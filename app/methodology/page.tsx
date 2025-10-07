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
  Award,
  Users,
  Globe,
  Clock,
} from "react-feather";
import Image from "next/image";

// Static data for better maintainability
const PAGE_DATA = {
  hero: {
    title: "Our Methodology",
    description:
      "The Science of Certainty: Our rigorous, transparent approach to delivering unshakeable insights.",
  },
  process: [
    {
      number: "1",
      icon: Target,
      title: "Consultative Scoping",
      description:
        "We begin every engagement with a deep-dive consultation to understand your strategic objectives, competitive landscape, and decision-making needs. This ensures our research design is perfectly aligned with your goals.",
      details: [
        "Stakeholder interviews",
        "Objective definition",
        "Success criteria establishment",
        "Timeline and budget planning",
      ],
      color: "from-blue-500/10 to-blue-600/5",
      duration: "1-3 days",
    },
    {
      number: "2",
      icon: FileText,
      title: "Methodology Design",
      description:
        "Our expert methodologists craft a custom research approach, selecting the optimal combination of quantitative and qualitative techniques to answer your specific questions with maximum precision.",
      details: [
        "Sample design and size calculation",
        "Questionnaire development",
        "Mode selection (online, phone, face-to-face)",
        "Quality control protocols",
      ],
      color: "from-green-500/10 to-green-600/5",
      duration: "2-5 days",
    },
    {
      number: "3",
      icon: Database,
      title: "Rigorous Data Collection",
      description:
        "Utilizing state-of-the-art multi-mode platforms and our extensive panel networks, we execute fieldwork with meticulous attention to data quality, achieving industry-leading completion rates.",
      details: [
        "Multi-channel deployment",
        "Real-time monitoring",
        "Quality assurance checks",
        "Respondent verification",
      ],
      color: "from-purple-500/10 to-purple-600/5",
      duration: "7-21 days",
    },
    {
      number: "4",
      icon: BarChart2,
      title: "Advanced Statistical Analysis",
      description:
        "Our team of statisticians and data scientists employ sophisticated analytical techniques including predictive modeling, segmentation analysis, and multivariate testing to extract meaningful patterns.",
      details: [
        "Statistical significance testing",
        "Regression and correlation analysis",
        "Segmentation and clustering",
        "Predictive modeling",
      ],
      color: "from-orange-500/10 to-orange-600/5",
      duration: "3-7 days",
    },
    {
      number: "5",
      icon: Users,
      title: "Strategic Synthesis",
      description:
        "We transform complex data into clear, actionable narratives tailored for executive decision-making, complete with strategic recommendations and implementation roadmaps.",
      details: [
        "Executive summary preparation",
        "Data visualization",
        "Strategic recommendations",
        "Presentation and workshop delivery",
      ],
      color: "from-red-500/10 to-red-600/5",
      duration: "2-5 days",
    },
  ],
  qualityMetrics: [
    { value: "99.7%", label: "Average completion rate", icon: CheckCircle },
    { value: "±2.5%", label: "Typical margin of error", icon: Target },
    { value: "95%", label: "Confidence level standard", icon: Shield },
    { value: "24/7", label: "Real-time monitoring", icon: Clock },
  ],
  certifications: {
    title: "Certifications & Memberships",
    description:
      "SWISS POLL INTERNATIONAL adheres to the strictest international standards for market research and opinion polling. We are proud members of:",
    items: [
      "ESOMAR (European Society for Opinion and Marketing Research)",
      "WAPOR (World Association for Public Opinion Research)",
      "ISO 20252:2019 Certified (Market, opinion and social research)",
      "Swiss Marketing Association",
      "GDPR Compliant & Data Secure",
    ],
  },
  methodologies: [
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
  ],
} as const;

// Reusable components
const ProcessStep = ({ step, index }: any) => {
  const Icon = step.icon;

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/30">
      <CardContent className="p-0">
        <div className="grid md:grid-cols-12">
          {/* Number Badge */}
          <div className="md:col-span-1 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground flex flex-col items-center justify-center p-6 relative group-hover:scale-105 transition-transform duration-300">
            <div className="text-3xl lg:text-4xl font-bold">{step.number}</div>
            <div className="text-xs mt-2 text-primary-foreground/80 text-center">
              {step.duration}
            </div>

            {/* Connecting line (except for last item) */}
            {index < PAGE_DATA.process.length - 1 && (
              <div
                className="hidden md:block absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-primary/30"
                aria-hidden="true"
              />
            )}
          </div>

          {/* Content */}
          <div className="md:col-span-11 p-6 lg:p-8 bg-gradient-to-br via-white/50 group-hover:via-white/80 transition-all duration-300">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Icon className="text-primary" size={28} />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-primary/90 transition-colors">
                  {step.title}
                </h3>

                <p className="text-foreground/80 leading-relaxed mb-6 text-base lg:text-lg">
                  {step.description}
                </p>

                <ul className="grid md:grid-cols-2 gap-3">
                  {step.details.map((detail: any, i: any) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <CheckCircle
                        className="text-primary flex-shrink-0 mt-1"
                        size={18}
                      />
                      <span className="text-sm lg:text-base text-foreground/80">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const QualityMetric = ({ metric }: any) => {
  const Icon = metric.icon;

  return (
    <Card className="text-center group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
      <CardContent className="pt-8 pb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="text-primary" size={24} />
        </div>
        <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
          {metric.value}
        </div>
        <p className="text-sm text-muted-foreground">{metric.label}</p>
      </CardContent>
    </Card>
  );
};

const MethodologyCard = ({ method }: any) => (
  <Card className="p-6 group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
    <h3 className="font-bold text-lg text-primary mb-3 group-hover:text-primary/90 transition-colors">
      {method.title}
    </h3>
    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
      {method.description}
    </p>
    <div className="flex flex-wrap gap-2">
      {method.techniques.map((technique: any, index: any) => (
        <span
          key={index}
          className="inline-block px-3 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20 group-hover:border-primary/30 transition-colors"
        >
          {technique}
        </span>
      ))}
    </div>
  </Card>
);

export default function MethodologyPage() {
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

        {/* Research Methodologies */}
        <section className="container mx-auto px-4 lg:px-8 mb-16 lg:mb-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12 lg:mb-16">
              Research Approaches
            </h2>
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {PAGE_DATA.methodologies.map((method, index) => (
                <MethodologyCard key={index} method={method} />
              ))}
            </div>
          </div>
        </section>

        {/* 5-Step Process */}
        <section className="container mx-auto px-4 lg:px-8 mb-16 lg:mb-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12 lg:mb-16">
              Our Research Process
            </h2>
            <div className="space-y-6 lg:space-y-8">
              {PAGE_DATA.process.map((step, index) => (
                <ProcessStep key={index} step={step} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Quality Metrics */}
        <section className="container mx-auto px-4 lg:px-8 mb-16 lg:mb-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12 lg:mb-16">
              Our Quality Standards
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {PAGE_DATA.qualityMetrics.map((metric, index) => (
                <QualityMetric key={index} metric={metric} />
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-secondary/30 to-primary/5 border-primary/20 group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="text-primary" size={32} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-4 group-hover:text-primary/90 transition-colors">
                      {PAGE_DATA.certifications.title}
                    </h3>

                    <p className="text-foreground/80 leading-relaxed mb-6 text-base lg:text-lg">
                      {PAGE_DATA.certifications.description}
                    </p>

                    <ul className="space-y-3">
                      {PAGE_DATA.certifications.items.map((cert, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300"
                        >
                          <CheckCircle
                            className="text-primary flex-shrink-0 mt-1"
                            size={20}
                          />
                          <span className="text-foreground/80 text-sm lg:text-base">
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
    </div>
  );
}
