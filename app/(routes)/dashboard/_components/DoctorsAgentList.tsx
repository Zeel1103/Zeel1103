// app/(routes)/dashboard/_components/DoctorsAgentList.tsx
"use client";

import { AIDoctorAgents } from "@/shared/list";
import React from "react";
import DoctorAgentCard from "./DoctorAgentCard";

function DoctorsAgentList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
      {AIDoctorAgents.map((doctor, index) => (
        <DoctorAgentCard
          key={index}
          doctorAgent={doctor}
          onSelect={() => {}}
        />
      ))}
    </div>
  );
}

export default DoctorsAgentList;
