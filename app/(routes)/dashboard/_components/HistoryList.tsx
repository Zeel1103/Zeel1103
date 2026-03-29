"use client"

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import AddNewSessionDialog from './AddNewSessionDialog';
import { Stethoscope, MessageCircle } from 'lucide-react';

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
      <div className='text-center py-4'>
        <p className='text-gray-500 text-sm'>Loading...</p>
      </div>
    );
  }

  if (historyList.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center p-6 text-center'>
        <div className='w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3'>
          <Stethoscope className='w-6 h-6 text-blue-600 dark:text-blue-400' />
        </div>
        <h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
          No Consultations Yet
        </h3>
        <p className='text-gray-600 dark:text-gray-400 text-sm mb-4'>
          {minimal ? 'Start a consultation to see history here' : 'You haven\'t consulted with any doctors yet.'}
        </p>
        {!minimal && <AddNewSessionDialog />}
      </div>
    );
  }

  if (minimal) {
    return (
      <div className='space-y-3 max-h-96 overflow-y-auto'>
        {historyList.map((session) => (
          <Link key={session.id} href={`/session/${session.id}`}>
            <div className='p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group'>
              <p className='font-medium text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate'>
                {session.doctorSpecialist}
              </p>
              <div className='flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400'>
                <MessageCircle className='w-3 h-3' />
                <span>{session.messageCount || 0} messages</span>
              </div>
              <p className='text-xs text-gray-400 mt-1'>
                {new Date(session.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
        <Link href="/dashboard/history">
          <Button variant="outline" className='w-full mt-4' size="sm">
            View All History
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='mt-10'>
      <div className='space-y-4'>
        {historyList.map((session) => (
          <div key={session.id} className='border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow'>
            <h3 className='font-semibold text-gray-900 dark:text-white'>
              {session.doctorSpecialist}
            </h3>
            <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
              {new Date(session.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryList