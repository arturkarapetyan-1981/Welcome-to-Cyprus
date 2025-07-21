import { Suspense } from 'react';
import BecomePartner from '@/components/partner/BecomePartner';
import PackagePurchase from '@/components/PackagePurchase'
export default function Profile() {
  return (
    <Suspense fallback={<div className="text-white">Loading blog...</div>}>
      <BecomePartner />
      <PackagePurchase />
    </Suspense>
  );
}