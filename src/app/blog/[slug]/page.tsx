import Layout from '@/components/Layout';
import { getPostDetail } from '@/services/posts';
import Comments from '@/features/comments/Comments';

interface PostPageProps {
  params: { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostDetail(params.slug);
  return (
    <Layout>
      <article className="bg-white">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <header className="mb-6">
            <p className="text-xs text-gray-500">{new Date(post.updatedAt || post.createdAt).toLocaleDateString('ko-KR')}</p>
            <h1 className="mt-1 text-2xl font-semibold text-gray-900 tracking-tight">{post.title}</h1>
            {post.tags?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="text-[11px] text-gray-500">#{t}</span>
                ))}
              </div>
            ) : null}
          </header>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImageUrl || '/window.svg'}
            alt="cover"
            className="w-full rounded-md mb-6"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              if (target.src.endsWith('/window.svg')) return;
              target.src = '/window.svg';
            }}
          />

          <div className="prose prose-neutral max-w-none">
            {post.content}
          </div>

          <div className="mt-10">
            <Comments slug={post.slug} />
          </div>
        </div>
      </article>
    </Layout>
  );
}


