"use client";

import { motion, useSpring,  } from "framer-motion";


import {
  type RefObject,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

// ======= 主组件 =======

const MultiDrag: React.FC = () => {
  const [visible, setVisible] = useState(true);

  return (
    <>
      {[...Array(5)].map((_, i) => (
        <DraggableBall
          key={i}
          index={i}
          delay={i * 100}
          visible={visible}
          setVisible={setVisible}
        />
      ))}
    </>
  );
};

export default MultiDrag;

// ======= 拖尾球组件 =======

type DraggableBallProps = {
  delay?: number;
  index?: number;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

const DraggableBall: React.FC<DraggableBallProps> = ({
  delay = 0,
  index = 0,
  visible,
  setVisible,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useFollowPointer(ref, delay, setVisible);

  const color = useRef(getRandomColor());

  const baseOpacity = 1 - index * 0.07;
  const scale = 1 - index * 0.05;

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: visible ? baseOpacity : 0 }}
      transition={{ duration: 0.4 }}
       style={{
      ...ball,
      pointerEvents: "none", // ✅ 放回 style 中（但用 as 断言类型）
      backgroundColor: color.current,
      x,
      y,
      scale,
    } as any} // ← 断言为 any 避开 TS 对 pointerEvents 的限制
  />
);
};

// ======= 鼠标跟随逻辑（带静止检测）=======

const spring = { damping: 5, stiffness: 120, restDelta: 0.001 };

const useFollowPointer = (
  ref: RefObject<HTMLDivElement | null>,
  delay: number = 0,
  setVisible: Dispatch<SetStateAction<boolean>>
) => {
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  const lastMoveTime = useRef(Date.now());

  // 监听是否鼠标静止 + 小球也静止
  useEffect(() => {
    const checkIdle = () => {
      const now = Date.now();
      const timeSinceMove = now - lastMoveTime.current;
      const vx = x.getVelocity();
      const vy = y.getVelocity();
      const speed = Math.sqrt(vx ** 2 + vy ** 2);

      if (timeSinceMove > 400 && speed < 2) {
        setVisible(false);
      }
    };

    const interval = setInterval(checkIdle, 100);
    return () => clearInterval(interval);
  }, [x, y, setVisible]);

  useEffect(() => {
    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      lastMoveTime.current = Date.now();
      setVisible(true); // 只要动了就出现

      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();

      setTimeout(() => {
        x.set(clientX - rect.width / 2);
        y.set(clientY - rect.height / 2);
      }, delay);
      
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [delay, x, y, setVisible]);

  return { x, y };
};

// ======= 随机颜色 & 样式 =======

const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 85%, 60%)`;
};

const ball = {
  width: 16,
  height: 16,
  borderRadius: "50%",
  position: "absolute" as const,
  top: 0,
  left: 0,
  pointerEvents: "none",
  zIndex: 10,
};
