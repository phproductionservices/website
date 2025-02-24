"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import useEventStore from "@/store/eventstore";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ContactPage() {
  const router = useRouter();
  const params = useParams();
  const uuid = params?.uuid as string;
  const { ticketData, createTicketRegistration } = useEventStore();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()

  // Form State
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    phone: "",
  });

  // Validation Errors
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    phone: "",
  });

  // ✅ Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" }); // Clear error on change
  };

  // ✅ Validate Form
  const validateForm = () => {
    let newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      confirmEmail: "",
      phone: "",
    };
    let isValid = true;

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required.";
      isValid = false;
    }
    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
      isValid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
      isValid = false;
    }
    if (!form.confirmEmail.trim()) {
      newErrors.confirmEmail = "Please confirm your email address.";
      isValid = false;
    }
    if (form.email !== form.confirmEmail) {
      newErrors.confirmEmail = "Emails do not match.";
      isValid = false;
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return; // Stop if validation fails
    }
  
    setIsLoading(true);
  
    try {
      console.log("Data :", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        tickets: ticketData.tickets,
      });
  
      const response = await createTicketRegistration({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        tickets: ticketData.tickets,
      });
  
      if (response && response.statusCode >= 200 && response.statusCode < 300) {
        toast({
          title: "Registration Successful",
          description: response.message,
        });
        console.log("data response : " , response.data);
  
        // Wait for a moment before redirecting
        setTimeout(() => {
          router.push(`/${uuid}/ticket/get-ticket`);
        }, 1000);
      } else {
        toast({
          title: "Registration Failed",
          description: response.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
  
      toast({
        title: "Network Error",
        description: "Failed to connect to the server. Please try again later.",
      });
    } finally {
      setIsLoading(false); // Ensure loading state resets
    }
  };
  

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-8">Contact Information</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              placeholder="First name"
              className="mt-1"
              value={form.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              placeholder="Last name"
              className="mt-1"
              value={form.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email address"
              className="mt-1"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmEmail">Confirm email address</Label>
            <Input
              id="confirmEmail"
              type="email"
              placeholder="Confirm email address"
              className="mt-1"
              value={form.confirmEmail}
              onChange={handleChange}
            />
            {errors.confirmEmail && (
              <p className="text-red-500 text-sm">{errors.confirmEmail}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              placeholder="+447839202333"
              className="mt-1"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
        </form>
      </div>

      <Card className="p-6 h-fit">
        <h3 className="font-semibold text-xl mb-6">Summary</h3>
        <div className="space-y-4">
          {ticketData.tickets.length > 0 ? (
            ticketData.tickets.map((ticket: any) => (
              <div key={ticket.ticketId} className="flex justify-between">
                <div>
                  <span>
                    {ticket.quantity}× {ticket.name}
                  </span>
                  <p className="text-sm text-gray-500">{ticket.type}</p>
                </div>
                <span>£{ticket.amount}</span>
              </div>
            ))
          ) : (
            <p>No tickets available.</p>
          )}

          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Fees</span>
              <span>£0</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>£{ticketData.totalAmount}</span>
            </div>
            <div className="flex justify-between mb-6">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">£{ticketData.totalAmount}</span>
            </div>

            {/* Get Tickets Button */}
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Get Tickets"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
