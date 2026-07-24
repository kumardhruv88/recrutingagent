"use client";

import React, { useState, useEffect, useRef } from "react";
import { PromptInput } from "./PromptInput";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { Bot, User, Sparkles, FileText, Briefcase, FileCode2, Command } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

type MessageRole = "user" | "assistant";

interface ToolExecution {
  id: string;
  name: string;
  status: "pending" | "running" | "success" | "error";
  details?: string;
}

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  tools?: ToolExecution[];
  isStreaming?: boolean;
}

const SUGGESTED_PROMPTS = [
  { icon: FileText, text: "Summarize Alice Johnson's resume" },
  { icon: Briefcase, text: "Compare candidates for Senior Frontend Engineer" },
  { icon: FileCode2, text: "Analyze Bob's GitHub contributions" },
];

const MOCK_RESPONSE = `Here is a summary of the candidate's profile based on their resume and recent GitHub activity:

### Key Strengths
* **Frontend Expertise**: Over 5 years of experience building scalable applications using React, Next.js, and TypeScript.
* **Component Libraries**: Strong familiarity with Tailwind CSS, Framer Motion, and accessible UI patterns (Radix UI).

### Areas to Probe
* They haven't led a team larger than 3 engineers. You might want to ask about their experience mentoring juniors or leading complex architectural migrations.

\`\`\`typescript
// Example of their recent open-source contribution to a state management library
export function useStore<T>(selector: (state: State) => T): T {
  const store = useContext(StoreContext);
  return useSyncExternalStore(store.subscribe, () => selector(store.getState()));
}
\`\`\`

Would you like me to draft an email inviting them to a technical screen?`;

export function CopilotWorkspace() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const simulateAIResponse = () => {
    setIsLoading(true);
    const newMessageId = Date.now().toString();
    
    // Add initial empty AI message
    setMessages(prev => [...prev, {
      id: newMessageId,
      role: "assistant",
      content: "",
      isStreaming: true,
      tools: [
        { id: "t1", name: "Search Candidates", status: "pending" }
      ]
    }]);

    // Simulate tool execution: pending -> running
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessageId 
          ? { ...msg, tools: [{ id: "t1", name: "Search Candidates", status: "running" }] } 
          : msg
      ));
    }, 500);

    // Simulate tool execution: running -> success
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessageId 
          ? { ...msg, tools: [{ id: "t1", name: "Search Candidates", status: "success", details: "Found 1 matching candidate." }] } 
          : msg
      ));
    }, 1500);

    // Simulate streaming text
    setTimeout(() => {
      let currentText = "";
      const textToStream = MOCK_RESPONSE;
      let currentIndex = 0;

      const interval = setInterval(() => {
        if (currentIndex < textToStream.length) {
          // Stream chunks of 2-5 characters for realism
          const chunkLength = Math.floor(Math.random() * 4) + 2;
          const chunk = textToStream.slice(currentIndex, currentIndex + chunkLength);
          currentText += chunk;
          currentIndex += chunkLength;

          setMessages(prev => prev.map(msg => 
            msg.id === newMessageId 
              ? { ...msg, content: currentText } 
              : msg
          ));
        } else {
          clearInterval(interval);
          setIsLoading(false);
          setMessages(prev => prev.map(msg => 
            msg.id === newMessageId 
              ? { ...msg, isStreaming: false } 
              : msg
          ));
        }
      }, 30); // Speed of typing
    }, 2000); // Start streaming after tool completes
  };

  const handleSubmit = (overrideInput?: string) => {
    const textToSubmit = overrideInput || input;
    if (!textToSubmit.trim() && !overrideInput) return;

    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: "user",
      content: textToSubmit
    }]);
    
    setInput("");
    simulateAIResponse();
  };

  const handleStop = () => {
    setIsLoading(false);
    // In a real app, this would abort the fetch controller
    setMessages(prev => {
      const newMessages = [...prev];
      const lastMessage = newMessages[newMessages.length - 1];
      if (lastMessage && lastMessage.role === "assistant") {
        lastMessage.isStreaming = false;
      }
      return newMessages;
    });
  };

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-950/50 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden relative">
      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 md:px-8 space-y-6 scroll-smooth"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm shadow-indigo-500/20 border border-white/10">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Welcome to AI Copilot</h2>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                Your intelligent hiring assistant. Ask questions about candidates, analyze resumes, or compare technical skills.
              </p>
            </div>
            
            <div className="grid gap-3 w-full max-w-md pt-4">
              {SUGGESTED_PROMPTS.map((prompt, i) => (
                <Button 
                  key={i}
                  variant="outline" 
                  className="justify-start h-auto py-3 px-4 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all text-left whitespace-normal group"
                  onClick={() => handleSubmit(prompt.text)}
                >
                  <prompt.icon className="w-4 h-4 mr-3 text-zinc-400 group-hover:text-indigo-500 shrink-0" />
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">{prompt.text}</span>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-8 pb-4">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {/* Avatar */}
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 border shadow-sm ${
                    message.role === "user" 
                      ? "bg-zinc-100 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300" 
                      : "bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-700 text-white"
                  }`}>
                    {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Message Body */}
                  <div className={`flex flex-col gap-2 max-w-[85%] ${message.role === "user" ? "items-end" : "items-start"}`}>
                    
                    {/* Tool Executions */}
                    {message.tools && message.tools.length > 0 && (
                      <div className="space-y-2 mb-2 w-full">
                        {message.tools.map(tool => (
                          <div key={tool.id} className="flex items-center gap-2 text-xs font-medium bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 shadow-sm w-fit max-w-full">
                            {tool.status === "pending" || tool.status === "running" ? (
                              <div className="w-3 h-3 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin shrink-0" />
                            ) : tool.status === "success" ? (
                              <Command className="w-3.5 h-3.5 text-green-500 shrink-0" />
                            ) : null}
                            <span className="text-zinc-700 dark:text-zinc-300 truncate">
                              {tool.status === "running" ? `Executing: ${tool.name}...` : tool.name}
                            </span>
                            {tool.details && (
                              <span className="text-zinc-400 dark:text-zinc-500 pl-2 border-l border-zinc-200 dark:border-zinc-700 ml-1 truncate">
                                {tool.details}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Content */}
                    {message.content && (
                      <div className={`
                        relative px-5 py-3.5 rounded-xl shadow-sm text-sm 
                        ${message.role === "user" 
                          ? "bg-indigo-600 text-white rounded-tr-sm" 
                          : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-tl-sm w-full"
                        }
                      `}>
                        {message.role === "user" ? (
                          <div className="whitespace-pre-wrap">{message.content}</div>
                        ) : (
                          <MarkdownRenderer content={message.content} />
                        )}
                        
                        {/* Thinking/Streaming Indicator */}
                        {message.isStreaming && (
                          <span className="inline-flex gap-1 items-center ml-2 h-4 align-middle">
                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Timestamp */}
                    <div className="text-[10px] text-zinc-400 dark:text-zinc-500 px-1 mt-0.5">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 z-10">
        <div className="max-w-3xl mx-auto">
          <PromptInput 
            input={input} 
            setInput={setInput} 
            onSubmit={() => handleSubmit()} 
            isLoading={isLoading} 
            onStop={handleStop}
          />
        </div>
      </div>
    </div>
  );
}
