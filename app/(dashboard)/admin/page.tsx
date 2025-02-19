"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  MapPin,
  Search,
  Ticket,
  Calendar,
  DollarSign,
  TrendingUp,
  MoreHorizontal,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import useEventStore from "@/store/eventstore";
import router from "next/router";
import { formatDate, formatTime } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

type Event = {
  id: number;
  uuid: string;
  title: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  address: string;
  eventImageUrl: string;
  status: string;
};

export default function AdminDashboard() {
  const {allevents, fetchEventAll } = useEventStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isFetchedEvents, setFetchedEvents] = useState(false);
  const [allfetchedevents, setEvents] = useState<Event[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setFetchedEvents(false);
      try {
        const response = await fetchEventAll();
        if (response.statusCode === 404 && response.message === "Token has expired") {
          router.push("/");
        } else if (response.statusCode === 200) {
          setEvents(response.data);
        }
      } catch (error) {
        console.error("Error fetching events: ", error);
      } finally {
        setFetchedEvents(true);
      }
    };

    fetchData();
  }, [fetchEventAll, router]);

  const filteredEvents = allfetchedevents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "almost sold out":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Events</h1>
        <Link href="/admin/events/create">
          <Button>Add new event</Button>
        </Link>
      </div>

      {/* Skeleton for analytics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) =>
          isFetchedEvents ? (
            <Card key={i} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Analytics</p>
                  <p className="text-2xl font-bold">Loading...</p>
                </div>
                <Skeleton className="w-8 h-8 rounded-md" />
              </div>
              <div className="mt-2 text-sm text-gray-500">Updating...</div>
            </Card>
          ) : (
            <Skeleton key={i} className="h-24 rounded-lg" />
          )
        )}
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search events..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            <SelectItem value="Conference">Conference</SelectItem>
            <SelectItem value="Festival">Festival</SelectItem>
            <SelectItem value="Corporate">Corporate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isFetchedEvents
              ? [...Array(3)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-12 w-full rounded-md" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24 rounded-md" />
                      <Skeleton className="h-3 w-20 mt-1 rounded-md" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32 rounded-md" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-16 rounded-md" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-20 rounded-md" />
                    </TableCell>
                  </TableRow>
                ))
              : filteredEvents.map((event) => (
                  <TableRow key={event.id} className="cursor-pointer hover:bg-gray-50" onClick={() => router.push(`/admin/events/${event.uuid}`)}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={event.eventImageUrl}
                          alt={event.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-gray-500">{event.category}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{formatDate(event.date)}</div>
                        <div className="text-gray-500">
                          {formatTime(event.startTime)} - {formatTime(event.endTime)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        {event.venue}, {event.address}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
