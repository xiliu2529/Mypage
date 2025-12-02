import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import TitleIcon from "@mui/icons-material/Title";
import { articleService } from "../../services/articleService";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "请输入文章内容...",
      }),
    ],
    content: "",
  });

  const handleSubmit = async () => {
    const content = editor?.getHTML() || "";
    
    if (!title.trim() || !content.trim()) {
      setSnackbar({
        open: true,
        message: "标题和内容不能为空！",
        severity: 'error',
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 保存文章到数据库
      await articleService.createArticle({
        title: title.trim(),
        content: content.trim(),
      });

      // 调用父组件的回调
      onSubmit(title, content);
      
      // 重置表单
      setTitle("");
      editor?.commands.clearContent();
      onClose();
      
      // 显示成功提示
      setSnackbar({
        open: true,
        message: "文章发布成功！",
        severity: 'success',
      });
    } catch (error) {
      console.error('发布文章失败:', error);
      setSnackbar({
        open: true,
        message: "发布文章失败，请重试！",
        severity: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    editor?.commands.clearContent();
    onClose();
  };

  // ✅ 自定义简单工具栏
  const Toolbar = () => (
    <Box
      sx={{
        borderBottom: "1px solid #ddd",
        display: "flex",
        gap: 1,
        p: 1,
      }}
    >
      <IconButton
        onClick={() => editor?.chain().focus().toggleBold().run()}
        color={editor?.isActive("bold") ? "primary" : "default"}
      >
        <FormatBoldIcon />
      </IconButton>
      <IconButton
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        color={editor?.isActive("italic") ? "primary" : "default"}
      >
        <FormatItalicIcon />
      </IconButton>
      <IconButton
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
        color={
          editor?.isActive("heading", { level: 2 }) ? "primary" : "default"
        }
      >
        <TitleIcon />
      </IconButton>
      <IconButton
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        color={editor?.isActive("bulletList") ? "primary" : "default"}
      >
        <FormatListBulletedIcon />
      </IconButton>
      <IconButton
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        color={editor?.isActive("orderedList") ? "primary" : "default"}
      >
        <FormatListNumberedIcon />
      </IconButton>
    </Box>
  );

  return (
    <Modal open={open} onClose={handleCancel}>
      <>
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
          <Typography variant="h6">文本</Typography>

          <TextField
            label="标题"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />

          {/* ✅ 富文本编辑区域 */}
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: 1,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              height: "500px", // ✅ 改这里！固定高度，避免滚动计算错误
            }}
          >
            {/* ✅ 工具栏固定顶部 */}
            <Box
              sx={{
                borderBottom: "1px solid #ddd",
                backgroundColor: "#fafafa",
                p: 1,
                position: "sticky", // ✅ 让 Toolbar 永远在上面
                top: 0,
                zIndex: 10,
              }}
            >
              <Toolbar />
            </Box>

            {/* ✅ 编辑内容（可滚动区域） */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto", // ✅ 只让内容滚动
                p: 2,
                backgroundColor: "#fff",
                "& .ProseMirror": {
                  minHeight: "400px",
                  outline: "none",
                },
              }}
            >
              <EditorContent editor={editor} />
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button onClick={handleCancel} variant="outlined" disabled={isSubmitting}>
              取消
            </Button>
            <Button 
              onClick={handleSubmit} 
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? "发布中..." : "发布文章"}
            </Button>
          </Box>
        </Box>

        {/* 成功/错误提示 */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </>
    </Modal>
  );
};

export default ArticleModal;
