import { Suspense } from 'react';
import BlogClient from '@/components/blog/BlogClient';

export default function BlogPage() {
  return (
    <Suspense fallback={<div>Loading blog...</div>}>
      <BlogClient />
    </Suspense>
  );
}








