"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, MapPin } from "lucide-react";

const events = [
  {
    id: 1,
    title: "The Premier Conference",
    time: "10am till 3pm",
    location: "21 Bekwere Wosu St",
    price: "$12.56",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&h=200&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "The Premier Conference",
    time: "10am till 3pm",
    location: "21 Bekwere Wosu St",
    price: "$12.56",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "The Premier Conference",
    time: "10am till 3pm",
    location: "21 Bekwere Wosu St",
    price: "$12.56",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "The Premier Conference",
    time: "10am till 3pm",
    location: "21 Bekwere Wosu St",
    price: "$12.56",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=300&h=200&auto=format&fit=crop"
  }
];

export default function EventsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Events</h1>
        <Button>Add new event</Button>
      </div>

      <div className="flex justify-between gap-4">
        <Input
          placeholder="Search for event"
          className="max-w-sm"
        />
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="conference">Conference</SelectItem>
            <SelectItem value="workshop">Workshop</SelectItem>
            <SelectItem value="seminar">Seminar</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{event.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <span className="text-blue-600 font-semibold">{event.price}</span>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline">Edit Event</Button>
                <Button variant="outline" className="text-red-600 hover:text-red-700">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline">See more</Button>
      </div>
    </div>
  );
}