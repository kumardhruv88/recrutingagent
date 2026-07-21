"use client";

import { motion } from "framer-motion";

export function VoiceOrb() {
  return (
    <div className="relative flex items-center justify-center w-64 h-64 mx-auto my-12">
      {/* Outer Glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Middle Ring */}
      <motion.div
        className="absolute inset-4 rounded-full border border-blue-400/30"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
      />

      {/* Inner Core */}
      <motion.div
        className="relative w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600 to-purple-500 shadow-[0_0_40px_rgba(59,130,246,0.6)] flex items-center justify-center overflow-hidden"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent_50%)]"></div>
      </motion.div>
    </div>
  );
}
