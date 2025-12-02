import type { Article, CreateArticleRequest, UpdateArticleRequest } from '../types/article';
import { authService } from './authService';

const API_BASE_URL = 'http://localhost:8080/api';

class ArticleServiceApi {
  private getAuthHeaders() {
    return authService.getAuthHeaders();
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // 获取所有文章
  async getArticles(): Promise<Article[]> {
    const response = await fetch(`${API_BASE_URL}/articles`, {
      headers: this.getAuthHeaders(),
    });
    const result = await this.handleResponse<{success: boolean; data: any[]}>(response);
    return result.data.map(this.transformApiDataToArticle);
  }

  // 根据ID获取文章
  async getArticleById(id: string): Promise<Article | null> {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      headers: this.getAuthHeaders(),
    });
    const result = await this.handleResponse<{success: boolean; data: any}>(response);
    return this.transformApiDataToArticle(result.data);
  }

  // 创建新文章
  async createArticle(request: CreateArticleRequest): Promise<Article> {
    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(request),
    });
    const result = await this.handleResponse<{success: boolean; data: any; message: string}>(response);
    return this.transformApiDataToArticle(result.data);
  }

  // 更新文章
  async updateArticle(request: UpdateArticleRequest): Promise<Article | null> {
    const response = await fetch(`${API_BASE_URL}/articles/${request.id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({
        title: request.title,
        content: request.content,
      }),
    });
    const result = await this.handleResponse<{success: boolean; data: any; message: string}>(response);
    return this.transformApiDataToArticle(result.data);
  }

  // 删除文章
  async deleteArticle(id: string): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    await this.handleResponse<{success: boolean; message: string}>(response);
    return true;
  }

  // 搜索文章
  async searchArticles(keyword: string): Promise<Article[]> {
    const response = await fetch(`${API_BASE_URL}/articles/search?keyword=${encodeURIComponent(keyword)}`, {
      headers: this.getAuthHeaders(),
    });
    const result = await this.handleResponse<{success: boolean; data: any[]}>(response);
    return result.data.map(this.transformApiDataToArticle);
  }

  // 将API返回的数据转换为前端Article格式
  private transformApiDataToArticle(data: any): Article {
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      date: data.date,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }


}

// 导出单例实例
export const articleServiceApi = new ArticleServiceApi();