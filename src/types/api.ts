export interface PostItemResponse {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  coverImageUrl: string | null;
  tags: string[];
  category: string | null;
  updatedAt: string;
  createdAt: string;
  authorId: string;
  featured: boolean;
  readingMinutes: number;
  isNew: boolean;
}

export interface PostListResponse {
  items: PostItemResponse[];
  total: number;
  countByCategory: Record<string, number>;
}

export interface PostDetailResponse extends PostItemResponse {
  content: string;
}

export interface PostCreateRequest {
  title: string;
  content: string;
  summary: string | null;
  coverImageUrl: string | null;
  tags: string[];
  category: string | null;
  authorId: string;
  featured: boolean;
}

export interface PostUpdateRequest {
  title: string;
  content: string;
  summary: string | null;
  coverImageUrl: string | null;
  tags: string[];
  category: string | null;
  featured: boolean;
}

export interface CommentResponse {
  id: string;
  parentId: string | null;
  postId: string;
  authorId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deleted?: boolean;
}

export interface CreateCommentRequest {
  parentId: string | null;
  content: string;
}

export interface UpdateCommentRequest {
  content: string;
}

export interface UploadResponse {
  id: string;
  publicUrl: string;
  width: number;
  height: number;
  mime: string;
  bytes: number;
}

export interface LoginRequest { email: string; password: string }

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  account: Record<string, unknown>;
}


