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
import Carousel3D from "../../components/animations/Carousel3D";

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
        <Box
          justifyContent="center"
          id="section-programmer"
          m={20}
          sx={{ scrollMarginTop: "150px" }}
        >
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
            <TechCard
              icon={reactIcon}
              name="React"
              level={45}
              desc="用于构建现代 Web UI"
              hoverDesc="在前两个项目中用的都是React,已掌握组件、状态、Hook 等基础,Redux只做过修改,还需精进。"
            />
            <TechCard
              icon={jsIcon}
              name="JS/TS"
              level={45}
              desc="网页开发的基础语言"
              hoverDesc="现在主要在React中使用 JS/TS 编写业务逻辑，原生用得较少"
            />
            <TechCard
              icon={javaIcon}
              name="Java"
              level={25}
              desc="后端语言基础"
              hoverDesc="作为最早接触的语言,但是我实际用的不多,在工作中也只做过小部分的修改,不过理解到了面向对象编程。目前正在学习 Spring Boot、接口开发"
            />
            <TechCard
              icon={mysqlIcon}
              name="Mysql"
              level={30}
              desc="关系型数据库"
              hoverDesc="掌握基本的增删改查、索引、临时表使用，正在深入学习中间表设计和多表联查"
            />
            <TechCard
              icon={pythonIcon}
              name="Python"
              level={20}
              desc="语法简洁的编程语言"
              hoverDesc="用过 Python 开发自动化测试系统，目前掌握还不多，适合做小工具，正在继续学习"
            />
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
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.4 }}
      >
        <Box
          justifyContent="center"
          id="section-developer"
          m={10}
          sx={{ scrollMarginTop: "200px" }}
        >
          <Box sx={{ m: 10 }}>
            <Typography variant="h4" gutterBottom>
              作为一个游戏玩家，我喜欢探索各种类型的游戏，从角色扮演到策略游戏，每个游戏都有其独特的魅力。
            </Typography>
            <Typography variant="h4">
              游戏不仅是我的娱乐方式，也是我学习编程和设计思维的重要来源。
            </Typography>
            <Carousel3D />

            <Box
              id="section-communist"
              sx={{ mt: 30, scrollMarginTop: "200px" }}
            >
              111
            </Box>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default About;
