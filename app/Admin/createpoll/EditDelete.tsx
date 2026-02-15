"use client";


import { baseURL } from "@/app/config/baseUrl";
import {EditIcon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthContext";

interface EditDeleteProps {
  pollId: number;
}

export default function EditDelete({ pollId }: EditDeleteProps) {
  const router = useRouter();
  const { token} = useAuth();
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this poll? This action cannot be undone.")) {
      return;
    }
    try {
      const res = await fetch(`${baseURL}/api/polls/${pollId}`, {
        method: "DELETE", headers: {
              Authorization: `Bearer ${token}`,
            },
      });

      if (!res.ok) {
        throw new Error(`Failed to delete poll: ${res.status}`);
      }

      alert("Poll deleted successfully!");
      router.refresh(); 
      router.push("/"); 
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting poll. Check console for details.");
    }
  };

  // ✅ EDIT handler
  const handleEdit = async () => {
   router.push(`/Admin/createpoll?pollId=${pollId}`);

  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleEdit}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
     <EditIcon className="w-5 h-5" />
      </button>

      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
<Trash className="w-5 h-5" />
      </button>
    </div>
  );
}
