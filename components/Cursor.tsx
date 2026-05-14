"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [isTouch, setIsTouch] = useState(true);
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const sx = useSpring(mx, { stiffness: 600, damping: 35 });
  const sy = useSpring(my, { stiffness: 600, damping: 35 });
  const rx = useSpring(mx, { stiffness: 150, damping: 25 });
  const ry = useSpring(my, { stiffness: 150, damping: 25 });

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999]"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[9998]"
        style={{
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
          border: "1px solid rgba(118,185,0,0.5)",
          boxShadow: "0 0 16px rgba(118,185,0,0.25)",
        }}
      />
    </>
  );
}
