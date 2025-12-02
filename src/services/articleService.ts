import { Article, CreateArticleRequest, UpdateArticleRequest } from '../types/article';

const STORAGE_KEY = 'my-articles';

class ArticleService {
  // 获取所有文章
  getArticles(): Article[] {
    try {
      const articles = localStorage.getItem(STORAGE_KEY);
      return articles ? JSON.parse(articles) : [];
    } catch (error) {
      console.error('获取文章失败:', error);
      return [];
    }
  }

  // 根据ID获取文章
  getArticleById(id: string): Article | null {
    try {
      const articles = this.getArticles();
      return articles.find(article => article.id === id) || null;
    } catch (error) {
      console.error('获取文章失败:', error);
      return null;
    }
  }

  // 创建新文章
  createArticle(request: CreateArticleRequest): Article {
    try {
      const articles = this.getArticles();
      const newArticle: Article = {
        id: this.generateId(),
        title: request.title,
        content: request.content,
        date: new Date().toISOString().split('T')[0], // 格式化为 YYYY-MM-DD
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      articles.unshift(newArticle); // 新文章放在最前面
      localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
      return newArticle;
    } catch (error) {
      console.error('创建文章失败:', error);
      throw new Error('创建文章失败');
    }
  }

  // 更新文章
  updateArticle(request: UpdateArticleRequest): Article | null {
    try {
      const articles = this.getArticles();
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
      return updatedArticle;
    } catch (error) {
      console.error('更新文章失败:', error);
      throw new Error('更新文章失败');
    }
  }

  // 删除文章
  deleteArticle(id: string): boolean {
    try {
      const articles = this.getArticles();
      const filteredArticles = articles.filter(article => article.id !== id);
      
      if (filteredArticles.length === articles.length) {
        return false; // 没有找到要删除的文章
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredArticles));
      return true;
    } catch (error) {
      console.error('删除文章失败:', error);
      throw new Error('删除文章失败');
    }
  }

  // 搜索文章
  searchArticles(keyword: string): Article[] {
    try {
      const articles = this.getArticles();
      const lowerKeyword = keyword.toLowerCase();
      
      return articles.filter(article => 
        article.title.toLowerCase().includes(lowerKeyword) ||
        article.content.toLowerCase().includes(lowerKeyword)
      );
    } catch (error) {
      console.error('搜索文章失败:', error);
      return [];
    }
  }

  // 生成唯一ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // 初始化示例数据（可选）
  initMockData(): void {
    try {
      const existingArticles = this.getArticles();
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

        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockArticles));
      }
    } catch (error) {
      console.error('初始化示例数据失败:', error);
    }
  }
}

// 导出单例实例
export const articleService = new ArticleService();