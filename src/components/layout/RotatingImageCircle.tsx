import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Box } from "@mui/material";

type Props = {
  images: string[]; // 图片地址数组
  size?: number; // 圆的直径，默认400
  iconSize?: number; // 图标大小，默认64
  speed?: number; // 旋转周期，单位秒，默认50，值越小转速越快
  reverse?: boolean; // 是否反向旋转，默认false
  trackColor?: string; // 轨道颜色，默认 #fffce1
  trackWidth?: number; // 轨道宽度，默认2px
  trackDash?: boolean; // 轨道是否虚线，默认false（实线）
};

const RotatingImageCircle: React.FC<Props> = ({
  images,
  size = 400,
  iconSize = 64,
  speed = 50,
  reverse = false,
  trackColor = "#fffce1",
  trackWidth = 2,
  trackDash = false,
}) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<gsap.core.Timeline | null>(null);

  const placeImages = (imageURLs: string[]) => {
    const circle = circleRef.current;
    if (!circle) return [];

    const angleIncrement = (Math.PI * 2) / imageURLs.length;
    const radius = circle.offsetWidth / 2;
    const imgs: HTMLImageElement[] = [];

    imageURLs.forEach((url, i) => {
      const img = new Image();
      img.src = url;
      img.style.position = "absolute";
      img.style.top = "0";
      img.style.left = "0";
      img.style.transformOrigin = "50% 50%";
      img.style.userSelect = "none";
      img.style.width = `${iconSize}px`;
      img.style.height = `${iconSize}px`;
      img.style.pointerEvents = "none"; // 避免遮挡事件

      const angle = angleIncrement * i;
      // 计算圆周上的坐标
      const x = radius + Math.cos(angle) * radius;
      const y = radius + Math.sin(angle) * radius;

      // 设置位置，不旋转图标（始终正面）
      gsap.set(img, {
        xPercent: -50,
        yPercent: -50,
        x,
        y,
        rotation: 0, // 固定朝向，不旋转
        z: -20,
      });

      circle.appendChild(img);
      imgs.push(img);
    });

    return imgs;
  };

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    circle.innerHTML = "";

    placeImages(images);

    // 旋转角度方向和速度，反向时为负
    const rotationAmount = reverse ? -360 : 360;
    const rotationDuration = speed;

    const spin = gsap.timeline({
      repeat: -1,
      defaults: { duration: rotationDuration, ease: "none" },
    });

    spin.to(circle, { rotation: rotationAmount });

    spinRef.current = spin;

    return () => {
      spin.kill();
      circle.innerHTML = "";
    };
  }, [images, size, iconSize, speed, reverse]);

  return (
    <Box
      sx={{
        position: "absolute",
        // 保证不参与父布局
        display: "block",
        top: 90,
        left: "50%",
        transform: "translateX(-50%)",
        width: size,
        height: size,
        pointerEvents: "none", // 防止事件阻塞
        borderRadius: "50%",
        border: `${trackWidth}px ${
          trackDash ? "dashed" : "solid"
        } ${trackColor}`,
        userSelect: "none",
        touchAction: "none",
        zIndex: 0,
      }}
      ref={circleRef}
    />
  );
};

export default RotatingImageCircle;
