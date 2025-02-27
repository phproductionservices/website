"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Clock,
  MapPin,
  Download,
  Mail,
  AlertCircle,
  Ticket,
  Users,
  BarChart2,
} from "lucide-react";
import useEventStore from "@/store/eventstore";
import WorkshopCard from "@/components/custom/WorkshopCard";
import { Skeleton } from "@/components/ui/skeleton";
import AttendeeCardView from "@/components/custom/AttendeeCardView";
import Link from "next/link";

// Sample sales data - replace with real data
const salesData = [
  { name: "Mon", sales: 2400 },
  { name: "Tue", sales: 1398 },
  { name: "Wed", sales: 9800 },
  { name: "Thu", sales: 3908 },
  { name: "Fri", sales: 4800 },
  { name: "Sat", sales: 3800 },
  { name: "Sun", sales: 4300 },
];

interface Registration{
  id : number;
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  quantity: number;
  pricePerTicket: number;
  ticketRef: string;
  type: string;
  amount: number;
}

interface Ticket {
  id: number;
  type: string;
  name: string;
  price: number;
  quantity: number;
  registrations: Registration[];
}

interface WorkShop {
  id: number;
  uuid: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  isPaidFor: boolean;
  ticket: Ticket[];
}

export default function EventDetailPage() {
  const router = useRouter();
  const params = useParams();
  const uuid = params?.uuid as string;
  const [activeTab, setActiveTab] = useState("overview");
  const { eventData, fetchEventbyUUID, setEventData } = useEventStore();
  const [isLoading, setIsLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalquantity, setTotalCapicity] = useState(0);
  const [totalsold, setTotalsold] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchEventbyUUID(uuid);
        setTotalsold(data.totalsold);
        setTotalCapicity(data.totalquantity);
        setTotalAmount(data.totalamount);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (uuid) {
      fetchData();
    }
  }, [uuid, fetchEventbyUUID]);

  const handleDownloadAttendees = () => {
    // Implement CSV download logic
    const csvContent =
      "data:text/csv;charset=utf-8,Name,Email,Ticket Type,Purchase Date\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendees.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handleTicketNav = async () => {
    await setEventData(eventData);
    router.push(`/admin/events/create/${uuid}/tickets`);
  };

  const handleSendEmail = () => {
    // Implement email sending logic
    console.log("Sending email to attendees...");
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "sold out":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateProgress = (sold: number, total: number) => {
    return (sold / total) * 100;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <Skeleton className="h-8 w-1/3 mb-4" />
          <Skeleton className="h-64 w-full mb-4" />
          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-6 w-1/4 mb-2" />
        </Card>

        <Card className="p-6">
          <Skeleton className="h-8 w-1/3 mb-4" />
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-lg" />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (!eventData) {
    return <div>Event not found</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.push("/admin/events")}>
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
          Back to Events
        </Button>
        <div className="flex gap-4">
          <Link href={`/admin/events/${eventData.uuid}/edit`}>
            <Button variant="outline">Edit Event</Button>
          </Link>
          <Button variant="destructive">Cancel Event</Button>
        </div>
      </div>

      <div className="flex gap-4 border-b">
        {["overview", "attendees"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <img
                src={eventData.eventImageUrl}
                alt={eventData.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h2 className="text-2xl font-bold mb-4">{eventData.title}</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <div>
                    <p className="font-medium">Date & Time</p>
                    <p className="text-sm">
                      {new Date(eventData.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                      {new Date(eventData.startTime).toLocaleTimeString()} -{" "}
                      {new Date(eventData.endTime).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm">{eventData.venue}</p>
                    <p className="text-sm">{eventData.address}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Event Overview</h3>
                <p className="text-gray-600">{eventData.overview}</p>
              </div>
            </Card>
            {eventData.workshops && eventData.workshops.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  List of Workshops
                </h3>
                <div className="space-y-4">
                  {eventData.workshops.map((workshop: WorkShop) => (
                    <WorkshopCard key={workshop.id} workshop={workshop} />
                  ))}
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Event Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Ticket className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Total Sales</p>
                      <p className="font-semibold">£{totalAmount}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Attendance</p>
                      <p className="font-semibold">{totalsold}/{totalquantity}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <BarChart2 className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <Badge className={getStatusColor(eventData.status)}>
                        {eventData.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={handleDownloadAttendees}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Attendee List
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={handleSendEmail}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email to Attendees
                </Button>
                <Button className="w-full" variant="outline">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  View Check-in Status
                </Button>
              </div>
            </Card>

            {eventData.tickets && eventData.tickets.length > 0 ? (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Ticket Types</h3>
                <div className="space-y-4">
                  {eventData.tickets.map((ticket: Ticket, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{ticket.name}</h4>
                          <p className="text-sm text-gray-500">
                            Price: £{ticket.price}
                          </p>
                        </div>
                        <Badge
                          className={getStatusColor(
                            ticket.quantity === 0 ? "Sold Out" : "Available"
                          )}
                        >
                          {ticket.quantity === 0 ? "Sold Out" : "Available"}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Available</span>
                          <span>{ticket.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ) : (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  No tickets available
                </h3>

                <div className="space-y-3">
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={handleTicketNav}
                  >
                    Create Ticket
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}

      {activeTab === "attendees" && <AttendeeCardView eventData= {eventData}/>}
    </div>
  );
}
