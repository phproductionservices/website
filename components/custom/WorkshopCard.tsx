import { Card } from "@/components/ui/card";
import { formatDate, formatTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

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

type WorkshopProps = {
  workshop: WorkShop;
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

export default function WorkshopCard({ workshop }: WorkshopProps) {
  const router = useRouter();

  const handleViewTickets = () => {
    if (workshop.isPaidFor) {
      router.push(`/admin/workshop/${workshop.uuid}/tickets`);
    }
  };

  return (
    <Card className="p-4 border rounded-lg shadow-md w-full mb-4">
      <h3 className="text-lg font-semibold">{workshop.title}</h3>
      <p className="text-gray-500">{formatDate(workshop.date)}</p>
      <p className="text-gray-500">
        {formatTime(workshop.startTime)} - {formatTime(workshop.endTime)}
      </p>

      {workshop.isPaidFor && workshop.ticket.length > 0 && (
        <Collapsible className="mt-2">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full">
              View Tickets
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 border rounded-md p-3 bg-gray-50">
            <h4 className="text-md font-medium mb-2">Available Tickets:</h4>
            {workshop.ticket.map((ticket, index) => (
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
          </CollapsibleContent>
        </Collapsible>
      )}
    </Card>
  );
}
