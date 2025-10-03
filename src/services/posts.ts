import { apiFetch } from '@/services/http';
import { PostDetailResponse, PostItemResponse, PostListResponse } from '@/types/api';

export async function getFeaturedPosts(): Promise<PostItemResponse[]> {
  return apiFetch<PostItemResponse[]>('/api/posts/featured');
}

export interface ListPostsParams {
  page?: number;
  pageSize?: number;
  category?: string;
  tag?: string;
  q?: string;
  sort?: 'updatedAt';
}

export async function listPosts(params: ListPostsParams = {}): Promise<PostListResponse> {
  return apiFetch<PostListResponse>('/api/posts', { query: params as Record<string, string | number> });
}

export async function getPostDetail(slug: string): Promise<PostDetailResponse> {
  return apiFetch<PostDetailResponse>(`/api/posts/${encodeURIComponent(slug)}`);
}


