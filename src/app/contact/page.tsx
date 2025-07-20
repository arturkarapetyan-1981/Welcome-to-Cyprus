import { Suspense } from 'react';
import ContactClient from '@/components/contactClient/ContactClient';

export default function ContactPage() {
  return (
    <Suspense fallback={<p className="text-center p-4 text-white">Loading contact form...</p>}>
      <ContactClient />
    </Suspense>
  );
}






