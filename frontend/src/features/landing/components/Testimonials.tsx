"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "HireMind AI has completely transformed our engineering hiring. We process 10x more resumes in half the time, and the quality of candidates we interview has skyrocketed.",
    author: "Elena Rodriguez",
    role: "VP of Engineering, TechFlow",
    initials: "ER",
    color: "bg-blue-600",
  },
  {
    quote: "The AI Copilot is like having a senior recruiter working alongside me 24/7. It writes better job descriptions than I do and finds perfect matches instantly.",
    author: "Michael Chang",
    role: "Head of Talent, Innovate Inc",
    initials: "MC",
    color: "bg-emerald-600",
  },
  {
    quote: "We've reduced our time-to-hire from 45 days to just 14 days. The semantic search capabilities are incredible—it understands what we're looking for perfectly.",
    author: "Sarah Jenkins",
    role: "Director of HR, GlobalScale",
    initials: "SJ",
    color: "bg-violet-600",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Loved by recruiting teams everywhere
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            See what our customers have to say about the future of hiring.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative"
            >
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-zinc-700 dark:text-zinc-300 text-lg leading-relaxed mb-8">
                &quot;{testimonial.quote}&quot;
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${testimonial.color}`}>
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
