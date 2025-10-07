import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Globe, TrendingUp, Target, Clock } from "react-feather";
import Image from "next/image";

// Static data for better maintainability
const PAGE_DATA = {
  hero: {
    title: "About Us",
    description:
      "Founded on Swiss principles of precision, integrity, and excellence, SWISS POLL INTERNATIONAL has been delivering world-class research insights for over two decades.",
  },
  story: {
    title: "Our Story",
    content: [
      "SWISS POLL INTERNATIONAL was established in 2002 with a singular mission: to bring Swiss precision and methodological rigor to the field of market research and opinion polling.",
      "From our headquarters in Zürich, with offices in Geneva and Lausanne, we have grown to become one of Europe's most trusted research partners, serving clients across government, finance, healthcare, and consumer goods sectors.",
      "Our commitment to uncompromising quality, strict confidentiality, and actionable insights has made us the preferred choice for organizations facing their most critical strategic decisions.",
    ],
    image: {
      src: "/modern-swiss-office-building.jpg",
      alt: "Swiss Poll International Office in Zurich",
    },
  },
  values: {
    title: "Our Values",
    items: [
      {
        icon: Award,
        title: "Excellence",
        description:
          "We pursue the highest standards in every project, never compromising on quality.",
      },
      {
        icon: Users,
        title: "Integrity",
        description:
          "Ethical research practices and complete transparency guide all our work.",
      },
      {
        icon: Globe,
        title: "Global Perspective",
        description:
          "International standards combined with deep local market understanding.",
      },
      {
        icon: TrendingUp,
        title: "Innovation",
        description:
          "Continuously advancing our methodologies to deliver cutting-edge insights.",
      },
    ],
  },
  leadership: {
    title: "Our Leadership",
    members: [
      {
        name: "Dr. Klaus Müller",
        role: "Chief Executive Officer",
        bio: "PhD in Statistics, 25+ years in market research",
        expertise: [
          "Statistical Modeling",
          "Research Design",
          "Quality Assurance",
        ],
      },
      {
        name: "Dr. Sophie Laurent",
        role: "Chief Research Officer",
        bio: "Former academic, specialist in political polling",
        expertise: ["Political Research", "Public Opinion", "Methodology"],
      },
      {
        name: "Marco Bianchi",
        role: "Chief Operations Officer",
        bio: "Expert in multi-market research coordination",
        expertise: [
          "Project Management",
          "International Research",
          "Client Relations",
        ],
      },
    ],
  },
  milestones: {
    title: "Our Journey",
    items: [
      {
        year: "2002",
        event: "Founded in Zurich with focus on precision research",
      },
      {
        year: "2008",
        event: "Expanded to Geneva office, serving international clients",
      },
      {
        year: "2015",
        event: "Achieved ISO 20252 certification for quality standards",
      },
      {
        year: "2020",
        event: "Launched digital research platform for real-time insights",
      },
      { year: "2024", event: "Serving 500+ clients across 30+ countries" },
    ],
  },
} as const;

// Reusable components
const ValueCard = ({ icon: Icon, title, description }: any) => (
  <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
    <CardContent className="pt-8 pb-6 text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="text-primary" size={32} />
      </div>
      <h3 className="font-bold text-lg mb-3 text-primary">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </CardContent>
  </Card>
);

const TeamCard = ({ member }: any) => (
  <Card className="group hover:shadow-xl transition-all duration-300 hover:border-primary/30">
    <CardContent className="pt-6">
      <div className="w-full h-48 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
        <Users className="text-primary/40" size={64} />
      </div>
      <h3 className="font-bold text-lg text-primary mb-1 group-hover:text-primary/90 transition-colors">
        {member.name}
      </h3>
      <p className="text-sm text-muted-foreground mb-3 font-medium">
        {member.role}
      </p>
      <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
        {member.bio}
      </p>
      <div className="flex flex-wrap gap-2">
        {member.expertise.map((skill: any, index: any) => (
          <span
            key={index}
            className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
          >
            {skill}
          </span>
        ))}
      </div>
    </CardContent>
  </Card>
);

const MilestoneTimeline = () => (
  <div className="relative">
    {/* Timeline line */}
    <div
      className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20"
      aria-hidden="true"
    />

    <div className="space-y-8">
      {PAGE_DATA.milestones.items.map((milestone, index) => (
        <div key={index} className="relative flex items-start gap-6 group">
          {/* Timeline dot */}
          <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10 group-hover:scale-125 transition-transform duration-300">
            <div className="w-2 h-2 bg-primary rounded-full" />
          </div>

          {/* Content */}
          <div className="flex-1 pt-1 group-hover:translate-x-2 transition-transform duration-300">
            <div className="text-lg font-bold text-primary mb-1">
              {milestone.year}
            </div>
            <p className="text-foreground/80 leading-relaxed">
              {milestone.event}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 lg:px-8 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 tracking-tight">
              {PAGE_DATA.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto">
              {PAGE_DATA.hero.description}
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="container mx-auto px-4 lg:px-8 mb-20 lg:mb-24">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                  {PAGE_DATA.story.title}
                </h2>
                <div className="space-y-4 text-foreground/80 leading-relaxed">
                  {PAGE_DATA.story.content.map((paragraph, index) => (
                    <p key={index} className="text-base md:text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={PAGE_DATA.story.image.src}
                    alt={PAGE_DATA.story.image.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                {/* Decorative element */}
                <div
                  className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-2xl -z-10"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="container mx-auto px-4 lg:px-8 mb-20 lg:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12 lg:mb-16">
            {PAGE_DATA.values.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {PAGE_DATA.values.items.map((value, index) => (
              <ValueCard key={index} {...value} />
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="container mx-auto px-4 lg:px-8 mb-20 lg:mb-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12 lg:mb-16">
              {PAGE_DATA.milestones.title}
            </h2>
            <MilestoneTimeline />
          </div>
        </section>

        {/* Leadership Section */}
        <section className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12 lg:mb-16">
              {PAGE_DATA.leadership.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {PAGE_DATA.leadership.members.map((member, index) => (
                <TeamCard key={index} member={member} />
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 lg:px-8 mt-20 lg:mt-24">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-bold text-primary">
                  25+
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">
                  Years Experience
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-bold text-primary">
                  500+
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">
                  Projects Delivered
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-bold text-primary">
                  30+
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">
                  Countries Served
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-bold text-primary">
                  99.7%
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">
                  Client Satisfaction
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
