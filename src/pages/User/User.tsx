import { Box, Button, ButtonGroup, Typography, Fade } from "@mui/material";
import ArticleCard from "@/components/layout/ArticleCard";
import ArticleModal from "@/components/layout/ArticleModal";
import CalendarModal from "@/components/layout/CalendarModal";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/useAppContext";
import { articleService } from "../../services/articleService";
import { Article } from "../../types/article";
import "../../utils/testDatabase"; // 导入测试工具

const User = () => {
  const { visible, setVisible } = useAppContext();
  const [openArticleModal, setOpenArticleModal] = useState(false);
  const [openCalendarModal, setOpenCalendarModal] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // 加载文章数据
  const loadArticles = () => {
    try {
      setLoading(true);
      const articleData = articleService.getArticles();
      setArticles(articleData);
    } catch (error) {
      console.error('加载文章失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
  }, [setVisible]);

  useEffect(() => {
    // 初始化示例数据（如果没有数据）
    articleService.initMockData();
    // 加载文章
    loadArticles();
  }, []);

  // 处理文章提交
  const handleArticleSubmit = (title: string, content: string) => {
    // 重新加载文章列表
    loadArticles();
  };

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
        {loading ? (
          <Typography variant="body1">加载中...</Typography>
        ) : articles.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            还没有文章，点击右侧"写作"按钮开始创作吧！
          </Typography>
        ) : (
          <ArticleCard articles={articles} />
        )}
      </Box>
      <Box>
        {visible && (
          <Fade in={true} timeout={1000}>
            <ButtonGroup
              orientation="vertical"
              variant="contained"
              sx={{
                position: "fixed",
                top: "30%",
                right: 30,
                transform: "translateY(-50%)",
                zIndex: 1000,
              }}
            >
              <Button onClick={() => setOpenArticleModal(true)}>写作</Button>
              <Button onClick={() => setOpenCalendarModal(true)}>日历</Button>
            </ButtonGroup>
          </Fade>
        )}
        <ArticleModal
          open={openArticleModal}
          onClose={() => setOpenArticleModal(false)}
          onSubmit={handleArticleSubmit}
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
