"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EventDetailPage() {
  const [events, setEvents] = useState([
    { id: 1, title: "Next.js Conference", date: "2025-03-10" },
    { id: 2, title: "React Summit", date: "2025-04-15" },
  ]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to My Next.js Page</h1>

      <p className="text-gray-600 mb-4">Explore upcoming events below:</p>

      {/* Events List */}
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="bg-gray-100 p-4 rounded-md w-80 text-center">
            <h3 className="font-semibold">{event.title}</h3>
            <p className="text-sm text-gray-500">{event.date}</p>
          </li>
        ))}
      </ul>

      {/* Navigation Button */}
      <Link href="/about">
        <Button className="mt-6">Go to About Page</Button>
      </Link>
    </div>
  );
}
