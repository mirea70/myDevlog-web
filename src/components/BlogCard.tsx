// components/BlogCard.tsx
"use client";

import Link from "next/link";
import PostCard from "@/components/PostCard";
import type { PostItemResponse } from "@/types/api";

interface BlogCardProps {
  post: PostItemResponse;
  index: number; 
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} aria-label={post.title} className="group block">
      <PostCard post={post} aspect="4/3" isNew={index < 2} />
    </Link>
  );
}
