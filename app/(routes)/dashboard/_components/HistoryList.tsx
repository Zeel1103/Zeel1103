"use client"

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import AddNewSessionDialog from './AddNewSessionDialog';
import { Stethoscope, MessageCircle, ChevronRight } from 'lucide-react';

interface HistorySession {
  id: number;
  userId: string;
  notes: string;
  doctorSpecialist: string;
  createdAt: string;
  messageCount?: number;
}

function HistoryList({ minimal = false }: { minimal?: boolean }) {
  const [historyList, setHistoryList] = useState<HistorySession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('/api/sessions/list');
        if (response.ok) {
          const data = await response.json();
          setHistoryList(data.sessions?.slice(0, minimal ? 5 : undefined) || []);
        }
      } catch (error) {
        console.error('Failed to fetch history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) {
    return (
      <div className='text-center py-6'>
        <div className='w-8 h-8 border-3 border-sky-200 border-t-sky-500 rounded-full animate-spin mx-auto mb-3'></div>
        <p className='text-gray-400 text-sm'>Loading...</p>
      </div>
    );
  }

  if (historyList.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center p-6 text-center'>
        <div className='w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center mb-3'>
          <Stethoscope className='w-6 h-6 text-sky-500' />
        </div>
        <h3 className='font-semibold text-gray-900 mb-1 text-sm'>No Consultations Yet</h3>
        <p className='text-gray-400 text-xs mb-4'>
          {minimal ? 'Start a consultation to see your history' : 'You haven\'t consulted with any doctors yet.'}
        </p>
        {!minimal && <AddNewSessionDialog />}
      </div>
    );
  }

  if (minimal) {
    return (
      <div className='space-y-1.5 max-h-80 overflow-y-auto'>
        {historyList.map((session) => (
          <Link key={session.id} href={`/session/${session.id}`}>
            <div className='p-3 rounded-xl hover:bg-sky-50 transition-all cursor-pointer group flex items-center gap-3'>
              <div className="w-9 h-9 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-100 transition-colors">
                <Stethoscope className="w-4 h-4 text-sky-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className='font-semibold text-sm text-gray-800 group-hover:text-sky-600 truncate transition-colors'>
                  {session.doctorSpecialist}
                </p>
                <div className='flex items-center gap-2 text-[11px] text-gray-400'>
                  <span>{session.messageCount || 0} msgs</span>
                  <span>•</span>
                  <span>{new Date(session.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-sky-400 transition-colors" />
            </div>
          </Link>
        ))}
        <Link href="/dashboard/history">
          <Button variant="outline" className='w-full mt-3 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50 text-sm' size="sm">
            View All History
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='mt-10'>
      <div className='space-y-3'>
        {historyList.map((session) => (
          <div key={session.id} className='card-elevated p-4'>
            <h3 className='font-semibold text-gray-900'>{session.doctorSpecialist}</h3>
            <p className='text-sm text-gray-400 mt-1'>{new Date(session.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryList