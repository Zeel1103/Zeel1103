"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageCircle, Calendar, Stethoscope, ArrowLeft, Clock, Search, Filter } from 'lucide-react';

interface HistorySession {
  id: number;
  userId: string;
  notes: string;
  doctorSpecialist: string;
  createdAt: string;
  messageCount: number;
  lastMessage: string | null;
}

// Assign colors to specializations
const specialistColors: Record<string, { bg: string; text: string; border: string }> = {
  "General Physician": { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-100" },
  "Pediatrician": { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-100" },
  "Dermatologist": { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-100" },
  "Cardiologist": { bg: "bg-red-50", text: "text-red-700", border: "border-red-100" },
  "Psychologist": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-100" },
  "Nutritionist": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-100" },
  "ENT Specialist": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-100" },
  "Orthopedic": { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-100" },
  "Gynecologist": { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-100" },
  "Dentist": { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-100" },
};

export default function HistoryPage() {
  const [sessions, setSessions] = useState<HistorySession[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<HistorySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/sessions/list');
        if (!response.ok) throw new Error('Failed to fetch sessions');
        const data = await response.json();
        setSessions(data.sessions || []);
        setFilteredSessions(data.sessions || []);
        setError(null);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load consultation history');
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  // Search filter
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSessions(sessions);
    } else {
      setFilteredSessions(sessions.filter(s => 
        s.doctorSpecialist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.notes?.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }
  }, [searchQuery, sessions]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center p-10 min-h-[400px]'>
        <div className='text-center'>
          <div className='w-12 h-12 border-4 border-sky-100 border-t-sky-500 rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-lg text-gray-500'>Loading consultation history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full'>
      {/* Page Header */}
      <div className='mb-8'>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-1'>Consultation History</h1>
            <p className='text-gray-500 text-sm'>
              {sessions.length > 0 ? `You have ${sessions.length} consultation${sessions.length > 1 ? 's' : ''}` : 'No consultations yet'}
            </p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className="rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Button>
          </Link>
        </div>

        {/* Search Bar - NEW FEATURE */}
        {sessions.length > 0 && (
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search consultations by specialist or symptoms..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100 transition text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
      </div>

      {error ? (
        <div className='card-elevated p-6 text-center border-red-100'>
          <p className='text-red-500'>{error}</p>
        </div>
      ) : filteredSessions.length === 0 && sessions.length === 0 ? (
        <div className='flex flex-col items-center justify-center p-12 card-elevated'>
          <div className='w-20 h-20 bg-sky-50 rounded-3xl flex items-center justify-center mb-5'>
            <Stethoscope className='w-10 h-10 text-sky-400' />
          </div>
          <h2 className='font-bold text-xl text-gray-900 mb-2'>No Consultations Yet</h2>
          <p className='text-gray-500 max-w-md text-center mb-6 text-sm'>
            Start your first AI medical consultation and your history will appear here.
          </p>
          <Link href="/dashboard">
            <button className='btn-primary text-sm px-6 py-2.5 rounded-xl'>
              Start First Consultation
            </button>
          </Link>
        </div>
      ) : filteredSessions.length === 0 ? (
        <div className="card-elevated p-8 text-center">
          <p className="text-gray-500">No results found for &quot;{searchQuery}&quot;</p>
        </div>
      ) : (
        <div className='space-y-3'>
          {filteredSessions.map((session) => {
            const colors = specialistColors[session.doctorSpecialist] || specialistColors["General Physician"];
            return (
              <Link key={session.id} href={`/session/${session.id}`}>
                <div className='card-elevated p-5 cursor-pointer group mb-3'>
                  <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                    <div className='flex items-center gap-4 flex-1 min-w-0'>
                      <div className={`w-12 h-12 rounded-2xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                        <Stethoscope className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className='font-bold text-gray-900 group-hover:text-sky-600 transition-colors'>
                            {session.doctorSpecialist}
                          </h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} ${colors.border} border uppercase tracking-wider`}>
                            AI
                          </span>
                        </div>
                        <div className='flex flex-wrap items-center gap-3 text-xs text-gray-400'>
                          <span className='flex items-center gap-1'>
                            <Calendar className='w-3 h-3' />
                            {formatDate(session.createdAt)}
                          </span>
                          <span className='flex items-center gap-1'>
                            <Clock className='w-3 h-3' />
                            {formatTime(session.createdAt)}
                          </span>
                          <span className='flex items-center gap-1'>
                            <MessageCircle className='w-3 h-3' />
                            {session.messageCount} messages
                          </span>
                        </div>
                      </div>
                    </div>

                    <button className='px-4 py-2 rounded-xl text-sm font-semibold bg-gray-50 text-gray-600 group-hover:bg-sky-500 group-hover:text-white transition-all'>
                      View Details →
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
