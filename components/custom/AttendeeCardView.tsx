import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function AttendeeCardView() {
  const handleDownloadAttendees = () => {
    // Placeholder function for downloading attendees
    console.log("Downloading attendee list...");
  };

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

  interface AttendeeCardViewProps {
    event: {
        id: number;
        uuid: string;
        title: string;
        ticket: Ticket[];
        workshops: WorkShop[];
    };
    handleDownloadAttendees: () => void;
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Attendee List</h3>
        <Button variant="outline" onClick={handleDownloadAttendees}>
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Ticket Type</th>
              <th className="text-left p-4">Purchase Date</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder Attendee Data */}
            <tr className="border-b">
              <td className="p-4" colSpan={5}>
                No attendees yet
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}
