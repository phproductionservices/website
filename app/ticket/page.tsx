"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

const tickets = [
  {
    id: 1,
    type: "Single",
    price: 12.56,
    description: "Guest with this tickets gets to stand in the middle of all the vibes, thats why they are the life of the party."
  },
  {
    id: 2,
    type: "Single",
    price: 12.56,
    description: "Guest with this tickets gets to stand in the middle of all the vibes, thats why they are the life of the party."
  },
  {
    id: 3,
    type: "Single",
    price: 12.56,
    description: "Guest with this tickets gets to stand in the middle of all the vibes, thats why they are the life of the party."
  },
  {
    id: 4,
    type: "Single",
    price: 12.56,
    description: "Guest with this tickets gets to stand in the middle of all the vibes, thats why they are the life of the party."
  }
];

export default function TicketsPage() {
  const [selectedTickets, setSelectedTickets] = useState<{ [key: number]: number }>({});
  const [total, setTotal] = useState(0);

  const handleQuantityChange = (ticketId: number, quantity: string) => {
    const newQuantity = parseInt(quantity);
    setSelectedTickets(prev => ({
      ...prev,
      [ticketId]: newQuantity
    }));

    // Calculate total
    const newTotal = Object.entries(selectedTickets).reduce((sum, [id, qty]) => {
      const ticket = tickets.find(t => t.id === parseInt(id));
      return sum + (ticket?.price || 0) * (id === ticketId.toString() ? newQuantity : qty);
    }, 0);
    setTotal(newTotal);
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-2">Tickets for The Premier Conference 2023</h1>
        <h2 className="text-xl mb-8">Choose Tickets</h2>

        <div className="space-y-6">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="flex items-center justify-between p-6 border rounded-lg">
              <div>
                <h3 className="font-semibold text-lg">{ticket.type}</h3>
                <p className="text-gray-600 text-sm mt-1 max-w-md">{ticket.description}</p>
                <p className="text-blue-600 font-semibold mt-2">${ticket.price}</p>
              </div>
              <Select
                value={selectedTickets[ticket.id]?.toString() || "0"}
                onValueChange={(value) => handleQuantityChange(ticket.id, value)}
              >
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="0" />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Card className="p-6">
          <h3 className="font-semibold text-xl mb-6">Summary</h3>
          {Object.entries(selectedTickets).map(([id, quantity]) => {
            if (quantity === 0) return null;
            const ticket = tickets.find(t => t.id === parseInt(id));
            return (
              <div key={id} className="flex justify-between mb-4">
                <span>{quantity}× STANDARD SINGLE (Admits 1)</span>
                <span>${(ticket?.price || 0) * quantity}</span>
              </div>
            );
          })}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between mb-2">
              <span>Fees</span>
              <span>$0</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="text-blue-600 text-sm mb-4">Add discount code</button>
            <div className="flex justify-between mb-6">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">${(total + 1).toFixed(2)}</span>
            </div>
            <Link href="/ticket/contact">
              <Button className="w-full">Get Tickets</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}