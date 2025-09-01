import React from "react";
import { Box, Typography, IconButton, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useTheme } from "@mui/material/styles";

// 自定义 B站 SVG 图标
const BilibiliIcon: React.FC<{ fontSize?: number }> = ({ fontSize = 20 }) => {
  const theme = useTheme();
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: fontSize,
        height: fontSize,
        color: "currentColor", // 使用 currentColor，这样可由外层 IconButton 控制
      }}
    >
      {/* 电视外框 */}
      <rect x="2" y="5" width="20" height="14" rx="2.5" ry="2.5" />
      {/* 天线 */}
      <line
        x1="6"
        y1="2"
        x2="7"
        y2="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line
        x1="18"
        y1="2"
        x2="17"
        y2="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* 屏幕里的眼镜 */}
      <rect
        x="6"
        y="8.5"
        width="2"
        height="3"
        rx="0.5"
        ry="0.5"
        fill={theme.palette.primary.contrastText}
      />
      <rect
        x="16"
        y="8.5"
        width="2"
        height="3"
        rx="0.5"
        ry="0.5"
        fill={theme.palette.primary.contrastText}
      />
    </svg>
  );
};

const Footer: React.FC = () => {
  const theme = useTheme(); // 获取主题

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        py: 2,
        mt: "auto",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        fontSize: 14,
        position: "fixed",
        bottom: 0,
        left: 0,
      }}
    >
      <Typography variant="body2">西留蝙蝠 & xiliubat</Typography>

      <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
        <IconButton
          component={Link}
          href="https://github.com/xiliu2529"
          target="_blank"
          sx={{
            color: theme.palette.text.primary, // 默认颜色
            transition: "all 0.2s",
            "&:hover": {
              color: theme.palette.primary.main, // hover 主色
              transform: "scale(1.2)",
            },
          }}
        >
          <GitHubIcon fontSize="small" />
        </IconButton>

        <IconButton
          component={Link}
          href="https://space.bilibili.com/20316496"
          target="_blank"
          sx={{
            color: theme.palette.text.primary, // 默认颜色
            transition: "all 0.2s",
            "&:hover": {
              color: theme.palette.primary.main, // hover 主色
              transform: "scale(1.2)",
            },
          }}
        >
          <BilibiliIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
