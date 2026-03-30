// app/routes/dashboard/_components/dashboard.tsx

"use client";

import React, { useState, useEffect } from "react";
import AddNewSessionDialog from "./AddNewSessionDialog";
import DoctorsAgentList from "./DoctorsAgentList";
import HistoryList from "./HistoryList";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Stethoscope, Clock, Activity, Shield, Lightbulb, CalendarDays, Calculator, BookOpen, Heart, Droplets, Apple, Moon } from "lucide-react";
import { useUser } from "@clerk/nextjs";

const healthTips = [
  "💧 Drink at least 8 glasses of water daily for optimal hydration",
  "🏃 30 minutes of moderate exercise daily reduces heart disease risk by 40%",
  "😴 Adults need 7-9 hours of sleep per night for best health outcomes",
  "🥗 Eating 5 servings of fruits & vegetables daily boosts your immunity",
  "🧘 10 minutes of daily meditation can significantly reduce stress hormones",
  "👁️ Follow the 20-20-20 rule: Every 20 min, look 20 ft away for 20 seconds",
];

const Dashboard = () => {
  const { user } = useUser();
  const [greeting, setGreeting] = useState("Good day");
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
    setTipIndex(Math.floor(Math.random() * healthTips.length));
    const interval = setInterval(() => { setTipIndex(prev => (prev + 1) % healthTips.length); }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-7 md:p-9 text-white">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-white/5 rounded-full translate-y-1/2" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
          <div>
            <p className="text-blue-100 text-sm font-medium mb-1">{greeting} 👋</p>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{user?.firstName ? `Welcome back, ${user.firstName}` : "Welcome to HealthAI"}</h1>
            <p className="text-blue-100 text-sm max-w-lg">Your AI-powered health companion. Start a consultation, review your history, or check your health metrics.</p>
          </div>
          <AddNewSessionDialog />
        </div>
      </div>

      {/* Stats + Tip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { icon: Stethoscope, label: "Specialists", value: "10+", color: "text-blue-600", bg: "bg-blue-50" },
          { icon: Clock, label: "Available", value: "24/7", color: "text-emerald-600", bg: "bg-emerald-50" },
          { icon: Shield, label: "Secure", value: "Encrypted", color: "text-violet-600", bg: "bg-violet-50" },
          { icon: Activity, label: "Accuracy", value: "95%+", color: "text-rose-600", bg: "bg-rose-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${stat.bg} flex items-center justify-center flex-shrink-0`}>
              <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-base sm:text-lg font-bold text-gray-900 leading-tight">{stat.value}</p>
              <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium uppercase tracking-wide">{stat.label}</p>
            </div>
          </div>
        ))}
        <div className="bg-amber-50/70 border border-amber-100 rounded-xl px-4 py-3 flex items-center gap-3 col-span-2 md:col-span-1">
          <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <p className="text-xs text-amber-800 leading-snug animate-slide-up line-clamp-2" key={tipIndex}>
            {healthTips[tipIndex]}
          </p>
        </div>
      </div>

      {/* AI Specialist Doctors - Full width */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 sm:px-7 py-5 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">AI Specialist Doctors</h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">Select a specialist to start your consultation</p>
          </div>
          <Link href="/dashboard/history">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600 text-xs font-semibold">
              View History →
            </Button>
          </Link>
        </div>
        <div className="p-5 sm:p-7">
          <DoctorsAgentList />
        </div>
      </div>

      {/* BMI Calculator + Health Articles */}
      <div className="grid md:grid-cols-2 gap-6">
        <BMICalculator />
        <HealthArticles />
      </div>

      {/* Recent Consultations + Upcoming Appointments */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <h3 className="text-base font-bold text-gray-900">Recent Consultations</h3>
            </div>
            <Link href="/dashboard/history">
              <span className="text-xs font-semibold text-blue-500 hover:text-blue-700 cursor-pointer">See All</span>
            </Link>
          </div>
          <div className="p-5">
            <HistoryList minimal={true} />
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-emerald-500" />
            <h3 className="text-base font-bold text-gray-900">Upcoming Appointments</h3>
          </div>
          <div className="p-5">
            <AppointmentsList />
          </div>
        </div>
      </div>
    </div>
  );
};

// =================== BMI CALCULATOR (WORKING) ===================
function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');
  const [categoryColor, setCategoryColor] = useState('');

  const calculateBMI = () => {
    const h = parseFloat(height) / 100; // cm to m
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) return;

    const result = w / (h * h);
    setBmi(Math.round(result * 10) / 10);

    if (result < 18.5) { setCategory('Underweight'); setCategoryColor('text-amber-600 bg-amber-50'); }
    else if (result < 25) { setCategory('Normal'); setCategoryColor('text-emerald-600 bg-emerald-50'); }
    else if (result < 30) { setCategory('Overweight'); setCategoryColor('text-orange-600 bg-orange-50'); }
    else { setCategory('Obese'); setCategoryColor('text-red-600 bg-red-50'); }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
        <Calculator className="w-4 h-4 text-violet-500" />
        <h3 className="text-base font-bold text-gray-900">BMI Calculator</h3>
      </div>
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Height (cm)</label>
            <input
              type="number"
              placeholder="170"
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Weight (kg)</label>
            <input
              type="number"
              placeholder="70"
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>
        <button onClick={calculateBMI} className="btn-primary w-full py-2.5 rounded-xl text-sm mb-4">
          Calculate BMI
        </button>

        {bmi !== null && (
          <div className="text-center bg-gray-50 rounded-xl p-4">
            <p className="text-3xl font-bold text-gray-900 mb-1">{bmi}</p>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${categoryColor}`}>
              {category}
            </span>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  bmi < 18.5 ? 'bg-amber-400 w-[25%]' :
                  bmi < 25 ? 'bg-emerald-400 w-[50%]' :
                  bmi < 30 ? 'bg-orange-400 w-[75%]' :
                  'bg-red-400 w-[95%]'
                }`}
              />
            </div>
            <div className="flex justify-between text-[9px] text-gray-400 mt-1">
              <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =================== HEALTH ARTICLES (WORKING) ===================
function HealthArticles() {
  const articles = [
    { title: "10 Foods That Boost Your Immune System", category: "Nutrition", icon: Apple, color: "bg-emerald-50 text-emerald-500", time: "5 min read" },
    { title: "How to Improve Sleep Quality Naturally", category: "Wellness", icon: Moon, color: "bg-indigo-50 text-indigo-500", time: "4 min read" },
    { title: "Understanding Blood Pressure: A Complete Guide", category: "Heart Health", icon: Heart, color: "bg-rose-50 text-rose-500", time: "6 min read" },
    { title: "Daily Hydration: How Much Water Do You Need?", category: "General", icon: Droplets, color: "bg-sky-50 text-sky-500", time: "3 min read" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-blue-500" />
        <h3 className="text-base font-bold text-gray-900">Health Resources</h3>
      </div>
      <div className="p-3">
        {articles.map((article, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className={`w-10 h-10 rounded-lg ${article.color} flex items-center justify-center flex-shrink-0`}>
              <article.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">{article.title}</p>
              <div className="flex items-center gap-2 text-[11px] text-gray-400">
                <span>{article.category}</span>
                <span>•</span>
                <span>{article.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =================== APPOINTMENTS LIST (WORKING) ===================
function AppointmentsList() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch('/api/appointments/list');
        if (res.ok) {
          const data = await res.json();
          setAppointments(data.appointments?.slice(0, 4) || []);
        }
      } catch (err) { console.error('Failed to fetch appointments:', err); }
      finally { setLoading(false); }
    };
    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-6">
        <div className="w-7 h-7 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-xs text-gray-400">Loading...</p>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-3">
          <CalendarDays className="w-6 h-6 text-emerald-400" />
        </div>
        <h4 className="font-semibold text-gray-800 text-sm mb-1">No Upcoming Appointments</h4>
        <p className="text-xs text-gray-400 max-w-xs">Complete a consultation to book an appointment with a specialist.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {appointments.map((apt: any) => (
        <div key={apt.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
            <CalendarDays className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{apt.doctorName || 'Doctor'}</p>
            <p className="text-[11px] text-gray-400">
              {new Date(apt.date || apt.slotTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
            apt.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' :
            apt.status === 'completed' ? 'bg-blue-50 text-blue-600' :
            'bg-amber-50 text-amber-600'
          }`}>
            {apt.status || 'pending'}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
