import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import ArticleCard from "@/components/layout/ArticleCard";
import ArticleModal from "@/components/layout/ArticleModal";
import CalendarModal from "@/components/layout/CalendarModal";
import { useState } from "react";
const User = () => {
  const [openArticleModal, setOpenArticleModal] = useState(false);
  const [openCalendarModal, setOpenCalendarModal] = useState(false);
  const mockArticles = [
    {
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
    },
    {
      title: "TypeScript 高级技巧",
      content:
        "学习 TypeScript 的高级类型操作、泛型应用和装饰器模式，让你的代码更加类型安全和可维护。",
      date: "2024-01-12",
    },
    {
      title: "前端性能优化指南",
      content:
        "从代码分割、懒加载到缓存策略，全面介绍前端性能优化的各种技术和工具。",
      date: "2024-01-10",
    },
    {
      title: "CSS Grid 布局实战",
      content:
        "通过实际案例学习 CSS Grid 布局的强大功能，创建复杂的响应式页面布局。",
      date: "2024-01-08",
    },
    {
      title: "Node.js 微服务架构",
      content:
        "使用 Node.js 构建微服务架构，包括服务发现、负载均衡和分布式追踪等关键技术。",
      date: "2024-01-05",
    },
    {
      title: "Webpack 5 配置指南",
      content:
        "深入了解 Webpack 5 的新特性和配置技巧，优化你的构建流程和打包结果。",
      date: "2024-01-03",
    },
    {
      title: "前端测试最佳实践",
      content:
        "学习如何使用 Jest、Testing Library 等工具进行前端单元测试和集成测试。",
      date: "2024-01-01",
    },
    {
      title: "响应式设计原理",
      content:
        "掌握响应式设计的核心原理和实现技巧，确保网站在各种设备上都能完美显示。",
      date: "2023-12-28",
    },
    {
      title: "前端安全防护策略",
      content:
        "了解常见的前端安全漏洞和防护措施，保护你的应用免受 XSS、CSRF 等攻击。",
      date: "2023-12-25",
    },
  ];

  return (
    <Box sx={{ m: 10 }}>
      {/* 标题 */}
      <Box>
        <Typography variant="h3" gutterBottom>
          XIliu
        </Typography>
      </Box>
      {/* 卡片 */}
      <Box
        sx={{
          display: "flex", // 水平排列
          gap: 2, // 卡片之间间距
          flexWrap: "wrap", // 多个卡片换行
        }}
      >
        <ArticleCard articles={mockArticles} />
      </Box>
      <Box>
        <ButtonGroup
          orientation="vertical"
          aria-label="Vertical button group"
          variant="contained"
          sx={{
            position: "fixed", // 固定在页面
            top: "30%", // 垂直居中
            right: 30, // 靠左
            transform: "translateY(-50%)", // 让按钮组中心对齐屏幕垂直中心
            zIndex: 1000, // 确保浮在最上层
          }}
        >
          <Button
            variant="contained"
            onClick={() => setOpenArticleModal(true)} // ✅ 特定命名
          >
            写文章
          </Button>

          <Button
            variant="contained"
            onClick={() => setOpenCalendarModal(true)} // ✅ 特定命名
          >
            日历
          </Button>
          <Button key="three">Three</Button>
        </ButtonGroup>
        <ArticleModal
          open={openArticleModal}
          onClose={() => setOpenArticleModal(false)}
          onSubmit={(title, content) => console.log(title, content)}
        />

        <CalendarModal
          open={openCalendarModal}
          onClose={() => setOpenCalendarModal(false)}
        />
      </Box>
    </Box>
  );
};

export default User;
