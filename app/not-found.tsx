"use client";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";

function GlitchText({ text }: { text: string }) {
  const x = useMotionValue(0);
  const y = useSpring(x, { stiffness: 200, damping: 20 });

  return (
    <motion.span style={{ x }}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          animate={{
            translateX: [0, (Math.random() - 0.5) * 8, 0],
            opacity: [1, Math.random() > 0.5 ? 0.8 : 1, 1],
          }}
          transition={{ duration: 0.3, delay: i * 0.02, repeat: Infinity, repeatDelay: 2 + Math.random() * 2 }}
          className="inline-block"
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#030303] px-6 grid-bg overflow-hidden relative">
      {/* Scanlines */}
      <div className="scanlines absolute inset-0 pointer-events-none" />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(255,0,0,0.05),transparent)] pointer-events-none" />

      {/* Glitch number */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative z-10 text-center"
      >
        <h1 className="text-[clamp(8rem,25vw,16rem)] font-black leading-none text-red-500/20 select-none">
          <GlitchText text="404" />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="flex flex-col gap-4 items-center"
        >
          <p className="font-mono text-primary text-lg tracking-widest">
            <GlitchText text="PAGE_NOT_FOUND" />
          </p>
          <p className="text-white/20 text-sm font-mono max-w-sm">
            The page has been deleted from Omniverse.
          </p>

          <Link
            href="/"
            className="mt-8 font-mono text-[11px] text-primary border border-primary/30 px-8 py-3 rounded-full hover:bg-primary/10 hover:border-primary/60 transition-all duration-300 tracking-wider"
          >
            <GlitchText text="RETURN_TO_BASE" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
