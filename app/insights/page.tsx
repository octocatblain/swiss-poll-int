import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, ArrowRight, Calendar } from "react-feather"

export default function InsightsPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">Research Insights</h1>
            <p className="text-xl text-foreground/80 leading-relaxed">
              Explore our latest research findings, industry reports, and thought leadership on the trends shaping
              public opinion and consumer behavior.
            </p>
          </div>

          {/* Featured Report */}
          <div className="max-w-5xl mx-auto mb-20">
            <Card className="overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <img src="/professional-research-report-cover.jpg" alt="Featured Report" className="w-full h-full object-cover" />
                <div className="p-12">
                  <div className="inline-block bg-destructive/10 text-destructive text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    FEATURED REPORT
                  </div>
                  <h2 className="text-3xl font-bold text-primary mb-4">Swiss Consumer Confidence Index: Q3 2024</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Calendar size={16} />
                    <span>Published: October 2024</span>
                  </div>
                  <p className="text-foreground/80 leading-relaxed mb-6">
                    An in-depth analysis of shifting economic sentiments and their impact on market dynamics. This
                    comprehensive report examines consumer spending patterns, confidence levels, and future expectations
                    across key demographic segments.
                  </p>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <Download size={16} className="mr-2" />
                    Download Full Report (PDF)
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Articles */}
          <div className="max-w-6xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-primary mb-12">Recent Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "The Rise of the Conscious Consumer",
                  excerpt: "How values-based consumption is reshaping brand loyalties and creating new opportunities.",
                  date: "November 2024",
                  image: "sustainable shopping concept",
                },
                {
                  title: "Digital Transformation in Political Campaigns",
                  excerpt: "Analyzing the impact of social media and digital advertising on voter engagement.",
                  date: "October 2024",
                  image: "digital political campaign",
                },
                {
                  title: "Healthcare Consumer Trends 2024",
                  excerpt: "Patient expectations and the evolution of healthcare service delivery models.",
                  date: "September 2024",
                  image: "modern healthcare facility",
                },
                {
                  title: "Financial Services Trust Index",
                  excerpt: "Measuring consumer confidence in banking and financial institutions post-crisis.",
                  date: "August 2024",
                  image: "financial services concept",
                },
                {
                  title: "The Future of Retail: Omnichannel Excellence",
                  excerpt: "How leading retailers are integrating online and offline experiences.",
                  date: "July 2024",
                  image: "modern retail store",
                },
                {
                  title: "Gen Z Consumer Behavior Study",
                  excerpt: "Understanding the preferences and purchase drivers of the next generation.",
                  date: "June 2024",
                  image: "young consumers shopping",
                },
              ].map((article, i) => (
                <Card key={i} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <img
                    src={`/.jpg?height=250&width=400&query=${article.image}`}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar size={14} />
                      <span>{article.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3">{article.title}</h3>
                    <p className="text-sm text-foreground/80 mb-4 leading-relaxed">{article.excerpt}</p>
                    <Button variant="outline" size="sm">
                      Read More <ArrowRight size={14} className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
                <p className="text-lg opacity-90 mb-8">
                  Subscribe to our newsletter for the latest research insights and industry trends.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg text-foreground"
                  />
                  <Button className="bg-destructive hover:bg-destructive/90">Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
