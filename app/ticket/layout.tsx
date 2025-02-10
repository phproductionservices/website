"use client";

import { ArrowLeft, Zap, Phone, Mail, MapPinned } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function TicketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollToSection = (sectionId: string) => {
    window.location.href = `/1#${sectionId}`;
  };

  const navItems = [
    { label: "About us", href: "/1#about" },
    { label: "Events", href: "/1#events" },
    { label: "Speakers", href: "/1#speakers" },
    { label: "Tickets", href: "/ticket" }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/PH.png"
              alt="PH Logo"
              width={30}
              height={30}
              className="w-20 h-8"
            />
          </Link>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <Link key={index} href={item.href} className="text-sm font-medium">
                  {item.label}
                </Link>
              ))}
            </div>
            <Link href="/contact">
              <Button className="bg-[#27264E] text-white">Contact us</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 flex-grow">
        <Link href="/" className="inline-flex items-center text-sm mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
        {children}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Zap className="w-8 h-8 text-blue-600" />
                <span className="font-bold text-xl">PH Productions</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-blue-600" />
                  <p>01782 971 014</p>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-blue-600" />
                  <p>info@phproductionservices.co.uk</p>
                </div>
                <div className="flex items-center">
                  <MapPinned className="w-5 h-5 mr-2 text-blue-600" />
                  <p>Stoke-on-Trent, UK</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Our Services</h4>
              <ul className="space-y-2">
                <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Sound Systems
                </li>
                <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Video Production
                </li>
                <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Lighting Design
                </li>
                <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  PA Systems
                </li>
                <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Stage Management
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for the latest updates and insights.
              </p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                />
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
            <p>© 2024 PH Productions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}