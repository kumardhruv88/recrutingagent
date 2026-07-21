"use client";

import { motion } from "framer-motion";

export function Waveform() {
  const bars = Array.from({ length: 40 });

  return (
    <div className="flex items-center justify-center h-16 gap-1 w-full max-w-md mx-auto">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 bg-zinc-700 rounded-full"
          animate={{
            height: ["10%", `${Math.random() * 80 + 20}%`, "10%"],
          }}
          transition={{
            duration: Math.random() * 0.5 + 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 0.5,
          }}
        />
      ))}
    </div>
  );
}
