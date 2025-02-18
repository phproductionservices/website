"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Calendar, MapPin, Users, ArrowRight, Share2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import useEventStore from "@/store/eventstore";
import { Skeleton } from "@/components/ui/skeleton";

export default function SuccessPage() {
  const params = useParams();
  const uuid = params?.uuid as string;
  const { eventData, fetchEventbyUUID } = useEventStore();
  const [isLoading, setIsLoading] = useState(true); // ✅ Track loading state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // ✅ Start loading
      await fetchEventbyUUID(uuid);
      setIsLoading(false); // ✅ Stop loading
    };

    fetchData();
  }, [fetchEventbyUUID, uuid]);

  const event = eventData;
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event?.title || "New Event",
          text: "Check out this event!",
          url: window.location.href
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-20 h-20 mx-auto mb-8"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-green-100 rounded-full animate-ping" />
          <div className="relative bg-white rounded-full p-4">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold mb-4">Event Created Successfully!</h1>
        <p className="text-gray-600">
          Your event has been created and is now live. You can manage it from your dashboard.
        </p>
      </motion.div>

      <motion.div {...fadeInUp}>
        <Card className="p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              {/* ✅ Show Skeleton Loader When Fetching */}
              {isLoading ? (
                <Skeleton className="w-full h-48 rounded-lg mb-4" />
              ) : (
                event?.eventImageUrl && (
                  <img
                    src={event.eventImageUrl}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )
              )}

              {/* ✅ Show Skeleton for Title */}
              <h2 className="text-xl font-semibold mb-4">
                {isLoading ? <Skeleton className="w-1/2 h-6" /> : event?.title}
              </h2>

              <div className="space-y-3">
                {/* ✅ Show Skeleton for Date */}
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  {isLoading ? <Skeleton className="w-32 h-4" /> : <span>{new Date(event?.date || "").toLocaleDateString()}</span>}
                </div>

                {/* ✅ Show Skeleton for Venue */}
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  {isLoading ? <Skeleton className="w-40 h-4" /> : <span>{event?.venue}</span>}
                </div>

                {/* ✅ Show Skeleton for Event Type */}
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2" />
                  {isLoading ? <Skeleton className="w-32 h-4" /> : <span>{event?.isPaidFor ? "Paid Event" : "Free Event"}</span>}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/admin/events">
                    <Button className="w-full">
                      View All Events
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleShare}
                  >
                    Share Event
                    <Share2 className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Next Steps</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-500" />
                    Review your event details in the dashboard
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-500" />
                    Share the event with your network
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-500" />
                    Monitor ticket sales and registrations
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-500" />
                    Prepare for your upcoming event
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <p className="text-gray-500 text-sm">
          Need help? Contact our support team at{" "}
          <a href="mailto:support@example.com" className="text-blue-600">
            support@example.com
          </a>
        </p>
      </motion.div>
    </div>
  );
}
