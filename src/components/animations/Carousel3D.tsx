import React, { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);

const Carousel3D: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null); // 绑定轮播容器的引用
  const imagesRef = useRef<HTMLDivElement[]>([]); // 存放所有图片元素的引用数组
  const progress = { value: 0 }; // 进度状态（控制旋转）
  const imageSize = 470; // 每张图片的宽度
  const radius = imageSize * 1.4; // 图片围绕圆心旋转的半径
  const rotationSpeed = useRef(0.0003); // 图片自动旋转速度

  // 示例图片地址数组（你可以添加更多图片）
  const images = [
    { url: "images/wukong.jpg", label: "黑神话-悟空" },
    { url: "images/lol.jpg", label: "英雄联盟" },
  ];

  useEffect(() => {
    const carousel = carouselRef.current; // 获取轮播容器
    const images = imagesRef.current; // 获取所有图片元素
    if (!carousel || images.length === 0) return; // 如果未加载则中断

    // 创建鼠标/触控交互监听器
    const observer = Observer.create({
      target: carousel, // 监听的目标是整个轮播区域
      type: "pointer,touch,", // 支持指针和触控事件
      onPress: () => {
        carousel.style.cursor = "grabbing"; // 按下时手型变抓取
        rotationSpeed.current = 0; // 停止自动旋转
      },
      onRelease: () => {
        carousel.style.cursor = "grab"; // 松开时恢复手型
        rotationSpeed.current = 0.0003; // 恢复自动旋转
      },
      onChange: (self) => {
        gsap.killTweensOf(progress); // 杀掉旧动画
        const p =
          self.event.type === "wheel"
            ? self.deltaY * -0.0005 // 滚轮控制
            : self.deltaX * 0.05; // 拖动控制
        gsap.to(progress, {
          duration: 2,
          ease: "power4.out",
          value: `+=${p}`, // 增加/减少当前进度值，实现旋转
        });
      },
    });

    // 动画循环函数
    const animate = () => {
      progress.value += rotationSpeed.current; // 持续推进进度
      images.forEach((image, index) => {
        const theta = index / images.length - progress.value; // 每张图的角度
        const x = -Math.sin(theta * Math.PI * 2) * radius; // X轴偏移
        const y = Math.cos(theta * Math.PI * 2) * radius; // Z轴偏移
        image.style.transform = `translate3d(${x}px, 0px, ${y}px) rotateY(${
          360 * -theta
        }deg)`; // 设置3D旋转与位置
      });
    };

    gsap.ticker.add(animate); // 启动GSAP动画帧更新

    return () => {
      observer.kill(); // 清除监听器
      gsap.ticker.remove(animate); // 移除动画更新函数
    };
  }, []);

  return (
    <Box
      ref={carouselRef} // 绑定轮播容器引用
      sx={{
        width: "100%", // 宽度撑满父容器
        height: "100vh", // 高度占满整个视口
        display: "flex", // 启用flex布局
        justifyContent: "center", // 水平居中子元素、

        alignItems: "center", // 垂直居中子元素
        transform: {
          xs: "rotateX(-5deg) scale(0.6) translateY(-60px)", // 手机端略微倾斜缩放
          sm: "rotateX(-5deg) translateY(-70px)", // 小屏幕以上略微倾斜
        },
        transformStyle: "preserve-3d", // 保持3D上下文
        perspective: 1200, // 设置3D透视深度
        userSelect: "none", // 禁止用户选中内容
        cursor: "grab", // 默认鼠标为抓取手型
        position: "relative", // 设为相对定位，供子元素绝对定位参考
      }}
    >
      {images.map((image, i) => (
        <Box
          key={i} // 每个Box唯一key
          ref={(el: HTMLDivElement | null) => {
            if (el) imagesRef.current[i] = el; // 存储每个图片Box引用
          }}
          sx={{
            position: "absolute", // 绝对定位以便绕圆心排布
            top: "50%", // 相对父容器垂直居中
            left: "50%", // 相对父容器水平居中
            marginTop: `-${imageSize / 2}px`, // 上移自身高度一半，居中
            marginLeft: `-${imageSize / 2}px`, // 左移自身宽度一半，居中
            width: imageSize, // 图片宽度
            height: imageSize / 1.9, // 高度是宽度的2/3
            backgroundImage: `url(${image.url})`,
            backgroundSize: "contain", // 保持完整显示
            backgroundRepeat: "no-repeat", // 不重复显示
            backgroundPosition: "center", // 居中显示背景图
            transformOrigin: "50% 50%", // 设置变换基点为中心
            backgroundColor: "red",
          }}
        >
          {/* 子元素：用于添加文字说明或其他叠加内容 */}
          <Box sx={{ transform: "translateY(-20px)" }}>{image.label}</Box>
        </Box>
      ))}
    </Box>
  );
};

export default Carousel3D;
