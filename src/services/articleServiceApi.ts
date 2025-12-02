import type { Article, CreateArticleRequest, UpdateArticleRequest } from '../types/article';

const API_BASE_URL = 'http://localhost:8080/api';

class ArticleServiceApi {
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
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
    try {
      const response = await fetch(`${API_BASE_URL}/articles`, {
        headers: this.getAuthHeaders(),
      });
      const result = await this.handleResponse<{success: boolean; data: any[]}>(response);
      return result.data.map(this.transformApiDataToArticle);
    } catch (error) {
      console.error('获取文章失败:', error);
      // 如果API失败，回退到localStorage
      return this.getFallbackArticles();
    }
  }

  // 根据ID获取文章
  async getArticleById(id: string): Promise<Article | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
        headers: this.getAuthHeaders(),
      });
      const result = await this.handleResponse<{success: boolean; data: any}>(response);
      return this.transformApiDataToArticle(result.data);
    } catch (error) {
      console.error('获取文章失败:', error);
      return this.getFallbackArticleById(id);
    }
  }

  // 创建新文章
  async createArticle(request: CreateArticleRequest): Promise<Article> {
    try {
      const response = await fetch(`${API_BASE_URL}/articles`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(request),
      });
      const result = await this.handleResponse<{success: boolean; data: any; message: string}>(response);
      return this.transformApiDataToArticle(result.data);
    } catch (error) {
      console.error('创建文章失败:', error);
      // 如果API失败，回退到localStorage
      return this.createFallbackArticle(request);
    }
  }

  // 更新文章
  async updateArticle(request: UpdateArticleRequest): Promise<Article | null> {
    try {
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
    } catch (error) {
      console.error('更新文章失败:', error);
      return this.updateFallbackArticle(request);
    }
  }

  // 删除文章
  async deleteArticle(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });
      await this.handleResponse<{success: boolean; message: string}>(response);
      return true;
    } catch (error) {
      console.error('删除文章失败:', error);
      return this.deleteFallbackArticle(id);
    }
  }

  // 搜索文章
  async searchArticles(keyword: string): Promise<Article[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/articles/search?keyword=${encodeURIComponent(keyword)}`, {
        headers: this.getAuthHeaders(),
      });
      const result = await this.handleResponse<{success: boolean; data: any[]}>(response);
      return result.data.map(this.transformApiDataToArticle);
    } catch (error) {
      console.error('搜索文章失败:', error);
      return this.searchFallbackArticles(keyword);
    }
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

  // ========== localStorage 回退方法 ==========

  private getFallbackStorageKey = () => 'my-articles';

  private getFallbackArticles(): Article[] {
    try {
      const articles = localStorage.getItem(this.getFallbackStorageKey());
      return articles ? JSON.parse(articles) : [];
    } catch (error) {
      console.error('获取本地文章失败:', error);
      return [];
    }
  }

  private getFallbackArticleById(id: string): Article | null {
    try {
      const articles = this.getFallbackArticles();
      return articles.find(article => article.id === id) || null;
    } catch (error) {
      console.error('获取本地文章失败:', error);
      return null;
    }
  }

  private createFallbackArticle(request: CreateArticleRequest): Article {
    try {
      const articles = this.getFallbackArticles();
      const newArticle: Article = {
        id: this.generateId(),
        title: request.title,
        content: request.content,
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      articles.unshift(newArticle);
      localStorage.setItem(this.getFallbackStorageKey(), JSON.stringify(articles));
      return newArticle;
    } catch (error) {
      console.error('创建本地文章失败:', error);
      throw new Error('创建文章失败');
    }
  }

  private updateFallbackArticle(request: UpdateArticleRequest): Article | null {
    try {
      const articles = this.getFallbackArticles();
      const index = articles.findIndex(article => article.id === request.id);
      
      if (index === -1) {
        return null;
      }

      const updatedArticle = {
        ...articles[index],
        title: request.title || articles[index].title,
        content: request.content || articles[index].content,
        updatedAt: new Date().toISOString(),
      };

      articles[index] = updatedArticle;
      localStorage.setItem(this.getFallbackStorageKey(), JSON.stringify(articles));
      return updatedArticle;
    } catch (error) {
      console.error('更新本地文章失败:', error);
      throw new Error('更新文章失败');
    }
  }

  private deleteFallbackArticle(id: string): boolean {
    try {
      const articles = this.getFallbackArticles();
      const filteredArticles = articles.filter(article => article.id !== id);
      
      if (filteredArticles.length === articles.length) {
        return false;
      }

      localStorage.setItem(this.getFallbackStorageKey(), JSON.stringify(filteredArticles));
      return true;
    } catch (error) {
      console.error('删除本地文章失败:', error);
      throw new Error('删除文章失败');
    }
  }

  private searchFallbackArticles(keyword: string): Article[] {
    try {
      const articles = this.getFallbackArticles();
      const lowerKeyword = keyword.toLowerCase();
      
      return articles.filter(article => 
        article.title.toLowerCase().includes(lowerKeyword) ||
        article.content.toLowerCase().includes(lowerKeyword)
      );
    } catch (error) {
      console.error('搜索本地文章失败:', error);
      return [];
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // 初始化示例数据（可选）
  initMockData(): void {
    try {
      const existingArticles = this.getFallbackArticles();
      if (existingArticles.length === 0) {
        const mockArticles: Article[] = [
          {
            id: this.generateId(),
            title: "React 18 新特性详解",
            content: `React 18 引入了许多令人兴奋的新特性，这些特性旨在提升应用性能和开发体验。

主要新特性包括：

1. 并发渲染（Concurrent Rendering）
   - 允许React在渲染过程中中断和恢复工作
   - 提供更流畅的用户体验
   - 支持优先级调度

2. 自动批处理（Automatic Batching）
   - 在事件处理函数、Promise、setTimeout等中自动批处理状态更新
   - 减少不必要的重新渲染

3. 新的API
   - useId：生成唯一的ID
   - useSyncExternalStore：用于外部存储的同步
   - useInsertionEffect：用于CSS-in-JS库

4. 严格模式更新
   - 在开发模式下模拟组件卸载和重新挂载
   - 帮助发现隐藏的bug

这些新特性使得React应用能够更好地处理复杂的用户界面和大量的数据更新。`,
            date: "2024-01-15",
            createdAt: new Date('2024-01-15').toISOString(),
            updatedAt: new Date('2024-01-15').toISOString(),
          },
          {
            id: this.generateId(),
            title: "TypeScript 高级技巧",
            content: "学习 TypeScript 的高级类型操作、泛型应用和装饰器模式，让你的代码更加类型安全和可维护。",
            date: "2024-01-12",
            createdAt: new Date('2024-01-12').toISOString(),
            updatedAt: new Date('2024-01-12').toISOString(),
          },
          {
            id: this.generateId(),
            title: "前端性能优化指南",
            content: "从代码分割、懒加载到缓存策略，全面介绍前端性能优化的各种技术和工具。",
            date: "2024-01-10",
            createdAt: new Date('2024-01-10').toISOString(),
            updatedAt: new Date('2024-01-10').toISOString(),
          },
        ];

        localStorage.setItem(this.getFallbackStorageKey(), JSON.stringify(mockArticles));
      }
    } catch (error) {
      console.error('初始化示例数据失败:', error);
    }
  }
}

// 导出单例实例
export const articleServiceApi = new ArticleServiceApi();