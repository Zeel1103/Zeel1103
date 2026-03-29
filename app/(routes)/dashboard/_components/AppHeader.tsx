import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';
import { Heart, Activity } from 'lucide-react';

const menuoptions = [
    {
        id: 1,
        name: 'History',
        path: '/dashboard/history'
    },
    {
        id: 2,
        name: 'Pricing',
        path: '/pricing'
    }
]

function AppHeader() {
    return (
        <div className='flex items-center justify-between p-4 shadow-md px-10 md:px-20 lg:px-40 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800'>
            {/* Logo and Brand */}
            <Link href="/dashboard" className='flex items-center gap-3 hover:opacity-80 transition-opacity'>
                <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg'>
                    <Heart className='w-6 h-6 text-white' />
                </div>
                <div className='hidden sm:flex flex-col'>
                    <h1 className='font-bold text-lg text-gray-900 dark:text-white leading-none'>HealthAI</h1>
                    <p className='text-xs text-gray-600 dark:text-gray-400'>Medical Voice Agent</p>
                </div>
            </Link>

            {/* Navigation Links */}
            <div className='hidden md:flex gap-8 items-center'>
                {menuoptions.map((option, index) => (
                    <Link key={index} href={option.path} className='relative group'>
                        <h2 className='font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
                            {option.name}
                        </h2>
                        <div className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300'></div>
                    </Link>
                ))}
            </div>

            {/* User Button */}
            <UserButton />
        </div>
    )
}
export default AppHeader