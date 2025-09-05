import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import ReactQuill from "react-quill-new"; // ✅ 用这个
import "react-quill-new/dist/quill.snow.css"; // ✅ 样式也改

interface ArticleModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (title: string, content: string) => void;
}

const ArticleModal: React.FC<ArticleModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (title.trim() && content.trim()) {
      onSubmit(title, content); // content 会是 HTML 字符串
      setTitle("");
      setContent("");
      onClose();
    } else {
      alert("标题和内容不能为空！");
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleCancel}
      aria-labelledby="article-modal-title"
      aria-describedby="article-modal-content"
    >
      <Box
        sx={{
          height: "90%",
          width: "70%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",

          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography id="article-modal-title" variant="h6">
          写文章
        </Typography>
        <TextField
          label="标题"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        {/* 富文本编辑器 */}
        <Box sx={{ flex: 1, overflow: "hidden" }}>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            style={{ height: "100%", maxHeight: "500px" }}
            placeholder="请输入文章内容..."
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button onClick={handleCancel} variant="outlined">
            取消
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            提交
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ArticleModal;
