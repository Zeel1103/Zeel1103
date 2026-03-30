import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';
import { Heart } from 'lucide-react';

const menuoptions = [
    { id: 1, name: 'Dashboard', path: '/dashboard' },
    { id: 2, name: 'History', path: '/dashboard/history' },
    { id: 3, name: 'Pricing', path: '/pricing' }
]

function AppHeader() {
    return (
        <div className='fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/80'>
            <div className='flex items-center justify-between py-3.5 px-6 md:px-20 lg:px-40'>
                <Link href="/dashboard" className='flex items-center gap-3 hover:opacity-90 transition-opacity'>
                    <div className='w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-sky-200/50'>
                        <Heart className='w-5 h-5 text-white' />
                    </div>
                    <div className='hidden sm:flex flex-col'>
                        <h1 className='font-bold text-lg text-gray-900 leading-none'>HealthAI</h1>
                        <p className='text-[11px] text-gray-400'>Medical Voice Agent</p>
                    </div>
                </Link>

                <div className='hidden md:flex gap-1 items-center bg-gray-50 rounded-xl p-1'>
                    {menuoptions.map((option) => (
                        <Link key={option.id} href={option.path}>
                            <div className='px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white hover:shadow-sm transition-all'>
                                {option.name}
                            </div>
                        </Link>
                    ))}
                </div>

                <UserButton />
            </div>
        </div>
    )
}
export default AppHeader