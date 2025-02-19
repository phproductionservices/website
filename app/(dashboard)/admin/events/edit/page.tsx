"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ticket, Eye, Calendar, Clock, User, Image as ImageIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";

const mockEvent = {
  title: "The Premier Conference",
  description: "The Annual Professional Conference is an exciting gathering of industry experts, thought leaders, and professionals from across the country. This year's event will feature a wide range of sessions and workshops designed to help attendees stay ahead of the curve and achieve their professional goals.",
  category: "conference",
  type: "multi",
  format: "physical",
  date: "2024-03-15",
  startTime: "10:00",
  endTime: "18:00",
  location: "San Diego Convention Center",
  image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=400&fit=crop&auto=format"
};

export default function EditEventPage() {
  const [event, setEvent] = useState(mockEvent);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({}); // State for validation errors
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate title
    if (!event.title.trim()) {
      newErrors.title = "Event title is required.";
    }

    // Validate description
    if (!event.description.trim()) {
      newErrors.description = "Event description is required.";
    }

    // Validate category
    if (!event.category.trim()) {
      newErrors.category = "Event category is required.";
    }

    // Validate format
    if (!event.format.trim()) {
      newErrors.format = "Event format is required.";
    }

    // Validate date
    if (!event.date.trim()) {
      newErrors.date = "Event date is required.";
    } else if (new Date(event.date) < new Date()) {
      newErrors.date = "Event date must be in the future.";
    }

    // Validate start time
    if (!event.startTime.trim()) {
      newErrors.startTime = "Start time is required.";
    }

    // Validate end time
    if (!event.endTime.trim()) {
      newErrors.endTime = "End time is required.";
    } else if (event.endTime <= event.startTime) {
      newErrors.endTime = "End time must be after start time.";
    }

    // Validate location
    if (!event.location.trim()) {
      newErrors.location = "Event location is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsLoading(false);
    router.push("/admin/events");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <Link 
          href="/admin/events" 
          className="text-sm flex items-center text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to events
        </Link>
      </div>

      <div className="flex justify-between items-center mb-8">
        <Link href={`/`}>
          <h1 className="text-2xl font-semibold">Edit Event</h1>
        </Link>
        <Button variant="destructive">Delete Event</Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="p-6 space-y-8">
          {/* Cover Image */}
          <div>
            <Label className="mb-4 block">Event Cover Image</Label>
            <div className="relative">
              <img
                src={event.image}
                alt="Event cover"
                className="w-full h-[300px] object-cover rounded-lg mb-4"
              />
              <Button 
                variant="outline" 
                className="absolute bottom-8 right-8"
                type="button"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Change Image
              </Button>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Event title</Label>
              <Input
                id="title"
                value={event.title}
                onChange={(e) => setEvent({ ...event, title: e.target.value })}
                className="mt-1"
              />
              {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={event.description}
                onChange={(e) => setEvent({ ...event, description: e.target.value })}
                className="mt-1"
                rows={4}
              />
              {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={event.category}
                  onValueChange={(value) => setEvent({ ...event, category: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="seminar">Seminar</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category}</p>}
              </div>

              <div>
                <Label htmlFor="format">Event format</Label>
                <Select
                  value={event.format}
                  onValueChange={(value) => setEvent({ ...event, format: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physical">Physical</SelectItem>
                    <SelectItem value="virtual">Virtual</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
                {errors.format && <p className="text-sm text-red-500 mt-1">{errors.format}</p>}
              </div>
            </div>
          </div>

          {/* Date and Time */}
          <div>
            <h3 className="text-lg font-medium mb-4">Date and Time</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={event.date}
                  onChange={(e) => setEvent({ ...event, date: e.target.value })}
                  className="mt-1"
                />
                {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date}</p>}
              </div>
              <div>
                <Label htmlFor="startTime">Start time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={event.startTime}
                  onChange={(e) => setEvent({ ...event, startTime: e.target.value })}
                  className="mt-1"
                />
                {errors.startTime && <p className="text-sm text-red-500 mt-1">{errors.startTime}</p>}
              </div>
              <div>
                <Label htmlFor="endTime">End time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={event.endTime}
                  onChange={(e) => setEvent({ ...event, endTime: e.target.value })}
                  className="mt-1"
                />
                {errors.endTime && <p className="text-sm text-red-500 mt-1">{errors.endTime}</p>}
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-medium mb-4">Location</h3>
            <div>
              <Label htmlFor="location">Venue</Label>
              <Input
                id="location"
                value={event.location}
                onChange={(e) => setEvent({ ...event, location: e.target.value })}
                className="mt-1"
              />
              {errors.location && <p className="text-sm text-red-500 mt-1">{errors.location}</p>}
            </div>
          </div>

          {/* Tickets */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Tickets</h3>
              <Button type="button" variant="outline">Add ticket type</Button>
            </div>

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

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/events")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin mr-2" />
                  Saving...
                </div>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}