"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useEventStore from "@/store/eventstore";
import { useToast } from "@/hooks/use-toast";

export default function AddTicketPage() {
  const router = useRouter();
  const params = useParams(); // Extract params object
  const uuid = params?.uuid as string; // Ensure uuid is correctly retrieved
  const { toast } = useToast()

  // State for multiple tickets
  const [tickets, setTickets] = useState([
    { id: 1, type: "Event", name: "", price: "", quantity: "" },
  ]);

  const [errors, setErrors] = useState<{ [key: number]: { name?: string; price?: string; quantity?: string } }>({});

  // Validate form before submission
  const validateForm = () => {
    const newErrors: { [key: number]: { name?: string; price?: string; quantity?: string } } = {};

    tickets.forEach((ticket, index) => {
      const ticketErrors: { name?: string; price?: string; quantity?: string } = {};

      if (!ticket.name.trim()) {
        ticketErrors.name = "Ticket name is required.";
      }
      if (!ticket.price || parseFloat(ticket.price) <= 0) {
        ticketErrors.price = "Price must be a positive number.";
      }
      if (!ticket.quantity || parseInt(ticket.quantity) <= 0) {
        ticketErrors.quantity = "Quantity must be a positive integer.";
      }

      if (Object.keys(ticketErrors).length > 0) {
        newErrors[index] = ticketErrors;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change for a specific ticket
  const handleChange = (index: number, field: keyof typeof tickets[number], value: string) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket, i) =>
        i === index ? { ...ticket, [field]: value } : ticket
      )
    );
  };

  // Add a new ticket
  const handleAddTicket = () => {
    setTickets((prevTickets) => [
      ...prevTickets,
      { id: prevTickets.length + 1, type: "Event", name: "", price: "", quantity: "" },
    ]);
  };

  // Remove a ticket
  const handleRemoveTicket = (index: number) => {
    setTickets((prevTickets) => prevTickets.filter((_, i) => i !== index));
  };

  // Proceed to next step
  const handleNext = () => {
    if (!validateForm()) {
      toast({description:"Please fix the errors before proceeding."});
      return;
    }
    console.log("form data : ", tickets);

    const response = useEventStore.getState().createTicket({
      tickets,
      uuid
    })
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
    // router.push(`/admin/events/create/${uuid}/workshops`);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Add Ticket</h1>
      <p className="text-gray-500 mb-6">Define ticket options for your event.</p>

      <Card className="p-6 space-y-4">
        {tickets.map((ticket, index) => (
          <div key={ticket.id} className="border p-4 rounded-lg space-y-1 relative">
            {/* Remove Ticket Button */}
            {tickets.length > 1 && (
              <button
                onClick={() => handleRemoveTicket(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                ✖
              </button>
            )}

            {/* Name Field */}
            <Label htmlFor={`name-${index}`}>Name</Label>
            <Input
              id={`name-${index}`}
              placeholder="Enter ticket name"
              value={ticket.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
            {errors[index]?.name && (
              <p className="text-red-500 text-sm mb-1">{errors[index]?.name}</p>
            )}

            {/* Type Field (Always Event) */}
            <Label htmlFor={`type-${index}`}>Type</Label>
            <Input
              id={`type-${index}`}
              value="Event"
              disabled
              className="bg-gray-100"
            />

            {/* Price Field */}
            <div>
              <Label htmlFor={`price-${index}`}>Price</Label>
              <Input
                id={`price-${index}`}
                name="price"
                type="number"
                step="0.01"
                placeholder="Enter ticket price"
                value={ticket.price}
                onChange={(e) => handleChange(index, "price", e.target.value)}
              />
              {errors[index]?.price && (
                <p className="text-red-500 text-sm mb-1">{errors[index]?.price}</p>
              )}
            </div>

            {/* Quantity Field */}
            <div>
              <Label htmlFor={`quantity-${index}`}>Quantity</Label>
              <Input
                id={`quantity-${index}`}
                name="quantity"
                type="number"
                placeholder="Enter available quantity"
                value={ticket.quantity}
                onChange={(e) => handleChange(index, "quantity", e.target.value)}
              />
              {errors[index]?.quantity && (
                <p className="text-red-500 text-sm mb-1">{errors[index]?.quantity}</p>
              )}
            </div>
          </div>
        ))}

        {/* Add Ticket Button */}
        <Button onClick={handleAddTicket} className="mt-4 w-full">
          + Add Ticket
        </Button>

        {/* Next Button */}
        <Button onClick={handleNext} className="mt-4 w-full">
          Submit
        </Button>
      </Card>
    </div>
  );
}
