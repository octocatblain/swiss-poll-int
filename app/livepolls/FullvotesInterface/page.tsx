import { Suspense } from "react";
import PollFullDetails from "../../Admin/components/fullvotes";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;id?: string;
  }>;
}) {
 const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams?.category ?? "";
  const id = resolvedSearchParams?.id;

  return (
    <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
      <PollFullDetails category={category} id={id} />
    </Suspense>
  );
}
