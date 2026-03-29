"use client";

import { motion } from "motion/react";
import { UserButton, useUser, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { KeyFeaturesSection } from "./_components/KeyFeaturesSection";
import { Heart } from "lucide-react";

export default function Home() {
  const { user } = useUser();

  return (
    <div className="relative my-10 flex flex-col items-center justify-center">
      <Navbar />

      {/* Decorative lines */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>

      {/* Hero */}
      <div className="px-4 py-10 md:py-20">
            <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
              {"Revolutionize Patient Care with AI Voice Agents"
                .split(" ")
                .map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeInOut",
                    }}
                    className="mr-2 inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
            >
              Deliver instant, accurate medical assistance through natural voice
              conversations. Automate appointment scheduling, symptom triage,
              and follow-up care — 24/7.
            </motion.p>

            {/* ✅ Get Started redirects to /sign-in if not logged in */}
            <SignedOut>
              <Link href="/sign-in">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1 }}
                  className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
                >
                  <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                    Get Started
                  </button>
                </motion.div>
              </Link>
            </SignedOut>

            <SignedIn>
              <Link href="/dashboard">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1 }}
                  className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
                >
                  <Button>
                    Go to Dashboard
                  </Button>
                </motion.div>
              </Link>
            </SignedIn>


      </div>

      <KeyFeaturesSection />
    </div>
  );
}

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-4 py-4 md:px-10 lg:px-20 shadow-sm">
      {/* Logo and Brand */}
      <Link href="/" className='flex items-center gap-3 hover:opacity-80 transition-opacity'>
        <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg'>
          <Heart className='w-6 h-6 text-white' />
        </div>
        <div className='hidden sm:flex flex-col'>
          <h1 className='font-bold text-lg text-gray-900 dark:text-white'>HealthAI</h1>
          <p className='text-xs text-gray-600 dark:text-gray-400'>Medical Voice Agent</p>
        </div>
      </Link>

      <SignedOut>
        <Link href="/sign-in">
          <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105">
            Login
          </button>
        </Link>
      </SignedOut>

      <SignedIn>
        <div className="flex gap-5 items-center">
          <UserButton />
          <Link href="/dashboard">
            <Button className='bg-blue-600 hover:bg-blue-700'>Dashboard</Button>
          </Link>
        </div>
      </SignedIn>
    </nav>
  );
};
