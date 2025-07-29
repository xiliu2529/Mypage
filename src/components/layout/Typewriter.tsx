// components/layout/Typewriter.tsx
import React, { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Typography,
  type SxProps,
  type Theme,
  type TypographyPropsVariantOverrides,
  type TypographyVariant,
} from "@mui/material";
import type { OverridableStringUnion } from "@mui/types";

interface TypewriterProps {
  sx?: SxProps<Theme>;
  text: string;
  speed?: number; // 单个字符打字速度（ms）
  variance?: number; // 打字/删除速度浮动 (0~1)
  backspaceDelay?: number; // 删除每个字符的速度（ms）
  pauseDelay?: number; // 打完或删完后的停顿时间（ms）
  cursorBlinkSpeed?: number; // 光标闪烁频率（秒）
  children?: ReactNode;
  Size?: OverridableStringUnion<
    TypographyVariant | "inherit",
    TypographyPropsVariantOverrides
  >;
  showCursor?: boolean;
  onCycleComplete?: () => void; // 动画打字+删除完整完成后调用
}

const Typewriter: React.FC<TypewriterProps> = ({
  sx,
  text,
  speed = 100,
  variance = 0.3,
  backspaceDelay = 80,
  pauseDelay = 1000,
  cursorBlinkSpeed = 0.8,
  children,
  Size,
  showCursor = true,
  onCycleComplete,
}) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">(
    "typing"
  );
  const timeoutRef = useRef<number | undefined>(undefined);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (phase === "typing") {
      if (displayedText.length < text.length) {
        // 随机生成一个当前字符的延迟时间
        const nextChar = text.charAt(displayedText.length);
        const randomSpeed = speed * (1 + (Math.random() - 0.5) * variance);

        timeoutRef.current = window.setTimeout(() => {
          setDisplayedText((prev) => prev + nextChar);
        }, randomSpeed);
      } else {
        // 打字完成后，进入暂停，再准备删除
        timeoutRef.current = window.setTimeout(() => {
          setPhase("deleting");
        }, pauseDelay);
        setPhase("pausing");
      }
    }

    if (phase === "deleting") {
      if (displayedText.length > 0) {
        const randomSpeed =
          backspaceDelay * (1 + (Math.random() - 0.5) * variance);
        timeoutRef.current = window.setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
        }, randomSpeed);
      } else {
        // 删除完成，触发回调通知外层可以切换文字了
        timeoutRef.current = window.setTimeout(() => {
          onCycleComplete?.(); // 调用父组件的回调
          setPhase("typing"); // 准备下一轮
        }, pauseDelay);
        setPhase("pausing");
      }
    }

    // pausing 阶段什么都不做，等 timeout
  }, [
    phase,
    displayedText,
    text,
    speed,
    variance,
    backspaceDelay,
    pauseDelay,
    onCycleComplete,
  ]);

  // 当 text 文本变化时，重新开始打字
  useEffect(() => {
    setDisplayedText("");
    setPhase("typing");
  }, [text]);

  return (
    <Typography sx={sx} variant={Size}>
      {displayedText || children}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: cursorBlinkSpeed }}
          style={{ display: "inline-block", marginLeft: 2 }}
          aria-hidden="true"
        >
          |
        </motion.span>
      )}
    </Typography>
  );
};

export default Typewriter;
