import type { Article, CreateArticleRequest, UpdateArticleRequest } from '../types/article';
import { articleServiceApi } from './articleServiceApi';

// 使用API服务，如果API失败则回退到localStorage
class ArticleService {
  // 获取所有文章
  async getArticles(): Promise<Article[]> {
    return await articleServiceApi.getArticles();
  }

  // 根据ID获取文章
  async getArticleById(id: string): Promise<Article | null> {
    return await articleServiceApi.getArticleById(id);
  }

  // 创建新文章
  async createArticle(request: CreateArticleRequest): Promise<Article> {
    return await articleServiceApi.createArticle(request);
  }

  // 更新文章
  async updateArticle(request: UpdateArticleRequest): Promise<Article | null> {
    return await articleServiceApi.updateArticle(request);
  }

  // 删除文章
  async deleteArticle(id: string): Promise<boolean> {
    return await articleServiceApi.deleteArticle(id);
  }

  // 搜索文章
  async searchArticles(keyword: string): Promise<Article[]> {
    return await articleServiceApi.searchArticles(keyword);
  }


}

// 导出单例实例
export const articleService = new ArticleService();