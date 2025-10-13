"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Download,
  ArrowRight,
  Calendar,
  Eye,
  Clock,
  Bookmark,
} from "lucide-react";
import { useState } from "react";

export default function InsightsPage() {
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());

  const toggleBookmark = (index: number) => {
    setBookmarked((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const articles = [
    {
      title: "The Rise of the Conscious Consumer",
      excerpt:
        "How values-based consumption is reshaping brand loyalties and creating new opportunities in sustainable markets.",
      date: "November 15, 2024",
      readTime: "4 min read",
      views: "2.4k",
      image: "/api/placeholder/400/250?text=Conscious+Consumer",
      category: "Consumer Trends",
      slug: "rise-of-the-conscious-consumer",
    },
    {
      title: "Digital Transformation in Political Campaigns",
      excerpt:
        "Analyzing the impact of social media and digital advertising on voter engagement and election outcomes.",
      date: "October 28, 2024",
      readTime: "6 min read",
      views: "1.8k",
      image: "/api/placeholder/400/250?text=Digital+Politics",
      category: "Political Research",
      slug: "digital-political-campaigns",
    },
    {
      title: "Healthcare Consumer Trends 2024",
      excerpt:
        "Patient expectations and the evolution of healthcare service delivery models in the post-pandemic era.",
      date: "September 12, 2024",
      readTime: "5 min read",
      views: "3.1k",
      image: "/api/placeholder/400/250?text=Healthcare+Trends",
      category: "Healthcare",
      slug: "healthcare-consumer-trends",
    },
    {
      title: "Financial Services Trust Index",
      excerpt:
        "Measuring consumer confidence in banking and financial institutions during economic uncertainty.",
      date: "August 22, 2024",
      readTime: "7 min read",
      views: "2.7k",
      image: "/api/placeholder/400/250?text=Finance+Trust",
      category: "Finance",
      slug: "financial-services-trust",
    },
    {
      title: "The Future of Retail: Omnichannel Excellence",
      excerpt:
        "How leading retailers are integrating online and offline experiences to drive customer loyalty.",
      date: "July 18, 2024",
      readTime: "4 min read",
      views: "1.9k",
      image: "/api/placeholder/400/250?text=Future+Retail",
      category: "Retail",
      slug: "future-of-retail",
    },
    {
      title: "Gen Z Consumer Behavior Study",
      excerpt:
        "Understanding the preferences and purchase drivers of the next generation of consumers.",
      date: "June 5, 2024",
      readTime: "8 min read",
      views: "4.2k",
      image: "/api/placeholder/400/250?text=Gen+Z+Study",
      category: "Demographics",
      slug: "gen-z-consumer-behavior",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="pt-28 lg:pt-32 pb-16 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              Latest Research & Insights
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-6 lg:mb-8 leading-tight">
              Research{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Insights
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Explore our latest research findings, industry reports, and
              thought leadership on the trends shaping public opinion and
              consumer behavior.
            </p>
          </div>

          {/* Featured Report */}
          <div className="max-w-6xl mx-auto mb-20 lg:mb-28">
            <Card className="overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src="/professional-research-report-cover.jpg"
                    alt="Featured Report"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent lg:bg-gradient-to-l" />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-xs font-semibold px-4 py-2 rounded-full mb-4 w-fit">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></div>
                    FEATURED REPORT
                  </div>
                  <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                    Swiss Consumer Confidence Index: Q3 2024
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>Published: October 2024</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>15 min read</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye size={16} />
                      <span>8.4k views</span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 lg:mb-8 text-base lg:text-lg">
                    An in-depth analysis of shifting economic sentiments and
                    their impact on market dynamics. This comprehensive report
                    examines consumer spending patterns, confidence levels, and
                    future expectations across key demographic segments.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-semibold transition-all duration-300 hover:scale-105">
                      <Download size={20} className="mr-3" />
                      Download Full Report (PDF)
                    </Button>
                    <Button variant="outline" className="py-3">
                      View Executive Summary
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Articles */}
          <div className="max-w-7xl mx-auto mb-20 lg:mb-28">
            <div className="text-center lg:text-left mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Latest <span className="text-blue-600">Articles</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                Fresh perspectives and data-driven insights on today's most
                pressing topics
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {articles.map((article, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/insights/${article.slug}`)
                  }
                >
                  <div className="relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full backdrop-blur-sm">
                        {article.category}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(index);
                      }}
                      className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-900/90 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
                    >
                      <Bookmark
                        size={16}
                        className={
                          bookmarked.has(index)
                            ? "fill-blue-600 text-blue-600"
                            : "text-gray-600"
                        }
                      />
                    </button>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={14} />
                        <span>{article.views}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-sm line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-0 group/btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `/insights/${article.slug}`;
                        }}
                      >
                        Read More
                        <ArrowRight
                          size={16}
                          className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
                        />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-8 lg:p-12 text-center relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                <div className="relative z-10">
                  <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4">
                    Stay Informed
                  </h2>
                  <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                    Subscribe to our newsletter for the latest research insights
                    and industry trends delivered to your inbox.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 transition-all duration-300 hover:scale-105">
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-sm text-blue-200 mt-4">
                    No spam. Unsubscribe at any time.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
