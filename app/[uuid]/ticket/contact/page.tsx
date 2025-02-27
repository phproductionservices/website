"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useEventStore from "@/store/eventstore";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ContactPage() {
  const router = useRouter();
  const params = useParams();
  const uuid = params?.uuid as string;
  const { ticketData, createTicketRegistration } = useEventStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleProceed = async () => {
    setIsLoading(true);
    try {
      const response = await createTicketRegistration({ tickets: ticketData.tickets });
      if (response && response.statusCode >= 200 && response.statusCode < 300) {
        router.push(`/${uuid}/ticket/get-ticket`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 p-8 min-h-screen">
      <Card className="p-8 w-full shadow-lg rounded-lg bg-white">
        <h3 className="font-semibold text-2xl mb-6 text-gray-800">Order Summary</h3>
        <div className="space-y-6">
          {ticketData.tickets.length > 0 ? (
            ticketData.tickets.map((ticket: any) => (
              <div key={ticket.ticketId} className="border p-6 rounded-lg shadow-sm bg-gray-50">
                <h4 className="font-semibold text-lg text-gray-900">{ticket.name}</h4>
                <p className="text-sm text-gray-500 mb-2">{ticket.type}</p>
                <p><strong className="text-gray-700">First Name:</strong> {ticket.firstName}</p>
                <p><strong className="text-gray-700">Last Name:</strong> {ticket.lastName}</p>
                <p><strong className="text-gray-700">Email:</strong> {ticket.email}</p>
                <p><strong className="text-gray-700">Phone:</strong> {ticket.phone}</p>
                <p className="mt-3 text-gray-800"><strong>Quantity:</strong> {ticket.quantity} × £{ticket.pricePerTicket}</p>
                <p className="font-semibold text-gray-900">Total: £{ticket.amount}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No tickets available.</p>
          )}
          <div className="border-t pt-6">
            <div className="flex justify-between mb-4 text-lg">
              <span className="text-gray-700">Subtotal</span>
              <span className="text-gray-900 font-medium">£{ticketData.totalAmount}</span>
            </div>
            <div className="flex justify-between mb-6 text-lg font-semibold text-gray-900">
              <span>Total</span>
              <span>£{ticketData.totalAmount}</span>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg rounded-lg" onClick={handleProceed} disabled={isLoading}>
              {isLoading ? "Processing..." : "Get Tickets"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
