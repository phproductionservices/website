"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

// Sample ticket data
const tickets = [
  {
    id: 1,
    customerName: "Olivia Rhye",
    ticketNumber: "TKT-2024-001",
    ticketType: "VIP",
    phoneNumber: "+1 (555) 000-0000",
    date: "2024-03-15",
    amount: "$250.00",
    status: "Paid"
  },
  {
    id: 2,
    customerName: "Phoenix Baker",
    ticketNumber: "TKT-2024-002",
    ticketType: "Regular",
    phoneNumber: "+1 (555) 000-0001",
    date: "2024-03-15",
    amount: "$120.00",
    status: "Pending"
  },
  {
    id: 3,
    customerName: "Lana Steiner",
    ticketNumber: "TKT-2024-003",
    ticketType: "Group",
    phoneNumber: "+1 (555) 000-0002",
    date: "2024-03-16",
    amount: "$500.00",
    status: "Paid"
  },
  {
    id: 4,
    customerName: "Demi Wilkinson",
    ticketNumber: "TKT-2024-004",
    ticketType: "Regular",
    phoneNumber: "+1 (555) 000-0003",
    date: "2024-03-16",
    amount: "$120.00",
    status: "Cancelled"
  },
  {
    id: 5,
    customerName: "Candice Wu",
    ticketNumber: "TKT-2024-005",
    ticketType: "VIP",
    phoneNumber: "+1 (555) 000-0004",
    date: "2024-03-17",
    amount: "$250.00",
    status: "Paid"
  }
];

export default function TicketsPage() {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Tickets</h1>
        <Button>Export List</Button>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search tickets..."
                className="pl-10"
              />
            </div>
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="vip">VIP</SelectItem>
              <SelectItem value="regular">Regular</SelectItem>
              <SelectItem value="group">Group</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium">Customer Name</th>
                <th className="text-left p-4 font-medium">Ticket Number</th>
                <th className="text-left p-4 font-medium">Type</th>
                <th className="text-left p-4 font-medium">Phone Number</th>
                <th className="text-left p-4 font-medium">Date</th>
                <th className="text-left p-4 font-medium">Amount</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-4">{ticket.customerName}</td>
                  <td className="p-4">
                    <span className="font-mono">{ticket.ticketNumber}</span>
                  </td>
                  <td className="p-4">{ticket.ticketType}</td>
                  <td className="p-4">{ticket.phoneNumber}</td>
                  <td className="p-4">{ticket.date}</td>
                  <td className="p-4">{ticket.amount}</td>
                  <td className="p-4">
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Button variant="outline" size="sm">View Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-500">
            Showing 5 of 24 tickets
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}