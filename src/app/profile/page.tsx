import { Suspense } from 'react';
import BecomePartner from '@/components/partner/BecomePartner';

export default function Profile() {
  return (
    <Suspense fallback={<div>Loading blog...</div>}>
      <BecomePartner />
    </Suspense>
  );
}