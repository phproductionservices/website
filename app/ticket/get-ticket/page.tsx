"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Download, Share2, Mail } from "lucide-react";
import JsBarcode from "jsbarcode";

export default function GetTicketPage() {
  const barcodeRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, "TKT-2024-001", {
        format: "CODE128",
        width: 2,
        height: 100,
        displayValue: true,
        fontSize: 20,
        background: "#ffffff",
      });
    }
  }, []);

  const handleDownload = () => {
    if (barcodeRef.current) {
      const link = document.createElement("a");
      link.download = "ticket-barcode.png";
      link.href = barcodeRef.current.toDataURL();
      link.click();
    }
  };

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

  const handleEmailTicket = () => {
    window.location.href = "mailto:?subject=My Event Ticket&body=Here's my ticket for The Premier Conference!";
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Ticket</h1>
        <p className="text-gray-600">
          Your ticket has been confirmed. Save it or share it with friends.
        </p>
      </div>

      <Card className="p-8 mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">The Premier Conference</h2>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>Saturday, March 15th 2024</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>San Diego Convention Center, CA</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Ticket Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ticket Type</span>
                  <span>VIP Access</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ticket Holder</span>
                  <span>John Doe</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Number</span>
                  <span>ORD-2024-001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Purchase Date</span>
                  <span>March 1, 2024</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border-l pl-8">
            <div className="mb-6 w-full">
              <canvas ref={barcodeRef} className="w-full"></canvas>
            </div>
            <p className="text-center text-gray-600 mb-6">
              Present this barcode at the event entrance
            </p>
          </div>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          className="flex-1 bg-blue-600 hover:bg-blue-700"
          onClick={handleDownload}
        >
          <Download className="w-4 h-4 mr-2" />
          Download Ticket
        </Button>
        <Button
          className="flex-1"
          variant="outline"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Ticket
        </Button>
        <Button
          className="flex-1"
          variant="outline"
          onClick={handleEmailTicket}
        >
          <Mail className="w-4 h-4 mr-2" />
          Email Ticket
        </Button>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Important Information</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Please arrive at least 30 minutes before the event starts</li>
          <li>Bring a valid ID that matches the ticket holder's name</li>
          <li>This ticket is non-transferable and non-refundable</li>
          <li>For any questions, contact support@example.com</li>
        </ul>
      </div>
    </div>
  );
}