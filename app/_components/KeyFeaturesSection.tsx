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
    description: "AI analyzes patient symptoms through natural voice conversations in real-time",
    icon: IconMicrophone,
    color: "bg-rose-50 text-rose-500",
  },
  {
    title: "Smart Appointment Scheduling",
    description: "Seamless booking integration with doctor calendars and real-time availability",
    icon: IconCalendar,
    color: "bg-violet-50 text-violet-500",
  },
  {
    title: "24/7 Patient Support",
    description: "Always-available medical consultation and guidance, no waiting rooms",
    icon: IconClock,
    color: "bg-emerald-50 text-emerald-500",
  },
  {
    title: "AI Doctor Recommendations",
    description: "Smart matching between patient symptoms and the right specialist",
    icon: IconStethoscope,
    color: "bg-sky-50 text-sky-500",
  },
  {
    title: "Prescription & Reports",
    description: "AI-generated consultation reports with downloadable PDF prescriptions",
    icon: IconFileText,
    color: "bg-amber-50 text-amber-500",
  },
  {
    title: "Multilingual Support",
    description: "Break language barriers — consult in Hindi, Spanish, Arabic and more",
    icon: IconLanguage,
    color: "bg-indigo-50 text-indigo-500",
  },
];

export function KeyFeaturesSection() {
  return (
    <section className="relative w-full py-20 md:py-28 px-6 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100 mb-5">
            <span className="text-sm font-semibold text-sky-600">Why Choose HealthAI</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for
            <span className="gradient-text"> Modern Healthcare</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Powerful AI-driven features that make healthcare accessible, fast, and reliable
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="card-elevated p-7 group cursor-default"
              >
                <div className={`mb-5 p-3 w-fit rounded-2xl ${feature.color}`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-sky-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
