// types/index.ts

export interface Message {
  id?: string; // Optional for new messages
  sessionId: string;
  sender: "user" | "ai";
  content: string;
  createdAt: string; // ✅ Always a string, never null
}

export interface Session {
  id: string;
  userId: string;
  notes: string;
  doctorSpecialist: string;
  createdAt: string; // ✅ Always ISO string
}
