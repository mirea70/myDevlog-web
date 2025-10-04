import Link from "next/link";
import { apiFetch } from '@/services/http';

type TagStat = { name: string, postCount: number };
type StatsResponse = { tags: TagStat[], totalPosts: number };

interface TagCloudProps {
  selectedTag?: string;
}

export default async function TagCloud({ selectedTag }: TagCloudProps) {
;   // 서버에서 직접 API 호출 (페이지마다 최신 반영 원하면 no-store)
  const res = await apiFetch<StatsResponse>(`/api/tags/stats`, {});

  // ALL POSTS 항목을 수동 추가
  const items: TagStat[] = [
    { name: "All Posts", postCount: res.totalPosts },
    ...res.tags,
  ];

  const currentName = selectedTag ? selectedTag : "All Posts";
  const currentCount =
    selectedTag
      ? res.tags.find((t) => t.name === selectedTag)?.postCount ?? 0
      : res.totalPosts;

  return (
    <section className="bg-white">
      {/* 최상단 큰 타이틀 */}
      <div className="mx-auto w-fit flex items-start gap-2">
        <h1 className="text-4xl md:text-6xl font-extrabold italic tracking-tight text-gray-900">
          {currentName.toUpperCase()}.
        </h1>

        {/* 개수: 연한 회색 + 위 첨자 느낌 */}
        <span className="text-grey-100 italic text-base md:text-base leading-none align-super tabular-nums">
          ({currentCount})
        </span>
      </div>

      {/* 태그 나열 */}
      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-3 text-gray-800">
        {items.map((tag) => {
          const isAll = tag.name === "All Posts";
          const href = isAll ? "/" : `/?tag=${encodeURIComponent(tag.name)}`;
          const isActive = (isAll && !selectedTag) || tag.name === selectedTag;

          return (
            <Link
              key={tag.name}
              href={href}
              className={`text-base ${isActive ? "font-extrabold" : "font-medium"} hover:underline`}
              // a 중첩 방지: 내부에 또 Link 쓰지 않음
            >
              {tag.name}
              <span className="ml-1 text-black-500 text-[0.7em] align-super leading-none">({tag.postCount})</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}