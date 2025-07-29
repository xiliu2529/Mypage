// pages/About.tsx
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import Typewriter from "../../components/layout/Typewriter";
import { useState } from "react";
import RotatingImageCircle from "../../components/layout/RotatingImageCircle";

import TechCard from "@/components/layout/TechCard";
import reactIcon from "../../assets/icon/science.png";
import mysqlIcon from "../../assets/icon/programing.png";
import javaIcon from "../../assets/icon/java.png";
import jsIcon from "../../assets/icon/java-script.png";

const About = () => {
  const textList = [
    "西留蝙蝠",
    "Xiliubat",
    "离不开 AI 的程序员",
    "正在学习的半成品全栈开发新手",
  ];

  const [index, setIndex] = useState(0);
  const navItems = [
    { label: "程序员", targetId: "section-programmer" },
    { label: "游戏玩家", targetId: "section-developer" },
    { label: "初级滑雪爱好者", targetId: "section-designer" },
    // { label: "共产主义者", targetId: "section-communist" },
  ];

  return (
    <Box>
      <RotatingImageCircle
        images={[reactIcon]}
        size={1000}
        trackDash={true}
        speed={10}
        trackWidth={0}
      ></RotatingImageCircle>

      <Card
        raised
        style={{
          width: "830px",
          zIndex: 100,
          margin: "100px auto 200px auto",
          padding: 16,
          overflow: "visible",
        }}
      >
        <CardContent>
          <Typography
            variant="h3"
            style={{ userSelect: "none", marginBottom: 16 }}
          >
            我是：
          </Typography>

          <Typewriter
            sx={{ ml: "90px" }}
            text={textList[index]}
            speed={150} // 每个字符打字时间
            variance={0.4} // 打字速度浮动
            backspaceDelay={60} // 删除字符时间
            pauseDelay={1000} // 打完/删完后停顿时间
            cursorBlinkSpeed={0.8}
            Size={"h2"}
            showCursor
            onCycleComplete={() =>
              setIndex((prev) => (prev + 1) % textList.length)
            }
          />
          <Typography variant="h3" sx={{}}>
            一个:
          </Typography>
          <Stack alignItems="flex-end" spacing={2} sx={{ mt: 2 }}>
            {navItems.map((item, index) => (
              <Box
                key={index}
                onClick={() => {
                  const section = document.getElementById(item.targetId);
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                sx={{
                  transition: "transform 0.2s ease, color 0.2s",
                  "&:hover": {
                    transform: "scale(1.5)",
                    color: "primary.main",
                    cursor: "pointer",
                  },
                  "&:active": {
                    transform: "scale(1.3)",
                  },
                }}
              >
                <Typography variant="h3">{item.label}</Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
      <Grid container spacing={2}>
        <TechCard icon={reactIcon} name="React" level={35} />
        <TechCard icon={mysqlIcon} name="Mysql" level={30} />
        <TechCard icon={javaIcon} name="Java" level={25} />
        <TechCard icon={jsIcon} name="JS/TS" level={40} />
      </Grid>
    </Box>
  );
};

export default About;
