"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function EventSummaryPage() {
  const router = useRouter();

  const handleSubmit = () => {
    // Submit event data to API
    console.log("Submitting event...");
    router.push("/admin/events");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Event Summary</h1>
      <p className="text-gray-500 mb-6">Review and submit your event.</p>

      <Card className="p-6">
        <p>Summary of the event details goes here...</p>
        <Button onClick={handleSubmit} className="mt-4">Submit Event</Button>
      </Card>
    </div>
  );
}
