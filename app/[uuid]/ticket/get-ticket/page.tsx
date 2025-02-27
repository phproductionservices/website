"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, Mail } from "lucide-react";
import JsBarcode from "jsbarcode";
import useEventStore from "@/store/eventstore";

export default function GetTicketPage() {
  const { addedRegistration } = useEventStore();
  const barcodeRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  // Generate Barcodes for each ticket
  useEffect(() => {
    console.log("ticket : ", addedRegistration);
    addedRegistration.forEach((ticket: any, index: number) => {
      if (barcodeRefs.current[index]) {
        JsBarcode(barcodeRefs.current[index], ticket.ticketRef, {
          format: "CODE128",
          width: 2,
          height: 100,
          displayValue: true,
          fontSize: 20,
          background: "#ffffff",
        });
      }
    });
  }, [addedRegistration]);

  // Download Ticket Barcode
  const handleDownload = (index: number) => {
    const canvas = barcodeRefs.current[index];
    if (canvas) {
      const link = document.createElement("a");
      link.download = `ticket-${addedRegistration[index].orderNumber}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  // Share Ticket
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Event Ticket",
          text: "Check out my ticket for The Premier Conference!",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    }
  };

  // Email Ticket
  const handleEmailTicket = () => {
    window.location.href = "mailto:?subject=My Event Ticket&body=Here's my ticket for The Premier Conference!";
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Tickets</h1>
        <p className="text-gray-600">Your tickets have been confirmed. Save or share them with friends.</p>
      </div>

      {/* Loop Through Each Ticket */}
      {addedRegistration.map((ticket: any, index: number) => (
        <Card key={ticket.id} className="p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="pt-6">
                <h3 className="font-semibold mb-4">Ticket Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name</span>
                    <span>{ticket.firstName} {ticket.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ticket Price</span>
                    <span>£{ticket.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ticket Type</span>
                    <span>{ticket.ticketType || "General"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ticket Holder</span>
                    <span>{ticket.firstName} {ticket.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ticket Reference</span>
                    <span>{ticket.ticketRef}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Purchase Date</span>
                    <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Barcode */}
            <div className="flex flex-col items-center justify-center border-l pl-8">
              <div className="mb-6 w-full">
                <canvas ref={el => barcodeRefs.current[index] = el} className="w-full"></canvas>
              </div>
              <p className="text-center text-gray-600 mb-6">Present this barcode at the event entrance</p>
            </div>
          </div>

          {/* Buttons for Each Ticket */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => handleDownload(index)}>
              <Download className="w-4 h-4 mr-2" />
              Download Ticket
            </Button>
            <Button className="flex-1" variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share Ticket
            </Button>
            <Button className="flex-1" variant="outline" onClick={handleEmailTicket}>
              <Mail className="w-4 h-4 mr-2" />
              Email Ticket
            </Button>
          </div>
        </Card>
      ))}

      {/* Important Information */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Important Information</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Please arrive at least 30 minutes before the event starts</li>
          <li>Bring a valid ID that matches the ticket holder's name</li>
          <li>This ticket is non-transferable and non-refundable</li>
          <li>For any questions, contact info@phproductionservices@co.uk</li>
        </ul>
      </div>
    </div>
  );
}
