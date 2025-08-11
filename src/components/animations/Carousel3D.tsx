import React, { useRef, useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

gsap.registerPlugin(Observer);

const Carousel3D: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const progress = { value: 0 };
  const imageSize = 450;
  const radius = imageSize * 1.4;
  const rotationSpeed = useRef(0.0003);

  const [openGameIndex, setOpenGameIndex] = useState<number | null>(null);
  const [openImageIndex, setOpenImageIndex] = useState(0);

  const games = [
    {
      label: "黑神话-悟空",
      images: [
        "images/wukong.jpg",
        "images/wukong1.jpg",
        "images/wukong2.jpg",
        "images/wukong3.jpg",
      ],
    },
    {
      label: "英雄联盟",
      images: ["images/lol2.jpg", "images/lol1.jpg", "images/lol3.jpg"],
    },
    {
      label: "GTA5",
      images: ["images/gta5.png", "images/gta5_1.png", "images/gta5_2.png"],
    },
  ];

  useEffect(() => {
    const carousel = carouselRef.current;
    const items = imagesRef.current;
    if (!carousel || items.length === 0) return;

    const observer = Observer.create({
      target: carousel,
      type: "pointer,touch",
      onPress: () => {
        carousel.style.cursor = "grabbing";
        rotationSpeed.current = 0;
      },
      onRelease: () => {
        carousel.style.cursor = "grab";
        rotationSpeed.current = 0.0003;
      },
      onChange: (self) => {
        gsap.killTweensOf(progress);
        const delta =
          self.event.type === "wheel"
            ? self.deltaY * -0.0005
            : self.deltaX * 0.05;
        gsap.to(progress, {
          duration: 2,
          ease: "power4.out",
          value: `+=${delta}`,
        });
      },
    });

    const animate = () => {
      progress.value += rotationSpeed.current;
      items.forEach((image, index) => {
        const theta = index / items.length - progress.value;
        const x = -Math.sin(theta * Math.PI * 2) * radius;
        const y = Math.cos(theta * Math.PI * 2) * radius;
        image.style.transform = `translate3d(${x}px, 0px, ${y}px) rotateY(${
          360 * -theta
        }deg)`;
      });
    };

    gsap.ticker.add(animate);

    return () => {
      observer.kill();
      gsap.ticker.remove(animate);
    };
  }, []);

  const mainImages = games.map((g) => ({
    url: g.images[0],
    label: g.label,
  }));

  const handleOpen = (gameIndex: number) => {
    setOpenGameIndex(gameIndex);
    setOpenImageIndex(0);
  };

  const handleClose = () => {
    setOpenGameIndex(null);
    setOpenImageIndex(0);
  };

  const handlePrev = () => {
    setOpenImageIndex((prev) =>
      prev === 0 ? games[openGameIndex!].images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setOpenImageIndex((prev) =>
      prev === games[openGameIndex!].images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      <Box
        ref={carouselRef}
        sx={{
          mt: "300px",
          width: "100%",
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: {
            xs: "rotateX(-5deg) scale(0.6) translateY(-60px)",
            sm: "rotateX(-5deg) translateY(-70px)",
          },
          transformStyle: "preserve-3d",
          perspective: 1200,
          userSelect: "none",
          cursor: "grab",
          position: "relative",
        }}
      >
        {mainImages.map((image, i) => (
          <Box
            key={i}
            ref={(el: HTMLDivElement | null) => {
              if (el) imagesRef.current[i] = el;
            }}
            onClick={() => handleOpen(i)}
            onTouchStart={() => handleOpen(i)}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: `-${imageSize / 2}px`,
              marginLeft: `-${imageSize / 2}px`,
              width: imageSize,
              height: imageSize / 1.9,
              backgroundImage: `url(${image.url})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transformOrigin: "50% 50%",
              backgroundColor: "#111",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                zIndex: 1,
              },
            }}
          >
            <Box
              sx={{
                transform: "translateY(-30px)",
                textAlign: "center",
                fontSize: "24px",
                textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
              }}
            >
              {image.label}
            </Box>
          </Box>
        ))}
      </Box>

      {/* 弹窗预览（支持切图） */}
      <AnimatePresence>
        {openGameIndex !== null && (
          <motion.div
            key="preview"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0, 0, 0, 0.9)",
              zIndex: 9999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleClose}
          >
            <Box
              sx={{
                position: "relative",
                width: "90vw",
                height: "90vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={openImageIndex}
                  src={games[openGameIndex].images[openImageIndex]}
                  alt=""
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    maxWidth: "90vw",
                    maxHeight: "90vh",
                    borderRadius: "12px",
                    position: "absolute",
                  }}
                />
              </AnimatePresence>

              {/* 左按钮 */}
              <Box onClick={(e) => e.stopPropagation()}>
                <IconButton
                  onClick={handlePrev}
                  sx={{
                    position: "absolute",
                    left: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "white",
                    bgcolor: "rgba(255,255,255,0.2)",
                    zIndex: 3,
                    "&:hover": { bgcolor: "rgba(255,255,255,0.4)" },
                  }}
                >
                  <ChevronLeft fontSize="large" />
                </IconButton>

                {/* 右按钮 */}
                <IconButton
                  onClick={handleNext}
                  sx={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "white",
                    bgcolor: "rgba(255,255,255,0.2)",
                    zIndex: 3,
                    "&:hover": { bgcolor: "rgba(255,255,255,0.4)" },
                  }}
                >
                  <ChevronRight fontSize="large" />
                </IconButton>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Carousel3D;
