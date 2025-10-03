"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { PostItemResponse } from "@/types/api";
import PostCard from "@/components/PostCard";

interface FeaturedCarouselProps {
  posts: PostItemResponse[];
  autoPlayMs?: number;
}

export default function FeaturedCarousel({ posts, autoPlayMs = 5000 }: FeaturedCarouselProps) {
  const [index, setIndex] = useState(0);
  const safePosts = useMemo(() => posts ?? [], [posts]);
  const total = safePosts.length;

  useEffect(() => {
    if (!total) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), autoPlayMs);
    return () => clearInterval(id);
  }, [total, autoPlayMs]);

  if (!total) return null;
  const current = safePosts[index];

  return (
    <section className="bg-white">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold italic text-gray-900 mb-5">Featured.</h2>
          <div className="flex items-center gap-2 pr-2">
            <button
              aria-label="Prev"
              className="h-8 w-8 rounded-full border border-gray-400 text-gray-700 flex items-center justify-center"
              onClick={() => setIndex((index - 1 + total) % total)}
            >
              ‹
            </button>
            <button
              aria-label="Next"
              className="h-8 w-8 rounded-full border border-gray-400 text-gray-700 flex items-center justify-center"
              onClick={() => setIndex((index + 1) % total)}
            >
              ›
            </button>
          </div>
        </div>

        {/* 핵심: BlogCard와 동일 뷰를 재사용, 단지 aspect만 16:9로 */}
        <Link href={`/blog/${current.slug}`} className="group block">
            <PostCard post={current} aspect="16/9" />
        </Link>

        {/* 인디케이터 */}
        <div className="mt-3 flex items-center justify-end gap-2 pr-2">
          {safePosts.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full ${i === index ? "bg-gray-900" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
