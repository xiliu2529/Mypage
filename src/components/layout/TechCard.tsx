import React, { useState } from "react";
import {
  Card,
  Typography,
  Box,
  LinearProgress,
  Avatar,
} from "@mui/material";
import { useAppContext } from "../../context/useAppContext";

type TechCardProps = {
  icon: string; // 图标 URL
  name: string; // 技术名
  level: number; // 熟练度百分比
  desc?: string; // 初始描述
  hoverDesc?: string; // 悬浮时显示的描述
};

const TechCard: React.FC<TechCardProps> = ({ icon, name, level, desc, hoverDesc }) => {
  const darkMode = useAppContext();
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
      sx={{
        width: 250,
        height: 180,
        borderRadius: 3,
        boxShadow: 3,
        p: 2,
        transition: "transform 0.2s",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 6,
        },
      }}
    >
      {/* 正常内容层 */}
      <Box display="flex" alignItems="center" mb={1} zIndex={1}>
        <Avatar
          src={icon}
          sx={{
            width: 32,
            height: 32,
            mr: 1,
            color: darkMode ? "#8039ddff" : "#ff3a9cff",
          }}
        />
        <Typography variant="h6" fontWeight={600}>
          {name}
        </Typography>
      </Box>

      {desc && !hovered && (
        <Typography variant="h5" color="text.secondary" mb={1}>
          {desc}
        </Typography>
      )}

      <LinearProgress
        variant="determinate"
        value={level}
        sx={{
          height: 10,
          borderRadius: 4,
          backgroundColor: "#ddd",
        }}
      />

      {/* 悬浮遮罩层 */}
      {hovered && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: 2,
            textAlign: "center",
            transition: "opacity 0.3s ease-in-out",
            zIndex: 2,
          }}
        >
          <Typography variant="body1">
            {hoverDesc ?? "暂无更多信息"}
          </Typography>
        </Box>
      )}
    </Card>
  );
};

export default TechCard;
