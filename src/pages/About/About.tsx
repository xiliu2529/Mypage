import { Box, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

const About = () => {
  return (
    <Card raised>
      <div style={{ position: "relative", zIndex: 1, pointerEvents: "auto" }}>
        <CardContent>
          <Typography variant="h5" style={{ userSelect: "none" }}>
            进入动画 + 鼠标放大
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ userSelect: "none" }}
          >
            这是用 framer-motion 做的卡片进入动画示例。
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default About;
