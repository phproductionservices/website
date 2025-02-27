"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { useParams, useRouter } from "next/navigation";
import useEventStore from "@/store/eventstore";
import { useToast } from "@/hooks/use-toast";

interface Speaker {
  name: string;
  description: string;
  speakerUrl?: string;
}

interface FormErrors {
  [key: string]: string[];
}

export default function AddSpeaker() {
  const router = useRouter();
  const params = useParams();
  const uuid = params?.uuid as string;
  const { eventData, fetchEventbyUUID } = useEventStore();
  const { toast } = useToast();
  const [formData, setFormData] = useState<{ speakers: Speaker[] }>({
    speakers: [],
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSpeakerChange = (
    index: number,
    field: keyof Speaker,
    value: string
  ) => {
    const updatedSpeakers = [...formData.speakers];
    updatedSpeakers[index] = { ...updatedSpeakers[index], [field]: value };
    setFormData({ ...formData, speakers: updatedSpeakers });
  };

  const handleAddSpeaker = () => {
    setFormData({
      ...formData,
      speakers: [
        ...formData.speakers,
        { name: "", description: "", speakerUrl: "" },
      ],
    });
  };

  const handleRemoveSpeaker = (index: number) => {
    const updatedSpeakers = formData.speakers.filter((_, i) => i !== index);
    setFormData({ ...formData, speakers: updatedSpeakers });
  };

  const validateForm = () => {
    let newErrors: FormErrors = {};
    let isValid = true;

    formData.speakers.forEach((speaker, index) => {
      const key = `speaker-${index}`;
      let speakerErrors: string[] = [];

      if (!speaker.name.trim()) {
        speakerErrors.push("Speaker name is required");
        isValid = false;
      }

      if (!speaker.description.trim()) {
        speakerErrors.push("Speaker description is required");
        isValid = false;
      }

      if (speakerErrors.length > 0) {
        newErrors[key] = speakerErrors;
      }
    });

    setErrors(newErrors);
    return isValid; // ✅ Now returns false if any errors exist
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    const response = await useEventStore.getState().createEventSpeaker({
      formData,
      uuid,
    });
    const dataresonse = await fetchEventbyUUID(uuid);

    if (response.statusCode >= 200 && response.statusCode < 300) {
      toast({
        title: "Event details created successfully",
        description: response.message,
      });

      setIsLoading(false);
      setTimeout(() => {
        console.log(dataresonse.data.isPaidFor);
        if (dataresonse.data.isPaidFor === false) {
          router.push(`/admin/events/create/${uuid}/workshops`);
        } else {
          router.push(`/admin/events/create/${uuid}/tickets`);
        }
      }, 1000);
    }

  };

  const onNext = async () => {
    const dataresonse = await fetchEventbyUUID(uuid);
    
    console.log(eventData.isPaidFor);
    if (dataresonse.data.isPaidFor === false) {
      router.push(`/admin/events/create/${uuid}/workshops`);
    } else {
      router.push(`/admin/events/create/${uuid}/tickets`);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Speakers</h2>
      {formData.speakers.map((speaker, index) => (
        <div
          key={index}
          className="border p-4 mb-4 rounded-lg space-y-2 relative"
        >
          <button
            onClick={() => handleRemoveSpeaker(index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            ✖
          </button>

          <Input
            placeholder="Speaker Name"
            value={speaker.name}
            onChange={(e) => handleSpeakerChange(index, "name", e.target.value)}
          />
          {errors[`speaker-${index}`]?.includes("Speaker name is required") && (
            <p className="text-red-500 text-sm">Speaker name is required</p>
          )}

          <Textarea
            placeholder="Speaker Description"
            value={speaker.description}
            onChange={(e) =>
              handleSpeakerChange(index, "description", e.target.value)
            }
          />
          {errors[`speaker-${index}`]?.includes(
            "Speaker description is required"
          ) && (
            <p className="text-red-500 text-sm">
              Speaker description is required
            </p>
          )}

          <CldUploadWidget
            uploadPreset="my_preset"
            onSuccess={(results) => {
              setIsUploading(false);
              if (typeof results === "object" && results !== null) {
                const cloudinaryResults =
                  results as CloudinaryUploadWidgetResults;
                if (
                  cloudinaryResults.info &&
                  typeof cloudinaryResults.info === "object" &&
                  "secure_url" in cloudinaryResults.info
                ) {
                  const secureUrl = cloudinaryResults.info.secure_url;
                  handleSpeakerChange(index, "speakerUrl", secureUrl);
                  console.log("✅ Image Uploaded:", secureUrl);
                } else {
                  console.error(
                    "❌ Upload response missing secure_url",
                    cloudinaryResults
                  );
                }
              } else {
                console.error("❌ Unexpected upload response format:", results);
              }
            }}
          >
            {({ open }) => (
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => {
                    setIsUploading(true);
                    open();
                  }}
                >
                  Upload Speaker Image
                </Button>
                {speaker.speakerUrl && (
                  <span className="text-sm text-gray-500 break-all">
                    {speaker.speakerUrl}
                  </span>
                )}
              </div>
            )}
          </CldUploadWidget>
        </div>
      ))}

      <div className="flex space-x-4">
        <Button onClick={handleAddSpeaker}>Add More Speakers</Button>
        <Button
          onClick={handleSubmit}
          className="bg-blue-500 text-white"
          disabled={isLoading || formData.speakers.length === 0} // ✅ Disabled when no speakers
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
            </div>
          ) : (
            <span className="flex items-center justify-center">Submit</span>
          )}
        </Button>
        <Button onClick={onNext} className=" text-white">
          Skip
        </Button>
      </div>
    </div>
  );
}
