"use client";

import { frame, motion, useSpring } from "framer-motion";
import {
  type RefObject,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useAppContext } from "../../context/useAppContext";

// ======= 主组件 =======

const MultiDrag: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const { ballOn } = useAppContext();

  return (
    <>
      {ballOn &&
        [...Array(6)].map((_, i) => (
          <DraggableBall
            key={i}
            index={i}
            delay={i * 50}
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
  const { darkMode } = useAppContext();
  const baseOpacity = 1 - index * 0.07;
  const scale = 1 - index * 0.05;

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: visible ? baseOpacity : 0 }}
      transition={{ duration: 0.4 }}
      style={{
        backgroundColor: "transparent",
        x,
        y,
        top: 0,
        left: 0,
        zIndex: 99999,
        scale,
        width: 10,
        pointerEvents: "none",
        height: 10,
        borderRadius: "50%",
        border: darkMode ? "2px solid #e9f0ecff" : "2px solid #131010ff",
        position: "fixed",
     
      }}
      className="draggable-ball"
    />
  );
};

// ======= 鼠标跟随逻辑（带静止检测）=======

const spring = {
  stiffness: 100, // 回弹速度
  damping: 10, // 阻尼小 → 有弹性
  restDelta: 1, // 非常精确，几乎没动才算停
};

const useFollowPointer = (
  ref: RefObject<HTMLDivElement | null>,
  delay: number = 0,
  setVisible: Dispatch<SetStateAction<boolean>>
) => {
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  const lastMoveTime = useRef(Date.now());

  useEffect(() => {
    const checkIdle = () => {
      const now = Date.now();
      const timeSinceMove = now - lastMoveTime.current;
      const vx = x.getVelocity();
      const vy = y.getVelocity();
      const speed = Math.sqrt(vx ** 2 + vy ** 2);

      if (timeSinceMove > 400 && speed < 2) {
        const offsetX = (Math.random() - 0.5) * 100;
        const offsetY = (Math.random() - 0.5) * 100;

        const currentX = x.get();
        const currentY = y.get();

        x.set(currentX + offsetX);
        y.set(currentY + offsetY);

        setTimeout(() => {
          x.set(currentX);
          y.set(currentY);
        }, 300);
      }
    };

    const interval = setInterval(checkIdle, 100);
    return () => clearInterval(interval);
  }, [x, y]);

  useEffect(() => {
    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      lastMoveTime.current = Date.now();
      setVisible(true);

      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();

      frame.read(() => {
        setTimeout(() => {
          x.set(clientX - rect.width / 2);
          y.set(clientY - rect.height / 2);
        }, delay);
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [delay, x, y, setVisible]);

  return { x, y };
};
