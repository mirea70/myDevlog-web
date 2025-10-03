import Layout from '@/components/Layout';
import BlogCard from '@/components/BlogCard';
import { listPosts } from '@/services/posts';
import { Suspense } from 'react';

async function PostsGrid({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const page = Number(searchParams.page || 1);
  const pageSize = Number(searchParams.pageSize || 9);
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const tag = typeof searchParams.tag === 'string' ? searchParams.tag : undefined;
  const q = typeof searchParams.q === 'string' ? searchParams.q : undefined;
  const sort = typeof searchParams.sort === 'string' ? (searchParams.sort as 'updatedAt') : undefined;

  const data = await listPosts({ page, pageSize, category, tag, q, sort });
  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {data.items.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="mt-8">
        <p className="text-xs text-gray-500">총 {data.total}개</p>
      </div>
    </>
  );
}

export default function BlogPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <h1 className="text-base font-semibold text-gray-900 tracking-tight">All Posts</h1>
          <div className="mt-6">
            <Suspense>
              <PostsGrid searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </Layout>
  );
}
