// app/(routes)/dashboard/_components/DoctorsAgentList.tsx
"use client";

import { AIDoctorAgents } from "@/shared/list";
import React from "react";
import DoctorAgentCard from "./DoctorAgentCard";

function DoctorsAgentList() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {AIDoctorAgents.map((doctor, index) => (
          <DoctorAgentCard
            key={index}
            doctorAgent={doctor}
            onSelect={() => {}} // no-op function, required prop
          />
        ))}
      </div>
    </div>
  );
}

export default DoctorsAgentList;
