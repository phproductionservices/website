"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Users, Image as ImageIcon } from "lucide-react";

const steps = [
  { id: "details", name: "Event details", description: "Enter details of your event" },
  { id: "schedule", name: "Schedule", description: "Create daily schedule for your event" },
  { id: "ticket", name: "Ticket", description: "Start collaborating with your team" },
  { id: "preview", name: "Preview", description: "Review and edit your event" },
];

export default function CreateEventPage() {
  const [currentStep, setCurrentStep] = useState("details");
  const router = useRouter();

  const handleNext = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    } else {
      router.push("/admin/events");
    }
  };

  const handlePrev = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {steps.map((step, stepIdx) => (
              <li
                key={step.id}
                className={`${
                  stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : ""
                } relative`}
              >
                <div className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                      step.id === currentStep
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-current" />
                  </button>
                  {stepIdx !== steps.length - 1 && (
                    <div
                      className={`absolute top-4 h-0.5 w-full ${
                        steps.findIndex(s => s.id === currentStep) > stepIdx
                          ? "bg-primary"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
                <div className="mt-2">
                  <span className="text-sm font-medium">{step.name}</span>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <Card className="p-6">
        {currentStep === "details" && (
          <div className="space-y-6">
            <div className="border-2 border-dashed rounded-lg p-12 text-center">
              <div className="mx-auto flex justify-center text-gray-400">
                <ImageIcon className="h-12 w-12" />
              </div>
              <div className="mt-4">
                <Button variant="outline">Upload cover image</Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                16:9 ratio recommended. Max file size 1MB
              </p>
            </div>

            <div>
              <Label htmlFor="title">Event title</Label>
              <Input id="title" className="mt-1" placeholder="Enter event title" />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conference">Conference</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="seminar">Seminar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                className="mt-1"
                placeholder="Write about your event"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label>Event type</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Day Event</SelectItem>
                    <SelectItem value="multi">Multi-Day Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Event format</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physical">Physical</SelectItem>
                    <SelectItem value="virtual">Virtual</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {currentStep === "schedule" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Day 1 Schedule</h3>
              <Button variant="outline">Add activity</Button>
            </div>

            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input placeholder="Activity title" className="mb-2" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <Input placeholder="Start time" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <Input placeholder="Speaker" />
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Clock className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {currentStep === "ticket" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Tickets</h3>
              <Button variant="outline">Add ticket type</Button>
            </div>

            <div className="space-y-4">
              <Card className="p-4">
                <div className="space-y-4">
                  <div>
                    <Label>Ticket name</Label>
                    <Input className="mt-1" placeholder="e.g., Early Bird, VIP, etc." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Price</Label>
                      <Input className="mt-1" type="number" placeholder="0.00" />
                    </div>
                    <div>
                      <Label>Quantity</Label>
                      <Input className="mt-1" type="number" placeholder="100" />
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      className="mt-1"
                      placeholder="Describe what's included with this ticket"
                      rows={2}
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {currentStep === "preview" && (
          <div className="space-y-6">
            <div>
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=400&fit=crop&auto=format"
                alt="Event cover"
                className="w-full h-[300px] object-cover rounded-lg"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">The Premier Conference</h2>
              <p className="text-gray-600">
                The Annual Professional Conference is an exciting gathering of industry experts...
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Feb 22, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>10 AM - 12 AM</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === steps[0].id}
          >
            Previous
          </Button>
          <Button onClick={handleNext}>
            {currentStep === steps[steps.length - 1].id ? "Create Event" : "Next"}
          </Button>
        </div>
      </Card>
    </div>
  );
}