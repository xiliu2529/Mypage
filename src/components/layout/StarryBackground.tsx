import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadLinksPreset } from "tsparticles-preset-links";
import { useAppContext } from "../../context/useAppContext"; // 假设你这样拿darkMode

export default function StarryBackground() {
  const { darkMode } = useAppContext();

  const particlesInit = async (engine: Engine) => {
    await loadLinksPreset(engine);
  };

  const backgroundColor = darkMode ? "#0e1111" : "#f5f5f5"; // 深色和浅色背景色

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: "links",
        background: {
          color: {
            value: backgroundColor,
          },
        },
        fpsLimit: 60,
        interactivity: {
          detectsOn: "canvas",
          events: {
            resize: true,
          },
        },
        particles: {
          color: { value: darkMode ? "#ffffffff" : "#000000ff" },
          links: {
            color: darkMode ? "#f0edecff" : "#222222ff",
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            speed: 0.5,
            straight: false,
          },
          number: { density: { enable: true, area: 800 }, value: 60 },
          opacity: { value: 0.5 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none", // ✅ 避免遮挡点击
        // will-change: transform
        willChange: "transform",
      }}
    />
  );
}
