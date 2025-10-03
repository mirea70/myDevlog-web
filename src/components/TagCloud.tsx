import Link from "next/link";

type TagStat = { name: string, postCount: number };
type StatsResponse = { tags: TagStat[], totalPosts: number };

interface TagCloudProps {
  selectedTag?: string;
}

export default async function TagCloud({ selectedTag }: TagCloudProps) {
;   // 서버에서 직접 API 호출 (페이지마다 최신 반영 원하면 no-store)
  const res = await fetch(`${process.env.NEXT_PUBLIC_ORIGIN ?? ""}/api/tags/stats`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load /api/tags/stats");
  const data: StatsResponse = await res.json();

  // ALL POSTS 항목을 수동 추가
  const items: TagStat[] = [
    { name: "All Posts", postCount: data.totalPosts },
    ...data.tags,
  ];

  const currentName = selectedTag ? selectedTag : "All Posts";
  const currentCount =
    selectedTag
      ? data.tags.find((t) => t.name === selectedTag)?.postCount ?? 0
      : data.totalPosts;

  return (
    <section className="bg-white">
      {/* 최상단 큰 타이틀 */}
      <h1 className="text-4xl md:text-6xl font-extrabold italic tracking-tight text-gray-900">
        {currentName.toUpperCase()}{" "}
        <span className="align-super text-gray-400 text-xl md:text-2xl">({currentCount})</span>
      </h1>

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
              <span className="text-gray-500 ml-0.5">({tag.postCount})</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}