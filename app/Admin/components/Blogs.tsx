"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import { FileText, Loader2, Info, ImageOff, ExternalLink } from "lucide-react";
import { useMediaStore } from "@/app/config/mediastore";
import { baseURL } from "@/app/config/baseUrl";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  created_at: string;
}
interface MediaContent {
  images: string[];
  videos: string[];
  pdfs?: string[];
}

const truncate = (text: string, limit: number) => {
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};

const BlogListPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const { mediaMap, setMedia } = useMediaStore() || {
    mediaMap: {},
    setMedia: () => {},
  };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${baseURL}/api/blogs/posts?limit=10&offset=0`);
        const fetchedPosts = res.data?.posts || [];
        setPosts(fetchedPosts);
        for (const post of fetchedPosts) {
          if (!mediaMap[post.id]) {
            try {
              const mediaRes = await axios.get(
                `${baseURL}/api/blogs/posts/${post.id}`
              );
              const {
                images = [],
                videos = [],
                pdfs = [],
              } = mediaRes.data as MediaContent;
              setMedia?.(post.id, { images, videos, pdfs });
            } catch (err) {
              console.error(`❌ Failed to load media for post ${post.id}`, err);
              setMedia?.(post.id, { images: [], videos: [], pdfs: [] });
            }
          }
        }
      } catch (err) {
        console.error("❌ Error fetching posts:", err);
        setError("Failed to fetch blog posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [mediaMap, setMedia]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        {loading ? (
          <div className="flex flex-col items-center text-gray-500 py-16">
            <Loader2 className="animate-spin w-10 h-10 mb-4" />
            <p className="text-lg">Loading blog posts...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center text-red-500 py-16">
            <Info className="w-10 h-10 mb-4" />
            <p className="text-lg">{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center text-gray-500 py-16">
            <FileText className="w-10 h-10 mb-4" />
            <p className="text-lg">No blog posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {posts.map((post) => {
              const media = mediaMap[post.id];
              const hasImage = media?.images?.length > 0;
              const hasVideo = media?.videos?.length > 0;
              const hasPDF = media?.pdfs?.length > 0;
              const mediaSrc = hasImage
                ? media.images[0]
                : hasVideo
                ? media.videos[0]
                : hasPDF
                ? media.pdfs[0]
                : "";

              return (
                <div
                  key={post.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200 flex flex-col"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    {media ? (
                      hasImage ? (
                        <img
                          src={
                            mediaSrc.startsWith("data:")
                              ? mediaSrc
                              : `${baseURL}/${mediaSrc}`
                          }
                          alt="Post preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src =
                              "https://placehold.co/400x240/E2E8F0/A0AEC0?text=Image+Unavailable";
                          }}
                        />
                      ) : hasVideo ? (
                        <video
                          className="w-full h-full object-cover"
                          controls
                          preload="metadata"
                        >
                          <source
                            src={
                              mediaSrc.startsWith("data:")
                                ? mediaSrc
                                : `${baseURL}/${mediaSrc}`
                            }
                            type="video/mp4"
                          />
                        </video>
                      ) : hasPDF ? (
                        <button
                          onClick={() => {
                            try {
                              if (mediaSrc.startsWith("data:")) {
                                const base64 = mediaSrc.split(",")[1];
                                const byteString = atob(base64);
                                const ab = new ArrayBuffer(byteString.length);
                                const ia = new Uint8Array(ab);
                                for (let i = 0; i < byteString.length; i++) {
                                  ia[i] = byteString.charCodeAt(i);
                                }
                                const blob = new Blob([ab], { type: "application/pdf" });
                                const url = URL.createObjectURL(blob);
                                window.open(url, "_blank");
                              } else {
                                window.open(`${baseURL}/${mediaSrc}`, "_blank");
                              }
                            } catch (error) {
                              console.error("Error opening PDF:", error);
                              alert("Could not open PDF.");
                            }
                          }}
                          className="flex items-center justify-center w-full h-full bg-green-400 text-white text-sm font-medium"
                        >
                          <FileText className="w-6 h-6 mr-2" />
                          View PDF
                        </button>
                      ) : (
                        <ImageOff className="w-12 h-12 text-gray-400 m-auto" />
                      )
                    ) : (
                      <Loader2 className="animate-spin w-8 h-8 text-gray-300 m-auto" />
                    )}
                  </div>

                  <div className="p-4 flex flex-col grow">
                    <h2 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-500 mb-3">
                      {new Date(post.created_at).toLocaleDateString("en-KE", {
                        dateStyle: "medium",
                      })}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-3 grow">
                      {truncate(post.content, 120)}
                    </p>
                    <Link
                      href={`/BlogPostForm/${post.id}`}
                      className="mt-4 inline-flex items-center text-blue-600 hover:underline text-sm font-medium"
                    >
                      Read more <ExternalLink className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListPage;