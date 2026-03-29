"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  profileImage: string;
  bio: string;
  availableSlots: string[];
  weeklyAvailability?: {
    day: string;
    slots: string[];
  }[];
}

interface Props {
  sessionId: string;
  specialization?: string;
}

export default function DoctorBookingModal({
  sessionId,
  specialization,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!selectedDate || !specialization) return;
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setSelectedDoctorId(null);
        setSelectedSlot(null);
        const query = new URLSearchParams();
        query.append("specialization", specialization);
        query.append("date", format(selectedDate, "yyyy-MM-dd"));
        const res = await fetch(`/api/doctors?${query.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch doctors");
        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
        toast({ type: "error", title: "Error", description: "Could not load available doctors." });
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [selectedDate, specialization, toast]);

  const handleBookAppointment = async () => {
    if (!selectedDoctorId || !selectedSlot || !selectedDate) {
      toast({ type: "error", title: "Incomplete Selection", description: "Please select a doctor and a time slot." });
      return;
    }
    const appointmentDateTime = new Date(`${format(selectedDate, "yyyy-MM-dd")}T${selectedSlot}`);
    try {
      setBookingLoading(true);
      const res = await fetch("/api/appointments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doctorId: selectedDoctorId, sessionId, slotTime: appointmentDateTime.toISOString() }),
      });
      if (res.ok) {
        toast({ title: "Appointment Booked", description: "Your appointment was successfully scheduled." });
        setOpen(false);
        setSelectedDoctorId(null);
        setSelectedSlot(null);
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Booking failed");
      }
    } catch (err: any) {
      toast({ type: "error", title: "Booking Error", description: err.message || "Could not book appointment." });
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Book Real Doctor Appointment</Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-4xl p-0 flex flex-col max-h-[90vh]">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-2xl font-bold text-center">Book an Appointment</DialogTitle>
          <DialogDescription className="text-center text-gray-500">Select a date to see available doctors and time slots.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 overflow-y-auto">
          {/* Left Side: Calendar */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">1. Select a Date</h4>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              showOutsideDays
              className="rounded-xl border shadow-md bg-white p-3 w-full"
              disabled={(date) => date < new Date(new Date().toDateString())}
              classNames={{
                month: "space-y-4",
                caption_label: "text-lg font-bold text-gray-800",
                nav_button: "h-8 w-8 p-1 opacity-80 hover:opacity-100 transition-opacity rounded-full bg-transparent hover:bg-gray-100",
                nav: "flex items-center justify-between",
                head_row: "flex justify-between mt-2",
                head_cell: "text-gray-500 font-medium text-xs rounded-md w-8",
                row: "flex w-full mt-2",
                cell: "h-8 w-8 text-center text-sm p-0 [&:has([aria-selected])]:bg-blue-100 rounded-lg",
                day: "h-8 w-8 p-0 font-normal hover:bg-blue-200 transition-colors duration-200 rounded-full",
                day_selected: "bg-blue-600 text-white hover:bg-blue-700 hover:text-white rounded-full",
                day_today: "font-semibold text-blue-600 border border-blue-600 rounded-full",
                day_outside: "text-gray-400 opacity-50",
                day_disabled: "text-gray-300 opacity-50 cursor-not-allowed",
              }}
            />
          </div>

          {/* Right Side: Doctor List */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold mb-4 text-gray-800">2. Select a Doctor & Time</h4>
            {loading ? (
              <div className="flex items-center justify-center h-full min-h-[200px]">
                <Loader2 className="animate-spin w-8 h-8 text-primary" />
              </div>
            ) : doctors.length === 0 ? (
              <div className="flex items-center justify-center h-full min-h-[200px] bg-gray-50 rounded-lg p-4">
                <p className="text-gray-500 text-center">
                  No doctors found for the selected specialization.
                </p>
              </div>
            ) : (
              <div className="space-y-4 pr-2 overflow-y-auto">
                {doctors.map((doc) => {
                  // Get the list of days the doctor is generally available
                  const availableDays = doc.weeklyAvailability?.map(d => d.day).join(', ') || 'No schedule set';
                  
                  return (
                    <div
                      key={doc.id}
                      className="border rounded-lg p-4 transition hover:shadow-lg hover:border-primary"
                    >
                      {/* Doctor Info */}
                      <div className="flex items-start gap-4">
                        <img
                          src={doc.profileImage}
                          alt={doc.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-base">{doc.name}</h4>
                          <p className="text-sm font-medium text-primary">{doc.specialization}</p>
                          <p className="text-xs text-gray-600 mt-1">{doc.bio}</p>
                        </div>
                      </div>
                      
                      {/* ✅ NEW LOGIC: Check if there are available slots for the selected day */}
                      <div className="border-t pt-4 mt-4">
                         <h5 className="text-sm font-semibold text-gray-800 mb-2">Available Slots for {format(selectedDate!, 'MMMM dd')}:</h5>
                         <div className="flex flex-wrap gap-2">
                            {doc.availableSlots.length > 0 ? (
                              // If there are slots, show the buttons
                              doc.availableSlots.map((slot) => {
                                const isSelected = selectedDoctorId === doc.id && selectedSlot === slot;
                                return (
                                  <Button
                                    key={slot}
                                    size="sm"
                                    variant={isSelected ? "default" : "outline"}
                                    onClick={() => {
                                      setSelectedDoctorId(doc.id);
                                      setSelectedSlot(slot);
                                    }}
                                    className="rounded-full px-4"
                                  >
                                    {format(new Date(`${format(selectedDate!, 'yyyy-MM-dd')}T${slot}`), "hh:mm a")}
                                  </Button>
                                );
                              })
                            ) : (
                              // If no slots, show the helpful message
                              <div className="text-sm text-gray-500 bg-amber-50 p-3 rounded-lg w-full">
                                <p className="font-semibold">No slots available for this day.</p>
                                <p className="text-xs mt-1">
                                  This doctor is generally available on: <span className="font-semibold">{availableDays}</span>.
                                </p>
                              </div>
                            )}
                         </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="p-6 bg-gray-50 border-t mt-auto">
          <Button size="lg" disabled={!selectedDoctorId || !selectedSlot || bookingLoading} onClick={handleBookAppointment} className="w-full md:w-auto">
            {bookingLoading ? (<><Loader2 className="animate-spin mr-2 h-4 w-4" /> Booking...</>) : ("Confirm Appointment")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}