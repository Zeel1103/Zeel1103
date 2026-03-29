// app/routes/dashboard/_components/dashboard.tsx

"use client";

import React from "react";
import AddNewSessionDialog from "./AddNewSessionDialog";
import DoctorsAgentList from "./DoctorsAgentList";
import HistoryList from "./HistoryList";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Stethoscope, Clock, Users, Heart } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      icon: Stethoscope,
      label: "AI Consultations",
      value: "Unlimited",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: Clock,
      label: "Available 24/7",
      value: "Always Ready",
      color: "from-green-400 to-green-600",
    },
    {
      icon: Users,
      label: "Expert Doctors",
      value: "AI Powered",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: Heart,
      label: "Your Health",
      value: "Our Priority",
      color: "from-red-400 to-red-600",
    },
  ];

  return (
    <div className="w-full">
      {/* Welcome Section with Stats */}
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow`}
              >
                <div className="flex items-center justify-between mb-4">
                  <IconComponent className="w-8 h-8 opacity-80" />
                  <div className="w-10 h-10 bg-white/20 rounded-full"></div>
                </div>
                <p className="text-sm opacity-90 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Start Your Health Journey Today</h2>
              <p className="text-blue-100">
                Consult with AI medical specialists and get personalized health recommendations.
              </p>
            </div>
            <AddNewSessionDialog />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Doctors List - takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                AI Specialist Doctors
              </h2>
              <Link href="/dashboard/history">
                <Button variant="outline" size="sm">
                  View History
                </Button>
              </Link>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Consult with our AI-powered medical specialists across different fields
            </p>
            <DoctorsAgentList />
          </div>
        </div>

        {/* Recent Consultations - takes 1 column */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-md h-fit sticky top-20">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <HistoryList minimal={true} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
