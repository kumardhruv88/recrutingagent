"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small teams and startups hiring their first employees.",
    price: "$99",
    features: [
      "Up to 5 active jobs",
      "AI resume parsing (500/mo)",
      "Basic candidate ranking",
      "Email templates",
      "Standard support",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    description: "For growing organizations that need advanced AI capabilities.",
    price: "$299",
    features: [
      "Unlimited active jobs",
      "Unlimited AI resume parsing",
      "Semantic candidate matching",
      "AI Interview Assistant",
      "Custom hiring pipelines",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large enterprises with complex needs.",
    price: "Custom",
    features: [
      "Everything in Growth",
      "Custom AI model fine-tuning",
      "Advanced bias mitigation",
      "Dedicated account manager",
      "SSO & advanced security",
      "Custom integrations",
    ],
    highlighted: false,
  },
];

export function PricingPreview() {
  return (
    <section id="pricing" className="py-24 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            Start for free, upgrade when you need to. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative p-8 rounded-3xl border ${
                plan.highlighted
                  ? "border-blue-500 shadow-2xl shadow-blue-500/10 bg-white dark:bg-zinc-900"
                  : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
              } flex flex-col`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 h-10">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
                  {plan.price}
                </span>
                {plan.price !== "Custom" && (
                  <span className="text-zinc-500 dark:text-zinc-400">/month</span>
                )}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                    <Check className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#"
                className={`w-full py-3 rounded-lg font-semibold text-center transition-colors ${
                  plan.highlighted
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
                }`}
              >
                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
