import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Zoom from "@mui/material/Zoom";
import type { Article } from "../../types/article";

interface ArticleGridProps {
  articles: Article[];
}

const ArticleCard: React.FC<ArticleGridProps> = ({ articles }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (article: Article) => {
    setSelectedArticle(article);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedArticle(null);
  };

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
          padding: 2,
        }}
      >
        {articles.map((article, index) => (
          <Card
            key={index}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              boxShadow: 3,
              borderRadius: 2,
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                {article.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                📅 {article.date}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  lineHeight: 1.6,
                  '& p': { margin: 0 },
                  '& h1, & h2, & h3': { margin: '8px 0' },
                }}
                dangerouslySetInnerHTML={{
                  __html: article.content.length > 100
                    ? article.content.replace(/<[^>]*>/g, '').slice(0, 100) + "..."
                    : article.content.replace(/<[^>]*>/g, '')
                }}
              />
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => handleOpen(article)}
              >
                阅读更多
              </Button>
              <Button size="small" variant="outlined" color="secondary">
                ❤️ 收藏
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      {/* 模态框组件 */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="article-modal-title"
        aria-describedby="article-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Zoom in={open}>
          <Box
            sx={{
              position: "relative",
              width: { xs: "90%", sm: "80%", md: "70%", lg: "60%" },
              maxWidth: 800,
              maxHeight: "90vh",
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              overflow: "auto",
            }}
          >
            {/* 文章内容 */}
            {selectedArticle && (
              <Box>
                <Typography
                  id="article-modal-title"
                  variant="h4"
                  component="h2"
                  gutterBottom
                  sx={{ fontWeight: "bold", pr: 4 }}
                >
                  {selectedArticle.title}
                </Typography>

                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                  sx={{ mb: 3 }}
                >
                  📅 发布时间: {selectedArticle.date}
                </Typography>

                <Box 
                  id="article-modal-description" 
                  sx={{ 
                    mt: 2,
                    lineHeight: 1.8,
                    fontSize: "1.1rem",
                    '& p': { margin: '12px 0' },
                    '& h1': { fontSize: '2rem', margin: '24px 0 16px 0', fontWeight: 'bold' },
                    '& h2': { fontSize: '1.5rem', margin: '20px 0 12px 0', fontWeight: 'bold' },
                    '& h3': { fontSize: '1.25rem', margin: '16px 0 10px 0', fontWeight: 'bold' },
                    '& ul, & ol': { margin: '12px 0', paddingLeft: '24px' },
                    '& li': { margin: '6px 0' },
                  }}
                  dangerouslySetInnerHTML={{
                    __html: selectedArticle.content
                  }}
                />

                {/* 操作按钮 */}
                <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<span>❤️</span>}
                  >
                    收藏文章
                  </Button>
                  <Button variant="outlined" color="info">
                    分享
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Zoom>
      </Modal>
    </>
  );
};

export default ArticleCard;
