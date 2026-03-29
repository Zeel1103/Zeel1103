"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageCircle, Calendar, Stethoscope } from 'lucide-react';

interface HistorySession {
  id: number;
  userId: string;
  notes: string;
  doctorSpecialist: string;
  createdAt: string;
  messageCount: number;
  lastMessage: string | null;
}

export default function HistoryPage() {
  const [sessions, setSessions] = useState<HistorySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/sessions/list');
        
        if (!response.ok) {
          throw new Error('Failed to fetch sessions');
        }
        
        const data = await response.json();
        setSessions(data.sessions || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching sessions:', err);
        setError('Failed to load consultation history');
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center p-10 min-h-[400px]'>
        <div className='text-center'>
          <div className='w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-lg text-gray-600 dark:text-gray-400'>Loading your consultation history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <div className='mb-8 flex items-center justify-between'>
        <div>
          <h1 className='text-3xl md:text-4xl font-bold mb-3'>Consultation History</h1>
          <p className='text-gray-600 dark:text-gray-400'>
            View all your past AI consultations and medical conversations
          </p>
        </div>
        <Link href="/dashboard">
          <Button variant="outline">← Back to Dashboard</Button>
        </Link>
      </div>

      {error ? (
        <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center'>
          <p className='text-red-700 dark:text-red-300'>{error}</p>
        </div>
      ) : sessions.length === 0 ? (
        <div className='flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800'>
          <div className='w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4'>
            <Stethoscope className='w-8 h-8 text-blue-600 dark:text-blue-400' />
          </div>
          <h2 className='font-bold text-xl mb-2'>No Consultations Yet</h2>
          <p className='text-gray-600 dark:text-gray-400 max-w-md text-center mb-6'>
            Start your first AI medical consultation to build your health history and get personalized medical insights.
          </p>
          <Link href="/dashboard">
            <Button className='bg-blue-600 hover:bg-blue-700 text-white'>
              Start First Consultation
            </Button>
          </Link>
        </div>
      ) : (
        <div className='space-y-4'>
          {sessions.map((session) => (
            <Link key={session.id} href={`/session/${session.id}`}>
              <div className='group border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 bg-white dark:bg-gray-900 cursor-pointer'>
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                  {/* Left Content */}
                  <div className='flex-1 min-w-0'>
                    {/* Doctor Specialist */}
                    <div className='flex items-center gap-3 mb-3'>
                      <div className='w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0'>
                        <Stethoscope className='w-5 h-5 text-white' />
                      </div>
                      <div>
                        <h3 className='text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                          {session.doctorSpecialist}
                        </h3>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>AI Medical Specialist</p>
                      </div>
                    </div>

                    {/* Meta Information */}
                    <div className='flex flex-wrap gap-4 mb-3 text-sm'>
                      <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400'>
                        <Calendar className='w-4 h-4' />
                        <span>{formatDate(session.createdAt)}</span>
                      </div>
                      <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400'>
                        <MessageCircle className='w-4 h-4' />
                        <span>{session.messageCount} messages</span>
                      </div>
                    </div>

                    {/* Last Message Preview */}
                    {session.lastMessage && (
                      <div className='text-sm text-gray-600 dark:text-gray-400 line-clamp-2 italic'>
                        "{session.lastMessage.substring(0, 100)}..."
                      </div>
                    )}
                  </div>

                  {/* Right Arrow */}
                  <div className='flex-shrink-0'>
                    <Button className='bg-blue-600 hover:bg-blue-700 text-white px-6 group-hover:translate-x-1 transition-transform'>
                      View Details →
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
