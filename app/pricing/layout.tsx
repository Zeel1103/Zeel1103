import React from 'react';

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen bg-soft-gradient'>
      <div className='px-6 md:px-20 lg:px-40 py-12'>
        {children}
      </div>
    </div>
  );
}
