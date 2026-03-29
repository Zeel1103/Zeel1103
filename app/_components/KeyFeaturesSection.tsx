"use client";

import { motion } from "framer-motion";
import {
  IconMicrophone,
  IconCalendar,
  IconClock,
  IconStethoscope,
  IconFileText,
  IconLanguage,
} from "@tabler/icons-react";

const features = [
  {
    title: "Voice-Powered Symptom Triage",
    description: "AI analyzes patient symptoms through natural conversation",
    icon: IconMicrophone,
  },
  {
    title: "Automated Appointment Scheduling",
    description: "Seamless booking integration with doctor calendars",
    icon: IconCalendar,
  },
  {
    title: "24/7 Patient Support",
    description: "Always-available medical consultation and guidance",
    icon: IconClock,
  },
  {
    title: "Doctor Recommendations",
    description: "Smart matching between patient needs and specialists",
    icon: IconStethoscope,
  },
  {
    title: "Health History Summary",
    description: "AI-generated patient consultation reports",
    icon: IconFileText,
  },
  {
    title: "Multilingual Support",
    description: "Break language barriers in healthcare communication",
    icon: IconLanguage,
  },
];

export function KeyFeaturesSection() {
  return (
    <section className="relative w-full py-16 md:py-24 px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-950/20 dark:to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Powerful Features for Modern Healthcare
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Everything you need to deliver exceptional patient care with AI-powered voice
            assistance
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:shadow-lg transition-shadow"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-4 p-3 w-fit rounded-lg bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-900/30 dark:to-violet-900/30 group-hover:shadow-md transition-shadow">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
