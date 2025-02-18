"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { useRouter } from "next/navigation";

interface Speaker {
  name: string;
  description: string;
  imageUrl?: string;
}

interface Ticket {
  id: number;
  type: string;
  name: string;
  ticketPrice: string;
  ticketQuantity: string;
}

interface WorkshopFormData {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  isPaidFor: boolean;
  speakers: Speaker[];
  tickets: Ticket[];
}

export default function MultiStepWorkshopForm({onSubmit, uuid }: { onSubmit: (data: WorkshopFormData) => void, uuid: string }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<WorkshopFormData>({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
    isPaidFor: false,
    speakers: [],
    tickets: [
      { id: Date.now(), type: "Workshop", name: "", ticketPrice: "", ticketQuantity: "" },
    ],
  });

  const [errors, setErrors] = useState<{ [key: string]: string | string[] }>(
    {}
  );
  const [isUploading, setIsUploading] = useState(false);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle change for Paid Workshop dropdown
  const handlePaidChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      isPaidFor: value === "true",
    }));
  };

  const handleRemoveSpeaker = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      speakers: prev.speakers.filter((_, i) => i !== index),
    }));
  };

  // Add a new speaker
  const handleAddSpeaker = () => {
    setFormData((prev) => ({
      ...prev,
      speakers: [...prev.speakers, { name: "", description: "", imageUrl: "" }],
    }));
  };

  // Handle change in speaker fields
  const handleSpeakerChange = (
    index: number,
    key: keyof Speaker,
    value: string
  ) => {
    const updatedSpeakers = [...formData.speakers];
    updatedSpeakers[index][key] = value;
    setFormData((prev) => ({ ...prev, speakers: updatedSpeakers }));
  };

  const handleAddTicket = () => {
    setFormData((prev) => ({
      ...prev,
      tickets: [
        ...prev.tickets,
        { id: Date.now(), type: "Workshop", name: "", ticketPrice: "", ticketQuantity: "" },
      ],
    }));
  };

  // Handle removing a ticket
  const handleRemoveTicket = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      tickets: prev.tickets.filter((ticket) => ticket.id !== id),
    }));
  };

  // Handle updating ticket fields
  const handleTicketChange = (id: number, key: keyof Ticket, value: string) => {
    setFormData((prev) => ({
      ...prev,
      tickets: prev.tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, [key]: value } : ticket
      ),
    }));
  };

  // Validate Form before progressing
  const validateForm = () => {
    const newErrors: { [key: string]: string | string[] } = {};

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = "Title is required";
      if (!formData.date) newErrors.date = "Date is required";
      if (!formData.startTime) newErrors.startTime = "Start time is required";
      if (!formData.endTime) newErrors.endTime = "End time is required";
      if (!formData.description.trim())
        newErrors.description = "Description is required";
    } else if (step === 2) {
      if (formData.speakers.length === 0) {
        newErrors.speakers = "At least one speaker is required";
      } else {
        formData.speakers.forEach((speaker, index) => {
          const speakerErrors: string[] = [];
          if (!speaker.name.trim())
            speakerErrors.push("Speaker name is required");
          if (!speaker.description.trim())
            speakerErrors.push("Speaker description is required");
          if (speakerErrors.length > 0)
            newErrors[`speaker-${index}`] = speakerErrors;
        });
      }
    } else if (step === 3 && formData.isPaidFor) {
      formData.tickets.forEach((ticket, index) => {
        if (!ticket.name.trim()) newErrors[`ticket-${index}-name`] = "Ticket name is required";
        if (!ticket.ticketPrice.trim())
          newErrors[`ticket-${index}-price`] = "Ticket price is required";
        if (!ticket.ticketQuantity.trim())
          newErrors[`ticket-${index}-quantity`] = "Ticket quantity is required";
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Next Step
  const handleNext = () => {
    if (!validateForm()) return;

    console.log("✅ Current Form Data:", formData);

    setStep((prev) => prev + 1);
  };

  // Handle Form Submission
  const handleSubmit = () => {
    console.log("✅ Current Form Data:", formData);
    if (!validateForm()) return;
    if (formData.isPaidFor == false) {
      formData.tickets = [];
    }

    const workshopData = {
      ...formData,
      uuid,
    };

    onSubmit(workshopData);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Card className="p-6 space-y-4">
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold">Workshop Details</h2>

            <div>
              <Label htmlFor="title">Workshop Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter workshop title"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>

            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleChange}
                />
                {errors.startTime && (
                  <p className="text-red-500 text-sm">{errors.startTime}</p>
                )}
              </div>

              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleChange}
                />
                {errors.endTime && (
                  <p className="text-red-500 text-sm">{errors.endTime}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the workshop"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>

            <div>
              <Label>Workshop Payment</Label>
              <Select
                value={formData.isPaidFor ? "true" : "false"}
                onValueChange={handlePaidChange}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select ticket option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Paid Workshop</SelectItem>
                  <SelectItem value="false">Free Workshop</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold">Speakers</h2>

            {formData.speakers.map((speaker, index) => (
              <div
                key={index}
                className="border p-4 mb-4 rounded-lg space-y-2 relative"
              >
                {/* Delete Button */}
                <button
                  onClick={() => handleRemoveSpeaker(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  ✖
                </button>

                {/* Speaker Name */}
                <Input
                  placeholder="Speaker Name"
                  value={speaker.name}
                  onChange={(e) =>
                    handleSpeakerChange(index, "name", e.target.value)
                  }
                />
                {errors[`speaker-${index}`]?.includes(
                  "Speaker name is required"
                ) && (
                  <p className="text-red-500 text-sm">
                    Speaker name is required
                  </p>
                )}

                {/* Speaker Description */}
                <Textarea
                  placeholder="Speaker Description"
                  value={speaker.description}
                  onChange={(e) =>
                    handleSpeakerChange(index, "description", e.target.value)
                  }
                />
                {errors[`speaker-${index}`]?.includes(
                  "Speaker description is required"
                ) && (
                  <p className="text-red-500 text-sm">
                    Speaker description is required
                  </p>
                )}

                {/* Image Upload (Optional) */}
                {/* Image Upload (Optional) */}
                <CldUploadWidget
                  uploadPreset="my_preset"
                  onSuccess={(results) => {
                    setIsUploading(false);
                    if (typeof results === "object" && results !== null) {
                      const cloudinaryResults =
                        results as CloudinaryUploadWidgetResults;
                      if (
                        cloudinaryResults.info &&
                        typeof cloudinaryResults.info === "object" &&
                        "secure_url" in cloudinaryResults.info
                      ) {
                        const secureUrl = cloudinaryResults.info.secure_url;
                        handleSpeakerChange(index, "imageUrl", secureUrl);
                        console.log("✅ Image Uploaded:", secureUrl);
                      } else {
                        console.error(
                          "❌ Upload response missing secure_url",
                          cloudinaryResults
                        );
                      }
                    } else {
                      console.error(
                        "❌ Unexpected upload response format:",
                        results
                      );
                    }
                  }}
                >
                  {({ open }) => (
                    <div className="flex items-center space-x-4">
                      <Button
                        onClick={() => {
                          setIsUploading(true);
                          open();
                        }}
                      >
                        Upload Speaker Image
                      </Button>
                      {/* Display Image URL If Exists */}
                      {speaker.imageUrl && (
                        <span className="text-sm text-gray-500 break-all">
                          {speaker.imageUrl}
                        </span>
                      )}
                    </div>
                  )}
                </CldUploadWidget>
              </div>
            ))}

            {/* Add Speaker Button */}
            <Button onClick={handleAddSpeaker} className="mt-2">
              + Add Speaker
            </Button>

            {/* Display error message if no speaker exists */}
            {errors.speakers && (
              <p className="text-red-500 text-sm mt-2">{errors.speakers}</p>
            )}
          </>
        )}

{step === 3 ? (
          formData.isPaidFor ? (
            <>
              <h2 className="text-xl font-semibold">Add Tickets</h2>
              {formData.tickets.map((ticket, index) => (
                <div key={ticket.id} className="border p-4 mb-4 rounded-lg space-y-2 relative">
                  {/* Remove Ticket Button */}
                  <button onClick={() => handleRemoveTicket(ticket.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                    ✖
                  </button>

                  {/* Ticket Name */}
                  <div>
                    <Label htmlFor={`ticket-${index}-name`}>Ticket Name</Label>
                    <Input
                      id={`ticket-${index}-name`}
                      placeholder="Enter ticket name"
                      value={ticket.name}
                      onChange={(e) => handleTicketChange(ticket.id, "name", e.target.value)}
                    />
                    {errors[`ticket-${index}-name`] && <p className="text-red-500 text-sm">{errors[`ticket-${index}-name`]}</p>}
                  </div>

                  {/* Ticket Price */}
                  <div>
                    <Label htmlFor={`ticket-${index}-price`}>Ticket Price</Label>
                    <Input
                      id={`ticket-${index}-price`}
                      type="number"
                      placeholder="Enter ticket price"
                      value={ticket.ticketPrice}
                      onChange={(e) => handleTicketChange(ticket.id, "ticketPrice", e.target.value)}
                    />
                    {errors[`ticket-${index}-price`] && <p className="text-red-500 text-sm">{errors[`ticket-${index}-price`]}</p>}
                  </div>

                  {/* Ticket Quantity */}
                  <div>
                    <Label htmlFor={`ticket-${index}-quantity`}>Ticket Quantity</Label>
                    <Input
                      id={`ticket-${index}-quantity`}
                      type="number"
                      placeholder="Enter available quantity"
                      value={ticket.ticketQuantity}
                      onChange={(e) => handleTicketChange(ticket.id, "ticketQuantity", e.target.value)}
                    />
                    {errors[`ticket-${index}-quantity`] && <p className="text-red-500 text-sm">{errors[`ticket-${index}-quantity`]}</p>}
                  </div>
                </div>
              ))}

              {/* Add Ticket Button */}
              <Button onClick={handleAddTicket} className="w-full">
                + Add Ticket
              </Button>
            </>
          ) : (
            <p>Click "Save Workshop" to complete setup.</p>
          )
        ) : null}

        {/* Buttons */}
        <div className="flex justify-between">
          {step > 1 && <Button onClick={() => setStep(step - 1)}>Back</Button>}
          {step < 3 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit}>Save Workshop</Button>
          )}
        </div>
      </Card>
    </div>
  );
}
