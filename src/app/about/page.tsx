import { Suspense } from "react";
import AboutClient from "./AboutClient";

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-white">Loading...</div>}>
      <AboutClient />
    </Suspense>
  );
}

