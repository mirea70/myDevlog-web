'use client';

import { useEffect, useState } from 'react';
import { createComment, listComments } from '@/services/comments';
import type { CommentResponse } from '@/types/api';

interface CommentsProps {
  slug: string;
  userId?: string; // simulate auth for now
}

export default function Comments({ slug, userId }: CommentsProps) {
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    listComments(slug).then((data) => {
      if (mounted) setComments(data);
    });
    return () => {
      mounted = false;
    };
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      const newComment = await createComment(slug, { parentId: null, content }, userId || crypto.randomUUID());
      setComments((prev) => [newComment, ...prev]);
      setContent('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold mb-4">댓글</h3>

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
          placeholder="댓글을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="mt-2 text-right">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? '작성 중...' : '댓글 작성'}
          </button>
        </div>
      </form>

      <ul className="space-y-4">
        {comments.map((c) => (
          <li key={c.id} className="border border-gray-200 rounded-lg p-4">
            <div className="text-sm text-gray-500">{new Date(c.createdAt).toLocaleString()}</div>
            <div className="mt-2 text-gray-800 whitespace-pre-wrap">{c.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}


