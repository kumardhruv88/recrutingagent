"use client";

import { useEffect, useRef } from "react";
import { TranscriptMessage } from "@/data/voice-interview";
import { BrainCircuit, User } from "lucide-react";
import { motion } from "framer-motion";

interface TranscriptPanelProps {
  messages: TranscriptMessage[];
}

export function TranscriptPanel({ messages }: TranscriptPanelProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 max-w-3xl mx-auto w-full relative">
      <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
      
      {messages.map((msg) => (
        <motion.div 
          key={msg.id} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex gap-4 ${msg.speaker === 'ai' ? '' : 'flex-row-reverse'}`}
        >
          <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
            msg.speaker === 'ai' 
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
              : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
          }`}>
            {msg.speaker === 'ai' ? <BrainCircuit className="h-4 w-4" /> : <User className="h-4 w-4" />}
          </div>
          
          <div className={`flex flex-col max-w-[80%] ${msg.speaker === 'ai' ? 'items-start' : 'items-end'}`}>
            <span className="text-xs text-zinc-500 mb-1 px-1">{msg.timestamp}</span>
            <div className={`p-3.5 rounded-2xl ${
              msg.speaker === 'ai'
                ? 'bg-zinc-900/50 border border-zinc-800/80 text-zinc-300 rounded-tl-sm'
                : 'bg-blue-600 text-white rounded-tr-sm shadow-sm'
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              {!msg.isComplete && (
                <span className="inline-block ml-2 w-1.5 h-4 bg-zinc-500 animate-pulse translate-y-1"></span>
              )}
            </div>
          </div>
        </motion.div>
      ))}
      <div ref={endRef} className="h-4"></div>
    </div>
  );
}
