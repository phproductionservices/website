"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Clock, MapPin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: "Jan", value: 1000 },
  { name: "Feb", value: 1200 },
  { name: "Mar", value: 900 },
  { name: "Apr", value: 1500 },
  { name: "May", value: 1700 },
  { name: "Jun", value: 1400 },
];

const recentEvents = [
  {
    id: 1,
    title: "The Premier Conference",
    time: "10am till 3pm",
    location: "21 Bekwere Wosu St",
    sales: "21,000 sold",
    price: "$12.56",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=200&h=200&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "The Premier Conference",
    time: "10am till 3pm",
    location: "21 Bekwere Wosu St",
    sales: "21,000 sold",
    price: "$12.56",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&auto=format&fit=crop"
  }
];

const ticketSales = [
  {
    event: "Ipsum donec lobortis rhoncus sagittis pellentesque a.",
    type: "Regular",
    sold: "300/310",
    amount: "$12.53"
  },
  {
    event: "Consequat ac a velit velit libero.",
    type: "Regular",
    sold: "2000/2000",
    amount: "$12.53"
  },
  {
    event: "Mauris gravida sagittis nulla eleifend.",
    type: "VIP",
    sold: "100/100",
    amount: "$12.53"
  }
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Hi</h1>
        <Button>
          <Clock className="mr-2 h-4 w-4" /> Add new event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500">Today's revenue</p>
              <h3 className="text-2xl font-bold">$1,280</h3>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-[100px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-green-600 mt-2">↑ 15% last mth</p>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500">Today's ticket sales</p>
              <h3 className="text-2xl font-bold">14</h3>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-[100px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-red-600 mt-2">↓ 10% last mth</p>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500">Avg. order value</p>
              <h3 className="text-2xl font-bold">$91.42</h3>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-[100px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-green-600 mt-2">↑ 20% last mth</p>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Recently created events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentEvents.map((event) => (
            <Card key={event.id} className="p-4">
              <div className="flex gap-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{event.title}</h3>
                    <span className="text-blue-600 font-semibold">{event.price}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{event.location}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {event.sales}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Top ticket sales</h2>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Event</th>
                  <th className="text-left p-4 font-medium">Name of Ticket</th>
                  <th className="text-left p-4 font-medium">Sold</th>
                  <th className="text-left p-4 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {ticketSales.map((sale, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="p-4">{sale.event}</td>
                    <td className="p-4">{sale.type}</td>
                    <td className="p-4">{sale.sold}</td>
                    <td className="p-4">{sale.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}