// app/page.tsx
import Link from 'next/link';
import Layout from '@/components/Layout';
import BlogCard from '@/components/BlogCard';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import TagCloud from '@/components/TagCloud';
import { getFeaturedPosts, listPosts } from '@/services/posts';
import type { PostItemResponse } from '@/types/api';

export default async function Home({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  // 선택된 태그: 없으면 ALL POSTS 취급
  const selectedTag =
    typeof searchParams?.tag === 'string' ? searchParams.tag : undefined;

  const page = Number(searchParams?.page || 1);
  const pageSize = 10;

  // 태그 필터 적용해서 목록 조회
  const posts = await listPosts({ page, pageSize, tag: selectedTag });

  // Featured는 ALL POSTS(= tag 미선택)일 때만
  let featured: PostItemResponse[] = [];
  if (!selectedTag) {
    try {
      featured = await getFeaturedPosts();
    } catch {
      featured = [];
    }
  }

  return (
    <Layout>
      {/* Tag Cloud (상단 타이틀 + 태그 모음) */}
      <section className="pt-8 pb-16 bg-white">
        <div className="max-w-5xl mx-auto px-5 flex justify-center">
          <TagCloud selectedTag={selectedTag} />
        </div>
      </section>

      {/* Featured: ALL POSTS에서만 노출 */}
      {!selectedTag && featured.length > 0 && (
        <section className="pb-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <FeaturedCarousel posts={featured} />
          </div>
        </section>
      )}

      {/* Posts + Pagination */}
      <section className="py-4 bg-white">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {posts.items.map((post, idx) => (
              <BlogCard key={post.slug} post={post} index={idx} />
            ))}
          </div>

          {/* 페이지네이션: tag 유지 */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({
              length: Math.max(1, Math.ceil(posts.total / pageSize)),
            }).map((_, i) => {
              const p = i + 1;

              const qs = new URLSearchParams();
              if (selectedTag) qs.set('tag', selectedTag);
              if (p !== 1) qs.set('page', String(p));

              const href = qs.toString() ? `/?${qs.toString()}` : '/';
              const isActive = p === page;

              return (
                <Link
                  key={p}
                  href={href}
                  className={`h-8 w-8 inline-flex items-center justify-center rounded-full border ${
                    isActive ? 'bg-gray-900 text-white' : 'text-gray-700'
                  }`}
                >
                  {p}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}