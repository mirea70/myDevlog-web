export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
  tags: string[];
  author: string;
  readTime: number;
}

export interface BlogMetadata {
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  readTime: number;
}
