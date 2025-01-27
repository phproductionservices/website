"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

const schedules = [
  {
    day: "Day 1",
    date: "Tues, Sept 21",
    events: [
      {
        title: "Marketing Mastery Workshop",
        time: "10am - 12pm",
        location: "New York, USA",
        speakers: ["Zaid Schwartz", "Sienna Hewitt", "Lily-Rose Chedjou"]
      }
    ]
  },
  {
    day: "Day 2",
    date: "Tues, Sept 21",
    events: []
  },
  {
    day: "Day 3",
    date: "Tues, Sept 21",
    events: []
  },
  {
    day: "Day 4",
    date: "Tues, Sept 21",
    events: []
  },
  {
    day: "Day 5",
    date: "Tues, Sept 21",
    events: []
  }
];

const speakers = [
  {
    name: "Amélie Laurent",
    role: "Founder & CEO",
    company: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&auto=format&fit=crop"
  },
  {
    name: "Nikolas Gibbons",
    role: "Engineering Manager",
    company: "Lead engineering teams at Figma, Proto and Protocol Labs",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&auto=format&fit=crop"
  },
  {
    name: "Sienna Hewitt",
    role: "Product Manager",
    company: "Former PM for Linear. Previously Stripe and DrChrono",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&auto=format&fit=crop"
  }
];

export default function EventBuyPage() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <div className="space-y-8">
          <div>
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=400&fit=crop&auto=format"
              alt="Event cover"
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">The Premier Conference</h1>
            <p className="text-gray-600 mb-6">
              The Annual Professional Conference is an exciting gathering of industry experts, thought
              leaders, and professionals from across the country. This year's event will feature a wide range
              of sessions and workshops designed to help attendees stay ahead of the curve and achieve
              their professional goals.
            </p>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Saturday, February 22nd 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>10AM - 12AM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>12 Elm Avenue Bristol, United Kingdom</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-6">Schedule</h2>
            <Tabs defaultValue="1" className="w-full">
              <TabsList>
                {schedules.map((schedule) => (
                  <TabsTrigger key={schedule.day} value={schedule.day.toLowerCase()} className="flex-1">
                    <div className="text-left">
                      <div className="font-semibold">{schedule.day}</div>
                      <div className="text-sm opacity-80">{schedule.date}</div>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
              {schedules.map((schedule) => (
                <TabsContent key={schedule.day} value={schedule.day.toLowerCase()}>
                  {schedule.events.map((event, index) => (
                    <Card key={index} className="p-6 mb-4">
                      <h3 className="font-semibold text-lg mb-4">{event.title}</h3>
                      <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <div className="text-sm text-gray-500">
                          {event.speakers.join(", ")}
                        </div>
                      </div>
                    </Card>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-6">Speakers</h2>
            <div className="grid grid-cols-3 gap-6">
              {speakers.map((speaker) => (
                <Card key={speaker.name} className="p-4">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold">{speaker.name}</h3>
                  <p className="text-sm text-blue-600 mb-2">{speaker.role}</p>
                  <p className="text-sm text-gray-500">{speaker.company}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <Card className="p-6 sticky top-8">
          <h3 className="font-semibold text-xl mb-6">Get Tickets</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Single Ticket</h4>
                <p className="text-sm text-gray-500">Regular admission for one person</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">$12.56</p>
                <p className="text-sm text-gray-500">100 remaining</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Group Ticket</h4>
                <p className="text-sm text-gray-500">Admission for five people</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">$50.24</p>
                <p className="text-sm text-gray-500">50 remaining</p>
              </div>
            </div>
            <Button className="w-full">Buy Tickets</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}