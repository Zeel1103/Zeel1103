import React from 'react';
import AppHeader from './_components/AppHeader';

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='min-h-screen bg-soft-gradient'>
      <AppHeader />
      <div className='px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 pt-20 sm:pt-24 pb-12'>
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout