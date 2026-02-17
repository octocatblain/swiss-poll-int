"use client";

import { useParams } from "next/navigation";
import NationalPoll from "../../CreateOpinion/page";

export default function EditOpinion() {
  const params = useParams();
  const pollId = params.id as string;

  return <NationalPoll pollId={pollId} />;
}
