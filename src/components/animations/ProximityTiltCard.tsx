import React, { useEffect, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
// motion：可动的div，useSpring：平滑动画值，useTransform：值映射转换

type Props = {
  children: React.ReactNode; // 被包裹的子元素
  maxDistance?: number; // 鼠标影响范围（半径），单位px
  moveAmount?: number; // 元素最大平移的距离，单位px
  enableGlow?: boolean; // 是否启用发光效果
  glowColor?: string; // 发光颜色，RGB格式，不带透明度
};

const ProximityAttract: React.FC<Props> = ({
  children,
  maxDistance = 0, // 默认影响范围为300px
  moveAmount = 10, // 默认最多移动20px
  enableGlow = true, // 默认启用发光效果
  glowColor = "#000000", // 默认发黑光
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  // 获取motion.div的DOM元素，用于计算中心位置

  const offsetX = useSpring(0, { stiffness: 100, damping: 20 });
  const offsetY = useSpring(0, { stiffness: 100, damping: 20 });
  // 定义x/y方向的平移动画值，带有弹性回弹

  const glowIntensity = useSpring(0, { stiffness: 100, damping: 20 });
  // 控制发光强度的动画值

  const boxShadow = useTransform(glowIntensity, (o) => {
    const hex = glowColor.replace("#", "");

    const fullHex =
      hex.length === 3
        ? hex
            .split("")
            .map((c) => c + c)
            .join("")
        : hex.padEnd(6, "0");

    const bigint = parseInt(fullHex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `0 0 30px rgba(${r}, ${g}, ${b}, ${o.toFixed(2)})`;
  });
  // 将 glowIntensity 映射成 CSS 的 box-shadow 值，形成柔和发光效果

  useEffect(() => {
    // 设置全局鼠标事件监听器

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return; // 如果没有渲染出来则退出

      const rect = ref.current.getBoundingClientRect(); // 获取元素的边界框
      const centerX = rect.left + rect.width / 2; // 计算中心X坐标
      const centerY = rect.top + rect.height / 2; // 计算中心Y坐标

      const dx = e.clientX - centerX; // 鼠标到元素中心X方向的距离
      const dy = e.clientY - centerY; // 鼠标到元素中心Y方向的距离
      const distance = Math.sqrt(dx * dx + dy * dy); // 鼠标与元素中心的实际距离（勾股定理）

      if (distance > maxDistance) {
        // 超出影响范围则归位
        offsetX.set(0);
        offsetY.set(0);
        glowIntensity.set(0);
        return;
      }

      const strength = 1 - distance / maxDistance;
      // 强度是离中心越近越大，范围 0～1

      // 设置X/Y方向的平移值，方向归一化后乘以最大移动距离和强度
      offsetX.set((dx / distance) * moveAmount * strength);
      offsetY.set((dy / distance) * moveAmount * strength);

      // 发光强度也按距离映射
      glowIntensity.set(enableGlow ? strength : 0);
    };

    const handleMouseLeave = () => {
      // 鼠标离开窗口时动画归零
      offsetX.set(0);
      offsetY.set(0);
      glowIntensity.set(0);
    };

    // 注册全局鼠标事件监听
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      // 清理监听器，防止内存泄漏
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [maxDistance, moveAmount, enableGlow]); // 当这些参数变化时重新绑定监听器

  return (
    <motion.div
      ref={ref} // 绑定元素DOM引用
      style={{
        translateX: offsetX, // 平移动画：X方向
        translateY: offsetY, // 平移动画：Y方向
        boxShadow: enableGlow ? boxShadow : undefined, // 发光阴影
        transition: "box-shadow 0.3s ease", // 发光的过渡动画
        borderRadius: 8, // 圆角（可根据需求修改）
        willChange: "transform", // 优化性能提示浏览器此元素会变化
      }}
    >
      {children}
      {/* 渲染被包裹的元素 */}
    </motion.div>
  );
};

export default ProximityAttract;
// 导出组件，可在其他文件中引入使用
