import React from "react";
import { Card, Typography, Box, LinearProgress, Avatar } from "@mui/material";
import { useAppContext } from "../../context/useAppContext";
type TechCardProps = {
  icon: string; // 图标 URL
  name: string; // 技术名
  level: number; // 熟练度百分比
  desc?: string; // 描述（可选）
};

const TechCard: React.FC<TechCardProps> = ({ icon, name, level, desc }) => {
  const darkMode = useAppContext();
  return (
    <Card
      sx={{
        width: 250,
        borderRadius: 3,
        boxShadow: 3,
        p: 2,
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 6,
        },
      }}
    >
      <Box display="flex" alignItems="center" mb={1}>
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

      {desc && (
        <Typography variant="body2" color="text.secondary" mb={1}>
          {desc}
        </Typography>
      )}

      <LinearProgress
        variant="determinate"
        value={level}
        sx={{
          height: 30,
          borderRadius: 4,
        }}
      />
    </Card>
  );
};

export default TechCard;
