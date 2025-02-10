"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function TicketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image
              src="/images/PH_White.png"
              alt="PH Logo"
              width={30}
              height={30}
              className="w-20 h-8"
            />
            
          </div>
          <div className="hidden md:flex space-x-6">
            <Link href="#" className="text-sm font-medium">About us</Link>
            <Link href="#" className="text-sm font-medium">Events</Link>
            <Link href="#" className="text-sm font-medium">Speakers</Link>
            <Link href="#" className="text-sm font-medium">Tickets</Link>
          </div>
          <Link href="/contact" className="bg-[#27264E] text-white px-4 py-2 rounded-lg">
            Contact us
          </Link>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-sm mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
        {children}
      </div>
    </div>
  );
}