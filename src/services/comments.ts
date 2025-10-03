import { apiFetch } from '@/services/http';
import { CommentResponse, CreateCommentRequest, UpdateCommentRequest } from '@/types/api';

export interface ListCommentsParams {
  parentId?: string;
  cursor?: string; // ISO-8601
  pageSize?: number;
}

export async function listComments(slug: string, params: ListCommentsParams = {}): Promise<CommentResponse[]> {
  return apiFetch<CommentResponse[]>(`/api/posts/${encodeURIComponent(slug)}/comments`, { query: params as Record<string, string | number> });
}

export async function createComment(slug: string, body: CreateCommentRequest, userId: string): Promise<CommentResponse> {
  return apiFetch<CommentResponse>(`/api/posts/${encodeURIComponent(slug)}/comments`, {
    method: 'POST',
    headers: { 'X-User-Id': userId },
    body,
  });
}

export async function updateComment(id: string, body: UpdateCommentRequest, userId?: string, isAdmin?: boolean): Promise<CommentResponse> {
  return apiFetch<CommentResponse>(`/api/comments/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: isAdmin ? { 'X-Admin': 'true' } : userId ? { 'X-User-Id': userId } : {},
    body,
  });
}

export async function deleteComment(id: string, userId?: string, isAdmin?: boolean): Promise<void> {
  await apiFetch<void>(`/api/comments/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: isAdmin ? { 'X-Admin': 'true' } : userId ? { 'X-User-Id': userId } : {},
  });
}


