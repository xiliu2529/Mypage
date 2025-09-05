import React, { useRef, useState } from "react";
import gsap from "gsap";
import { FaGoogle } from "react-icons/fa";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputBase,
  Paper,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import BaiduIcon from "../../assets/baidu.png";
import type { TransitionProps } from "@mui/material/transitions";
import ProximityTiltCard from "../../components/animations/ProximityTiltCard";
import { useAppContext } from "../../context/useAppContext";
import { fetchBookmarks, addBookmark } from "../../api/index";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const sxGlassBox = {
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
  mt: 5,
  p: 5,
  width: "900px",
};

const sxSearchForm = {
  mx: "auto",
  width: "700px",
  display: "flex",
  alignItems: "center",
  gap: 2,
  p: 1,
  bgcolor: "#f3f4f6",
  borderRadius: 4,
  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)",
};

const sxSearchIcon = {
  width: 56,
  height: 56,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  userSelect: "none",
};

const sxInput = {
  flexGrow: 1,
  fontSize: 18,
  color: "#a79e9e",
};

const sxAddBookmarkButton = {
  borderRadius: "50%",
  border: "1px solid",
  width: 48,
  height: 48,
  my: 2,
};

const sxBookmarkList = {
  display: "flex",
  flexWrap: "wrap",
  gap: 1,
};

const sxBookmarkCard = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  px: 1,
  py: 1,
  borderRadius: 3,
  transition: "all 0.3s ease",
  cursor: "pointer",
};

const sxBookmarkButton = {
  textTransform: "none",
  maxWidth: 400,
};

const sxBookmarkText = {
  display: "inline-block",
  maxWidth: "100%",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  fontSize: "30px",
};

const sxDialogTitle = {
  fontWeight: "bold",
};

const sxDialogActions = {
  padding: "16px 0 0",
};

// ----------------------------------
// ✅ 组件实现
// ----------------------------------

type Engine = {
  name: string;
  icon: React.ReactElement;
  searchUrl: (query: string) => string;
};

const searchEngines: Engine[] = [
  {
    name: "Google",
    icon: <FaGoogle style={{ fontSize: 36, color: "#000" }} />,
    searchUrl: (query) =>
      `https://www.google.com/search?q=${encodeURIComponent(query)}`,
  },
  {
    name: "Baidu",
    icon: (
      <Box
        component="img"
        src={BaiduIcon}
        alt="Baidu"
        sx={{ width: 36, height: 36 }}
      />
    ),
    searchUrl: (query) =>
      `https://www.baidu.com/s?wd=${encodeURIComponent(query)}`,
  },
];

const Home: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [engineIndex, setEngineIndex] = useState(0);
  const { bookmarks, setBookmarks } = useAppContext();

  console.log("Bookmarks:", bookmarks);

  const [siteName, setSiteName] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    fetchBookmarks()
      .then((data) => setBookmarks(data))
      .catch((err) => {
        console.error("获取收藏夹失败：", err);
        // toast("加载失败，请稍后再试");
      });
  }, []);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!siteName || !siteUrl) return;

    const fullUrl = siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`;
    const isDuplicate = bookmarks.some(
      (b) => b.name === siteName || b.url === fullUrl
    );

    if (isDuplicate) {
      // toast("该名称或网址已存在，不能重复添加！");
      return;
    }

    try {
      const saved = await addBookmark({ name: siteName, url: fullUrl }); // ✅ 调用后端
      setBookmarks((prev) => [...prev, saved]); // ✅ 同步状态
      setSiteName("");
      setSiteUrl("");
      handleClose();
    } catch (err) {
      console.error("添加失败：", err);
      // toast("添加失败，请稍后再试");
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const nextIndex =
      (engineIndex + (e.deltaY > 0 ? 1 : -1) + searchEngines.length) %
      searchEngines.length;
    setEngineIndex(nextIndex);

    if (iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  };

  const handleSearch = () => {
    if (!inputRef.current) return;
    const query = inputRef.current.value.trim();
    if (query === "") return;

    const engine = searchEngines[engineIndex];
    const url = engine.searchUrl(query);

    gsap.from(inputRef.current, {
      scale: 0.95,
      duration: 0.3,
      ease: "back.out(1.7)",
    });

    window.open(url, "_blank");
  };

  return (
    <Box sx={sxGlassBox}>
      {/* 搜索栏 */}
      <Paper
        component="form"
        onWheel={handleWheel}
        sx={sxSearchForm}
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <Box ref={iconRef} sx={sxSearchIcon}>
          {React.cloneElement(searchEngines[engineIndex].icon)}
        </Box>
        <InputBase
          inputRef={inputRef}
          placeholder={`使用 ${searchEngines[engineIndex].name} 搜索...`}
          sx={sxInput}
          inputProps={{ "aria-label": "搜索输入框" }}
        />
      </Paper>

      {/* 收藏区域 */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          收藏
        </Typography>

        <IconButton onClick={handleClickOpen} sx={sxAddBookmarkButton}>
          <AddIcon />
        </IconButton>

        {bookmarks.length === 0 ? (
          <Typography color="text.secondary">无</Typography>
        ) : (
          <Box sx={sxBookmarkList}>
            {bookmarks.map((item) => (
              <ProximityTiltCard maxDistance={100} key={item.url}>
                <Paper key={item.url} sx={sxBookmarkCard}>
                  <Button
                    color="success"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={sxBookmarkButton}
                  >
                    <span style={sxBookmarkText as React.CSSProperties}>
                      {item.name}
                    </span>
                  </Button>
                  <IconButton
                    onClick={() =>
                      setBookmarks((prev) =>
                        prev.filter((b) => b.url !== item.url)
                      )
                    }
                    aria-label="delete"
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Paper>
              </ProximityTiltCard>
            ))}
          </Box>
        )}
      </Box>

      {/* 添加收藏弹窗 */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        slots={{
          transition: Transition,
        }}
      >
        <DialogTitle sx={sxDialogTitle}>收藏</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="网站名称"
              variant="filled"
              fullWidth
              margin="normal"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
            />
            <TextField
              label="网址"
              variant="filled"
              fullWidth
              margin="normal"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
            />
            <DialogActions sx={sxDialogActions}>
              <Button onClick={handleClose} color="secondary">
                取消
              </Button>
              <Button type="submit" variant="contained">
                确定
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Home;
