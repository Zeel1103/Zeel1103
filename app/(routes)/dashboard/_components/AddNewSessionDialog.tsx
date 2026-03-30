"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Plus } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import DoctorAgentCard, { doctorAgent } from "./DoctorAgentCard";
import { AIDoctorAgents } from "@/shared/list";
import { useRouter } from "next/navigation";
import VoiceRecorder from "@/components/VoiceRecorder";
import { toEnglish } from "@/utils/translate";
import { useLanguage } from "@/context/LanguageContext";

function AddNewSessionDialog() {
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [consultationLoading, setConsultationLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>();
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent | null>(null);
  const router = useRouter();
  const { language } = useLanguage();

  const findDoctorsLocally = (text: string): doctorAgent[] => {
    const keywords = text.toLowerCase();
    const matches = new Set<string>();
    if (keywords.includes("knee") || keywords.includes("bone") || keywords.includes("joint")) matches.add("Orthopedic");
    if (keywords.includes("pain") || keywords.includes("fever") || keywords.includes("cold")) matches.add("General Physician");
    if (keywords.includes("child") || keywords.includes("baby") || keywords.includes("kids")) matches.add("Pediatrician");
    if (keywords.includes("skin") || keywords.includes("acne") || keywords.includes("rash")) matches.add("Dermatologist");
    if (keywords.includes("ear") || keywords.includes("throat") || keywords.includes("nose")) matches.add("ENT Specialist");
    if (keywords.includes("diet") || keywords.includes("weight") || keywords.includes("food")) matches.add("Nutritionist");
    if (keywords.includes("heart") || keywords.includes("pressure")) matches.add("Cardiologist");
    if (keywords.includes("mental") || keywords.includes("stress") || keywords.includes("depress")) matches.add("Psychologist");
    if (keywords.includes("pregnancy") || keywords.includes("period") || keywords.includes("woman")) matches.add("Gynecologist");
    if (keywords.includes("teeth") || keywords.includes("tooth") || keywords.includes("dental")) matches.add("Dentist");
    if (matches.size === 0) matches.add("General Physician");
    return AIDoctorAgents.filter(doc => matches.has(doc.specialist));
  };

  const onClickNext = async () => {
    try {
      setLoading(true);
      let text = note;
      if (language !== "en") { text = await toEnglish(note); }
      const localDoctors = findDoctorsLocally(text);
      if (localDoctors.length > 0) { setSuggestedDoctors(localDoctors); return; }
      const result = await axios.post("/api/suggest-doctors", { notes: text });
      setSuggestedDoctors(result.data);
    } catch (error) {
      console.error("Error suggesting doctors:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const startConsultation = async () => {
    if (!selectedDoctor) { alert("Please select a doctor."); return; }
    try {
      setConsultationLoading(true);
      const result = await axios.post("/api/create-session", { notes: note, selectedSpecialist: selectedDoctor.specialist });
      if (result.data.success) { router.push(`/session/${result.data.session.id}`); }
    } catch (err) {
      console.error("Error creating session:", err);
      alert("Failed to start consultation.");
    } finally {
      setConsultationLoading(false);
    }
  };

  const handleCloseDialog = () => { setSuggestedDoctors(undefined); setSelectedDoctor(null); setNote(""); };
  const isRTL = ["ar", "ur", "he", "fa"].includes(language);

  return (
    <Dialog onOpenChange={(open) => !open && handleCloseDialog()}>
      <DialogTrigger asChild>
        <button className="btn-primary flex items-center gap-2 text-sm px-6 py-3 rounded-2xl whitespace-nowrap">
          <Plus className="w-4 h-4" />
          New Consultation
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white border-gray-200 sm:max-w-lg rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-gray-900 text-xl">Describe Your Symptoms</DialogTitle>
          <DialogDescription className="text-gray-500">
            Tell us what you&apos;re experiencing and we&apos;ll match you with the right AI specialist.
          </DialogDescription>
        </DialogHeader>

        {!suggestedDoctors ? (
          <div>
            <h2 className="font-semibold mb-2 text-gray-700 text-sm">Your Symptoms or Concerns</h2>
            <div className="space-y-3">
              <Textarea
                placeholder="e.g. I have had a headache and mild fever for 2 days..."
                className="h-[160px] mt-1 bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-sky-400 focus:ring-sky-200 rounded-2xl resize-none"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                lang={language}
                dir={isRTL ? "rtl" : "ltr"}
              />
              <VoiceRecorder onTranscription={(text: string | null) => setNote((prev) => `${prev} ${text ?? ""}`.trim())} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-1">
            {suggestedDoctors.map((doctor, index) => (
              <DoctorAgentCard
                doctorAgent={doctor}
                key={index}
                onSelect={() => setSelectedDoctor(doctor)}
                isSelected={selectedDoctor?.specialist === doctor.specialist}
              />
            ))}
          </div>
        )}

        <DialogFooter>
          {!suggestedDoctors ? (
            <Button isLoading={loading} disabled={!note || loading} onClick={onClickNext} className="btn-primary w-full sm:w-auto rounded-xl">
              Find Specialist <ArrowRight size={16} />
            </Button>
          ) : (
            <Button isLoading={consultationLoading} onClick={startConsultation} disabled={!selectedDoctor || consultationLoading} className="btn-primary w-full sm:w-auto rounded-xl">
              Start Consultation
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSessionDialog;
