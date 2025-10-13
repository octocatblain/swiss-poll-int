"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ARTICLES } from "@/lib/articles";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Share2,
  ArrowLeft,
  Clock,
  Eye,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function ArticlePage({ params }: { params: any }) {
  const unwrappedParams = (React as any).use
    ? (React as any).use(params)
    : params;
  const { slug } = unwrappedParams || {};
  const article = (ARTICLES as any)[slug];
  const [views, setViews] = useState<number | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const router = useRouter();

  // Calculate reading time (approx 200 words per minute)
  const readingTime = Math.max(
    1,
    Math.ceil(article?.content.split(/\s+/).length / 200)
  );

  useEffect(() => {
    if (!article) {
      setIsLoading(false);
      return;
    }

    // Increment views
    const incrementViews = async () => {
      try {
        const response = await fetch(`/api/views`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
        });
        const data = await response.json();
        setViews(data.views);
      } catch (error) {
        console.error("Failed to update views:", error);
      } finally {
        setIsLoading(false);
      }
    };

    incrementViews();

    // Check if article is bookmarked
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}");
    setIsBookmarked(!!bookmarks[slug]);

    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Show scroll to top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug, article]);

  const handleShare = async () => {
    setIsSharing(true);
    const url = window.location.href;
    const shareData = {
      title: article.title,
      text: article.description,
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        // You could replace this with a toast notification
        alert("Link copied to clipboard!");
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    } finally {
      setIsSharing(false);
    }
  };

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}");
    if (isBookmarked) {
      delete bookmarks[slug];
    } else {
      bookmarks[slug] = {
        title: article.title,
        date: article.date,
        slug: slug,
      };
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    setIsBookmarked(!isBookmarked);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!article && !isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 container mx-auto px-4 lg:px-8 py-16 flex items-center justify-center">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Article Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The article you're looking for doesn't exist or may have been
              moved.
            </p>
            <Button onClick={() => router.push("/insights")} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Insights
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen my-12 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
          {/* Back Button */}
          {/* <div className="max-w-4xl mx-auto mb-8">
            <Button
              variant="ghost"
              onClick={() => router.push("/insights")}
              className="gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Insights
            </Button>
          </div> */}

          {/* Article Header */}
          <div className="max-w-4xl mx-auto mb-8 lg:mb-12">
            <div className="text-center lg:text-left">
              {/* Category Tag */}
              <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-4">
                {article.category || "Insight"}
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Description */}
              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto lg:mx-0">
                {article.description}
              </p>

              {/* Meta Information */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {article.author?.charAt(0) || "A"}
                    </div>
                    <span>By {article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{readingTime} min read</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{views?.toLocaleString() ?? "-"} reads</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    onClick={toggleBookmark}
                    variant="outline"
                    size="sm"
                    className="gap-2 transition-all duration-200 hover:scale-105"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-green-600" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                    {isBookmarked ? "Saved" : "Save"}
                  </Button>

                  <Button
                    onClick={handleShare}
                    variant="outline"
                    size="sm"
                    disabled={isSharing}
                    className="gap-2 transition-all duration-200 hover:scale-105"
                  >
                    <Share2 className="w-4 h-4" />
                    {isSharing ? "Sharing..." : "Share"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative w-full h-64 lg:h-96 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-3xl">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

          {/* Article Content */}
          <div className="max-w-3xl mx-auto">
            <article
              className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none
             prose-headings:font-bold 
             
             prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
             prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
             
             prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
             
             prose-a:text-blue-600 dark:prose-a:text-blue-400 
             prose-a:no-underline hover:prose-a:underline
             
             prose-blockquote:border-l-4 prose-blockquote:border-blue-500 
             prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20 
             prose-blockquote:italic prose-blockquote:py-2
             
             prose-ul:list-disc prose-ol:list-decimal
             prose-li:text-gray-700 dark:prose-li:text-gray-300
             
             prose-img:rounded-xl prose-img:shadow-lg
             
             prose-pre:bg-gray-900 prose-pre:text-gray-100
             
             prose-code:bg-gray-100 dark:prose-code:bg-gray-800 
             prose-code:px-2 prose-code:py-1 prose-code:rounded
             
             prose-strong:text-gray-900 dark:prose-strong:text-white 
             prose-strong:font-bold"
            >
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </article>

            {/* Article Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Published on {article.date}
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    onClick={toggleBookmark}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-green-600" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                    {isBookmarked ? "Saved" : "Save for later"}
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Article
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
            aria-label="Scroll to top"
          >
            <ArrowLeft className="w-5 h-5 transform rotate-90" />
          </button>
        )}
      </div>
      <Footer />
    </>
  );
}
