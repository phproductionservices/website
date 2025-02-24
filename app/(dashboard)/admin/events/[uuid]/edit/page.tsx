"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react";
import useEventStore from "@/store/eventstore";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { useToast } from "@/hooks/use-toast";

// Define form data type
interface FormData {
  title: string;
  category: string;
  overview: string;
  eventType: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  address: string;
  postcode: string;
  eventImageUrl: string;
  isAllowWorkshop: boolean;
  isPaidFor: boolean;
  city: string;
  state: string;
  country: string;
  [key: string]: string | boolean; // Index signature
}

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const uuid = params?.uuid as string;
  const [currentStep, setCurrentStep] = useState("details");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { eventData, updateEvent } = useEventStore();
  const { toast } = useToast()

  // Form state with type
  const [formData, setFormData] = useState<FormData>({
    title: eventData.title,
    category: eventData.category,
    overview: eventData.overview,
    eventType: eventData.eventType,
    date: eventData.date,
    startTime: eventData.startTime,
    endTime: eventData.endTime,
    venue: eventData.venue,
    address: eventData.address,
    postcode: eventData.postcode,
    eventImageUrl: eventData.eventImageUrl,
    isAllowWorkshop: eventData.isAllowWorkshop,
    isPaidFor: eventData.isPaidFor,
    city: eventData.city,
    state: eventData.state,
    country: eventData.country,
  });

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Required fields validation
    const requiredFields = [
      "title",
      "category",
      "overview",
      "eventType",
      "date",
      "startTime",
      "endTime",
      "venue",
      "address",
      "postcode",
      "city",
      "state",
      "country",
    ] as const;

    requiredFields.forEach((field) => {
      const value = formData[field];
      if (typeof value === "string" && !value.trim()) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });

    // Image validation
    if (!formData.eventImageUrl) {
      newErrors.eventImageUrl = "Event image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await useEventStore.getState().createEvent(formData);

      if (response && response.statusCode >= 200 && response.statusCode < 300) {
        // Show success toast
        toast({
          title: "Created successfully",
          description: response.message,
        });

        // Wait for 3 seconds before redirecting
        setTimeout(() => {
          router.push(`/admin/events/create/${response.data.uuid}/tickets`);

        }, 2000);
      } else {
        setErrors((prev) => ({
          ...prev,
          submit: response.message || "Failed to create event",
        }));
        toast({
          title: "Error!!!",
          description: response.message || "Failed to create event",
        });
      }
    } catch (error) {
      console.error("Error creating event:", error);
      setErrors((prev) => ({
        ...prev,
        submit: "An unexpected error occurred",
      }));
      toast({
        title: "Error!!!",
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Edit Event</h1>
      <p className="text-gray-500 mb-6">Enter all event details below.</p>

      <Card className="p-6">
        {currentStep === "details" && (
          <div className="space-y-6">
            <div className="border-2 border-dashed rounded-lg p-12 text-center">
              <CldUploadWidget
                uploadPreset="my_preset" // Ensure this matches your Cloudinary preset
                onSuccess={(results) => {
                  setIsUploading(false); // Stop loading when upload is successful
                  if (typeof results === "object" && results !== null) {
                    const cloudinaryResults =
                      results as CloudinaryUploadWidgetResults;

                    if (
                      cloudinaryResults.info &&
                      typeof cloudinaryResults.info === "object" &&
                      "secure_url" in cloudinaryResults.info
                    ) {
                      const secureUrl = cloudinaryResults.info.secure_url;
                      setFormData((prev) => ({
                        ...prev,
                        eventImageUrl: secureUrl,
                      }));
                      console.log("✅ Image Uploaded:", secureUrl);
                    } else {
                      console.error(
                        "❌ Upload response missing secure_url",
                        cloudinaryResults
                      );
                    }
                  } else {
                    console.error(
                      "❌ Unexpected upload response format:",
                      results
                    );
                  }
                }}
              >
                {({ open }) => (
                  <div>
                    {/* Image Preview */}
                    <div className="mx-auto flex justify-center text-gray-400">
                      {formData.eventImageUrl ? (
                        <img
                          src={formData.eventImageUrl}
                          alt="Event cover"
                          className="h-48 w-auto object-cover rounded-lg"
                        />
                      ) : (
                        <ImageIcon className="h-12 w-12" />
                      )}
                    </div>

                    {/* Upload Button - Always Available */}
                    <div className="mt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsUploading(true);
                          open(); // Opens Cloudinary Upload Widget
                        }}
                      >
                        {isUploading ? "Uploading..." : "Upload Another Image"}
                      </Button>
                    </div>

                    {/* Image Guidelines */}
                    <p className="text-xs text-gray-500 mt-2">
                      16:9 ratio recommended. Max file size 1MB
                    </p>

                    {/* Error Messages */}
                    {errors.eventImageUrl && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.eventImageUrl}
                      </p>
                    )}
                  </div>
                )}
              </CldUploadWidget>
            </div>

            <div>
              <Label htmlFor="title">Event title</Label>
              <Input
                id="title"
                className="mt-1"
                placeholder="Enter event title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conference">Conference</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="seminar">Seminar</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            <div>
              <Label htmlFor="overview">Overview</Label>
              <Textarea
                id="overview"
                className="mt-1"
                placeholder="Write about your event"
                rows={4}
                value={formData.overview}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, overview: e.target.value }))
                }
              />
              {errors.overview && (
                <p className="text-red-500 text-sm mt-1">{errors.overview}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label>Event Type</Label>
                <Select
                  value={formData.eventType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, eventType: value }))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Day Event</SelectItem>
                    <SelectItem value="multi">Multi-Day Event</SelectItem>
                  </SelectContent>
                </Select>
                {errors.eventType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.eventType}
                  </p>
                )}
              </div>
              <div>
                <Label>Ticket Option</Label>
                <Select
                  value={formData.isPaidFor ? "true" : "false"}
                  onValueChange={
                    (value) =>
                      setFormData((prev) => ({
                        ...prev,
                        isPaidFor: value === "true",
                      })) // Convert back to boolean
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select ticket option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Paid Event</SelectItem>
                    <SelectItem value="false">Not Paid Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  className="mt-1"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, date: e.target.value }))
                  }
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                )}
              </div>
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  className="mt-1"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      startTime: e.target.value,
                    }))
                  }
                />
                {errors.startTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.startTime}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  className="mt-1"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      endTime: e.target.value,
                    }))
                  }
                />
                {errors.endTime && (
                  <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="venue">Venue</Label>
              <Input
                id="venue"
                className="mt-1"
                placeholder="Enter venue name"
                value={formData.venue}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, venue: e.target.value }))
                }
              />
              {errors.venue && (
                <p className="text-red-500 text-sm mt-1">{errors.venue}</p>
              )}
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                className="mt-1"
                placeholder="Enter address"
                value={formData.address}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, address: e.target.value }))
                }
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-4 gap-6">
              <div>
                <Label htmlFor="postcode">Postcode</Label>
                <Input
                  id="postcode"
                  className="mt-1"
                  placeholder="Enter postcode"
                  value={formData.postcode}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      postcode: e.target.value,
                    }))
                  }
                />
                {errors.postcode && (
                  <p className="text-red-500 text-sm mt-1">{errors.postcode}</p>
                )}
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  className="mt-1"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, city: e.target.value }))
                  }
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  className="mt-1"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, state: e.target.value }))
                  }
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  className="mt-1"
                  placeholder="Enter country"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      country: e.target.value,
                    }))
                  }
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                )}
              </div>
            </div>

            {errors.submit && (
              <p className="text-red-500 text-sm mt-4">{errors.submit}</p>
            )}
          </div>
        )}

        <div className="flex justify-between mt-16 mb-8">
          <Button
            type="submit"
            className="w-full bg-[#27264E] hover:bg-[#1f1e3d] transition-colors"
            disabled={isLoading}
            onClick={handleNext}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
              </div>
            ) : (
              <span className="flex items-center justify-center">
                Edit Event
              </span>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
