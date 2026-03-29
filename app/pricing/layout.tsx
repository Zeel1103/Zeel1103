import React from 'react';

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 min-h-screen'>
      <div className='px-10 md:px-20 lg:px-40 py-16'>
        {children}
      </div>
    </div>
  );
}
