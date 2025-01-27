"use client";

import Link from "next/link";
import { ArrowLeft, User2, CalendarDays, Ticket, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CreateEventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get the current step from the URL
  const currentStep = "details"; // This should be dynamic based on the route

  const steps = [
    { 
      id: "details",
      name: "Event details",
      description: "Enter details of your event",
      icon: User2
    },
    {
      id: "schedule",
      name: "Schedule",
      description: "Create daily schedule for your event",
      icon: CalendarDays
    },
    {
      id: "ticket",
      name: "Ticket",
      description: "Start collaborating with your team",
      icon: Ticket
    },
    {
      id: "preview",
      name: "Preview",
      description: "Review and edit your event",
      icon: Eye
    }
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r flex-shrink-0">
        <div className="p-6">
          <Link href="/admin/events" className="text-sm flex items-center text-gray-500 hover:text-gray-900 mb-8">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to events
          </Link>

          <nav className="space-y-6">
            {steps.map((step) => {
              const isActive = step.id === currentStep;
              const Icon = step.icon;
              
              return (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg transition-colors",
                    isActive ? "bg-gray-50" : "hover:bg-gray-50"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                    isActive ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={cn(
                      "font-medium",
                      isActive ? "text-primary" : "text-gray-900"
                    )}>{step.name}</h3>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-50">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}