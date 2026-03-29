// app/(routes)/dashboard/_components/DoctorAgentCard.tsx
"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

export type doctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  voiceId: string;
  agentPrompt: string;
  subscriptionRequired: boolean;
};

interface Props {
  doctorAgent: doctorAgent;
  isSelected?: boolean;
  onSelect: () => void;
}

const DoctorAgentCard: React.FC<Props> = ({ doctorAgent, onSelect, isSelected }) => {
  return (
    <Card
      onClick={onSelect}
      className={`cursor-pointer hover:shadow-xl transition-all duration-300 p-6 rounded-2xl border-2 ${
        isSelected 
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
          : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
      } bg-white dark:bg-gray-900 group`}
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Doctor Image */}
        <div className="w-24 h-24 relative ring-4 ring-offset-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-blue-400 transition-all rounded-full overflow-hidden">
          <Image
            src={doctorAgent.image}
            alt={doctorAgent.specialist}
            fill
            className="object-cover"
          />
        </div>

        {/* Specialist Name */}
        <h3 className="text-base font-bold text-center text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {doctorAgent.specialist}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center line-clamp-2">
          {doctorAgent.description}
        </p>

        {/* Badge */}
        {doctorAgent.subscriptionRequired && (
          <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-semibold rounded-full">
            Premium
          </span>
        )}

        {/* CTA */}
        <button className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium text-sm hover:from-blue-600 hover:to-cyan-600 transition-all transform group-hover:scale-105">
          Consult Now →
        </button>
      </div>
    </Card>
  );
};

export default DoctorAgentCard;
