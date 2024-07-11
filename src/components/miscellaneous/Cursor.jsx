import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Cursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    const onMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [cursorX, cursorY]);

  const springConfig = { damping: 25, stiffness: 500 };

  const cursorSpringX = useSpring(cursorX, springConfig);
  const cursorSpringY = useSpring(cursorY, springConfig);

  return (
    <motion.div
      className="cursor"
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: "#ffa500",
        color: "#ffa500",
        filter: "blur(5px)",
        position: "fixed",
        zIndex: 999,
        x: cursorSpringX,
        y: cursorSpringY,
      }}
    />
  );
};

export default Cursor;
