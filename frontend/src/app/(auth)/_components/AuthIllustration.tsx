"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { mockAuthTestimonials } from "@/data/auth";
import { Quote, Sparkles, Network, Briefcase, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export function AuthIllustration() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % mockAuthTestimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  // Determine illustration state based on route
  const isRegister = pathname?.includes("register");
  const isOnboarding = pathname?.includes("onboarding");

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 flex flex-col justify-between p-12 lg:p-20">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 90, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [0, -90, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -left-[10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={isRegister ? "register" : isOnboarding ? "onboarding" : "login"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="p-3 bg-primary/10 w-fit rounded-xl">
              {isOnboarding ? (
                <Network className="h-8 w-8 text-primary" />
              ) : isRegister ? (
                <Sparkles className="h-8 w-8 text-primary" />
              ) : (
                <Briefcase className="h-8 w-8 text-primary" />
              )}
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              {isOnboarding ? (
                "Set up your workspace for success."
              ) : isRegister ? (
                "Start hiring 10x faster with AI."
              ) : (
                "Welcome back to the future of hiring."
              )}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {isOnboarding
                ? "Configure your organization, invite your team, and let our AI handle the heavy lifting from day one."
                : "HireMind AI automates sourcing, screening, and scheduling so you can focus on what matters: people."}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Feature Pills */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-wrap gap-3 mt-12"
        >
          {["AI Resume Parsing", "Voice Interviews", "Automated Scheduling"].map((feature) => (
            <div key={feature} className="flex items-center space-x-2 bg-background/60 backdrop-blur-md border px-4 py-2 rounded-full text-sm font-medium">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span>{feature}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Testimonial Carousel */}
      <div className="relative z-10 mt-auto pt-12 border-t border-border/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <Quote className="h-8 w-8 text-primary/40" />
            <p className="text-lg font-medium text-foreground leading-snug max-w-lg">
              &quot;{mockAuthTestimonials[activeTestimonial].quote}&quot;
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-background shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={mockAuthTestimonials[activeTestimonial].avatar} alt="Avatar" className="object-cover w-full h-full" />
              </div>
              <div>
                <p className="text-sm font-semibold">{mockAuthTestimonials[activeTestimonial].author}</p>
                <p className="text-xs text-muted-foreground">{mockAuthTestimonials[activeTestimonial].role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Indicators */}
        <div className="flex space-x-2 mt-6">
          {mockAuthTestimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveTestimonial(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === activeTestimonial ? "w-6 bg-primary" : "w-1.5 bg-primary/20"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
