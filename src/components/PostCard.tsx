// components/PostCard.tsx
"use client";

import type { PostItemResponse } from "@/types/api";

type Aspect = "16/9" | "4/3";

export interface PostCardProps {
  post: PostItemResponse;
  aspect?: Aspect;
  className?: string;
}

export default function PostCard({ post, aspect = "4/3", className = "" }: PostCardProps) {
  const ymd = formatYmd(post.updatedAt || post.createdAt);
  const aspectClass = aspect === "16/9" ? "aspect-[16/9]" : "aspect-[4/3]";

  return (
    <article className={`bg-white rounded-3xl ${className}`}>
      <div className="p-3 md:p-4">
        {/* 🔻 내부 Link 제거: 프리젠테이셔널로만 유지 */}
        <div className="relative rounded-3xl overflow-hidden group">
          <div className={`${aspectClass} w-full`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={"/images/image.png"}
              alt={post.title || "cover"}
              className="h-full w-full object-cover"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (target.src.endsWith("/images/image.png")) return;
                target.src = "/images/image.png";
              }}
            />
          </div>

          {/* Hover overlay */}
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <div className="flex flex-col gap-3">
              {post.tags?.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex w-fit items-center rounded-full border-2 border-white/90 bg-black/20 px-5 py-2 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(0,0,0,0.05)] backdrop-blur"
                >
                  {tag}
                </span>
              ))}
            </div>
            {post.summary ? (
              <p className="text-white text-lg md:text-xl leading-relaxed drop-shadow-sm">
                {post.summary}
              </p>
            ) : null}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/55 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </div>

        {/* 날짜/NEW 배지 */}
        <div className="mt-3 flex items-center gap-3">
          <span className="inline-flex items-center px-4 py-2 rounded-full border-2 border-gray-900 text-gray-900 text-sm font-semibold">
            {ymd}
          </span>
          {post.isNew ? (
            <span className="inline-flex items-center px-4 py-2 rounded-full border-2 border-gray-900 text-gray-900 text-sm font-semibold">
              NEW POST
            </span>
          ) : null}
        </div>

        {/* 제목(내부 Link도 제거하고 span/문자만) */}
        <h2 className="mt-2 text-xl md:text-2xl font-semibold text-gray-900 tracking-tight">
          <span className="hover:underline">{post.title}</span>
        </h2>
      </div>
    </article>
  );
}

function formatYmd(iso: string): string {
  const d = new Date(iso);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}/${mm}/${dd}`;
}