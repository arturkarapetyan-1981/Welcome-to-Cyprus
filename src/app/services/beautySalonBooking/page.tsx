'use client';

import BeautySalonBookingClient from '@/components/pages/BeautySalonBookingClient';

export default function BeautySalonBookingPage() {
  return (
    <div className="relative max-w-full h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/booking-2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black/40 text-white text-center px-4">
        <h1 className="text-4xl font-bold mb-6">Book Your Beauty Salon</h1>
        <BeautySalonBookingClient />
      </div>
    </div>
  );
}

