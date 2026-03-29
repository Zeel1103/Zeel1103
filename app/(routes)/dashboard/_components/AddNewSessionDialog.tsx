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
import { ArrowRight } from "lucide-react";
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

  // ✅ Instant client-side keyword matching
  const findDoctorsLocally = (text: string): doctorAgent[] => {
    const keywords = text.toLowerCase();
    const matches = new Set<string>();

    if (keywords.includes("knee") || keywords.includes("bone") || keywords.includes("joint"))
      matches.add("Orthopedic");
    if (keywords.includes("pain") || keywords.includes("fever") || keywords.includes("cold"))
      matches.add("General Physician");
    if (keywords.includes("child") || keywords.includes("baby") || keywords.includes("kids"))
      matches.add("Pediatrician");
    if (keywords.includes("skin") || keywords.includes("acne") || keywords.includes("rash"))
      matches.add("Dermatologist");
    if (keywords.includes("ear") || keywords.includes("throat") || keywords.includes("nose"))
      matches.add("ENT Specialist");
    if (keywords.includes("diet") || keywords.includes("weight") || keywords.includes("food"))
      matches.add("Nutritionist");
    if (keywords.includes("heart") || keywords.includes("pressure"))
      matches.add("Cardiologist");
    if (keywords.includes("mental") || keywords.includes("stress") || keywords.includes("depress"))
      matches.add("Psychologist");
    if (keywords.includes("pregnancy") || keywords.includes("period") || keywords.includes("woman"))
      matches.add("Gynecologist");
    if (keywords.includes("teeth") || keywords.includes("tooth") || keywords.includes("dental"))
      matches.add("Dentist");

    if (matches.size === 0) matches.add("General Physician");
    return AIDoctorAgents.filter(doc => matches.has(doc.specialist));
  };

  const onClickNext = async () => {
    try {
      setLoading(true);
      let text = note;

      // ✅ Skip translation if English
      if (language !== "en") {
        text = await toEnglish(note);
      }

      // ✅ Try client-side matching first
      const localDoctors = findDoctorsLocally(text);
      if (localDoctors.length > 0) {
        setSuggestedDoctors(localDoctors);
        return;
      }

      // ✅ Fallback to server API if nothing matched
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
    if (!selectedDoctor) {
      alert("Please select a doctor.");
      return;
    }
    try {
      setConsultationLoading(true);
      const result = await axios.post("/api/create-session", {
        notes: note,
        selectedSpecialist: selectedDoctor.specialist,
      });
      if (result.data.success) {
        router.push(`/session/${result.data.session.id}`);
      }
    } catch (err) {
      console.error("Error creating session:", err);
      alert("Failed to start consultation.");
    } finally {
      setConsultationLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setSuggestedDoctors(undefined);
    setSelectedDoctor(null);
    setNote("");
  };

  const isRTL = ["ar", "ur", "he", "fa"].includes(language);

  return (
    <Dialog onOpenChange={(open) => !open && handleCloseDialog()}>
      <DialogTrigger asChild>
        <Button className="mt-3">+ Start a Consultation</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basic Details</DialogTitle>
          <DialogDescription>
            Describe your symptoms to get AI doctor suggestions instantly.
          </DialogDescription>
        </DialogHeader>

        {!suggestedDoctors ? (
          <div>
            <h2 className="font-semibold mb-2">Add Symptoms or Any Other Details</h2>
            <div className="space-y-2">
              <Textarea
                placeholder="Add Details Here..."
                className="h-[200px] mt-1"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                lang={language}
                dir={isRTL ? "rtl" : "ltr"}
              />
              <VoiceRecorder
                onTranscription={(text: string | null) =>
                  setNote((prev) => `${prev} ${text ?? ""}`.trim())
                }
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
            <Button isLoading={loading} disabled={!note || loading} onClick={onClickNext}>
              Next <ArrowRight size={16} />
            </Button>
          ) : (
            <Button isLoading={consultationLoading} onClick={startConsultation} disabled={!selectedDoctor || consultationLoading}>
              Start Consultation
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSessionDialog;
