// app/(routes)/dashboard/_components/DoctorAgentCard.tsx
"use client";

import Image from "next/image";
import React from "react";
import { ArrowRight } from "lucide-react";

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
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all duration-200 rounded-2xl border-2 group overflow-hidden ${
        isSelected 
          ? "border-blue-500 bg-blue-50/40 shadow-lg shadow-blue-100/40" 
          : "border-gray-100 bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-gray-100/50"
      }`}
    >
      {/* Doctor Image - adjusted size */}
      <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <Image
          src={doctorAgent.image}
          alt={doctorAgent.specialist}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
        />
        {doctorAgent.subscriptionRequired && (
          <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-white/90 backdrop-blur-sm rounded-md border border-amber-200">
            <span className="text-[8px] sm:text-[9px] font-bold text-amber-700 uppercase tracking-wider">Pro</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <h3 className={`text-xs sm:text-sm font-bold mb-1 transition-colors leading-tight ${
          isSelected ? 'text-blue-700' : 'text-gray-900 group-hover:text-blue-600'
        }`}>
          {doctorAgent.specialist}
        </h3>
        <p className="text-[10px] sm:text-xs text-gray-400 leading-relaxed line-clamp-2 mb-3">
          {doctorAgent.description}
        </p>

        <button className={`w-full py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 transition-all duration-200 ${
          isSelected
            ? 'bg-blue-600 text-white shadow-md shadow-blue-200/50'
            : 'bg-gray-50 text-gray-600 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-blue-200/50'
        }`}>
          Consult Now
          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default DoctorAgentCard;
