import Layout from '@/components/Layout';
import BlogCard from '@/components/BlogCard';
import { getFeaturedPosts } from '@/services/posts';
import type { PostItemResponse } from '@/types/api';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import { listPosts } from '@/services/posts';

export default async function Home({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  let featured: PostItemResponse[] = [];
  try {
    featured = await getFeaturedPosts();
  } catch {
    featured = [];
  }
  const page = Number(searchParams?.page || 1);
  const pageSize = 10;
  const posts = await listPosts({ page, pageSize });
  return (
    <Layout>
      {/* Intro section removed for closer match */}

      {/* Featured Carousel */}
      <section className="pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <FeaturedCarousel posts={featured} />
        </div>
      </section>

      {/* All Posts with pagination */}
      <section className="py-4 bg-white">
        <div className="max-w-5xl mx-auto px-5">
          <div className="h-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {posts.items.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: Math.max(1, Math.ceil(posts.total / pageSize)) }).map((_, i) => {
              const p = i + 1;
              const href = p === 1 ? '/' : `/?page=${p}`;
              const isActive = p === page;
              return (
                <a key={p} href={href} className={`h-8 w-8 inline-flex items-center justify-center rounded-full border ${isActive ? 'bg-gray-900 text-white' : 'text-gray-700'} `}>
                  {p}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* end */}
    </Layout>
  );
}