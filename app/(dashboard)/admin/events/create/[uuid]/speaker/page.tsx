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

interface Speaker {
  name: string;
  description: string;
  imageUrl?: string;
}

interface FormErrors {
  [key: string]: string[];
}

export default function AddSpeaker() {
  const router = useRouter();
  const params = useParams();
  const uuid = params?.uuid as string;
  const { addedevents } = useEventStore();
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
        { name: "", description: "", imageUrl: "" },
      ],
    });
  };

  const handleRemoveSpeaker = (index: number) => {
    const updatedSpeakers = formData.speakers.filter((_, i) => i !== index);
    setFormData({ ...formData, speakers: updatedSpeakers });
  };

  const validateForm = () => {
    let newErrors: FormErrors = {};
    formData.speakers.forEach((speaker, index) => {
      const key = `speaker-${index}`;
      newErrors[key] = [];
      if (!speaker.name) {
        newErrors[key].push("Speaker name is required");
      }
      if (!speaker.description) {
        newErrors[key].push("Speaker description is required");
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        console.log("Submitted Data:", formData);
        setIsLoading(false);
      }, 2000);
    }
  };

  const onNext = () => {
    if(addedevents.isPaidFor == false){
        router.push(`/admin/events/create/${uuid}/workshops`);
    }
    else{
        router.push(`/admin/events/create/${uuid}/tickets`);
    }  
  }

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
                  handleSpeakerChange(index, "imageUrl", secureUrl);
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
                {speaker.imageUrl && (
                  <span className="text-sm text-gray-500 break-all">
                    {speaker.imageUrl}
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
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
            </div>
          ) : (
            <span className="flex items-center justify-center">Submit</span>
          )}
        </Button>
        <Button onClick={onNext} className="bg-gray-400 text-white">
          Skip
        </Button>
      </div>
    </div>
  );
}
