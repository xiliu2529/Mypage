# 数据库服务说明

## 概述

本项目使用 localStorage 作为前端数据库解决方案，提供完整的文章管理功能。

## 文件结构

```
src/
├── types/
│   └── article.ts          # 文章相关类型定义
├── services/
│   ├── articleService.ts   # 文章服务类
│   └── README.md          # 服务说明文档
└── components/
    ├── layout/
    │   ├── ArticleModal.tsx    # 文章写作弹窗
    │   └── ArticleCard.tsx     # 文章卡片组件
    └── pages/
        └── User.tsx            # 用户页面
```

## 主要功能

### 1. 文章服务 (articleService)

- **创建文章**: `createArticle()` - 保存新文章到数据库
- **获取文章**: `getArticles()` - 获取所有文章列表
- **获取单篇文章**: `getArticleById()` - 根据ID获取文章
- **更新文章**: `updateArticle()` - 更新现有文章
- **删除文章**: `deleteArticle()` - 删除指定文章
- **搜索文章**: `searchArticles()` - 按关键词搜索文章
- **初始化数据**: `initMockData()` - 初始化示例数据

### 2. 数据结构

```typescript
interface Article {
  id: string;           // 唯一标识符
  title: string;        // 文章标题
  content: string;      // 文章内容（HTML格式）
  date: string;         // 发布日期 (YYYY-MM-DD)
  createdAt: string;    // 创建时间 (ISO格式)
  updatedAt: string;    // 更新时间 (ISO格式)
}
```

### 3. 存储方式

- 使用浏览器的 `localStorage` 存储
- 存储键名: `my-articles`
- 数据格式: JSON字符串
- 支持跨会话持久化

## 使用方法

### 创建文章

```typescript
import { articleService } from '../services/articleService';

const newArticle = await articleService.createArticle({
  title: "我的新文章",
  content: "<p>这是文章内容</p>"
});
```

### 获取文章列表

```typescript
const articles = articleService.getArticles();
```

### 更新文章

```typescript
const updatedArticle = await articleService.updateArticle({
  id: "article-id",
  title: "更新后的标题",
  content: "<p>更新后的内容</p>"
});
```

### 删除文章

```typescript
const success = await articleService.deleteArticle("article-id");
```

## 特性

1. **类型安全**: 完整的 TypeScript 类型定义
2. **错误处理**: 完善的错误捕获和处理机制
3. **数据持久化**: 使用 localStorage 实现数据持久化
4. **响应式**: 支持实时数据更新
5. **富文本支持**: 支持 HTML 格式的文章内容
6. **搜索功能**: 支持标题和内容的全文搜索

## 注意事项

1. 数据存储在浏览器本地，清除浏览器数据会丢失
2. 适合个人博客或小型项目使用
3. 如需服务端存储，可以轻松替换为 API 调用
4. 支持并发操作，但建议避免同时修改同一篇文章

## 扩展建议

1. 可以添加文章分类功能
2. 支持文章标签系统
3. 添加文章草稿功能
4. 实现文章导入/导出功能
5. 添加文章统计分析功能