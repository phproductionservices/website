"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import WorkshopDrawer from "@/components/custom/WorkshopDrawer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useEventStore from "@/store/eventstore";
import { useToast } from "@/hooks/use-toast";

export default function AddWorkshopPage() {
  const router = useRouter();
  const params = useParams();
  const uuid = params?.uuid as string;
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // State to control whether the WorkshopDrawer is open
  const [isAddingWorkshop, setIsAddingWorkshop] = useState(false);
  const [workshops, setWorkshops] = useState<any[]>([]); // Stores added workshops

  // Handle opening WorkshopDrawer
  const handleAddWorkshop = () => {
    setIsAddingWorkshop(true);
  };

  // Handle saving workshop and resetting state
  const handleNext = (workshopData: any) => {
    setWorkshops((prev) => [...prev, workshopData]); // Add new workshop
    setIsAddingWorkshop(false); // Close drawer
  };

  // Handle submitting all workshops
  const handleSubmitAll = async () => {
    console.log("✅ Submitting Workshops:", workshops);

    setIsLoading(true); // Start loading

    try {
      const response = await useEventStore.getState().createWorkShore({
        workshops,
        uuid,
      });

      if (response.statusCode === 201) {
        // Show success toast
        toast({
          title: "Event details created successfully",
          description: "Event details saved successfully! Redirecting...",
        });

        // Wait for 3 seconds before redirecting
        setTimeout(() => {
          router.push(`/admin/events/create/${response.uuid}/tickets`);
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting workshops:", error);
      toast({
        title: "Error",
        description: "Something went wrong while submitting workshops.",
      });
    } finally {
      setIsLoading(false); // Stop loading
      setWorkshops([]); // Reset workshops after submission
      setIsAddingWorkshop(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Create Workshop</h1>
      <p className="text-gray-500 mb-6">
        Include workshops or breakout sessions.
      </p>

      <Card className="p-6 space-y-4">
        {/* Display Added Workshops */}
        {workshops.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Added Workshops</h2>
            {workshops.map((workshop, index) => (
              <div key={index} className="border p-4 rounded-lg">
                <p>
                  <strong>Title:</strong> {workshop.title}
                </p>
                <p>
                  <strong>Date:</strong> {workshop.date}
                </p>
                <p>
                  <strong>Speakers:</strong> {workshop.speakers.length}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Add Workshop Button */}
        {!isAddingWorkshop && (
          <Button onClick={handleAddWorkshop} className="w-full">
            + Add Workshop
          </Button>
        )}

        {/* Show WorkshopDrawer when adding */}
        {isAddingWorkshop && <WorkshopDrawer onSubmit={handleNext} uuid={uuid} />}

        {/* Submit Workshops Button with Loading */}
        {workshops.length > 0 && (
          <Button
            onClick={handleSubmitAll}
            className="w-full mt-4 bg-[#27264E] hover:bg-[#1f1e3d] transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
              </div>
            ) : (
              <span className="flex items-center justify-center">
                Submit Workshops
              </span>
            )}
          </Button>
        )}
      </Card>
    </div>
  );
}
