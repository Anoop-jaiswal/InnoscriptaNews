export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  imageUrl?: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  author?: string;
  category: string;
}

export interface FilterOptions {
  keyword: string;
  dateRange: 'today' | 'week' | 'month' | 'all';
  category: string;
  source: string;
}

export interface UserPreferences {
  sources: string[];
  categories: string[];
  authors: string[];
}

export type ViewMode = 'card' | 'row';
export type Theme = 'light' | 'dark';