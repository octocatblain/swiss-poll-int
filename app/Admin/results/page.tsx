"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PollFullDetails from "../components/fullvotes"; 

function ResultsPageContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  if (!category) {
    return <p className="text-center p-4">Loading category results...</p>;
  }

  return <PollFullDetails category={category} />;
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<p className="text-center p-4">Loading category results...</p>}>
      <ResultsPageContent />
    </Suspense>
  );
}
