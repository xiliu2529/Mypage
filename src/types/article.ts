export interface Article {
  id: string;
  title: string;
  content: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateArticleRequest {
  title: string;
  content: string;
}

export interface UpdateArticleRequest {
  id: string;
  title?: string;
  content?: string;
}