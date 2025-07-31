// pages/About.tsx
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import Typewriter from "../../components/layout/Typewriter";
import { useState } from "react";
import GitHubCalendar from "react-github-calendar";
import TechCard from "@/components/layout/TechCard";
import reactIcon from "../../assets/icon/science.png";
import mysqlIcon from "../../assets/icon/programing.png";
import javaIcon from "../../assets/icon/java.png";
import jsIcon from "../../assets/icon/java-script.png";
import pythonIcon from "../../assets/icon/python.png";
import { motion } from "framer-motion";

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
    { label: "共产主义者", targetId: "section-communist" },
  ];

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.85 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.4 }} // 这里改成 once: false
      >
        <Card
          raised
          style={{
            width: "830px",
            zIndex: 100,
            margin: "100px auto  250px auto",
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.85 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.4 }} // 这里改成 once: false
      >
        <Box justifyContent="center" id="section-programmer" m={20}>
          <Box sx={{ m: 10 }}>
            <Typography variant="h4" gutterBottom>
              一直想自己做一个网站,拖了很久很久,不过还好,总算在7月开始动手了。
            </Typography>
            <Typography variant="h4">
              从搭建页面到调试功能，边做边学，过程虽然折腾，但学到了很多东西，也找回了久违的成就感。
            </Typography>
          </Box>
          <Grid container spacing={2} justifyContent="center">
            <Typography variant="h4">技术栈：</Typography>
            <TechCard icon={reactIcon} name="React" level={45} />.
            <TechCard icon={jsIcon} name="JS/TS" level={45} />
            <TechCard icon={javaIcon} name="Java" level={25} />
            <TechCard icon={mysqlIcon} name="Mysql" level={30} />
            <TechCard icon={pythonIcon} name="Python" level={20} />
            <GitHubCalendar
              username="xiliu2529"
              blockSize={22}
              blockMargin={6}
              fontSize={14}
            />
            ;
          </Grid>
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.85 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.4 }}
      >
        <Box justifyContent="center" id="section-developer" m={20}>
          <Box sx={{ m: 10 }}>
            <Typography variant="h4" gutterBottom>
              作为一个游戏玩家，我喜欢探索各种类型的游戏，从角色扮演到策略游戏，每个游戏都有其独特的魅力。
            </Typography>
            <Typography variant="h4">
              游戏不仅是我的娱乐方式，也是我学习编程和设计思维的重要来源。
            </Typography>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default About;
