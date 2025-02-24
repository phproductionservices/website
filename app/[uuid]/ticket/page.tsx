"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";
import useEventStore from "@/store/eventstore";
import { formatDate, formatTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, MapPin, AlertCircle } from "lucide-react";

interface SelectedTicket {
  ticketId: number;
  quantity: number;
  price: number;
  name: string;
  type: string;
}

interface Ticket {
  id: number;
  type: string;
  name: string;
  price: number;
  quantity: number;
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

export default function TicketsPage() {
  const router = useRouter();
  const params = useParams();
  const uuid = params?.uuid as string;
  const { eventData, fetchEventbyUUID, saveticketData } = useEventStore();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTickets, setSelectedTickets] = useState<{ [key: string]: SelectedTicket }>({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await fetchEventbyUUID(uuid);
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

  // Calculate total amount whenever selected tickets change
  useEffect(() => {
    const total = Object.values(selectedTickets).reduce((sum, ticket) => {
      return sum + (ticket.price * ticket.quantity);
    }, 0);
    setTotalAmount(total);
  }, [selectedTickets]);

  const handleQuantityChange = (ticketId: number, quantity: string, price: number, name: string, type: string) => {
    const quantityNum = parseInt(quantity);
    if (quantityNum === 0) {
      const { [ticketId.toString()]: _, ...rest } = selectedTickets;
      setSelectedTickets(rest);
    } else {
      setSelectedTickets(prev => ({
        ...prev,
        [ticketId]: {
          ticketId,
          quantity: quantityNum,
          price,
          name,
          type
        }
      }));
    }
  };

  const handleProceed = () => {
    if (Object.keys(selectedTickets).length === 0) {
      setError("Please select at least one ticket to proceed");
      return;
    }

    const ticketData = {
      tickets: Object.values(selectedTickets).map(ticket => ({
        ticketId: ticket.ticketId,
        amount: ticket.price * ticket.quantity,
        quantity: ticket.quantity,
        pricePerTicket: ticket.price,
        name: ticket.name,
        type: ticket.type
      })),
      totalAmount
    };
    console.log("Ticket Data : ", ticketData);
    saveticketData(ticketData);
    router.push(`/${uuid}/ticket/contact`);
  };

  if (isLoading) {
    return <TicketPageSkeleton />;
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{eventData.title}</h1>
          <div className="flex flex-col gap-2 text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{formatDate(eventData.date)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>{formatTime(eventData.startTime)} - {formatTime(eventData.endTime)}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{eventData.venue}, {eventData.address}</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Event Tickets */}
          {eventData.tickets && eventData.tickets.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Event Tickets</h2>
              {eventData.tickets.map((ticket: Ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-6 border rounded-lg mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{ticket.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">Type: {ticket.type}</p>
                    <p className="text-blue-600 font-semibold mt-2">£{ticket.price}</p>
                    <p className="text-sm text-gray-500">{ticket.quantity} tickets available</p>
                  </div>
                  <Select
                    value={selectedTickets[ticket.id]?.quantity.toString() || "0"}
                    onValueChange={(value) => handleQuantityChange(ticket.id, value, ticket.price, ticket.name, ticket.type)}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="0" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(Math.min(10, ticket.quantity + 1))].map((_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          )}

          {/* Workshop Tickets */}
          {eventData.workshops && eventData.workshops.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Workshop Tickets</h2>
              {eventData.workshops.map((workshop: WorkShop) => (
                <div key={workshop.id} className="border rounded-lg p-6 mb-4">
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg">{workshop.title}</h3>
                    <p className="text-gray-600 text-sm">{formatDate(workshop.date)}</p>
                    <p className="text-gray-600 text-sm">{workshop.startTime} - {workshop.endTime}</p>
                  </div>
                  
                  {workshop.ticket && workshop.ticket.length > 0 ? (
                    workshop.ticket.map((ticket: Ticket) => (
                      <div key={ticket.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">{ticket.name}</h4>
                          <p className="text-blue-600 font-semibold">£{ticket.price}</p>
                          <p className="text-sm text-gray-500">{ticket.quantity} tickets available</p>
                        </div>
                        <Select
                          value={selectedTickets[ticket.id]?.quantity.toString() || "0"}
                          onValueChange={(value) => handleQuantityChange(ticket.id, value, ticket.price, ticket.name, "Workshop")}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue placeholder="0" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(Math.min(10, ticket.quantity + 1))].map((_, i) => (
                              <SelectItem key={i} value={i.toString()}>
                                {i}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No tickets available for this workshop</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <Card className="p-6 sticky top-8">
          <h3 className="font-semibold text-xl mb-6">Order Summary</h3>
          <div className="space-y-4">
            {Object.values(selectedTickets).map((ticket) => (
              <div key={ticket.ticketId} className="flex justify-between">
                <div>
                  <span>{ticket.quantity}× {ticket.name}</span>
                  <p className="text-sm text-gray-500">{ticket.type}</p>
                </div>
                <span>£{(ticket.price * ticket.quantity).toFixed(2)}</span>
              </div>
            ))}
            
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>£{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-6">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">£{totalAmount.toFixed(2)}</span>
              </div>
              <Button 
                className="w-full"
                onClick={handleProceed}
                disabled={Object.keys(selectedTickets).length === 0}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

const TicketPageSkeleton = () => (
  <div className="grid md:grid-cols-3 gap-8">
    <div className="md:col-span-2">
      <Skeleton className="h-10 w-3/4 mb-4" />
      <Skeleton className="h-6 w-1/2 mb-8" />
      
      <div className="space-y-6">
        <Skeleton className="h-8 w-1/4 mb-4" />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-lg" />
        ))}
      </div>
    </div>
    
    <div>
      <Skeleton className="h-[400px] rounded-lg" />
    </div>
  </div>
);