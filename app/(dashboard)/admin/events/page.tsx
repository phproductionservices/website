"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, MapPin, Package } from "lucide-react"; // Added Package icon for empty state
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component
import useEventStore from "../../../../store/eventstore";
import useAuthStore from "@/store/authstores";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Event = {
  id: number;
  uuid: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  title: string;
  slug: string;
  category: string;
  overview: string;
  eventType: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  address: string;
  postcode: string;
  eventImageUrl: string;
  isAllowWorkshop: boolean;
  status: string;
  isPaidFor: boolean;
  city: string;
  state: string;
  country: string;
};

export default function EventsPage() {
  const { allevents, fetchEventAll } = useEventStore();
  const { clearAuth } = useAuthStore();
  const router = useRouter();
  const [isFetchedEvents, setFetchedEvents] = React.useState(false);
  const [events, setEvents] = React.useState<Event[]>([]);

  // Fetch API data
  React.useEffect(() => {
    const fetchData = async () => {
      setFetchedEvents(false);
      try {
        const response = await fetchEventAll();
        if (
          response.statusCode === 404 &&
          response.message === "Token has expired"
        ) {
          await clearAuth();
          router.push("/");
        } else if (response.statusCode === 200) {
          setEvents(response.data);
          console.log("Number of events: ", response.data);
        }
      } catch (error) {
        console.error("Error fetching events: ", error);
      } finally {
        setFetchedEvents(true);
      }
    };

    fetchData();
  }, [fetchEventAll, clearAuth, router]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Events</h1>
        <Link href="/admin/events/create">
          <Button>Add new event</Button>
        </Link>
      </div>

      <div className="flex justify-between gap-4">
        <Input placeholder="Search for event" className="max-w-sm" />
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

      {/* Show Skeleton while loading */}
      {!isFetchedEvents ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
              <Skeleton className="w-full h-48" />
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-4" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
        // Empty State
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Package className="w-12 h-12 mb-4" />
          <p className="text-lg">No events available yet.</p>
        </div>
      ) : (
        // Render Events
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden">
              <img src={event.eventImageUrl} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{event.address}</span>
                    </div>
                  </div>
                  <span className="text-blue-600 font-semibold">{event.eventTypeg}</span>
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
      )}

      {events.length > 0 && (
        <div className="flex justify-center">
          <Button variant="outline">See more</Button>
        </div>
      )}
    </div>
  );
}
