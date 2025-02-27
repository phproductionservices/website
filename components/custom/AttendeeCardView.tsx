"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Mail } from "lucide-react";

interface Registration {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ticketRef: string;
  pricePerTicket: number;
  amount: number;
  quantity: number;
  type: string; // "Event" or "Workshop"
}

interface Ticket {
  id: number;
  type: string; // "Event" or "Workshop"
  name: string;
  price: number;
  quantity: number;
  registrations: Registration[];
}

interface Workshop {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  isPaidFor: boolean;
  ticket: Ticket[];
}

interface EventData {
  tickets: Ticket[];
  workshops: Workshop[];
}

type AttendeeProps = {
  eventData: EventData;
};

export default function AttendeeCardView({ eventData }: AttendeeProps) {
  const [selectedType, setSelectedType] = useState<"event" | "workshop" | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Combine all attendees from event and workshop tickets
  const allAttendees = [
    ...eventData.tickets.flatMap(ticket => ticket.registrations),
    ...eventData.workshops.flatMap(workshop => workshop.ticket.flatMap(ticket => ticket.registrations))
  ];

  // Filter attendees based on type selection
  const filteredAttendees =
    selectedType === "all"
      ? allAttendees
      : allAttendees.filter(attendee => attendee.type.toLowerCase() === selectedType);

  // Search attendees by name
  const displayedAttendees = filteredAttendees.filter(attendee =>
    `${attendee.firstName} ${attendee.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Attendee List</h3>

      {/* Dropdown Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Select Event or Workshop */}
        <Select onValueChange={(value) => setSelectedType(value as "event" | "workshop" | "all")}> 
          <SelectTrigger className="w-[200px]">
            <SelectValue>{selectedType === "all" ? "All" : selectedType === "event" ? "Event" : "Workshop"}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="event">Event</SelectItem>
            <SelectItem value="workshop">Workshop</SelectItem>
          </SelectContent>
        </Select>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search attendees..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full md:w-[250px]"
        />

        {/* Export Button */}
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Attendee List Table */}
      <div className="overflow-x-auto">
        {displayedAttendees.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Phone</th>
                <th className="text-left p-4">Ticket Ref</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedAttendees.map(attendee => (
                <tr key={attendee.id} className="border-b">
                  <td className="p-4">{attendee.firstName} {attendee.lastName}</td>
                  <td className="p-4">{attendee.email}</td>
                  <td className="p-4">{attendee.phone}</td>
                  <td className="p-4">{attendee.ticketRef}</td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm">
                      <Mail className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center py-4">No attendees found.</p>
        )}
      </div>
    </Card>
  );
}
