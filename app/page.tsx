"use client";

import { motion } from "motion/react";
import { UserButton, useUser, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { KeyFeaturesSection } from "./_components/KeyFeaturesSection";
import { Heart, Shield, Zap, ArrowRight, Star, Users, Clock, CheckCircle2, Stethoscope, Activity } from "lucide-react";

export default function Home() {
  const { user } = useUser();

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-sky-100/60 via-blue-50/40 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-violet-100/40 via-purple-50/20 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-100 mb-6"
              >
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-sky-700">AI-Powered Healthcare • Available 24/7</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.1] tracking-tight text-gray-900 mb-6">
                {"Your Personal".split(" ").map((word, i) => (
                  <motion.span key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="mr-2 inline-block">{word}</motion.span>
                ))}
                <br />
                <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="gradient-text inline-block">AI Doctor</motion.span>
                <br />
                {"is Here".split(" ").map((word, i) => (
                  <motion.span key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="mr-2 inline-block">{word}</motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-gray-500 mb-8 max-w-lg leading-relaxed"
              >
                Get instant medical consultations through natural voice & text conversations. AI-powered symptom analysis, doctor recommendations, and prescription reports — all in one place.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4 mb-10"
              >
                <SignedOut>
                  <Link href="/sign-in">
                    <button className="btn-primary flex items-center gap-2 text-base px-8 py-3.5 rounded-2xl">
                      Get Started Free
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                  <Link href="/sign-in">
                    <button className="px-8 py-3.5 rounded-2xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all text-base">
                      Watch Demo
                    </button>
                  </Link>
                </SignedOut>
                <SignedIn>
                  <Link href="/dashboard">
                    <button className="btn-primary flex items-center gap-2 text-base px-8 py-3.5 rounded-2xl">
                      Go to Dashboard
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                </SignedIn>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center gap-4"
              >
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`/doctor${i}.png`} alt="" className="w-9 h-9 rounded-full border-2 border-white object-cover" />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-xs text-gray-500">Trusted by <span className="font-semibold text-gray-700">2,000+</span> patients</p>
                </div>
              </motion.div>
            </div>

            {/* Right: Visual Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Main card */}
                <div className="card-elevated p-8 relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <img src="/doctor1.png" alt="AI Doctor" className="w-16 h-16 rounded-2xl object-cover shadow-md" />
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">Dr. AI General</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                        Online • Ready to consult
                      </p>
                    </div>
                  </div>
                  
                  {/* Chat preview */}
                  <div className="space-y-3 mb-6">
                    <div className="bg-gray-50 rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%]">
                      <p className="text-sm text-gray-700">Hello! I'm your AI doctor. How can I help you today? 👋</p>
                    </div>
                    <div className="bg-sky-500 rounded-2xl rounded-br-md px-4 py-3 max-w-[75%] ml-auto">
                      <p className="text-sm text-white">I've been having headaches for 3 days</p>
                    </div>
                    <div className="bg-gray-50 rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%]">
                      <p className="text-sm text-gray-700">I understand. Can you describe the location and intensity? Is it throbbing or constant?</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex-1 bg-gray-50 rounded-xl px-4 py-2.5 text-sm text-gray-400">Type your symptoms...</div>
                    <button className="btn-primary px-4 py-2.5 rounded-xl text-sm">Send</button>
                  </div>
                </div>

                {/* Floating stat cards */}
                <div className="absolute -left-6 top-1/4 card-elevated p-3 px-4 animate-float z-20">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Response</p>
                      <p className="text-sm font-bold text-gray-900">&lt;2 seconds</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-4 bottom-1/4 card-elevated p-3 px-4 animate-float z-20" style={{ animationDelay: '2s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-violet-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Privacy</p>
                      <p className="text-sm font-bold text-gray-900">End-to-End</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: Stethoscope, label: "AI Specialists", value: "10+", color: "bg-sky-50 text-sky-600" },
              { icon: Clock, label: "Availability", value: "24/7", color: "bg-emerald-50 text-emerald-600" },
              { icon: Users, label: "Consultations", value: "50K+", color: "bg-violet-50 text-violet-600" },
              { icon: Activity, label: "Accuracy Rate", value: "95%", color: "bg-amber-50 text-amber-600" },
            ].map((stat, i) => (
              <div key={i} className="text-center p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <KeyFeaturesSection />

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-10 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900">HealthAI</span>
          </div>
          <p className="text-gray-500 text-sm mb-2">Delivering smarter healthcare through artificial intelligence.</p>
          <p className="text-gray-400 text-xs">© 2026 HealthAI. All rights reserved. Not a substitute for professional medical advice.</p>
        </div>
      </footer>
    </div>
  );
}

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/80">
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-sky-200/50">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:flex flex-col">
            <h1 className="font-bold text-lg text-gray-900 leading-none">HealthAI</h1>
            <p className="text-[11px] text-gray-400">Medical Voice Agent</p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <SignedOut>
            <Link href="/sign-in" className="hidden sm:block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Sign In
            </Link>
            <Link href="/sign-in">
              <button className="btn-primary text-sm px-5 py-2.5 rounded-xl">
                Get Started
              </button>
            </Link>
          </SignedOut>

          <SignedIn>
            <Link href="/dashboard">
              <button className="btn-primary text-sm px-5 py-2.5 rounded-xl">
                Dashboard
              </button>
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};
